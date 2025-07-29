import express from "express";
import {
  addDeck,
  deckList,
  deleteDeck,
  updateDeck,
} from "../controllers/deckController.js";
import authMiddleware from "../middleware/auth.js";

const deckRoute = express.Router();

// all the deck endpoints
deckRoute.post("/addDeck", authMiddleware, addDeck);
deckRoute.get("/deckList", authMiddleware, deckList);
deckRoute.put("/updateDeck", authMiddleware, updateDeck);
deckRoute.delete('/deleteDeck', authMiddleware, deleteDeck);

export default deckRoute;
