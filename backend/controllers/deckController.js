import cardModel from "../models/cardModel.js";
import deckModel from "../models/deckModel.js";

// deckList

export const deckList = async (req, res) => {
  try {
    const userId = req.userId;

    const decks = await deckModel.find({ userId });
    const decksWithCardCount = await Promise.all(
      decks.map(async (deck) => {
        const count = await cardModel.countDocuments({ deckId: deck._id });
        return { ...deck.toObject(), cardCount: count };
      })
    );
    res.json({ success: true, data: decksWithCardCount });
  } catch (error) {
    console.error("Error fetching deck list:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching deck list",
    });
  }
};

// addDeck
export const addDeck = async (req, res) => {
  const { deckName, deckDescription } = req.body;
  const userId = req.userId;

  if (!deckName || !userId) {
    return res
      .status(400)
      .json({ success: false, message: "Deck name and user ID are required" });
  }
  const exists = await deckModel.findOne({ deckName, userId });
  if (exists) {
    return res.json({
      success: false,
      message: `You already have deck named "${deckName}".`,
    });
  }
  try {
    const deck = new deckModel({
      deckName,
      deckDescription,
      userId,
    });

    await deck.save();
    console.log("Deck created successfully", deck._id);
    res.json({
      success: true,
      message: "Deck added successfully",
      deckId: deck._id,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Error in addDeck try block" });
  }
};

// updateDeck

export const updateDeck = async (req, res) => {
  try {
    const { id, ...updates } = req.body;

    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "Deck ID is required" });
    }

    const deck = await deckModel.findByIdAndUpdate(id, updates, { new: true });

    if (!deck) {
      return res
        .status(404)
        .json({ success: false, message: "Deck not found" });
    }

    res.json({ success: true, message: "Deck updated successfully", deck });
  } catch (error) {
    console.error("Error updating deck:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error while updating deck" });
  }
};

// deleteDeck
export const deleteDeck = async (req, res) => {
  try {
    const { id: deckId } = req.body;

    if (!deckId) {
      return res
        .status(400)
        .json({ success: false, message: "Deck ID is required" });
    }

    const deck = await deckModel.findByIdAndDelete(deckId);

    if (!deck) {
      return res
        .status(404)
        .json({ success: false, message: "Deck not found" });
    }

    // delete all the cards in the deck
    await cardModel.deleteMany({ deckId });

    res.json({
      success: true,
      message: "Deck and its cards deleted successfully",
    });
  } catch (error) {
    console.log("Error deleting deck and its cards:", error);
    res.status(500).json({
      success: false,
      message: "Server error while deleting deck and its cards",
    });
  }
};

// getDeckCount

export const getDeckCount = async (req, res) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const count = await deckModel.countDocuments({ userId });
    res.json({ success: true, count });
  } catch (error) {
    console.log("Error fetching deck count: ", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching deck count",
    });
  }
};
