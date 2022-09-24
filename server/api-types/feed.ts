export interface PostType {
  _id: string;
  creatorId: string;
  date: number;
  content: string;
  mediaIds: string[];
  likedBy: string[];
  comments: any[];
}

export interface CreatePostType {
  content: string;
  media: File[];
}

export interface MediaType {
  _id: string;
  src: string;
  date: number;
  creatorId: string;
  likedBy: string[];
  comments: any[];
}
