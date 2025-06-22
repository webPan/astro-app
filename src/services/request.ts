import axios from "axios";
import { message } from "antd";

const request = axios.create({
  baseURL: "/api/v1",
  timeout: 60000,
});
export let controller = new AbortController();

/** 添加请求拦截器 */
request.interceptors.request.use(
  (config) => {
    config.signal = controller.signal;
    return config;
  },
  async (error) => {
    return await Promise.reject(error);
  },
);

/** 添加响应拦截器 */
request.interceptors.response.use(
  (res) => {
    return new Promise((resolve, reject) => {
      if (res.data.success) {
        resolve(res.data.data);
      } else {
        message.error(res.data.message);
        reject();
      }
    });
  },
  async (error) => {
    if (controller.signal.aborted) {
      controller = new AbortController();
    }
    return await Promise.reject(error);
  },
);

/** POST 请求 */
export async function post<T>(
  url: string,
  data?: Record<string, any>,
  options?: object,
): Promise<T> {
  return await request(url, {
    method: "POST",
    data,
    ...options,
  });
}

/** GET 请求 */
export async function get<T>(
  url: string,
  params?: Record<string, any>,
  options?: object,
): Promise<T> {
  return await request(url, {
    method: "GET",
    params,
    ...options,
  });
}

/** DELETE 请求 */
export async function del<T>(
  url: string,
  params?: Record<string, any>,
  options?: object,
): Promise<T> {
  return await request(url, {
    method: "DELETE",
    params,
    ...options,
  });
}

/** PATCH 请求 */
export async function patch<T>(
  url: string,
  params?: Record<string, any>,
  options?: object,
): Promise<T> {
  return await request(url, {
    method: "PATCH",
    params,
    ...options,
  });
}

/**  PUT 请求 */
export async function put<T>(
  url: string,
  params?: Record<string, any>,
  options?: object,
): Promise<T> {
  return await request(url, {
    method: "PUT",
    params,
    ...options,
  });
}

/**
 * @description 将资源文件转换成内部链接
 * */
export const urlToBlob = async ({
  url,
  params,
  name,
  options,
}: {
  url: string;
  params?: any;
  name?: string;
  options?: object;
}): Promise<string> => {
  return await new Promise((resolve, reject) => {
    request(url, {
      method: "GET",
      responseType: "blob",
      params,
      ...options,
    })
      .then((data: any) => {
        resolve(window.URL.createObjectURL(data));
      })
      .catch(() => {
        reject(new Error());
      });
  });
};

export default request;
