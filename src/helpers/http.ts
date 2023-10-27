import { AxiosError } from "axios";

export const getUnprocessableStatusErrors = (error: AxiosError<any>) => {
  const errors = Object.entries(error.response?.data?.errors || {})
    .map(([key, value]: any) => value.map((err) => `${key} ${err}`))
    .flat();
  return errors;
};
