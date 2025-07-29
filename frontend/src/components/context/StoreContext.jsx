import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const url = "http://localhost:5000";
  const token = localStorage.getItem("token");
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isAppReady, setIsAppReady] = useState(false);
  const [dueCardsLength, setDueCardsLength] = useState(0);
  const [dueCards, setDueCards] = useState([]);
  const [reviewedTodayCount, setReviewedTodayCount] = useState(0);
  const [cardsCount, setCardsCount] = useState(0);

  const [deckCount, setDeckCount] = useState(0);

  const [decks, setDecks] = useState([]);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
      setUserName(localStorage.getItem("user"));
      setUserId(localStorage.getItem("userId"));
    }
    setIsAppReady(true);
    fetchDecks();
    cardsCountFunc();
  }, []);

  const dueCardsFunc = async () => {
    const newUrl = `${url}/api/card/due`;
    try {
      const response = await axios.get(newUrl, { headers: { token } });
      console.log("dueCardsFunc executed");
      setDueCardsLength((response.data?.data || []).length);
    } catch (error) {
      console.log(error);
      setDueCardsLength(0);
    }
  };

  const fetchDecks = async () => {
    const newUrl = `${url}/api/deck/deckList`;
    try {
      const response = await axios.get(newUrl, {
        headers: { token },
      });
      const deckData = response.data?.data || [];
      const sortedDecks = deckData.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setDecks(sortedDecks);
      setDeckCount(response.data.data.length);
    } catch (error) {
      console.log(error);
    }
  };

  const cardsCountFunc = async () => {
    const newUrl = `${url}/api/card/cardsCount`;
    try {
      const response = await axios.get(newUrl, { headers: { token } });
      setCardsCount(() => response.data.count);
    } catch (error) {
      console.log(error);
    }
  };

  const contextValue = {
    url,
    isLoading,
    setIsLoading,
    isAuthenticated,
    setIsAuthenticated,
    setUserName,
    setUserId,
    showAuthModal,
    setShowAuthModal,
    open,
    setOpen,
    isAppReady,
    dueCardsLength,
    cardsCount,
    deckCount,
    decks,
    cards,
    token,
    fetchDecks,
    cardsCountFunc,
    dueCardsFunc,
    cardsCount,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
