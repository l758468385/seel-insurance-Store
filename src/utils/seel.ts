import type { SeelQuoteResponse, QuoteRequestPayload } from '../types';

const CREATE_QUOTES_API =  'https://api-test.seel.com/v1/ecommerce/quotes'
const API_KEY = '1xcaluauh1xajfyvj4w6u5b20zlq3u98'

/**
 * 格式化价格显示
 * @param price 价格数值
 * @param currency 货币符号，默认为 '$'
 * @returns 格式化后的价格字符串
 */
export function formatPrice(price: number, currency: string = '$'): string {
  if (typeof price !== 'number' || isNaN(price)) {
    return `${currency}0.00`;
  }

  return `${currency}${price.toFixed(2)}`;
}

/**
 * 检查值是否为空
 * @param value 要检查的值
 * @returns 是否为空
 */
export function isEmpty(value: any): boolean {
  if (value === null || value === undefined) return true;
  if (typeof value === 'string') return value.trim() === '';
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === 'object') return Object.keys(value).length === 0;
  return false;
}

const ua = navigator.userAgent.toLowerCase()

/**
 * 获取设备类型
 * @returns 'mobile' | 'tablet' | 'desktop'
 */
export function getDeviceCategory() {
  if (/ipad|android(?!.*mobile)/.test(ua)) return 'tablet'
  if (/iphone|ipod|android.*mobile|windows phone/.test(ua)) return 'mobile'
  return 'desktop'
}

/**
 * 获取设备平台
 * @returns 'Android' | 'iOS' | 'Web'
 */
export function getDevicePlatform() {
  if (/android/.test(ua)) return 'Android'
  if (/iphone|ipad|ipod/.test(ua)) return 'iOS'
  return 'Web'
}

/**
 * 创建报价API请求
 * @param payload 请求载荷
 * @returns Promise<SeelQuoteResponse | null>
 */
export async function create_quotes_api(payload: QuoteRequestPayload): Promise<SeelQuoteResponse | null> {
  // 这里应该调用实际的API
  // 暂时返回模拟数据
  await new Promise(resolve => setTimeout(resolve, 500));

  return {
    price: 2.99,
    quote_id: 'quote_' + Date.now(),
    currency: '$'
  };
}

/**
 * 构建报价数据
 * @param cartData 购物车数据
 * @returns 报价请求载荷
 */
export function buildQuoteData(cartData: any): QuoteRequestPayload {
  return {
    cart_total: cartData?.total || 0,
    items: cartData?.items || [],
    currency: cartData?.currency || 'USD',
    device_category: getDeviceCategory(),
    device_platform: getDevicePlatform(),
    timestamp: Date.now()
  };
}

/**
 * 计算带符号的价格
 * @param price 价格数值
 * @param showCurrencySelector 是否显示货币选择器
 * @returns 格式化的价格字符串
 */
export function computeSymbolPrice(price: number, showCurrencySelector: boolean = false): string {
  // 这里可以根据实际需求实现货币符号逻辑
  const currency = showCurrencySelector ? getCurrencySymbol() : '$';
  return formatPrice(price, currency);
}

/**
 * 获取当前货币符号
 * @returns 货币符号
 */
function getCurrencySymbol(): string {
  // 可以从全局状态或配置中获取
  return '$';
}
