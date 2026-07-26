import express from "express";

import * as workspaceController from "../controllers/workspace.controller";

const router = express.Router();

router.get("/", workspaceController.getListWorkspaces);
router.get("/:id", async (req, res) => workspaceController.getWorkspaceById(req, res));
router.post("/", async (req, res) => workspaceController.createWorkspace(req, res));
router.patch("/:id", async (req, res) => workspaceController.updateWorkspace(req, res));
router.delete("/:id", async (req, res) => workspaceController.removeWorkspace(req, res));
router.get("/getWorkspaceByUserId/:id", async (req, res) => workspaceController.getWorkspaceByUserId(req, res));

export default router;