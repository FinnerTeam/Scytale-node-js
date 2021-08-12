import { check, query } from "express-validator";
import {
  fullNameCheck,
  statusCheck,
  labelsCheck,
  orderCheck,
  sortingMethodCheck,
} from "./custom-checks";

const titleMessage =
  "Title must to be a string and with length of 2-16 characters";

const descriptionMessage =
  "Description must to be a string and with maximum length of 1-500 characters";

const authorMessage =
  "First and last name must have at least 2 characters long";

const statusMessage = "Please choose a valid status";
const labelsMessage = "Please enter valid labels";
const orderMessage = "Sorting by order is not defined";
const methodMessage = "Sorting by method is not defined";

export const createPullReqValidator = [
  check("title", titleMessage).trim().isString().isLength({ min: 2, max: 16 }),
  check("description", descriptionMessage)
    .trim()
    .isString()
    .isLength({ min: 1, max: 500 }),
  check("author", authorMessage)
    .trim()
    .isString()
    .isLength({ min: 5, max: 100 })
    .custom((fullName) => fullNameCheck(fullName)),
  check("status", statusMessage)
    .trim()
    .toLowerCase()
    .custom((status) => statusCheck(status)),
  check("labels", labelsMessage).isArray(),
];

export const getPullReqValidator = [
  query("prStatus", statusMessage)
    .trim()
    .toLowerCase()
    .custom((status) => statusCheck(status)),
  query("labels", labelsMessage)
    .toLowerCase()
    .custom((labels) => labelsCheck(labels)),
  query("sortingOrder", orderMessage).custom((order) => orderCheck(order)),
  query("sortingMethod", methodMessage)
    .toLowerCase()
    .custom((byNumber) => sortingMethodCheck(byNumber)),
];
