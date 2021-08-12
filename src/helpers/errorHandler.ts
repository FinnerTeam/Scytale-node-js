interface error extends Error {
  statusCode: number;
  errors: string[];
}
export const errorHandler = (
  message = "Internal server error",
  status = 500,
  errors = [] as string[]
) => {
  const error = new Error(message) as error;
  error.statusCode = status;
  error.errors = errors;
  return error;
};
