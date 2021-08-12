import { ValidationError } from "express-validator";

interface error extends Error {
  statusCode: number;
  errors: ValidationError[];
}
export const errorHandler = (
  message = "Internal server error",
  status = 500,
  errors = [] as ValidationError[]
) => {
  const error = new Error(message) as error;
  error.statusCode = status;
  error.errors = errors;
  return error;
};
