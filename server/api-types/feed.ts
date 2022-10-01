export interface PostDBType {
  _id: string;
  creatorId: string;
  date: number;
  content: string;
  mediaSrc?: string;
  mediaIds?: string[];
  likedBy?: string[];
  type: 'post' | 'media';
}

export interface PostIncomingType extends Omit<PostDBType, 'mediaIds'> {
  fullName: string;
  avatarSrc: string;
  media: {
    _id: string;
    src: string;
  }[];
  commentsCount: number;
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

export interface CommentDBType {
  _id: string;
  postId: string;
  creatorId: string;
  date: number;
  content: string;
}

export interface CommentIncomingType extends CommentDBType {
  fullName: string;
  avatarSrc?: string;
}
