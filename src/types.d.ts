/* eslint-disable no-unused-vars */
import { AxiosInstance } from "axios";

export type User = {
  email: string;
  username: string;
  bio?: string;
  image: string;
  token: string;
};
export {};

declare module "pinia" {
  interface PiniaCustomProperties {
    $axios: AxiosInstance;
  }
}
