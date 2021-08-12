import { Response, Request, NextFunction } from "express";
import { prStatus, order, sortingMethod } from "./general";
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
  sorting: sortingMethod;
}

//Query params

export interface getReqQueryParams {
  prStatus: prStatus;
  labels: string;
  sortingOrder: string;
  sortingMethod: sortingMethod;
  page: number;
}
