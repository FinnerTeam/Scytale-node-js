import { Router } from "express";
import { createPullRequest, getPullRequests } from "../controllers/pullReq";
import {
  createPullReqValidator,
  getPullReqValidator,
} from "../validators/pullReq";
const router = Router();

router.get("/", getPullReqValidator, getPullRequests);

router.post("/", createPullReqValidator, createPullRequest);

export default router;
