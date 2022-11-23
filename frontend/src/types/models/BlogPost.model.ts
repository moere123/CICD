import { User } from './User.model';

/**
 * Blog Post type
 */
export type BlogPost = {
  id: string;
  title: string;
  text: string;
  category: string;
  user: User;
  creationTime: Date | undefined;
  editTime: Date | undefined;
};
