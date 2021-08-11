import { check, query } from "express-validator";
import {
  fullNameCheck,
  statusCheck,
  labelsCheck,
  orderCheck,
  sortingMethodCheck,
} from "./custom-checks";

export const createPullReqValidator = [
  check("title", "Please enter a valid title")
    .trim()
    .isString()
    .isLength({ min: 2, max: 16 }),
  check("description", "Please enter a valid description")
    .trim()
    .isString()
    .isLength({ min: 2, max: 500 }),
  check("author", "First and last name must have at least 2 characters long")
    .trim()
    .isString()
    .isLength({ min: 5, max: 100 })
    .custom((fullName) => fullNameCheck(fullName)),
  check("status", "Please choose a valid status")
    .trim()
    .custom((status) => statusCheck(status)),
  check("labels", "Please enter valid labels").isArray(),
];

export const getPullReqValidator = [
  query("prStatus", "Please enter a valid status")
    .trim()
    .custom((status) => statusCheck(status)),
  query("labels", "Please enter valid labels").custom((labels) =>
    labelsCheck(labels)
  ),
  query("sortingOrder", "Sorting by order is not defined").custom((order) =>
    orderCheck(order)
  ),
  query("sortingMethod", "Sorting by method is not defined").custom(
    (byNumber) => sortingMethodCheck(byNumber)
  ),
];
