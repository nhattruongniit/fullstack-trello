import express from "express";

import * as listController from "../controllers/list.controller";

const router = express.Router({ mergeParams: true });

router.get("/", listController.getLists);
router.get("/:id", listController.getListById);
router.post("/", listController.createList);
router.patch("/:id", listController.updateList);
router.delete("/:id", listController.removeList);

export default router;
