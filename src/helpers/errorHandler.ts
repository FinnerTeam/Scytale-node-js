interface error extends Error {
  statusCode: number;
  errors: any[];
}
export const errorHandler = (
  message = "Internal server error",
  status = 500,
  errors = [] as any[]
) => {
  const error = new Error(message) as error;
  error.statusCode = status;
  error.errors = errors;
  return error;
};
