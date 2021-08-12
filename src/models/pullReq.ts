import { IPullRequest, prStatus, order } from "../types";
import mongoose, { Schema } from "mongoose";

const PullRequestSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    author: { type: String, required: true },
    status: { type: String, required: true },
    labels: { type: Array, required: true },
  },
  { timestamps: true }
);

export const getAll = async (
  prStatus: prStatus,
  labelsArray: string[],
  sortingOrder: order,
  sortingMethod: "title" | "creation"
): Promise<any[]> => {
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
  return await PullReq.find(findFields).sort(sortFields).limit(20);
};

export const PullReq = mongoose.model<IPullRequest>(
  "PullRequest",
  PullRequestSchema
);
