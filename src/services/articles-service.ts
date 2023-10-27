import { useAuthStore } from "@/store/auth/auth-store";
import { AxiosError, AxiosInstance } from "axios";
import { storeToRefs } from "pinia";
import { inject } from "vue";
import {
  CreateArticleResponse,
  FetchArticlesResponse,
  ICreateArticleParams,
  IFetchArticlesParams,
  IUpdateArticleParams,
} from "./types";
import { useGlobalStore } from "@/store/global/global-store";
import { toast } from "vue3-toastify";
import { getUnprocessableStatusErrors } from "@/helpers/http";

export function useArticleService() {
  const axios = inject<AxiosInstance>("axios");
  const authStore = storeToRefs(useAuthStore());
  const globalStore = useGlobalStore();

  const userToken = () => {
    return ["Token", authStore.getUserToken.value].join(" ");
  };
  const withQueryParams = (url: string, params: object = {}) => {
    const queryParams = new URLSearchParams(Object.entries(params));
    const queryParamsString = queryParams.toString();

    return [url, queryParamsString ? `?${queryParamsString}` : ""].join("");
  };

  function fetchArticles(params: IFetchArticlesParams = {}) {
    globalStore.enableLoading();
    return axios
      ?.get<FetchArticlesResponse>(withQueryParams("/articles", params), {
        headers: {
          Authorization: userToken(),
        },
      })
      .then(({ data }) => data)
      .catch(handleCatch("fetch"))
      .finally(() => {
        globalStore.disbleLoading();
      });
  }
  function createArticle(params: ICreateArticleParams) {
    globalStore.enableLoading();
    return axios
      ?.post<CreateArticleResponse>("/articles", params, {
        headers: {
          Authorization: userToken(),
        },
      })
      .then(({ data }) => data)
      .catch(handleCatch("create"))
      .finally(() => {
        globalStore.disbleLoading();
      });
  }
  function getArticle(slug: string) {
    globalStore.enableLoading();
    return axios
      ?.get<FetchArticlesResponse>(`/articles/${slug}`, {
        headers: {
          Authorization: userToken(),
        },
      })
      .then(({ data }) => data)
      .catch(handleCatch("get"))
      .finally(() => {
        globalStore.disbleLoading();
      });
  }
  function updateArticle(slug: string, params: IUpdateArticleParams) {
    globalStore.enableLoading();
    return axios
      ?.put(`/articles/${slug}`, params, {
        headers: {
          Authorization: userToken(),
        },
      })
      .then(({ data }) => data)
      .catch(handleCatch("update"))
      .finally(() => {
        globalStore.disbleLoading();
      });
  }
  function deleteArticle(slug: string) {
    globalStore.enableLoading();
    return axios
      ?.delete(`/articles/${slug}`, {
        headers: {
          Authorization: userToken(),
        },
      })
      .catch(handleCatch("delete"))
      .finally(() => {
        globalStore.disbleLoading();
      });
  }

  return {
    fetchArticles,
    createArticle,
    getArticle,
    updateArticle,
    deleteArticle,
  };
}

const handleCatch =
  (method: "fetch" | "create" | "get" | "update" | "delete") =>
  (error: AxiosError<{}>) => {
    switch (method) {
      case "fetch": {
        handleFetchErrors();
        break;
      }
      case "create": {
        handleCreateErrors();
        break;
      }
      case "get": {
        handleGetErrors();
        break;
      }
      case "update": {
        handleUpdateErrors();
        break;
      }
      case "delete": {
        handleDeleteErrors();
        break;
      }
    }

    function handleFetchErrors() {
      switch (error.response?.status) {
        case 422: {
          const errors = getUnprocessableStatusErrors(error);
          errors.forEach((error) => {
            toast.error(`Get Articles Failed! ${error}`);
          });
          break;
        }
        default: {
          toast.error("Get Articles Failed!");
        }
      }
    }
    function handleCreateErrors() {
      switch (error.response?.status) {
        case 422: {
          const errors = getUnprocessableStatusErrors(error);
          errors.forEach((error) => {
            toast.error(`Create Articles Failed! ${error}`);
          });
          break;
        }
        default: {
          toast.error("Create Articles Failed!");
        }
      }
    }
    function handleGetErrors() {
      switch (error.response?.status) {
        case 422: {
          const errors = getUnprocessableStatusErrors(error);
          errors.forEach((error) => {
            toast.error(`Get Article Failed! ${error}`);
          });
          break;
        }
        default: {
          toast.error("Get Article Failed!");
        }
      }
    }
    function handleUpdateErrors() {
      switch (error.response?.status) {
        case 422: {
          const errors = getUnprocessableStatusErrors(error);
          errors.forEach((error) => {
            toast.error(`Update Article Failed! ${error}`);
          });
          break;
        }
        default: {
          toast.error("Update Article Failed!");
        }
      }
    }
    function handleDeleteErrors() {
      switch (error.response?.status) {
        case 422: {
          const errors = getUnprocessableStatusErrors(error);
          errors.forEach((error) => {
            toast.error(`Delete Article Failed! ${error}`);
          });
          break;
        }
        default: {
          toast.error("Delete Article Failed!");
        }
      }
    }

    return error;
  };
