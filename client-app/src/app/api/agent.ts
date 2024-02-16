import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "sonner";

import { Activity } from "../types/activity";
import { Routes } from "../router/Routes";

const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

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
  list: () => requests.get<Activity[]>("/activities"),
  details: (id: string) => requests.get<Activity>(`/activities/${id}`),
  create: (activity: Activity) => requests.post("/activities", activity),
  update: (activity: Activity) =>
    requests.put(`/activities/${activity.id}`, activity),
  delete: (id: string) => requests.del(`/activities/${id}`),
};

const agent = {
  Activities,
};
export default agent;
