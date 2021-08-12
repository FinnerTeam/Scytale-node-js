export type prStatus = "draft" | "open" | "closed" | "all";

export type order = "asc" | "desc";
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
  sortingOrder: "asc" | "desc";
  sortingMethod: "title" | "creation";
}
