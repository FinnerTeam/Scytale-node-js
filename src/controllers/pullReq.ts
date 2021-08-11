import { validationResult } from "express-validator";
import { errorHandler } from "../helpers/errorHandler";
import PullRequest from "../models/pullReq";
type prStatus = "draft" | "open" | "closed" | "all";
interface createReqBody {
  title: string;
  description: string;
  author: string;
  status: prStatus;
  labels: string[];
}
interface getReqQueryParams {
  prStatus: prStatus;
  labels: string;
  sortingOrder: "asc" | "desc";
  sortingMethod: "title" | "number";
}

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
    const findFields = {};
    const sortFields = {};
    if (labelsArray[0].length > 0) {
      findFields["labels"] = { $in: labelsArray };
    }
    if (prStatus && prStatus !== "all") {
      findFields["status"] = prStatus;
    }
    if (sortingMethod) {
      sortFields[sortingMethod] = sortingOrder;
    }
    const pullRequests = await PullRequest.find(findFields)
      .sort(sortFields)
      .limit(20);
    const number = await PullRequest.find(findFields).count();
    console.log(number);
    res.status(200).send({ array: pullRequests });
  } catch (err) {
    next(err);
  }
};
