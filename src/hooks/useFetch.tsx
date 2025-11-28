import {
  useQuery,
  useMutation,
  UseQueryResult,
  UseMutationResult,
} from "@tanstack/react-query";
import axios, { AxiosRequestConfig } from "axios";
import urls from "../urls/urls.json";
import { environment } from "../environment/environment";
import { toast } from "react-toastify";
interface UseFetchArgs {
  id?: string;
  url?: string;
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  body?: any;
  params?: Record<string, any>;
  enabled?: boolean;
}

let logoutCallback: () => void;
let notFoundCallback: () => void;

export function setLogoutCallback(callback: () => void) {
  logoutCallback = callback;
}

export function setNotFoundCallback(callback: () => void) {
  notFoundCallback = callback;
}

export const fetcher = async ({
  url,
  method = "GET",
  body,
  params,
}: UseFetchArgs) => {
  if (!url) throw new Error("URL is required for fetching");

  const token = (() => {
    try {
      const storedToken = localStorage.getItem("token");
      return storedToken ? JSON.parse(storedToken) : "";
    } catch (error) {
      console.error("Error parsing token from localStorage", error);
      return "";
    }
  })();

  const config: AxiosRequestConfig = {
    url: environment?.serverUrl + url,
    method,
    headers: {},
    ...(method !== "GET" && { data: body }),
    params,
  };

  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
  }

  try {
    const response = await axios(config);
    return response.data;
  } catch (error: any) {
    toast.error(
      error.response?.data?.message["en"] ||
        error.response?.data?.message?.message ||
        error.response?.data?.message?.message[0]
    );
    if (error.response?.status === 401 && logoutCallback) {
      logoutCallback();
    } else {
      notFoundCallback();
    }
    throw error;
  }
};

export function useQueryFetch({
  id,
  url,
  params = {},
  enabled = true,
}: Pick<UseFetchArgs, "id" | "url" | "params" | "enabled">): UseQueryResult<
  any,
  any
> {
  const objectData: any = urls.find((item: any) => item.id === id);
  const isLocal = objectData?.type === "local";
  const paramsKey = JSON.stringify(params);

  return useQuery({
    queryKey: [url || id || "default", paramsKey],
    queryFn: async () => {
      if (isLocal) return objectData;
      if (!url) throw new Error("URL is required for fetching");
      return fetcher({ url, method: "GET", params });
    },
    enabled: (!!url || isLocal) && enabled,
    retry: false,
  });
}

export function useMutationFetch({
  url,
  method = "POST",
}: Pick<UseFetchArgs, "url" | "method">): UseMutationResult<
  any,
  any,
  any,
  unknown
> {
  if (!url) throw new Error("URL is required for mutation");

  return useMutation({
    mutationFn: (body: any) => fetcher({ url, method, body }),
  });
}
