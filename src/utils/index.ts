const baseUrl = import.meta.env.VITE_APP_API_PREFIX; // 接口前缀
const clientSecret = import.meta.env.VITE_APP_CLIENT_SECRET; // 客户端密钥

const defaultParams = {
  user: btoa(localStorage.getItem("login_email") || ""), // 只允许登录邮箱
  shop: window.location.hostname, // 获取当前 域名
};

/* 通用请求方法 */
/**
 * 通用请求方法
 * @param endpoint 接口路径
 * @param query 请求参数
 * @returns 请求结果
 */
export const request = async (
  endpoint: string,
  query: Record<string, any> = {}
) => {
  const params: Record<string, any> = {
    shop: defaultParams.shop,
    user: defaultParams.user,
    ...query,
  };

  // 如果需要添加 hmac，需要先计算
  if (clientSecret) {
    const message = keySort(params);
    params.hmac = await generateHMAC(message, clientSecret);
  }

  const url = `${baseUrl}${endpoint}?${keySort(params)}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      mode: "cors",
    });
    return await response.json();
  } catch (error) {
    console.error("Request error:", error);
    return null;
  }
};

/**
 * 使用 Web Crypto API 生成 HMAC-SHA256 签名。
 *
 * @param message 要签名的消息（字符串）。
 * @param secretKey 用于签名的密钥（字符串）。
 * @returns 返回一个 Promise，解析为 HMAC 签名的十六进制字符串。
 */
const generateHMAC = async (message: string, secretKey: string) => {
  // 1. 将密钥和消息转换为 ArrayBuffer
  const encoder = new TextEncoder(); // 用于将字符串编码为 Uint8Array
  const keyData = encoder.encode(secretKey);
  const messageData = encoder.encode(message);

  // 2. 导入密钥
  // importKey 方法用于将原始密钥数据导入为可用于加密操作的 CryptoKey 对象
  const key = await window.crypto.subtle.importKey(
    "raw", // 密钥格式：原始字节
    keyData,
    {
      name: "HMAC",
      hash: { name: "SHA-256" }, // 指定哈希算法为 SHA-256
    },
    false, // 是否可导出（这里不需要导出）
    ["sign"] // 密钥用途：用于签名
  );

  // 3. 使用密钥签名消息
  // sign 方法执行 HMAC 签名操作
  const signatureBuffer = await window.crypto.subtle.sign(
    "HMAC", // 签名算法的名称
    key, // 之前导入的 CryptoKey 对象
    messageData // 要签名的消息数据
  );

  // 4. 将签名的 ArrayBuffer 转换为十六进制字符串
  const signatureArray = Array.from(new Uint8Array(signatureBuffer));
  return signatureArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
};

/**
 * 按键名排序并生成参数字符串
 * @param obj 参数对象
 * @returns 排序后的参数字符串
 */
const keySort = (obj: Record<string, any>) => {
  return Object.keys(obj)
    .sort()
    .map((key) => `${key}=${obj[key]}`)
    .join("&");
};
