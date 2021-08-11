import { check } from "express-validator";

export const createPullReqValidator = [
  check("title", "Please enter a valid title")
    .trim()
    .isString()
    .isLength({ min: 2, max: 16 }),
  check("description", "Please enter a valid description")
    .trim()
    .isString()
    .isLength({ min: 2, max: 500 }),
  check("author", "Please enter a valid full name")
    .trim()
    .isString()
    .isLength({ min: 5, max: 100 })
    .custom((fullName) => {
      const fullNameArray = fullName.split(" ");
      console.log(fullNameArray);
      const firstName = fullNameArray[0];
      const LastName = fullNameArray[1];
      console.log(firstName, LastName);
      if (
        !firstName ||
        firstName.length <= 2 ||
        !LastName ||
        LastName?.length <= 2
      ) {
        return Promise.reject();
      }
      return Promise.resolve();
    }),
  check("status", "Please choose a valid status")
    .trim()
    .custom((status) => {
      if (status !== "draft" && status !== "open" && status !== "closed") {
        return Promise.reject();
      }
      return Promise.resolve();
    }),
  check("labels", "Please enter valid labels").isArray(),
];
