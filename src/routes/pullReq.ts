import { Router } from "express";
import { createPullRequest } from "../controllers/pullReq";
const router = Router();

// router.get("/", getPullRequests);

router.post("/", createPullRequest);

export default router;
