import { validationResult } from "express-validator";
import { errorHandler } from "../helpers/errorHandler";
import PullRequest from "../models/pullReq";
import { createReqBody, getReqQueryParams } from "../types";
export const createPullRequest = async (req, res, next) => {
  const { title, description, author, status, labels } =
    req.body as createReqBody;
  const errors = validationResult(req);
  try {
    if (!errors.isEmpty()) {
      throw errorHandler("Validation failed", 422, errors.array());
    }
    const pr = await PullRequest.create({
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
    ///Transfer to method inside model later
    const findFields = {};
    const sortFields = {};
    if (labelsArray[0].length > 0) {
      findFields["labels"] = { $in: labelsArray };
    }
    if (prStatus && prStatus !== "all") {
      findFields["status"] = prStatus;
    }
    sortFields[sortingMethod] = sortingOrder;
    if (sortingMethod === "creation") {
      sortFields["_id"] = sortingOrder;
    }
    let pullRequests = await PullRequest.find(findFields)
      .sort(sortFields)
      .limit(20);
    ///until here
    res.status(200).send(pullRequests);
  } catch (err) {
    console.log(err);
    next(err);
  }
};
