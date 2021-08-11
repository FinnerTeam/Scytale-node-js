type status = "draft" | "open" | "closed";
type order = "asc" | "desc";
interface sorting {
  order: order;
  prNumber: boolean;
  title: boolean;
}
interface createReqBody {
  title: string;
  description: string;
  author: string;
  status: status;
  labels: string[];
}
interface getReqBody {
  status: status;
  labels: string[];
  sorting: sorting;
}
