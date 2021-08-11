type prStatus = "draft" | "open" | "closed" | "all";

export const statusCheck = (status: prStatus) => {
  if (
    status !== "draft" &&
    status !== "open" &&
    status !== "closed" &&
    status !== "all"
  ) {
    return Promise.reject();
  }
  return Promise.resolve();
};

export const labelsCheck = (labelsParams: string) => {
  const labelsArray = labelsParams?.substring(2)?.split(",");
  if (!labelsArray) {
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

export const sortingMethodCheck = (query: "title" | "creation") => {
  if (query !== "title" && query !== "creation") {
    return Promise.reject();
  }
  return Promise.resolve();
};

export const orderCheck = (order: "1" | "-1") => {
  if (order !== "1" && order !== "-1") {
    return Promise.reject();
  }
  return Promise.resolve();
};
