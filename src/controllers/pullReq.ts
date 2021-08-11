import { validationResult } from "express-validator";
import { errorHandler } from "../helpers/errorHandler";

type status = "draft" | "open" | "closed";

interface pullReqBody {
  title: string;
  description: string;
  author: string;
  status: status;
  labels: string[];
}

export const createPullRequest = (req, res, next) => {
  const { title, description, author, status, labels } =
    req.body as pullReqBody;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw errorHandler("Validation failed", 422, errors.array());
  }
  console.log(title, description, author, status, labels);
  res.status(200).send({ title, description, author, status, labels });
};
