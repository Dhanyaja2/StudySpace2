import express from "express";
import { addCard, deleteCard, getCardsByDeck, getDueCards, updateCardReview, userCardsCount } from "../controllers/cardController.js";
import authMiddleware from "../middleware/auth.js";

const cardRoute = express.Router();

cardRoute.post('/addCard', authMiddleware, addCard);
cardRoute.get('/cardList/:deckId', authMiddleware, getCardsByDeck);
cardRoute.delete('/deleteCard/:cardId', authMiddleware, deleteCard)
cardRoute.get('/cardsCount', authMiddleware, userCardsCount);
cardRoute.put('/updateCard', authMiddleware, updateCardReview);
cardRoute.get('/due', authMiddleware, getDueCards);

export default cardRoute;