import SeelWidget from "./components/SeelWidget.svelte";
import SeelBanner from "./components/SeelBanner.svelte";
import SeelCustomerHelp from "./components/SeelCustomerHelp.svelte";

import { initializeSeelWidget } from "./store/seel";

// 抽屉购物车内容区域的最底部（快捷支付区域的下方）
window.UIExtensionPointSimpleMgr.extend("CartContentsEnd", () => {
  const container = document.createElement("div");
  container.className = "seel-widget-container";

  const initializeComponent = async () => {
    const { value: cartData } = await window.pollUntilAvailable(
      () => window.store?.state?.cart
    );

    // 先初始化 Seel 组件状态
    initializeSeelWidget({
      cartData: cartData,
      customer: window.store.state?.customer || {},
      showCurrencySelector:
        window.store.state.options.theme?.global?.show_currency_selector,
    });

    new SeelWidget({
      target: container,
    });
  };

  initializeComponent();
  return container;
});

// 购物车页顶部渲染运费险组件(仅PC端)
window.UIExtensionPointSimpleMgr.extend("CartPageContentsBefore", () => {
  const container = document.createElement("div");
  container.className = "seel-widget-container";

  const initializeComponent = async () => {
    const { value: cartData } = await window.pollUntilAvailable(
      () => window.store?.state?.cart,
      { interval: 200, maxAttempts: 20 }
    );

    // 先初始化 Seel 组件状态
    initializeSeelWidget({
      cartData: cartData,
      customer: window.store.state?.customer || {},
      showCurrencySelector:
        window.store.state.options.theme?.global?.show_currency_selector,
    });

    new SeelWidget({
      target: container,
      props: {
        pointName: "CartPageContentsBefore",
      },
    });
  };

  initializeComponent();
  return container;
});

// 购物车页运费险组件(快捷支付下方 仅移动端)
window.UIExtensionPointSimpleMgr.extend("CartPageContentEnd", () => {
  const container = document.createElement("div");
  container.className = "seel-widget-container";

  const initializeComponent = async () => {
    const { value: cartData } = await window.pollUntilAvailable(
      () => window.store?.state?.cart
    );

    // 先初始化 Seel 组件状态
    initializeSeelWidget({
      cartData: cartData,
      customer: window.store.state?.customer || {},
      showCurrencySelector:
        window.store.state.options.theme?.global?.show_currency_selector,
    });

    new SeelWidget({
      target: container,
      props: {
        pointName: "CartPageContentEnd",
      },
    });
  };

  initializeComponent();
  return container;
});

// 渲染产品页欢迎横幅
window.UIExtensionPointSimpleMgr.extend("SalesFeaturesAfter", () => {
  const container = document.createElement("div");
  container.className = "seel-banner-container";
  new SeelBanner({
    target: container,
  });
  return container;
});

// thank you 页面客服中心入口
window.UIExtensionPointSimpleMgr.extend("ThankYouAfterOrderTrack", () => {
  const container = document.createElement("div");
  container.className = "seel-customer-help-container";
  new SeelCustomerHelp({
    target: container,
  });
  return container;
});

// 订单详情页客服中心入口
window.UIExtensionPointSimpleMgr.extend("OrderDetailBeforeTable", (props) => {
  const container = document.createElement("div");
  container.className = "seel-customer-help-container";
  new SeelCustomerHelp({
    target: container,
    props: {
      pointName: "OrderDetailBeforeTable",
    },
  });
  return container;
});
