// import React, { useContext, useEffect, useState } from "react";
// import { StoreContext } from "./context/StoreContext";
// import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
// import { Progress } from "./ui/progress";
// import { Eye } from "lucide-react";
// import { Button } from "./ui/button";
// import axios from "axios";

// const Study = () => {
//   const { url, token, dueCardsFunc } = useContext(StoreContext);
//   const [dueCards, setDueCards] = useState([]);
//   const [totalTodayCount, setTotalTodayCount] = useState(0);
//   const [reviewedTodayCount, setReviewedTodayCount] = useState(0);
//   const [progress, setProgress] = useState(0);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [showAnswer, setShowAnswer] = useState(false);

//   useEffect(() => {
//     fetchDueCards();
//     dueCardsFunc();
//   }, []);

//   const fetchDueCards = async () => {
//     try {
//       const response = await axios.get(`${url}/api/card/due`, {
//         headers: { token },
//       });
//       console.log("fetchDueCards executed")
//       console.log(response.data)
//       if (response.data.success) {
//         const cards = response.data.data;
//         console.log(response.data.data)
//         const total = response.data.totalTodayCount;
//         const reviewed = response.data.reviewedTodayCount;

//         setDueCards(cards);
//         setTotalTodayCount(total);
//         setReviewedTodayCount(reviewed);

//         const progressVal = total > 0 ? (reviewed / total) * 100 : 100;
//         setProgress(progressVal);

//         setCurrentIndex(0);
//         setShowAnswer(false);
//       } else {
//         console.log("error in fetchDueCards")
//       }
//     } catch (error) {
//       console.error("Error fetching due cards", error);
//     }
//   };


//   const handleAnswer = async (rating) => {
//     if (!currentCard) return;

//     try {
//       await axios.put(
//         `${url}/api/card/updateCard`,
//         { cardId: currentCard._id, quality: rating },
//         { headers: { token } }
//       );

//       const nextIndex = currentIndex + 1;
//       if (nextIndex >= dueCards.length) {
//         await fetchDueCards(); // Will reset progress + reviewedTodayCount
//       } else {
//         setCurrentIndex(nextIndex);
//         setReviewedTodayCount((prev) => prev + 1);

//         const progressVal =
//           totalTodayCount > 0
//             ? ((reviewedTodayCount + 1) / totalTodayCount) * 100
//             : 100;
//         setProgress(progressVal);
//         setShowAnswer(false);
//       }

//       dueCardsFunc();
//     } catch (error) {
//       console.error("Error submitting review", error);
//     }
//   };
//   const currentCard = dueCards[currentIndex];
//   if (!currentCard) {
//     return (
//       <Card className="p-6 text-center">
//         <p className="text-lg">No due cards</p>
//         <Button variant="animate" onClick={fetchDueCards} className="mt-4">
//           Refresh
//         </Button>
//       </Card>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       {/* progress */}
//       <Card>
//         <CardContent className="pt-6">
//           <div className="flex justify-between items-center mb-2">
//             <span className="text-sm text-gray-600">Progress</span>
//             <span className="text-sm text-gray-600">
//               {reviewedTodayCount}/{totalTodayCount} cards reviewed
//             </span>
//           </div>
//           <Progress value={progress} className="w-full" />
//         </CardContent>
//       </Card>

//       {/* study card */}
//       <Card className="min-h-[400px]">
//         <CardHeader>
//           <div className="flex justify-between items-center">
//             <CardTitle>Study Card</CardTitle>
//             <span className="text-sm bg-blue-100 text-indigo-800 px-2 py-1 rounded">
//               Deck Card
//             </span>
//           </div>
//         </CardHeader>
//         <CardContent className="space-y-6">
//           <div className="text-center py-8">
//             <h3 className="text-xl font-medium mb-4">Question: </h3>
//             <p className="text-lg text-white">{currentCard.question}</p>
//           </div>

//           {!showAnswer ? (
//             <div className="text-center">
//               <Button onClick={() => setShowAnswer(true)} variant="animate">
//                 <Eye className="h-4 w-4 mr-2" />
//                 Show Answer
//               </Button>
//             </div>
//           ) : (
//             <div className="space-y-6">
//               <div className="text-center py-4 bg-transparent rounded-lg">
//                 <h3 className="text-xl font-medium mb-4 text-green-800">
//                   Answer:{" "}
//                 </h3>
//                 <p className="text-lg text-white">{currentCard.answer}</p>
//               </div>

