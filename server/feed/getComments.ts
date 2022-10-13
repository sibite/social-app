/* eslint-disable consistent-return */
import { RequestHandler } from 'express';
import { UserType } from '../api-types/auth';
import { CommentDBType, CommentIncomingType } from '../api-types/feed';
import db from '../database';
import getFullName from '../shared/getFullName';
import getSrcUrl from '../shared/getSrcUrl';
import { arrCallback } from '../shared/nedbPromises';

type UserCustomType = Pick<
  UserType,
  '_id' | 'name' | 'lastName' | 'fullName' | 'avatarSrc'
>;

const getComments: RequestHandler = async (req, res) => {
  const { postId } = req.params;

  if (!postId) return res.status(500).send();

  try {
    const commentsRes = await new Promise<CommentDBType[]>((r, j) => {
      db.comments.find({ postId }).sort({ date: 1 }).exec(arrCallback(r, j));
    });
    const comments: CommentIncomingType[] = [];

    const usersRes = await new Promise<UserCustomType[]>((r, j) => {
      db.users.find(
        { _id: { $in: commentsRes.map(({ creatorId }) => creatorId) } },
        { name: 1, lastName: 1, avatarSrc: 1 },
        arrCallback(r, j)
      );
    });

    const users: { [key: string]: UserCustomType } = {};

    usersRes.forEach((user) => {
      users[user._id] = {
        ...user,
        fullName: getFullName({ name: user.name, lastName: user.lastName }),
        avatarSrc: user.avatarSrc && getSrcUrl(user.avatarSrc),
      };
    });

    commentsRes.forEach((commentRes) => {
      comments.push({
        ...commentRes,
        fullName: users[commentRes.creatorId].fullName,
        avatarSrc: users[commentRes.creatorId].avatarSrc,
      });
    });

    res.status(200).json(comments);
  } catch (err) {
    res.status(typeof err === 'number' ? err : 500).send();
  }
};

export default getComments;
