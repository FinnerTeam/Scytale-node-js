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

export const PR_PER_PAGE = 3;

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
    const pageNumber = +page || 1;
    const order = parseInt(sortingOrder);
    const labelsCount = await getLabels();
    const labelsArray = labelsCount[0].allLabels;
    const prs = await getAll(prStatus, labels, order, sortingMethod, page);
    res.status(200).send({
      prs: prs[0]?.data || [],
      labels: labelsArray,
      currentPage: pageNumber,
      hasNextPage: PR_PER_PAGE * pageNumber < prs[0]?.count,
      hasPreviousPage: pageNumber > 1,
    });
  } catch (err) {
    next(err);
  }
};
