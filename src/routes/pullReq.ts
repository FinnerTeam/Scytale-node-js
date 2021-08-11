import { Router } from "express";
import { createPullRequest } from "../controllers/pullReq";
import { createPullReqValidator } from "../validators/pullReq";
const router = Router();

// router.get("/", getPullRequests);

router.post("/", createPullReqValidator, createPullRequest);

export default router;
