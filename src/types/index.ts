import type { SDKType } from '@shop/entries-types';
import type {RawCartType} from "@shop/api-types";

// Seel 运费险相关类型定义

export interface SeelQuoteResponse {
  price: number;
  quote_id: string;
  currency?: string;
}

export interface SeelWidgetProps {
  cart?: any;
  customer?: any;
  showCurrencySelector?: boolean;
}

export interface SeelInsuranceParams {
  isAccepted: boolean;
  quote_id: string;
  quote: number;
}

export interface QuoteRequestPayload {
  // 根据实际API需求定义
  [key: string]: any;
}

// 扩展点相关类型
export interface ExtensionPointProps {
  [key: string]: any;
}

// 全局类型声明
declare global {
  interface Window {
    UIExtensionPointSimpleMgr: {
      extend: (pointName: string, callback: (props?: ExtensionPointProps) => HTMLElement | Promise<HTMLElement>) => void;
    };
    shopSDK: SDKType;
    store: {
      state: {
        cart: RawCartType;
        [key: string]: any;
      };
      watch: (getter: (state: any) => any, callback: (newValue: any, oldValue: any) => void) => void;
    };
    pollUntilAvailable: (checkFn: () => any, options?: { maxAttempts?: number; interval?: number }) => Promise<{ value: any }>;
    __app:any;
  }
}
