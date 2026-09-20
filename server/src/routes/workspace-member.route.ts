import express from "express";

import * as workspaceMemberController from "../controllers/workspace-member.controller.js";

const router = express.Router();

router.post("/", async (req, res) => workspaceMemberController.addMember(req, res));

export default router;