import { type User } from "../../user/types/user.type";

type AuthResponse = {
    accessToken: string;
    user: User;
}

export { type AuthResponse };