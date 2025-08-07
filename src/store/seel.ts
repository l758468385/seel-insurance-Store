import {writable, derived} from 'svelte/store';
import {create_quotes_api, buildQuoteData, computeSymbolPrice, isEmpty} from '../utils/seel';
import type {SeelQuoteResponse, SeelInsuranceParams} from '../types';
import type {RawCartType} from "@shop/api-types";

// 基础状态
export let isShowSeelWidget = writable<boolean>(true);
export const hasSubscribed = writable<boolean>(false);
export const isAccepted = writable<boolean>(false);
export const responseBody = writable<SeelQuoteResponse | null>(null);

// 购物车和客户信息（从扩展点props获取）
export const cart = writable(null);
export const customer = writable<any>({});
export const showCurrencySelector = writable<boolean>(false);

// 主应用的货币类型状态
export const mainAppPriceType = writable<string>('USD');

// 派生状态：格式化的价格
export const price = derived(
  [responseBody, mainAppPriceType, showCurrencySelector],
  ([$responseBody, $mainAppPriceType, $showCurrencySelector]) => {
    const currentPrice = $responseBody?.price || 0;
    return computeSymbolPrice(currentPrice, $showCurrencySelector, $mainAppPriceType);
  }
);

// 派生状态：是否显示组件
export const shouldShowWidget = derived(
  [isShowSeelWidget, responseBody],
  ([$isShowSeelWidget, $responseBody]) => {
    return $isShowSeelWidget && $responseBody && $responseBody.price;
  }
);

/**
 * 创建报价
 */
export async function createQuotes(cartData: RawCartType): Promise<void> {

  const quoteData = buildQuoteData(cartData);
  const response = await create_quotes_api(quoteData);
  console.log('response',response)
  if (response) {
    responseBody.set(response);
  }
}

/**
 * 设置 Seel 运费险
 * @param params 运费险参数
 */
export async function setSeelShippingInsurance(params: SeelInsuranceParams): Promise<void> {
  // 这里应该调用实际的API来设置运费险
  await new Promise(resolve => setTimeout(resolve, 300));
}

/**
 * 处理运费险变化
 * @param accepted 是否接受运费险
 */
export async function handleChange(accepted: boolean): Promise<void> {
  isAccepted.set(accepted);

  const {get} = await import('svelte/store');
  const currentResponseBody = get(responseBody);

  if (currentResponseBody) {
    await setSeelShippingInsurance({
      isAccepted: accepted,
      quote_id: currentResponseBody.quote_id,
      quote: currentResponseBody.price
    });
  }
}

/**
 * 监听主应用货币类型变化
 */
export function watchMainAppPriceType(): void {
  // 初始化当前货币类型
  if (window.store?.state?.pricetype) {
    mainAppPriceType.set(window.store.state.pricetype);
  }

  // 如果主应用使用 Vuex，监听状态变化
  if (window.store?.watch) {
    window.store.watch(
      (state: any) => state.pricetype,
      (newPriceType: string) => {
        console.log('主应用货币类型变化:', newPriceType);
        mainAppPriceType.set(newPriceType);
      }
    );
  }
}

/**
 * 订阅购物车变化
 */
export function subscribeCartChange(): void {

  window.shopSDK.register(['analytics'], ({analytics}) => {
    const updateQuote = (ev: any) => createQuotes(ev.data.cart)
    const hideWidget = async (ev: any) => {
      if (isEmpty(ev.data.cart.cart)) {
        isShowSeelWidget.set(false)
        // 这里应该调用后端接口删除seel报价
        return
      }
      await createQuotes(ev.data.cart)
    }

    const quoteEvents = [
      'product_changed_quantity_from_cart',
      'product_batch_changed_quantity_from_cart',
      'product_added_to_cart',
      'product_batch_added_to_cart',
    ];

    const removeEvents = ['product_removed_from_cart', 'product_batch_removed_from_cart']

    quoteEvents.forEach((event) => {
      analytics.event.subscribe(event as any, updateQuote)
    })

    removeEvents.forEach((event) => {
      analytics.event.subscribe(event as any, hideWidget)
    })
  })
}

/**
 * 初始化 Seel 组件
 * @param props 从扩展点传入的props
 */
export function initializeSeelWidget(props: any): void {
  // 初始化购物车和客户信息
  cart.set(props.cartData || props.cart);
  customer.set(props.customer || {});
  showCurrencySelector.set(props.showCurrencySelector || false);

  // 监听主应用货币类型变化
  watchMainAppPriceType();

  setTimeout(() => createQuotes(props.cartData || props.cart), 100);
  subscribeCartChange();
}