//               <div>
//                 <h4 className="text-lg font-medium mb-4 text-center">
//                   How well did you remember this?
//                 </h4>
//                 <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
//                   <Button
//                     variant="outline"
//                     onClick={() => handleAnswer(0)}
//                     className="text-red-600 border-red-200 hover:text-red-600 bg-gray-950 hover:bg-gray-900"
//                   >
//                     Forgot
//                   </Button>
//                   <Button
//                     variant="outline"
//                     onClick={() => handleAnswer(2)}
//                     className="text-orange-600 border-orange-200 hover:text-orange-600 bg-gray-950 hover:bg-gray-900"
//                   >
//                     Hard
//                   </Button>
//                   <Button
//                     variant="outline"
//                     onClick={() => handleAnswer(3)}
//                     className="text-blue-600 border-blue-200 hover:text-blue-600 bg-gray-950 hover:bg-gray-900"
//                   >
//                     Good
//                   </Button>
//                   <Button
//                     variant="outline"
//                     onClick={() => handleAnswer(5)}
//                     className="text-green-600 border-green-200 hover:text-green-600 bg-gray-950 hover:bg-gray-900"
//                   >
//                     Easy
//                   </Button>
//                 </div>
//               </div>
//             </div>
//           )}
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default Study;



import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "./context/StoreContext";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";
import { Eye, Sparkles, Brain, RotateCcw } from "lucide-react";
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

      console.log("fetchDueCards executed");
      console.log(response.data);

      if (response.data.success) {
        const cards = response.data.data;
        console.log(response.data.data);

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
        console.log("error in fetchDueCards");
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
        await fetchDueCards();
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
      <Card
        className="
          relative
          overflow-hidden
          border-white/[0.08]
          bg-[#0B0B12]/80
          py-0
          shadow-[0_20px_60px_rgba(0,0,0,0.25)]
          backdrop-blur-xl
        "
      >
        {/* Ambient glow */}
        <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-violet-600/[0.08] blur-[100px]" />

        <CardContent className="relative flex min-h-[300px] flex-col items-center justify-center px-6 py-12 text-center">
          <div
            className="
              mb-5
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-2xl
              border
              border-violet-500/20
              bg-violet-500/[0.08]
              text-violet-400
              shadow-[0_0_25px_rgba(124,58,237,0.10)]
            "
          >
            <Brain className="h-6 w-6" />
          </div>

          <p className="text-lg font-semibold text-white">
            You're all caught up
          </p>

          <p className="mt-2 max-w-sm text-sm leading-6 text-gray-500">
            No cards are waiting for review right now. Come back later to
            continue your learning session.
          </p>

          <Button
            variant="glass"
            onClick={fetchDueCards}
            className="mt-6 gap-2"
          >
            <RotateCcw className="h-4 w-4" />
            Refresh
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-5">

      {/* =====================================================
          PROGRESS
      ====================================================== */}

      <Card
        className="
          relative
          overflow-hidden
          border-white/[0.08]
          bg-[#0B0B12]/75
          py-0
          backdrop-blur-xl
        "
      >
        <CardContent className="relative px-5 py-4 sm:px-6">

          <div className="mb-3 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-violet-500/20 bg-violet-500/[0.08]">
                <Sparkles className="h-3.5 w-3.5 text-violet-400" />
              </div>

              <span className="text-sm font-medium text-gray-300">
                Today's progress
              </span>
            </div>

            <span className="text-xs text-gray-500">
              {reviewedTodayCount}/{totalTodayCount} cards reviewed
            </span>
          </div>

          <Progress
            value={progress}
            className="h-2 bg-white/[0.06]"
          />

          <div className="mt-2 flex justify-between text-[11px] text-gray-600">
            <span>Keep going</span>
            <span>{Math.round(progress)}%</span>
          </div>

        </CardContent>
      </Card>


      {/* =====================================================
          STUDY CARD
      ====================================================== */}

      <Card
        className="
          relative
          min-h-[430px]
          overflow-hidden
          border-white/[0.08]
          bg-[#0B0B12]/80
          py-0
          shadow-[0_20px_70px_rgba(0,0,0,0.28)]
          backdrop-blur-xl
        "
      >

        {/* Ambient background glow */}
        <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-[500px] -translate-x-1/2 rounded-full bg-violet-600/[0.06] blur-[100px]" />

        <CardHeader className="relative border-b border-white/[0.06] px-5 py-4 sm:px-7">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-violet-400">
                Learning session
              </p>

              <CardTitle className="mt-1 text-lg text-white">
                Study Card
              </CardTitle>
            </div>

            <div
              className="
                rounded-full
                border
                border-violet-500/20
                bg-violet-500/[0.07]
                px-3
                py-1.5
                text-xs
                font-medium
                text-violet-300
              "
            >
              Card {currentIndex + 1}
            </div>

          </div>

        </CardHeader>


        <CardContent className="relative px-5 py-8 sm:px-10">

          {/* Question */}

          <div className="mx-auto max-w-3xl text-center">

            <span
              className="
                inline-flex
                rounded-full
                border
                border-white/[0.07]
                bg-white/[0.025]
                px-3
                py-1
                text-[11px]
                font-medium
                uppercase
                tracking-[0.15em]
                text-gray-500
              "
            >
              Question
            </span>

            <div className="mt-6 min-h-[100px]">
              <p className="text-lg leading-8 text-gray-200 sm:text-xl">
                {currentCard.question}
              </p>
            </div>

          </div>


          {/* Show Answer */}

          {!showAnswer ? (

            <div className="mt-8 flex justify-center">

              <Button
                onClick={() => setShowAnswer(true)}
                variant="animate"
                className="gap-2 px-6"
              >
                <Eye className="h-4 w-4" />
                Show Answer
              </Button>

            </div>

          ) : (

            <div className="mt-8 space-y-8">

              {/* Answer */}

              <div
                className="
                  mx-auto
                  max-w-3xl
                  rounded-2xl
                  border
                  border-violet-500/15
                  bg-violet-500/[0.035]
                  px-5
                  py-6
                  text-center
                  shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]
                "
              >

                <span
                  className="
                    inline-flex
                    rounded-full
                    border
                    border-violet-500/20
                    bg-violet-500/[0.08]
                    px-3
                    py-1
                    text-[11px]
                    font-medium
                    uppercase
                    tracking-[0.15em]
                    text-violet-300
                  "
                >
                  Answer
                </span>

                <p className="mt-5 text-base leading-7 text-gray-200 sm:text-lg">
                  {currentCard.answer}
                </p>

              </div>


              {/* Rating */}

              <div>

                <div className="mb-4 text-center">

                  <p className="text-sm font-medium text-gray-300">
                    How well did you remember this?
                  </p>

                  <p className="mt-1 text-xs text-gray-600">
                    Rate your recall to personalize future reviews
                  </p>

                </div>


                <div className="grid grid-cols-2 gap-3 md:grid-cols-4">

                  <Button
                    variant="outline"
                    onClick={() => handleAnswer(0)}
                    className="
                      h-11
                      border-red-500/20
                      bg-red-500/[0.03]
                      text-red-400
                      hover:border-red-500/40
                      hover:bg-red-500/[0.08]
                      hover:text-red-300
                    "
                  >
                    Forgot
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() => handleAnswer(2)}
                    className="
                      h-11
                      border-orange-500/20
                      bg-orange-500/[0.03]
                      text-orange-400
                      hover:border-orange-500/40
                      hover:bg-orange-500/[0.08]
                      hover:text-orange-300
                    "
                  >
                    Hard
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() => handleAnswer(3)}
                    className="
                      h-11
                      border-blue-500/20
                      bg-blue-500/[0.03]
                      text-blue-400
                      hover:border-blue-500/40
                      hover:bg-blue-500/[0.08]
                      hover:text-blue-300
                    "
                  >
                    Good
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() => handleAnswer(5)}
                    className="
                      h-11
                      border-emerald-500/20
                      bg-emerald-500/[0.03]
                      text-emerald-400
                      hover:border-emerald-500/40
                      hover:bg-emerald-500/[0.08]
                      hover:text-emerald-300
                    "
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