import { NextFunction } from "express";

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
  console.log(title, description, author, status, labels);
  res.status(200).send({ title, description, author, status, labels });
};
