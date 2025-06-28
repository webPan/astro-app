/** 获取请求的头部信息 */
export const fetchRequestHeader = (): Promise<Headers> => {
  return fetch(`/manifest.json`, {
    method: "HEAD",
    cache: "no-cache",
  }).then((response) => response.headers);
};

/** 获取manifest.json文件 */
export const fetchManifestJson = () => {
  return fetch(`/manifest.json`, {
    method: "get",
    cache: "no-cache",
  }).then((response) => response.json());
};

/** 登录获取用户信息 */
export const getUserInfo = (data: Record<string, any>) => {
  return new Promise<Record<string, any>>((resolve, reject) => {
    resolve({
      ...data,
      id: "id",
      token: "xxx",
      nickname: data.username,
      profile: "xxx",
    });
  });
};
