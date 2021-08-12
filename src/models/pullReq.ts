import { IPullRequest } from "../types/models";
import { prStatus, order } from "../types/general";
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
  label: string,
  sortingOrder: order,
  sortingMethod: "title" | "_id"
): Promise<any[]> => {
  const findFields = {};
  const sortFields = {};
  if (label && label !== "all") {
    findFields["labels"] = label;
  }
  if (prStatus && prStatus !== "all") {
    findFields["status"] = prStatus;
  }
  if (sortingMethod) {
    sortFields[sortingMethod] = sortingOrder;
  }

  return await PullReq.find(findFields).sort(sortFields).limit(20);
};

export const getLabels = async () => {
  return await PullReq.aggregate([
    { $unwind: "$labels" },
    {
      $group: {
        _id: {},
        allLabels: { $addToSet: "$labels" },
      },
    },
  ]);
};

export const PullReq = mongoose.model<IPullRequest>(
  "PullRequest",
  PullRequestSchema
);
