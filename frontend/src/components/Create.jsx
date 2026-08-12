import React, { useContext, useState } from "react";
import { StoreContext } from "./context/StoreContext";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
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
import {
  BookOpen,
  Lightbulb,
  Sparkles,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
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
      const res = await axios.post(newUrl, newCardData, {
        headers: { token },
      });

      console.log("card added");

      setNewCardData({
        question: "",
        answer: "",
        deckId: "",
      });

      setSelectedDeck("");

      await cardsCountFunc();
    } catch (error) {
      console.log(error);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-3xl space-y-5">

      {/* =====================================================
          CREATE CARD
      ====================================================== */}

      <Card
        className="
          relative
          overflow-hidden
          border-white/[0.08]
          bg-[#0B0B12]/80
          py-0
          shadow-[0_20px_70px_rgba(0,0,0,0.25)]
          backdrop-blur-xl
        "
      >

        {/* Ambient glow */}
        <div className="pointer-events-none absolute -right-32 -top-32 h-72 w-72 rounded-full bg-violet-600/[0.08] blur-[110px]" />

        <div className="pointer-events-none absolute -bottom-32 -left-32 h-64 w-64 rounded-full bg-indigo-600/[0.05] blur-[100px]" />

        {/* Header */}

        <CardHeader className="relative border-b border-white/[0.06] px-6 py-6 sm:px-8">

          <div className="flex items-start gap-4">

            <div
              className="
                flex
                h-11
                w-11
                shrink-0
                items-center
                justify-center
                rounded-xl
                border
                border-violet-500/20
                bg-violet-500/[0.08]
                text-violet-400
                shadow-[0_0_25px_rgba(124,58,237,0.08)]
              "
            >
              <Sparkles className="h-5 w-5" />
            </div>

            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-violet-400">
                Learning workspace
              </p>

              <CardTitle className="mt-1 text-xl font-semibold text-white sm:text-2xl">
                Create a study card
              </CardTitle>

              <p className="mt-1.5 text-sm leading-6 text-gray-500">
                Turn what you learn into a card you can review later.
              </p>
            </div>

          </div>

        </CardHeader>


        {/* Form */}

        <CardContent className="relative space-y-6 px-6 py-7 sm:px-8">

          {/* Deck */}

          <div className="space-y-2">

            <Label
              htmlFor="deck"
              className="flex items-center gap-1.5 text-sm font-medium text-gray-300"
            >
              <BookOpen className="h-3.5 w-3.5 text-violet-400" />
              Deck
              <span className="text-violet-400">*</span>
            </Label>

            <Select
              value={selectedDeck?._id || ""}
              onValueChange={(value) => {
                const deck = decks.find((d) => d._id === value);
                setSelectedDeck(deck);
              }}
            >

              <SelectTrigger
                className="
                  h-11
                  border-white/[0.09]
                  bg-white/[0.025]
                  text-gray-300
                  transition-all
                  hover:border-violet-500/30
                  hover:bg-violet-500/[0.025]
                  focus:ring-violet-500/20
                "
              >
                <SelectValue placeholder="Select a deck">
                  {selectedDeck?.deckName}
                </SelectValue>
              </SelectTrigger>

              <SelectContent
                className="
                  border-white/[0.08]
                  bg-[#101018]
                  text-white
                "
              >
                {decks.map((deck) => (
                  <SelectItem
                    key={deck._id}
                    value={deck._id}
                    className="
                      cursor-pointer
                      focus:bg-violet-500/[0.12]
                      focus:text-white
                    "
                  >
                    {deck.deckName}
                  </SelectItem>
                ))}
              </SelectContent>

            </Select>

            <p className="text-xs text-gray-600">
              Choose where this card will be stored.
            </p>

          </div>


          {/* Question */}

          <div className="space-y-2">

            <div className="flex items-center justify-between">

              <Label
                htmlFor="question"
                className="text-sm font-medium text-gray-300"
              >
                Question <span className="text-violet-400">*</span>
              </Label>

              <span className="text-[11px] text-gray-600">
                Prompt
              </span>

            </div>

            <Textarea
              id="question"
              placeholder="What do you want to remember?"
              value={newCardData.question}
              onChange={(e) =>
                setNewCardData({
                  ...newCardData,
                  question: e.target.value,
                })
              }
              className="
                min-h-[125px]
                resize-none
                rounded-xl
                border-white/[0.09]
                bg-white/[0.025]
                px-4
                py-3.5
                text-sm
                leading-6
                text-gray-200
                placeholder:text-gray-600
                transition-all
                focus:border-violet-500/40
                focus:ring-2
                focus:ring-violet-500/10
                hover:border-white/[0.14]
              "
            />

          </div>


          {/* Answer */}

          <div className="space-y-2">

            <div className="flex items-center justify-between">

              <Label
                htmlFor="answer"
                className="text-sm font-medium text-gray-300"
              >
                Answer <span className="text-violet-400">*</span>
              </Label>

              <span className="text-[11px] text-gray-600">
                Explanation
              </span>

            </div>

            <Textarea
              id="answer"
              placeholder="Write the answer in your own words..."
              value={newCardData.answer}
              onChange={(e) =>
                setNewCardData({
                  ...newCardData,
                  answer: e.target.value,
                  deckId: selectedDeck._id,
                })
              }
              className="
                min-h-[125px]
                resize-none
                rounded-xl
                border-white/[0.09]
                bg-white/[0.025]
                px-4
                py-3.5
                text-sm
                leading-6
                text-gray-200
                placeholder:text-gray-600
                transition-all
                focus:border-violet-500/40
                focus:ring-2
                focus:ring-violet-500/10
                hover:border-white/[0.14]
              "
            />

          </div>


          {/* Divider */}

          <div className="h-px bg-white/[0.06]" />


          {/* Create button */}

          <Button
            onClick={handleCreateCard}
            disabled={isCreating}
            variant="animate"
            className="
              h-11
              w-full
              gap-2
              font-medium
              shadow-[0_8px_30px_rgba(124,58,237,0.15)]
            "
          >
            {isCreating ? (
              <>
                Creating...
              </>
            ) : (
              <>
                Create Card
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </Button>

        </CardContent>
      </Card>


      {/* =====================================================
          QUICK TIPS
      ====================================================== */}

      <Card
        className="
          relative
          overflow-hidden
          border-white/[0.07]
          bg-white/[0.015]
          py-0
          backdrop-blur-xl
        "
      >

        <CardContent className="px-6 py-5 sm:px-7">

          <div className="flex items-start gap-4">

            <div
              className="
                flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center
                rounded-lg
                border
                border-amber-500/15
                bg-amber-500/[0.06]
                text-amber-400
              "
            >
              <Lightbulb className="h-4 w-4" />
            </div>

            <div className="min-w-0">

              <h3 className="text-sm font-semibold text-gray-200">
                Tips for better cards
              </h3>

              <div className="mt-3 grid gap-x-8 gap-y-2 text-xs text-gray-500 sm:grid-cols-2">

                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-violet-400" />
                  Keep questions clear and specific
                </div>

                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-violet-400" />
                  Use your own words in answers
                </div>

                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-violet-400" />
                  Include context when needed
                </div>

                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-violet-400" />
                  Break complex topics into smaller cards
                </div>

              </div>

            </div>

          </div>

        </CardContent>

      </Card>

    </div>
  );
};

export default Create;