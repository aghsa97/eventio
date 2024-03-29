import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "sonner";

import { IActivity } from "../types/activity";
import { Routes } from "../router/Routes";
import { User, UserFormValues } from "@/features/users/user";
import { store } from "../stores/store";

const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

axios.interceptors.request.use((config) => {
  const token = store.commonStore.token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axios.defaults.baseURL = "http://localhost:5000/api";
axios.interceptors.response.use(
  async (response) => {
    await sleep(1000);
    return response;
  },
  (erorr: AxiosError) => {
    const { data, status, config } = erorr.response as AxiosResponse;
    switch (status) {
      case 400:
        if (
          config.method === "get" &&
          Object.prototype.hasOwnProperty.call(data.errors, "id")
        ) {
          Routes.navigate("/not-found");
        }
        toast.error("bad request");
        break;
      case 401:
        toast.error("unauthorised");
        break;
      case 404:
        Routes.navigate("/not-found");
        break;
      case 500:
        toast.error("server error");
        break;
    }
    return Promise.reject(erorr);
  }
);

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: (url: string, body: object) => axios.post(url, body).then(responseBody),
  put: (url: string, body: object) => axios.put(url, body).then(responseBody),
  del: (url: string) => axios.delete(url).then(responseBody),
};

const Activities = {
  list: () => requests.get<IActivity[]>("/activities"),
  details: (id: string) => requests.get<IActivity>(`/activities/${id}`),
  create: (activity: IActivity) => requests.post("/activities", activity),
  update: (activity: IActivity) =>
    requests.put(`/activities/${activity.id}`, activity),
  delete: (id: string) => requests.del(`/activities/${id}`),
  attend: (id: string) => requests.post(`/activities/${id}/attend`, {}),
};

const Account = {
  current: () => requests.get<User>("/account"),
  login: (user: UserFormValues) => requests.post("/account/login", user),
  register: (user: UserFormValues) => requests.post("/account/register", user),
};

const agent = {
  Activities,
  Account,
};
export default agent;
