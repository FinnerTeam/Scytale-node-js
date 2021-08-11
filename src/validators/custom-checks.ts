type prStatus = "draft" | "open" | "closed";

export const statusCheck = (status: prStatus) => {
  if (status !== "draft" && status !== "open" && status !== "closed") {
    return Promise.reject();
  }
  return Promise.resolve();
};

export const labelsCheck = (labelsParams: string) => {
  const labelsArray = labelsParams?.substring(2)?.split(",");
  if (!labelsArray || labelsArray[0] === "") {
    return Promise.reject("Labels array is empty");
  }
  return Promise.resolve();
};

export const fullNameCheck = (fullName: string) => {
  {
    const fullNameArray = fullName.split(" ");
    const firstName = fullNameArray[0];
    const LastName = fullNameArray[1];
    if (
      !firstName ||
      firstName.length <= 2 ||
      !LastName ||
      LastName?.length <= 2
    ) {
      return Promise.reject();
    }
    return Promise.resolve();
  }
};

export const trueFalseCheck = (query: "true" | "false") => {
  if (query !== "true" && query !== "false") {
    return Promise.reject();
  }
  return Promise.resolve();
};

export const orderCheck = (order: "asc" | "desc") => {
  if (order !== "asc" && order !== "desc") {
    return Promise.reject();
  }
  return Promise.resolve();
};
