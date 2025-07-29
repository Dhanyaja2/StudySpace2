import cardModel from "../models/cardModel.js";

// addCard

export const addCard = async (req, res) => {
  try {
    const { question, answer, deckId } = req.body;
    const userId = req.userId;

    // validate required fields
    if (!question || !answer || !deckId) {
      return res.status(400).json({
        success: false,
        message: "Question, answer, and deckId are required",
      });
    }
    const newCard = new cardModel({
      question,
      answer,
      deckId,
      userId,
    });

    await newCard.save();

    console.log("Card created successfully:", newCard._id);
    res.status(201).json({
      success: true,
      message: "Card added successfully",
      cardId: newCard._id,
    });
  } catch (error) {
    console.error("Error adding card:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error while adding card" });
  }
};

// getCardsByDeck

export const getCardsByDeck = async (req, res) => {
  const { deckId } = req.params;
  if (!deckId) {
    return res
      .status(400)
      .json({ success: false, message: "Deck ID is required" });
  }
  try {
    const cards = await cardModel.find({ deckId });
    if (!cards || cards.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No cards found for this deck" });
    }
    res.status(200).json({ success: true, data: cards });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error fetching cards" });
  }
};
// deleteCard

export const deleteCard = async (req, res) => {
  const { cardId } = req.params;

  if (!cardId) {
    return res
      .status(400)
      .json({ success: false, message: "Card ID is required" });
  }
  try {
    const deleteCard = await cardModel.findByIdAndDelete(cardId);

    if (!deleteCard) {
      return res
        .status(404)
        .json({ success: false, message: "Card not found" });
    }

    console.log(`Card deleted successfully: ${cardId}`);
    res.json({ success: true, message: "Card deleted successfully", cardId });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Server error while deleting card" });
  }
};
// userCardsCount

export const userCardsCount = async (req, res) => {
  try {
    const cardsCount = await cardModel.countDocuments({ userId: req.userId });
    res.status(200).json({
      success: true,
      count: cardsCount,
      message: "Cards count fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching user cards count:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching number of cards",
    });
  }
};

// updateCardReview

// export const updateCardReview = async (req, res) => {
//   const {cardId, quality} = req.body;
//   if(!cardId || quality === undefined){
//     return res.status(400).json({success: false,  message: "Card ID and quality are required"});
//   }
//   try{
//     const card = await cardModel.findById(cardId);
//     if(!card){
//       return res.status(404).json({success: false, message: "Card not found"});
//     }
//     let {easeFactor, interval, repetitions} = card;

//     if(quality >= 3){
//       repetitions += 1;
//       interval = repetitions === 1 ? 1 : repetitions === 2 ? 6 : Math.round(interval * easeFactor);
//       easeFactor += (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
//     } else {
//       repetitions = 0;
//       interval = 1;
//     }
//     easeFactor = Math.max(1.3, easeFactor);

//     card.repetitions = repetitions;
//     card.interval = interval;
//     card.easeFactor = easeFactor;
//     card.dueDate = new Date(Date.now() + interval * 24 * 60 * 60 * 1000);
//     card.lastReviewed = new Date();
//     card.lastQuality = quality;

//     await card.save();

//     console.log(`Card ${cardId} review updated successfully`);
//     res.status(200).json({success: true, data: card})

//   } catch(error){
//     console.error("Error updating card reviews: ", error);
//     res.status(500).json({success: false, message: "Server error while updating card review"});
//   }
// };

// export const updateCardReview = async (req, res) => {
//   const { cardId, quality } = req.body;

//   // validate input
//   if (!cardId || quality === undefined) {
//     return res
//       .status(400)
//       .json({ success: false, message: "Card ID and quality are required" });
//   }
//   try {
//     const card = await cardModel.findById(cardId);
//     if (!card)
//       return res
//         .status(404)
//         .json({ success: false, message: "Card not found" });

//     const MIN_EASE_FACTOR = 1.3;
//     const MAX_INTERVAL = 365;

//     let ef = card.easeFactor || 2.5;

//     if (quality >= 3) {
//       card.repetitions += 1;
//       if (card.repetitions === 1) {
//         card.interval = 1;
//       } else if (card.repetitions === 2) {
//         card.interval = 6;
//       } else {
//         card.interval = Math.round(card.interval * ef);
//       }
//       ef = ef + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
//     } else {
//       // reset on failure and apply lapse penalty
//       card.repetitions = 0;
//       card.interval = 1;
//       ef = Math.max(MIN_EASE_FACTOR, ef - 0.2);
//     }

//     // clamp ease factor and interval within bounds
//     card.easeFactor = Math.max(MIN_EASE_FACTOR, ef);
//     card.interval = Math.min(card.interval, MAX_INTERVAL);

//     // update next review Date
//     card.dueDate = new Date(Date.now() + card.interval * 24 * 60 * 60 * 1000);
//     card.lastReviewed = new Date();
//     card.lastQuality = quality;

//     await card.save();

//     res.json({ success: true, data: card });
//   } catch (error) {
//     console.error("Error updating card review: ", error);
//     res
//       .status(500)
//       .json({
//         success: false,
//         message: "Server error while updating card review",
//       });
//   }
// };

export const updateCardReview = async (req, res) => {
  const { cardId, quality } = req.body;
  try {
    const card = await cardModel.findById(cardId);
    if (!card) return res.json({ success: false, message: "Card not found" });

    // Apply SM-2
    let ef = card.easeFactor;
    if (quality >= 3) {
      card.repetitions += 1;
      if (card.repetitions === 1) {
        card.interval = 1;
      } else if (card.repetitions === 2) {
        card.interval = 6;
      } else {
        card.interval = Math.round(card.interval * ef);
      }
      ef = ef + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
    } else {
      card.repetitions = 0;
      card.interval = 1;
    }

    card.easeFactor = Math.max(1.3, ef);
    card.dueDate = new Date(Date.now() + card.interval * 24 * 60 * 60 * 1000);
    card.lastReviewed = new Date();
    card.lastQuality = quality;

    await card.save();

    res.json({ success: true, data: card });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Failed to update card review" });
  }
};

export const getDueCards = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const dueCards = await cardModel.find({
      userId: req.userId,
      dueDate: { $lte: new Date() },
      isSuspended: false,
    });

    const reviewedToday = await cardModel.countDocuments({
      userId: req.userId,
      lastReviewed: { $gte: today },
    });

    const totalDueToday = dueCards.length + reviewedToday;

    res.json({
      success: true,
      data: dueCards,
      totalTodayCount: totalDueToday,
      reviewedTodayCount: reviewedToday,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error fetching due cards" });
  }
};

// export const getDueCards = async (req, res) => {
//   try {
//     const today = new Date();
//     today.setHours(0, 0, 0, 0);

//     const endOfDay = new Date();
//     endOfDay.setHours(23, 59, 59, 999);

//     // Get cards due today and NOT reviewed today
//     const dueCards = await cardModel.find({
//       userId: req.userId,
//       dueDate: { $lte: endOfDay },
//       $or: [
//         { lastReviewed: { $lt: today } },
//         { lastReviewed: { $exists: false } },
//       ],
//     });

//     const reviewedToday = await cardModel.countDocuments({
//       userId: req.userId,
//       lastReviewed: { $gte: today },
//     });

//     const totalDueToday = dueCards.length + reviewedToday;

//     res.json({
//       success: true,
//       data: dueCards,
//       totalTodayCount: totalDueToday,
//       reviewedTodayCount: reviewedToday,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ success: false, message: "Error fetching due cards" });
//   }
// };
