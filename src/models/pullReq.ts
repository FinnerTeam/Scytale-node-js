import mongoose from "mongoose";
export interface PullRequestInput {
  title: string;
  description: string;
  author: string;
  status: string;
  labels: any[];
  createdAt?: Date | string;
}
export interface PullRequestDocument
  extends PullRequestInput,
    mongoose.Document {
  fetchAll: (...args: any) => Promise<any[]>;
}

const PullRequestSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    labels: {
      type: Array,
      required: true,
    },
  },
  { timestamps: true }
);

PullRequestSchema.methods.getAll = async function (
  prStatus,
  labelsArray,
  sortingOrder,
  sortingMethod
): Promise<any[]> {
  const pr = this as PullRequestDocument;
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
  // @ts-ignore: Unreachable code error
  return await this.find(findFields).sort(sortFields).limit(20);
};
export default mongoose.model<PullRequestDocument>(
  "PullRequest",
  PullRequestSchema
);
