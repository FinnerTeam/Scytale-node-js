import { validationResult } from "express-validator";
import { errorHandler } from "../helpers/errorHandler";
import { PullReq, getAll, getLabels, getPrsNumber } from "../models/pullReq";
import {
  res,
  req,
  next,
  createReqBody,
  getReqQueryParams,
} from "../types/express";

export const PR_PER_PAGE = 5;

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
      .send({ message: "Pull Request created successfully", newPr: pr });
  } catch (err) {
    next(err);
  }
};

export const getPullRequests = async (req, res: res, next: next) => {
  const { prStatus, labels, sortingOrder, sortingMethod, page } =
    req.query as getReqQueryParams;
  const errors = validationResult(req);
  try {
    if (!errors.isEmpty()) {
      throw errorHandler("Validation failed", 422, errors.array());
    }

    let method: "_id" | "title";
    if (sortingMethod == "creation") {
      method = "_id";
    } else {
      method = sortingMethod;
    }
    const totalPrs = await getPrsNumber();
    const labelsResponse = await getLabels();
    const labelsArray = labelsResponse[0].allLabels;
    const prsArray = await getAll(prStatus, labels, sortingOrder, method, page);
    res.status(200).send({
      prs: prsArray,
      labels: labelsArray,
      totalPrs,
      hasNextPage: PR_PER_PAGE * page < totalPrs,
      hasPreviousPage: page > 1,
      nextPage: page + 1,
      prevPage: page - 1,
      lastPage: Math.ceil(totalPrs / PR_PER_PAGE),
    });
  } catch (err) {
    next(err);
  }
};
