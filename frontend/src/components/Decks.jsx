import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "./context/StoreContext";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ArrowLeft, BookOpen, Plus, Trash2, X } from "lucide-react";
import axios from "axios";

const Decks = () => {
  const [newDeckData, setNewDeckData] = useState({
    deckName: "",
    deckDescription: "",
  });

  const { url, token, decks, fetchDecks, cardsCountFunc } =
    useContext(StoreContext);
  const [selectedDeck, setSelectedDeck] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [deckCards, setDeckCards] = useState([]);
  const DESCRIPTION_WORD_LIMIT = 6;

  useEffect(() => {
    fetchDecks();
  }, []);

  const handleCreateDeck = async () => {
    if (!newDeckData.deckName.trim()) {
      return;
    }
    const newUrl = `${url}/api/deck/addDeck`;
    try {
      const response = await axios.post(newUrl, newDeckData, {
        headers: { token },
      });
      console.log(response.data.message);
      setNewDeckData({ ...newDeckData, deckName: "", deckDescription: "" });
      await fetchDecks();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteDeck = async (id, deckName) => {
    if (
      !window.confirm(`Are you sure you want to delete the deck "${deckName}"`)
    )
      return;
    const newUrl = `${url}/api/deck/deleteDeck`;
    try {
      await axios.delete(newUrl, { headers: { token }, data: { id: id } });
      console.log(`Deck "${deckName} deleted`);
      await fetchDecks();
      await cardsCountFunc();
    } catch (error) {
      console.log(error);
    }
  };

  const displayCardsOfDeck = async (deck) => {
    setSelectedDeck(deck);
    setIsLoading(true);

    const deckId = deck._id;
    const newUrl = `${url}/api/card/cardList/${deckId}`;

    try {
      const response = await axios.get(newUrl, { headers: { token } });
      if (response.data.success) {
        setDeckCards(response.data.data || []);
      }
    } catch (error) {
      console.error("Failed to fetch cards: ", error);
      setDeckCards([]);
    } finally {
      setIsLoading(false);
    }
  };

  // const deleteCardFromDeck = async () => {
  //   // ------------------------------------
  // };

  const handleBackToDecks = async () => {
    setSelectedDeck(null);
    setDeckCards([]);
  };

  const handleUpdateCard = async () => {
    // ------------------------------------
  };

  const handleDeleteCard = async (cardId) => {
    if (!window.confirm("Are you sure you want to delete this card?")) return;
    try {
      const newUrl = `${url}/api/card/deleteCard/${cardId}`;
      await axios.delete(newUrl, { headers: { token } });
      console.log(`Card ${cardId} deleted`);
      await displayCardsOfDeck(selectedCard);
      await cardsCountFunc();
    } catch (error) {}
  };

  const handleOpenFullCard = async (card) => {
    setSelectedCard(card);
  };

  if (
    newDeckData.deckDescription.trim().split(/\s+/).length >
    DESCRIPTION_WORD_LIMIT
  ) {
    alert(`Description should not exceed ${DESCRIPTION_WORD_LIMIT} words.`);
  }

  if (selectedDeck) {
    return (
      <div className="space-y-6">
        {/* header with back button */}
        <div className="flex items-center space-x-4">
          <Button
            variant="animate"
            onClick={handleBackToDecks}
            className="cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Decks
          </Button>
          <div>
            <h2 className="text-2xl font-bold">{selectedDeck.deckName}</h2>
            <p className="text-gray-600">{deckCards.length}</p>
          </div>
        </div>

        {/* cards display */}
        {isLoading ? (
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-gray-600">Loading cards...</p>
            </CardContent>
          </Card>
        ) : deckCards.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-gray-600">
                No cards found in this deck
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {deckCards.map((card) => (
              <Card
                key={card._id}
                className="hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => handleOpenFullCard(card)}
                style={{ height: "220px" }}
              >
                <CardHeader className="pb-3 flex justify-between items-center">
                  <div className="flex space-x-1">
                    <Button
                      variant="animate"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteCard(card._id);
                      }}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2 overflow-hidden">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Question:</p>
                    <p className="text-base truncate whitespace-pre-wrap max-h-[50px] overflow-hidden">
                      {card.question}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Answer: </p>
                    <p className="text-base truncate whitespace-pre-wrap max-h-[50px] overflow-hidden">
                      {card.answer}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
            {selectedCard && (
              <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 backdrop-blur-[1px]">
                <div className="bg-gray-950 rounded-lg p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto relative">
                  <Button
                    variant="ghost"
                    onClick={() => setSelectedCard(null)}
                    className="absolute top-2 right-2 text-gray-300 hover:text-gray-700 cursor-pointer"
                  >
                    <X />
                  </Button>
                  <h3 className="text-xl font-bold mb-4">Card Details</h3>
                  <div className="space-y-4">
                    <p>
                      <strong>Question: </strong>
                      <span className="whitespace-pre-wrap break-words">
                        {selectedCard.question}
                      </span>
                    </p>
                    <p>
                      <strong>Answer: </strong>
                      <span className="whitespace-pre-wrap break-words">
                        {selectedCard.answer}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Create New Deck</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2">
            <div className="flex flex-col w-full">
              <Input
                placeholder="Enter deck name..."
                value={newDeckData.deckName}
                onChange={(e) =>
                  setNewDeckData({ ...newDeckData, deckName: e.target.value })
                }
                onKeyDown={(e) => e.key === "Enter" && handleCreateDeck()}
              />
              <Input
                placeholder="Enter Deck Description(optional)"
                className="mt-4"
                value={newDeckData.deckDescription}
                onChange={(e) => {
                  const input = e.target.value;
                  const wordCount = input.trim().split(/\s+/).length;
                  setNewDeckData({ ...newDeckData, deckDescription: input });
                }}
                onKeyDown={(e) => e.key === "Enter" && handleCreateDeck()}
              />
              <p className="text-xs text-gray-500 mt-1">
                {
                  newDeckData.deckDescription
                    .trim()
                    .split(/\s+/)
                    .filter(Boolean).length
                }{" "}
                /{DESCRIPTION_WORD_LIMIT}
              </p>
            </div>
            <Button onClick={handleCreateDeck} variant="animate">
              <Plus className="h-4 w-4" />
              Create
            </Button>
          </div>
        </CardContent>
      </Card>
      {/* displaying list of decks */}
      <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-6">
        {decks.map((deck) => (
          <Card key={deck._id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center">
                  <BookOpen className="h-5 w-5 text-indigo-600 mr-2" />
                  <CardTitle className="text-lg">{deck.deckName}</CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* stats */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Total Cards</p>
                  <p className="font-semibold text-lg">{deck.cardCount || 0}</p>
                </div>
                <div>
                  <p className="text-gray-600">Created</p>
                  <p className="font-semibold text-lg">
                    {new Date(deck.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* description */}
              {deck.deckDescription && (
                <p className="text-sm text-gray-600">{deck.deckDescription}</p>
              )}

              {/* action cards */}
              <div className="flex space-x-2 pt-2">
                <Button
                  size="sm"
                  className="flex-1 cursor-pointer"
                  onClick={() => displayCardsOfDeck(deck)}
                  variant="animate"
                >
                  View Cards
                </Button>
                <Button
                  size="sm"
                  variant="animate"
                  onClick={() => handleDeleteDeck(deck._id, deck.deckName)}
                  className="cursor-pointer"
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Decks;
