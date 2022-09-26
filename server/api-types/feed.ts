export interface PostDBType {
  _id: string;
  creatorId: string;
  date: number;
  content: string;
  mediaSrc?: string;
  mediaIds?: string[];
  likedBy: string[];
  comments?: any[];
  type: 'post' | 'media';
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
  options: {
    delete?: boolean;
    withMedia?: boolean;
  };
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
