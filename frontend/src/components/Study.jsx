import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "./context/StoreContext";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";
import { Eye } from "lucide-react";
import { Button } from "./ui/button";
import axios from "axios";

const Study = () => {
  const { url, token, dueCardsFunc } = useContext(StoreContext);
  const [dueCards, setDueCards] = useState([]);
  const [totalTodayCount, setTotalTodayCount] = useState(0);
  const [reviewedTodayCount, setReviewedTodayCount] = useState(0);
  const [progress, setProgress] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    fetchDueCards();
    dueCardsFunc();
  }, []);

  const fetchDueCards = async () => {
    try {
      const response = await axios.get(`${url}/api/card/due`, {
        headers: { token },
      });
      console.log("fetchDueCards executed")
      console.log(response.data)
      if (response.data.success) {
        const cards = response.data.data;
        console.log(response.data.data)
        const total = response.data.totalTodayCount;
        const reviewed = response.data.reviewedTodayCount;

        setDueCards(cards);
        setTotalTodayCount(total);
        setReviewedTodayCount(reviewed);

        const progressVal = total > 0 ? (reviewed / total) * 100 : 100;
        setProgress(progressVal);

        setCurrentIndex(0);
        setShowAnswer(false);
      } else {
        console.log("error in fetchDueCards")
      }
    } catch (error) {
      console.error("Error fetching due cards", error);
    }
  };
  

  const handleAnswer = async (rating) => {
    if (!currentCard) return;

    try {
      await axios.put(
        `${url}/api/card/updateCard`,
        { cardId: currentCard._id, quality: rating },
        { headers: { token } }
      );

      const nextIndex = currentIndex + 1;
      if (nextIndex >= dueCards.length) {
        await fetchDueCards(); // Will reset progress + reviewedTodayCount
      } else {
        setCurrentIndex(nextIndex);
        setReviewedTodayCount((prev) => prev + 1);

        const progressVal =
          totalTodayCount > 0
            ? ((reviewedTodayCount + 1) / totalTodayCount) * 100
            : 100;
        setProgress(progressVal);
        setShowAnswer(false);
      }

      dueCardsFunc();
    } catch (error) {
      console.error("Error submitting review", error);
    }
  };
  const currentCard = dueCards[currentIndex];
  if (!currentCard) {
    return (
      <Card className="p-6 text-center">
        <p className="text-lg">No due cards</p>
        <Button variant="animate" onClick={fetchDueCards} className="mt-4">
          Refresh
        </Button>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* progress */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">Progress</span>
            <span className="text-sm text-gray-600">
              {reviewedTodayCount}/{totalTodayCount} cards reviewed
            </span>
          </div>
          <Progress value={progress} className="w-full" />
        </CardContent>
      </Card>

      {/* study card */}
      <Card className="min-h-[400px]">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Study Card</CardTitle>
            <span className="text-sm bg-blue-100 text-indigo-800 px-2 py-1 rounded">
              Deck Card
            </span>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center py-8">
            <h3 className="text-xl font-medium mb-4">Question: </h3>
            <p className="text-lg text-white">{currentCard.question}</p>
          </div>

          {!showAnswer ? (
            <div className="text-center">
              <Button onClick={() => setShowAnswer(true)} variant="animate">
                <Eye className="h-4 w-4 mr-2" />
                Show Answer
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="text-center py-4 bg-transparent rounded-lg">
                <h3 className="text-xl font-medium mb-4 text-green-800">
                  Answer:{" "}
                </h3>
                <p className="text-lg text-white">{currentCard.answer}</p>
              </div>

              <div>
                <h4 className="text-lg font-medium mb-4 text-center">
                  How well did you remember this?
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  <Button
                    variant="outline"
                    onClick={() => handleAnswer(0)}
                    className="text-red-600 border-red-200 hover:text-red-600 bg-gray-950 hover:bg-gray-900"
                  >
                    Forgot
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleAnswer(2)}
                    className="text-orange-600 border-orange-200 hover:text-orange-600 bg-gray-950 hover:bg-gray-900"
                  >
                    Hard
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleAnswer(3)}
                    className="text-blue-600 border-blue-200 hover:text-blue-600 bg-gray-950 hover:bg-gray-900"
                  >
                    Good
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleAnswer(5)}
                    className="text-green-600 border-green-200 hover:text-green-600 bg-gray-950 hover:bg-gray-900"
                  >
                    Easy
                  </Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Study;
