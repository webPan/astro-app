import { fetchRequestHeader } from "@/services/common.ts";
/**
 * @description 将tree数组拉平
 * @param data 需要拉平的tree
 * @param flatData 拉平后的数据
 * @param childrenKey 需要拉平的key
 * @param filter 过滤逻辑 只有为true才会被提取
 * @return flatData
 * */
export const flatTree = ({
  data = [],
  flatData = [],
  childrenKey = "routes",
  filter,
}: {
  data: Array<Record<string, any>>;
  flatData?: Array<Record<string, any>>;
  childrenKey?: string;
  filter?: (data: any) => boolean;
}) => {
  for (let i = 0; i < data.length; i++) {
    /** 过滤数据逻辑,filter 为true则数据提取 */
    if (typeof filter === "function") {
      if (!filter(data[i])) continue;
    }
    /** 递归主逻辑 */
    const children = data[i][childrenKey];
    if (children?.length) {
      flatData.push(data[i]);
      flatTree({ data: children, flatData, filter });
    } else {
      flatData.push(data[i]);
    }
  }
  return flatData;
};

/**
 * 根据路由生成面包屑需要用到的数据 -> 分类
 * {
 *     '/clientManagement/followUp':[{path:'/clientManagement',name:'客户管理'},{path:'/clientManagement/followUp',name:'线索管理'}]
 * }
 *
 * */
export const generateBreadcrumbs = (data: Record<string, any>[]) => {
  const breadcrumbs: Record<string, Record<string, any>> = {}; //递归
  const breadcrumbsRecursion = (data: Record<string, any>[]) => {
    data.forEach((item) => {
      breadcrumbs[item.path] = { path: item.path, name: item.name };
      /** 如果存在 children 继续往下递归 */
      if (item?.children?.length) {
        breadcrumbsRecursion(item.children);
      }
    });
  };
  breadcrumbsRecursion(data);
  return breadcrumbs;
};

/**
 * eTag管理
 * 服务器发版检测用
 * */
export const eTag = {
  init: (doNotCache?: boolean) => {
    return new Promise((resolve, reject) => {
      fetchRequestHeader().then((headers) => {
        const etag = headers.get("etag");
        if (!doNotCache) {
          eTag.set(etag);
        }
        resolve(etag);
      });
    });
  },
  //获取远程eTag
  getRemoteETag: () => {
    return new Promise((resolve, reject) => {
      eTag
        .init(true)
        .then((data) => {
          resolve(data);
        })
        .catch(() => {
          reject();
        });
    });
  },
  get get() {
    return window.localStorage.getItem("eTag") || "";
  },
  set: (value: string | null) => {
    value && window.localStorage.setItem("eTag", value);
  },
};

/**
 *  求min与max之间的随机数
 * */
export const rand = (min: number, max: number) => {
  return Math.round(Math.random() * (max - min)) + min;
};

/** 扁平化路由 */
export const flatRoutes = (
  routes: Record<string, any>[],
  data: Record<string, any> = {},
) => {
  routes.forEach((item) => {
    const { children, ...reset } = item;
    data[item.path] = reset;
    if (children?.length) {
      flatRoutes(children, data);
    }
  });
  return data;
};

export const token = {
  get() {
    return window.localStorage.getItem("token");
  },
  set: (value: string) => {
    window.localStorage.setItem("token", value);
  },
};
