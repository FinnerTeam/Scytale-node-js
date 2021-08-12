import { Response, Request, NextFunction } from "express";
import { prStatus, order, sorting } from "./general";
export type res = Response;
export type req = Request;
export type next = NextFunction;

//Body requests
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

//Query params

export interface getReqQueryParams {
  prStatus: prStatus;
  labels: string;
  sortingOrder: order;
  sortingMethod: "title" | "creation";
  page: number;
}
