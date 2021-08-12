import { validationResult } from "express-validator";
import { errorHandler } from "../helpers/errorHandler";
import { PullReq, getAll, getLabels } from "../models/pullReq";
import {
  res,
  req,
  next,
  createReqBody,
  getReqQueryParams,
} from "../types/express";
export const createPullRequest = async (req: req, res: res, next: next) => {
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

export const getPullRequests = async (req, res: res, next: next) => {
  const { prStatus, labels, sortingOrder, sortingMethod } =
    req.query as getReqQueryParams;
  const errors = validationResult(req);
  try {
    if (!errors.isEmpty()) {
      throw errorHandler("Validation failed", 422, errors.array());
    }
    const labelsData = labels.substring(2).split(",");
    let method: "_id" | "title";
    if (sortingMethod == "creation") {
      method = "_id";
    } else {
      method = sortingMethod;
    }
    const labelsResponse = await getLabels();
    const labelsArray = labelsResponse[0].allLabels;
    const prsArray = await getAll(prStatus, labelsData, sortingOrder, method);
    res.status(200).send({ prs: prsArray, labels: labelsArray });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
