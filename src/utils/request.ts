import { request } from "./index";

/* 获取旧订单列表 */
export const getOldOrderList = (page: number) => {
  return request("/api/store/shopify_orders", { page });
};

/* 根据 ID 获取旧订单详情 */
export const getOldOrderDetail = (orderId: string) => {
  return request(`/api/store/shopify_orders/${orderId}`);
};

/* 获取店铺配置 */
export const getStoreConfig = () => {
  return request("/api/store/config");
};
