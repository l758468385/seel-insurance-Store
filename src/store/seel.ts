import { writable, derived } from 'svelte/store';
import { create_quotes_api, buildQuoteData, computeSymbolPrice, isEmpty } from '../utils/seel';
import type { SeelQuoteResponse, SeelInsuranceParams } from '../types';
import type { RawCartType } from "@shop/api-types";

// ===== 全局状态管理 =====
// 这些状态在所有 SeelWidget 组件间共享，确保状态统一

// 组件显示状态
export const isShowSeelWidget = writable<boolean>(true);
export const isAccepted = writable<boolean>(false);
export const responseBody = writable<SeelQuoteResponse | null>(null);

// 购物车和用户信息
export const cart = writable<RawCartType | null>(null);
export const customer = writable<any>({});

// 货币相关状态
export const showCurrencySelector = writable<boolean>(false);
export const mainAppPriceType = writable<string>('USD');

// 初始化状态
let isInitialized = false;

// ===== 派生状态 =====
// 这些状态会自动响应基础状态的变化

export const price = derived(
  [responseBody, mainAppPriceType, showCurrencySelector],
  ([$responseBody, $mainAppPriceType, $showCurrencySelector]) => {
    const currentPrice = $responseBody?.price || 0;
    return computeSymbolPrice(currentPrice, $showCurrencySelector, $mainAppPriceType);
  }
);

export const shouldShowWidget = derived(
  [isShowSeelWidget, responseBody],
  ([$isShowSeelWidget, $responseBody]) => {
    return $isShowSeelWidget && $responseBody && $responseBody.price;
  }
);

// ===== 核心业务逻辑 =====

export async function createQuotes(cartData: RawCartType): Promise<void> {
  if (!cartData) return;

  const quoteData = buildQuoteData(cartData);
  const response = await create_quotes_api(quoteData);

  if (response) {
    responseBody.set(response);
  }
}

export async function handleChange(accepted: boolean): Promise<void> {
  isAccepted.set(accepted);

  const { get } = await import('svelte/store');
  const currentResponseBody = get(responseBody);

  if (currentResponseBody) {
    await setSeelShippingInsurance({
      isAccepted: accepted,
      quote_id: currentResponseBody.quote_id,
      quote: currentResponseBody.price
    });
  }
}

async function setSeelShippingInsurance(params: SeelInsuranceParams): Promise<void> {
  await new Promise(resolve => setTimeout(resolve, 300));
}

// ===== 事件监听和初始化 =====

function watchMainAppPriceType(): void {
  if (window.store?.state?.pricetype) {
    mainAppPriceType.set(window.store.state.pricetype);
  }

  if (window.store?.watch) {
    window.store.watch(
      (state: any) => state.pricetype,
      (newPriceType: string) => mainAppPriceType.set(newPriceType)
    );
  }
}

function subscribeCartChange(): void {
  if (!window.shopSDK) return;

  window.shopSDK.register(['analytics'], ({ analytics }) => {
    analytics.data.cart.onChange((cartData: any) => {
      const { cart } = cartData || {};
      console.log('cart changed', isEmpty(cart));
      if (isEmpty(cart)) {
        // 这边应该也需要去请求一个接口去取消运费险
        isShowSeelWidget.set(false);
        return;
      }
      createQuotes(cartData);
    });
  });
}

// ===== 公共初始化函数 =====
// 确保多个组件实例共享同一状态，只初始化一次

export function initializeSeelWidget(props: any): void {
  // 防止重复初始化
  if (isInitialized) return;

  cart.set(props.cartData || props.cart);
  customer.set(props.customer || {});
  showCurrencySelector.set(props.showCurrencySelector || false);

  watchMainAppPriceType();
  subscribeCartChange();

  setTimeout(() => createQuotes(props.cartData || props.cart), 100);

  isInitialized = true;
}
