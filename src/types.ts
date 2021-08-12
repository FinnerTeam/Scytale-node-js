import { Document } from "mongoose";

export type prStatus = "draft" | "open" | "closed" | "all";

export type order = 1 | -1;
export interface IPullRequest extends Document {
  title: string;
  description: string;
  author: string;
  status: string;
  labels: string[];
  createdAt?: Date;
  time?: string;
}
export interface sorting {
  order: order;
  prNumber: boolean;
  title: boolean;
}
export interface createReqBody {
  title: string;
  description: string;
  author: string;
  status: prStatus;
  labels: string[];
}
export interface getReqBody {
  status: prStatus;
  labels: string[];
  sorting: sorting;
}
export interface createReqBody {
  title: string;
  description: string;
  author: string;
  status: prStatus;
  labels: string[];
}
export interface getReqQueryParams {
  prStatus: prStatus;
  labels: string;
  sortingOrder: order;
  sortingMethod: "title" | "creation";
}
