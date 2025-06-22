/** 获取请求的头部信息 */
export const fetchRequestHeader = (): Promise<Headers> => {
  return fetch(`/manifest.json`, {
    method: 'HEAD',
    cache: 'no-cache'
  }).then((response) => response.headers);
};

/** 获取manifest.json文件 */
export const fetchManifestJson = () => {
  return fetch(`/manifest.json`, {
    method: 'get',
    cache: 'no-cache'
  }).then((response) => response.json());
};
