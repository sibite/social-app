export interface PostDBType {
  _id: string;
  creatorId: string;
  date: number;
  content: string;
  mediaIds: string[];
  likedBy?: string[];
  comments?: any[];
}

export interface PostType extends PostDBType {
  fullName: string;
  avatarSrc: string;
}

export interface PostIncomingType extends Omit<PostType, 'mediaIds'> {
  media: {
    _id: string;
    src: string;
  }[];
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
