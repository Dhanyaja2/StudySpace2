import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "./context/StoreContext";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Plus,
  Trash2,
  X,
  Layers3,
  CalendarDays,
  Sparkles,
} from "lucide-react";
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

      setNewDeckData({
        ...newDeckData,
        deckName: "",
        deckDescription: "",
      });

      await fetchDecks();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteDeck = async (id, deckName) => {
    if (
      !window.confirm(
        `Are you sure you want to delete the deck "${deckName}"`
      )
    )
      return;

    const newUrl = `${url}/api/deck/deleteDeck`;

    try {
      await axios.delete(newUrl, {
        headers: { token },
        data: { id: id },
      });

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
      const response = await axios.get(newUrl, {
        headers: { token },
      });

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

      await axios.delete(newUrl, {
        headers: { token },
      });

      console.log(`Card ${cardId} deleted`);

      await displayCardsOfDeck(selectedCard);
      await cardsCountFunc();
    } catch (error) { }
  };

  const handleOpenFullCard = async (card) => {
    setSelectedCard(card);
  };

  if (
    newDeckData.deckDescription.trim().split(/\s+/).length >
    DESCRIPTION_WORD_LIMIT
  ) {
    alert(
      `Description should not exceed ${DESCRIPTION_WORD_LIMIT} words.`
    );
  }

  /* =========================================================
     SELECTED DECK
  ========================================================= */

  if (selectedDeck) {
    return (
      <div className="space-y-8">
        {/* Header */}
        <div className="relative overflow-hidden rounded-3xl border border-white/[0.07] bg-[#0b0b10]/80 px-6 py-6 shadow-[0_20px_60px_rgba(0,0,0,0.28)] backdrop-blur-xl">
          <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-violet-600/10 blur-3xl" />

          <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                onClick={handleBackToDecks}
                className="
                  h-10 w-10 cursor-pointer rounded-xl
                  border border-white/[0.08]
                  bg-white/[0.03]
                  p-0
                  text-gray-400
                  transition-all
                  hover:border-violet-500/30
                  hover:bg-violet-500/10
                  hover:text-violet-300
                "
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>

              <div>
                <div className="mb-1 flex items-center gap-2">
                  <Layers3 className="h-4 w-4 text-violet-400" />

                  <span className="text-xs font-medium uppercase tracking-[0.18em] text-violet-400">
                    Study deck
                  </span>
                </div>

                <h2 className="text-2xl font-semibold tracking-tight text-white">
                  {selectedDeck.deckName}
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  {deckCards.length}{" "}
                  {deckCards.length === 1 ? "card" : "cards"} in this deck
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.025] px-4 py-2">
              <BookOpen className="h-4 w-4 text-violet-400" />

              <span className="text-sm text-gray-400">
                {deckCards.length} cards
              </span>
            </div>
          </div>
        </div>

        {/* Cards section */}
        {isLoading ? (
          <Card
            className="
              overflow-hidden rounded-3xl
              border border-white/[0.07]
              bg-[#0b0b10]/80
              shadow-[0_20px_60px_rgba(0,0,0,0.25)]
            "
          >
            <CardContent className="flex min-h-[260px] items-center justify-center">
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-violet-500/20 bg-violet-500/[0.08]">
                  <Sparkles className="h-5 w-5 animate-pulse text-violet-400" />
                </div>

                <p className="text-sm font-medium text-gray-300">
                  Loading cards...
                </p>

                <p className="mt-1 text-xs text-gray-600">
                  Preparing your study deck
                </p>
              </div>
            </CardContent>
          </Card>
        ) : deckCards.length === 0 ? (
          <Card
            className="
              overflow-hidden rounded-3xl
              border border-white/[0.07]
              bg-[#0b0b10]/80
              shadow-[0_20px_60px_rgba(0,0,0,0.25)]
            "
          >
            <CardContent className="flex min-h-[300px] items-center justify-center">
              <div className="max-w-sm text-center">
                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-violet-500/20 bg-violet-500/[0.08] shadow-[0_0_30px_rgba(124,58,237,0.08)]">
                  <BookOpen className="h-6 w-6 text-violet-400" />
                </div>

                <h3 className="text-lg font-semibold text-white">
                  No cards yet
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  This deck doesn't have any study cards yet. Create your
                  first card to start building your learning system.
                </p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {deckCards.map((card) => (
              <Card
                key={card._id}
                className="
                  group relative cursor-pointer overflow-hidden
                  rounded-2xl
                  border border-white/[0.07]
                  bg-[#0b0b10]/85
                  shadow-[0_12px_35px_rgba(0,0,0,0.22)]
                  transition-all duration-300
                  hover:-translate-y-1
                  hover:border-violet-500/25
                  hover:bg-[#0e0b16]
                  hover:shadow-[0_18px_45px_rgba(0,0,0,0.35)]
                "
                onClick={() => handleOpenFullCard(card)}
                style={{ height: "220px" }}
              >
                <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-violet-600/[0.06] blur-2xl transition-all duration-300 group-hover:bg-violet-600/[0.12]" />

                <CardHeader className="relative flex flex-row items-center justify-between pb-3">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-violet-500/15 bg-violet-500/[0.07]">
                      <BookOpen className="h-3.5 w-3.5 text-violet-400" />
                    </div>

                    <span className="text-xs font-medium uppercase tracking-wider text-gray-600">
                      Study card
                    </span>
                  </div>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteCard(card._id);
                    }}
                    className="
                      h-8 w-8 cursor-pointer rounded-lg
                      border border-transparent
                      text-gray-600
                      transition-all
                      hover:border-red-500/20
                      hover:bg-red-500/[0.08]
                      hover:text-red-400
                    "
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </CardHeader>

                <CardContent className="relative space-y-4 overflow-hidden">
                  <div>
                    <p className="mb-1.5 text-[11px] font-medium uppercase tracking-wider text-violet-400/80">
                      Question
                    </p>

                    <p className="truncate whitespace-pre-wrap text-sm leading-6 text-gray-200">
                      {card.question}
                    </p>
                  </div>

                  <div className="h-px bg-white/[0.05]" />

                  <div>
                    <p className="mb-1.5 text-[11px] font-medium uppercase tracking-wider text-violet-400/80">
                      Answer
                    </p>

                    <p className="truncate whitespace-pre-wrap text-sm leading-6 text-gray-400">
                      {card.answer}
                    </p>
                  </div>

                  <div className="absolute bottom-3 right-4 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                    <ArrowRight className="h-4 w-4 text-violet-400" />
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Full card modal */}
            {selectedCard && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-md">
                <div
                  className="
                    relative w-full max-w-lg overflow-hidden
                    rounded-3xl
                    border border-violet-500/15
                    bg-[#0b0b12]
                    shadow-[0_30px_100px_rgba(0,0,0,0.65)]
                  "
                >
                  <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-violet-600/10 blur-3xl" />

                  <div className="relative border-b border-white/[0.07] px-6 py-5">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-violet-500/20 bg-violet-500/[0.08]">
                          <BookOpen className="h-4 w-4 text-violet-400" />
                        </div>

                        <div>
                          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-violet-400">
                            Study card
                          </p>

                          <h3 className="mt-1 text-lg font-semibold text-white">
                            Card Details
                          </h3>
                        </div>
                      </div>

                      <Button
                        variant="ghost"
                        onClick={() => setSelectedCard(null)}
                        className="
                          h-9 w-9 rounded-xl p-0
                          text-gray-500
                          hover:bg-white/[0.05]
                          hover:text-white
                        "
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="relative max-h-[70vh] space-y-6 overflow-y-auto px-6 py-6">
                    <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5">
                      <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.15em] text-violet-400">
                        Question
                      </p>

                      <p className="whitespace-pre-wrap break-words text-sm leading-7 text-gray-200">
                        {selectedCard.question}
                      </p>
                    </div>

                    <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5">
                      <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.15em] text-violet-400">
                        Answer
                      </p>

                      <p className="whitespace-pre-wrap break-words text-sm leading-7 text-gray-300">
                        {selectedCard.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  /* =========================================================
     DECK LIST
  ========================================================= */

  return (
    <div className="space-y-8">
      {/* Create deck */}
      <Card
        className="
          relative overflow-hidden rounded-3xl
          border border-white/[0.07]
          bg-[#0b0b10]/85
          shadow-[0_20px_60px_rgba(0,0,0,0.28)]
        "
      >
        <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-violet-600/[0.08] blur-3xl" />

        <CardHeader className="relative border-b border-white/[0.06] px-6 py-6">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-violet-500/20 bg-violet-500/[0.08] shadow-[0_0_25px_rgba(124,58,237,0.08)]">
              <Plus className="h-5 w-5 text-violet-400" />
            </div>

            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-violet-400">
                Learning workspace
              </p>

              <CardTitle className="mt-1 text-xl font-semibold tracking-tight text-white">
                Create a new deck
              </CardTitle>

              <p className="mt-1 text-sm text-gray-500">
                Organize your knowledge into focused learning collections.
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="relative p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start">
            <div className="flex w-full flex-col gap-4">
              <div>
                <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-gray-500">
                  Deck name
                </label>

                <Input
                  placeholder="e.g. JavaScript Fundamentals"
                  value={newDeckData.deckName}
                  onChange={(e) =>
                    setNewDeckData({
                      ...newDeckData,
                      deckName: e.target.value,
                    })
                  }
                  onKeyDown={(e) =>
                    e.key === "Enter" && handleCreateDeck()
                  }
                  className="
                    h-11 rounded-xl
                    border-white/[0.09]
                    bg-white/[0.025]
                    text-white
                    placeholder:text-gray-600
                    transition-all
                    focus:border-violet-500/40
                    focus:ring-2
                    focus:ring-violet-500/10
                  "
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-gray-500">
                  Description
                  <span className="ml-2 normal-case tracking-normal text-gray-700">
                    optional
                  </span>
                </label>

                <Input
                  placeholder="What are you learning?"
                  className="
                    h-11 rounded-xl
                    border-white/[0.09]
                    bg-white/[0.025]
                    text-white
                    placeholder:text-gray-600
                    transition-all
                    focus:border-violet-500/40
                    focus:ring-2
                    focus:ring-violet-500/10
                  "
                  value={newDeckData.deckDescription}
                  onChange={(e) => {
                    const input = e.target.value;
                    const wordCount = input.trim().split(/\s+/).length;

                    setNewDeckData({
                      ...newDeckData,
                      deckDescription: input,
                    });
                  }}
                  onKeyDown={(e) =>
                    e.key === "Enter" && handleCreateDeck()
                  }
                />

                <div className="mt-1.5 flex justify-end">
                  <p className="text-[11px] text-gray-600">
                    {
                      newDeckData.deckDescription
                        .trim()
                        .split(/\s+/)
                        .filter(Boolean).length
                    }{" "}
                    / {DESCRIPTION_WORD_LIMIT} words
                  </p>
                </div>
              </div>
            </div>

            <Button
              onClick={handleCreateDeck}
              variant="animate"
              className="
                h-11 w-full shrink-0 rounded-xl
                lg:mt-7 lg:w-auto lg:min-w-[130px]
              "
            >
              <Plus className="h-4 w-4" />
              Create
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Deck section heading */}
      <div className="flex items-end justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-violet-400">
            Your collection
          </p>

          <h2 className="mt-1 text-xl font-semibold tracking-tight text-white">
            My study decks
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Keep your subjects organized and ready to review.
          </p>
        </div>

        <div className="hidden items-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.025] px-3 py-2 sm:flex">
          <Layers3 className="h-4 w-4 text-violet-400" />
          <span className="text-xs text-gray-500">
            {decks.length} {decks.length === 1 ? "deck" : "decks"}
          </span>
        </div>
      </div>

      {/* Deck list */}
      {decks.length === 0 ? (
        <Card
          className="
            overflow-hidden rounded-3xl
            border border-white/[0.07]
            bg-[#0b0b10]/80
          "
        >
          <CardContent className="flex min-h-[280px] items-center justify-center">
            <div className="max-w-sm text-center">
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-violet-500/20 bg-violet-500/[0.08]">
                <Layers3 className="h-6 w-6 text-violet-400" />
              </div>

              <h3 className="text-lg font-semibold text-white">
                Your library is empty
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Create your first study deck above and start organizing what
                you're learning.
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {decks.map((deck) => (
            <Card
              key={deck._id}
              className="
                group relative overflow-hidden rounded-2xl
                border border-white/[0.07]
                bg-[#0b0b10]/85
                shadow-[0_12px_35px_rgba(0,0,0,0.22)]
                transition-all duration-300
                hover:-translate-y-1
                hover:border-violet-500/25
                hover:bg-[#0e0b16]
                hover:shadow-[0_20px_50px_rgba(0,0,0,0.35)]
              "
            >
              <div className="pointer-events-none absolute -right-12 -top-12 h-28 w-28 rounded-full bg-violet-600/[0.06] blur-3xl transition-all duration-300 group-hover:bg-violet-600/[0.12]" />

              <CardHeader className="relative pb-3">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-violet-500/20 bg-violet-500/[0.08]">
                      <BookOpen className="h-4 w-4 text-violet-400" />
                    </div>

                    <div className="min-w-0">
                      <p className="mb-0.5 text-[10px] font-medium uppercase tracking-[0.16em] text-gray-600">
                        Study deck
                      </p>

                      <CardTitle className="truncate text-base font-semibold text-white">
                        {deck.deckName}
                      </CardTitle>
                    </div>
                  </div>

                  <div className="rounded-lg border border-white/[0.06] bg-white/[0.025] px-2 py-1">
                    <span className="text-[10px] text-gray-500">
                      {deck.cardCount || 0} cards
                    </span>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="relative space-y-5">
                {/* Stats */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-white/[0.05] bg-white/[0.02] p-3">
                    <div className="mb-1 flex items-center gap-1.5">
                      <BookOpen className="h-3 w-3 text-violet-400" />

                      <p className="text-[10px] font-medium uppercase tracking-wider text-gray-600">
                        Cards
                      </p>
                    </div>

                    <p className="text-lg font-semibold text-white">
                      {deck.cardCount || 0}
                    </p>
                  </div>

                  <div className="rounded-xl border border-white/[0.05] bg-white/[0.02] p-3">
                    <div className="mb-1 flex items-center gap-1.5">
                      <CalendarDays className="h-3 w-3 text-violet-400" />

                      <p className="text-[10px] font-medium uppercase tracking-wider text-gray-600">
                        Created
                      </p>
                    </div>

                    <p className="truncate text-sm font-medium text-gray-300">
                      {new Date(deck.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {/* Description */}
                {deck.deckDescription && (
                  <div className="rounded-xl border border-white/[0.05] bg-white/[0.015] px-3 py-2.5">
                    <p className="line-clamp-2 text-xs leading-5 text-gray-500">
                      {deck.deckDescription}
                    </p>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-2 pt-1">
                  <Button
                    size="sm"
                    className="
                      h-9 flex-1 cursor-pointer rounded-xl
                    "
                    onClick={() => displayCardsOfDeck(deck)}
                    variant="animate"
                  >
                    View Cards
                    <ArrowRight className="ml-1 h-3.5 w-3.5" />
                  </Button>

                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() =>
                      handleDeleteDeck(deck._id, deck.deckName)
                    }
                    className="
                      h-9 w-9 cursor-pointer rounded-xl p-0
                      border border-white/[0.06]
                      text-gray-600
                      transition-all
                      hover:border-red-500/20
                      hover:bg-red-500/[0.08]
                      hover:text-red-400
                    "
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Decks;