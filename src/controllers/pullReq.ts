import { validationResult } from "express-validator";
import { errorHandler } from "../helpers/errorHandler";
import PullRequest from "../models/pullReq";
type prStatus = "draft" | "open" | "closed";
type order = "asc" | "desc";

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
  sortingOrder: order;
  sortingByNumber: boolean;
  sortingByTitle: boolean;
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
  const { prStatus, labels, sortingOrder, sortingByNumber, sortingByTitle } =
    req.query as getReqQueryParams;
  const errors = validationResult(req);
  try {
    if (!errors.isEmpty()) {
      throw errorHandler("Validation failed", 422, errors.array());
    }
    const labelsArray = labels.substring(2).split(",");
    res.status(200).send({
      prStatus,
      labels,
      sortingOrder,
      sortingByNumber,
      sortingByTitle,
    });
  } catch (err) {
    next(err);
  }
};
