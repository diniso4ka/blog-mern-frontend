export enum Status {
   LOADING = 'loading',
   SUCCESS = 'success',
   ERROR = 'error'
}

export interface Post {
   _id: string
   title: string,
   text: string,
   tags?: Tags,
   viewsCount?: number,
   imgUrl?: string,
   user: string,
   createdAt: TimeRanges,
   updatedAt: TimeRanges
}

export type Tags = string[]

export interface Comments {
   _id: string,
   user: string,
   text: string,
   postId: string,
   createdAt: TimeRanges,
   updatedAt: TimeRanges,
}

export interface IPosts {
   items: Post[],
   status: Status
}

export interface ITags {
   items: Tags,
   status: Status
}

export interface IComments {
   comms: Comments[],
   status: Status
}

export interface InitialState {
   posts: IPosts,
   tags: ITags,
   comments: IComments

}