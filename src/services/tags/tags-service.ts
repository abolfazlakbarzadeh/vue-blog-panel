import { AxiosError, AxiosInstance } from "axios";
import { inject } from "vue";
import { useGlobalStore } from "@/store/global/global-store";
import { toast } from "vue3-toastify";
import { getUnprocessableStatusErrors } from "@/helpers/http";
import { FetchTagsResponse } from "./types";

export function useTagService() {
  const axios = inject<AxiosInstance>("axios");
  const globalStore = useGlobalStore();

  function fetchTags() {
    globalStore.enableLoading();
    return axios
      ?.get<FetchTagsResponse>(`/tags`)
      .then(({ data }) => data)
      .catch(handleCatch("fetch"))
      .finally(() => {
        globalStore.disbleLoading();
      });
  }

  return {
    fetchTags,
  };
}

const handleCatch = (method: "fetch") => (error: AxiosError<{}>) => {
  switch (method) {
    case "fetch": {
      handleFetchErrors();
      break;
    }
  }

  function handleFetchErrors() {
    switch (error.response?.status) {
      case 422: {
        const errors = getUnprocessableStatusErrors(error);
        errors.forEach((error) => {
          toast.error(`Get Tags Failed! ${error}`);
        });
        break;
      }
      default: {
        toast.error("Get Articles Failed!");
      }
    }
  }
  return error;
};
