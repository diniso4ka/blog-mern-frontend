import { Status } from "../../types";

export interface Post {
  _id: string;
  title: string;
  text: string;
  tags?: Tags;
  viewsCount?: number;
  imgUrl?: string;
  user: string;
  createdAt: TimeRanges;
  updatedAt: TimeRanges;
}

export type Tags = { name: string };

export interface Comments {
  _id: string;
  user: string;
  text: string;
  postId: string;
  createdAt: TimeRanges;
  updatedAt: TimeRanges;
}

export interface IPosts {
  items: Post[];
  status: Status;
}

export interface ITags {
  items: Tags[];
  status: Status;
}

export interface IComments {
  comms: Comments[];
  status: Status;
}
