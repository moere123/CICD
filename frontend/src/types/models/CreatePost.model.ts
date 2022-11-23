import { User } from "./User.model";

export type CreatePost= {
    title: string;
    text: string;
    category: string;
    user: User;
};