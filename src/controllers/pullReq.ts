import { validationResult } from "express-validator";
import { errorHandler } from "../helpers/errorHandler";
import { PullReq, getAll } from "../models/pullReq";
import { createReqBody, getReqQueryParams } from "../types";
export const createPullRequest = async (req, res, next) => {
  const { title, description, author, status, labels } =
    req.body as createReqBody;
  const errors = validationResult(req);
  try {
    if (!errors.isEmpty()) {
      throw errorHandler("Validation failed", 422, errors.array());
    }
    const pr = await PullReq.create({
      title,
      description,
      author,
      status,
      labels,
    });
    res
      .status(200)
      .send({ message: "PullRequest created successfully", newPr: pr });
  } catch (err) {
    next(err);
  }
};

export const getPullRequests = async (req, res, next) => {
  const { prStatus, labels, sortingOrder, sortingMethod } =
    req.query as getReqQueryParams;
  const errors = validationResult(req);
  try {
    if (!errors.isEmpty()) {
      throw errorHandler("Validation failed", 422, errors.array());
    }
    const labelsArray = labels.substring(2).split(",");
    const response = await getAll(
      prStatus,
      labelsArray,
      sortingOrder,
      sortingMethod
    );
    res.status(200).send(response);
  } catch (err) {
    console.log(err);
    next(err);
  }
};
