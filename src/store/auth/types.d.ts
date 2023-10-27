import { User } from "@/types";

export type LoginResponse = { user: User };
export type LoginParams = { email: string; password: string };
export type RegisterParams = LoginParams & { username: string };
export type FetchUserResponse = LoginResponse;
