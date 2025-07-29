import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "./context/StoreContext";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import axios from "axios";

const Create = () => {
  const [newCardData, setNewCardData] = useState({
    question: "",
    answer: "",
    deckId: "",
  });
  const { decks, url, token, cardsCountFunc } = useContext(StoreContext);
  const [isCreating, setIsCreating] = useState(false);
  const [selectedDeck, setSelectedDeck] = useState("");

  const handleCreateCard = async () => {
    if (
      !selectedDeck ||
      !newCardData.question.trim() ||
      !newCardData.answer.trim()
    ) {
      console.log("Please fill all required fields");
      return;
    }
    setIsCreating(true);
    const newUrl = `${url}/api/card/addCard`;
    try {
      const res = await axios.post(newUrl, newCardData, { headers: { token } });
      console.log("card added");
      setNewCardData({ question: "", answe: "", deckId: "" });
      setSelectedDeck("");
      await cardsCountFunc();
    } catch (error) {
      console.log(error);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Create New Study Card</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* deck selection */}
          <div>
            <Label htmlFor="deck" className="mb-2">
              Deck *{" "}
            </Label>
            <Select
              value={selectedDeck?._id || ""}
              onValueChange={(value) => {
                const deck = decks.find((d) => d._id === value);
                setSelectedDeck(deck);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a deck">
                  {selectedDeck?.deckName}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {decks.map((deck) => (
                  <SelectItem key={deck._id} value={deck._id}>
                    {deck.deckName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* question */}
          <div>
            <Label htmlFor="question" className="mb-2">
              Question *
            </Label>
            <Textarea
              id="question"
              placeholder="Enter your question here..."
              value={newCardData.question}
              onChange={(e) =>
                setNewCardData({ ...newCardData, question: e.target.value })
              }
              className="min-h-[100px]"
            />
          </div>
          {/* answer */}
          <div>
            <Label htmlFor="answer" className="mb-2">
              Answer *
            </Label>
            <Textarea
              id="answer"
              placeholder="Enter your answer here..."
              value={newCardData.answer}
              onChange={(e) =>
                setNewCardData({
                  ...newCardData,
                  answer: e.target.value,
                  deckId: selectedDeck._id,
                })
              }
              className="min-h-[100px]"
            />
          </div>
          {/* create button */}
          <Button
            onClick={handleCreateCard}
            className="w-full"
            disabled={isCreating}
            variant="animate"
          >
            {isCreating ? "Creating..." : "Create Card"}
          </Button>
        </CardContent>
      </Card>

      {/* quick tips */}
      <Card>
        <CardHeader>
          <CardTitle>💡 Tips for Better Cards</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>• Keep questions clear and specific</li>
            <li>• Use your own words in answers</li>
            <li>• Include context when needed</li>
            <li>• Break complex topics into smaller cards</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default Create;
