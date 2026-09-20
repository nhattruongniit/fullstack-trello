import express from "express";

import * as cardController from "../controllers/card.controller.js";

const router = express.Router({ mergeParams: true });

router.get("/", cardController.getCards);
router.get("/:id", cardController.getCardById);
router.post("/", cardController.createCard);
router.patch("/:id", cardController.updateCard);
router.delete("/:id", cardController.removeCard);

export default router;
