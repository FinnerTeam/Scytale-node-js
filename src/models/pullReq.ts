import mongoose from "mongoose";

const Schema = mongoose.Schema;

const PullRequestSchema = new Schema(
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

export default mongoose.model("PullRequest", PullRequestSchema);
