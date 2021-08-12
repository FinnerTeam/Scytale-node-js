export interface IPullRequest extends Document {
  title: string;
  description: string;
  author: string;
  status: string;
  labels: string[];
  createdAt?: Date;
  time?: string;
}
