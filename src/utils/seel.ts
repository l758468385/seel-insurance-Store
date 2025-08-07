import type { SeelQuoteResponse, QuoteRequestPayload } from '../types';
import { get } from 'svelte/store';
import {customer} from "../store/seel";

const CREATE_QUOTES_API =  'https://api-test.seel.com/v1/ecommerce/quotes'
const API_KEY = '1xcaluauh1xajfyvj4w6u5b20zlq3u98'
/**
 * 保留两位小数
 * @param {number | string} price
 * @returns {number}
 */
function formatPrice(price: number | string): number {
  const num = Number(price)
  return isNaN(num) ? 0 : Math.round(num * 100) / 100
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
  try {
    const res = await fetch(CREATE_QUOTES_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Seel-API-Key': API_KEY,
        'X-Seel-Api-Version': '2.6.0'
      },
      body: JSON.stringify(payload)
    });

    console.log('res:', res); // 可以打印 Response 对象（只包含元信息）

    if (!res.ok) {
      console.error('Failed to fetch quote:', res.status);
      return null;
    }

    const data = await res.json(); // ✅ 只读取一次
    console.log('Quote API response:', data);
    return data as SeelQuoteResponse;

  } catch (err) {
    console.error('Error creating quote:', err);
    return null;
  }
}


/**
 * 构建报价数据
 * @param cartData 购物车数据
 * @returns 报价请求载荷
 */
export function buildQuoteData(cartData: any): QuoteRequestPayload {
  console.log('cartData',cartData)

  const { hash, cart, currency, address = {}, shipping_total } = cartData

  const unitPrice = (total: number, quantity: number) => formatPrice(total / quantity)

  const line_items = Object.values(cart).map((item) => {
    // @ts-ignore
    const { key, product_id, variation_id, quantity, price, line_tax, line_total, categories, product, variant } =
        item

    const unitFinalPrice = unitPrice(line_total + line_tax, quantity)
    const unitSalesTax = unitPrice(line_tax, quantity)
    const unitAllocatedDiscount = formatPrice(price + unitSalesTax - unitFinalPrice)

    return {
      line_item_id: key,
      product_id,
      product_title: product?.title,
      variant_id: variation_id || product_id,
      variant_title: variant?.title || product?.title,
      quantity,
      price: formatPrice(price),
      sales_tax: unitSalesTax,
      final_price: unitFinalPrice,
      allocated_discounts: unitAllocatedDiscount,
      currency,
      requires_shipping: true,
      category_1: categories?.[0]?.name || '',
      category_2: categories?.[1]?.name || '',
      is_final_sale: false,
      condition: 'new',
      image_urls: [product?.feature_image?.url].filter(Boolean),
    }
  })

  return {
    type: 'ttdeye-wfp',
    cart_id: hash,
    session_id: hash,
    merchant_id: '20250709203702806565',
    is_default_on: false,
    device_category: getDeviceCategory(),
    device_platform: getDevicePlatform(),
    line_items,
    shipping_address: {
      address_1: address.address_1 || 'US',
      address_2: address.address_2 || 'US',
      city: address.city || 'US',
      state: address.state || 'US',
      zipcode: address.postcode || 'US',
      country: address.country || 'US',
    },
    customer: {
      customer_id: get(customer).id || address.email || localStorage.getItem('uuid') || '',
      email: get(customer).email || address.email || 'test@test.com',
    },
    extra_info: {
      shipping_fee: shipping_total || 0,
    },
  }
}

/**
 * 计算带符号的价格
 * @param price 价格数值
 * @returns 格式化的价格字符串
 */
export function computeSymbolPrice(price: number): number {
  // 主应用 vue 上自带的格式化金钱的方法
  return window.__app.computeSymbolPrice(price);
}

