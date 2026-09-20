import express from "express";

import * as boardController from "../controllers/board.controller.js";

const router = express.Router({ mergeParams: true});

router.get("/", boardController.getBoards);
router.get("/:id", boardController.getBoardById);
router.post("/", boardController.createBoard);
router.patch("/:id", boardController.updateBoard);
router.delete("/:id", boardController.removeBoard);

export default router;