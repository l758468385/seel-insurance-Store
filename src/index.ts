import SeelWidget from './components/SeelWidget.svelte';
import { initializeSeelWidget } from './store/seel';
import SeelBanner from "./components/SeelBanner.svelte";
import SeelCustomerHelp from "./components/SeelCustomerHelp.svelte";


// 抽屉购物车底部运费险小组件
window.UIExtensionPointSimpleMgr.extend('CartContentsAfterSeelWidget', () => {
  const container = document.createElement('div');
  container.className = 'seel-widget-container';

  const initializeComponent = async () => {
    const {value: cartData} = await window.pollUntilAvailable(() => window.store?.state?.cart);

    console.log('入口文件：购物车数据 cartData', cartData);

    // 先初始化 Seel 组件状态
    initializeSeelWidget({
      cartData: cartData,
      customer: window.store.state?.customer || {},
      showCurrencySelector: window.store.state.options.theme?.global?.show_currency_selector,
    });

    // 然后创建 Svelte 组件
    new SeelWidget({
      target: container,
    });
  };

  initializeComponent();
  return container;
});

// 购物车页顶部渲染运费险组件(仅PC端)
window.UIExtensionPointSimpleMgr.extend('CartPageRightTopSeelWidget', () => {
  const container = document.createElement('div');
  container.className = 'seel-widget-container';

  const initializeComponent = async () => {
    const {value: cartData} = await window.pollUntilAvailable(() => window.store?.state?.cart);

    console.log('入口文件：购物车数据 cartData', cartData);

    // 先初始化 Seel 组件状态
    initializeSeelWidget({
      cartData: cartData,
      customer: window.store.state?.customer || {},
      showCurrencySelector: window.store.state.options.theme?.global?.show_currency_selector,
    });

    // 然后创建 Svelte 组件
    new SeelWidget({
      target: container,
    });
  };

  initializeComponent();
  return container;
});

// 渲染购物车页运费险组件(快捷支付下方 仅移动端)
window.UIExtensionPointSimpleMgr.extend('CartPageAfterContentSeelWidget', () => {
  const container = document.createElement('div');
  container.className = 'seel-widget-container';

  const initializeComponent = async () => {
    const {value: cartData} = await window.pollUntilAvailable(() => window.store?.state?.cart);

    console.log('入口文件：购物车数据 cartData', cartData);

    // 先初始化 Seel 组件状态
    initializeSeelWidget({
      cartData: cartData,
      customer: window.store.state?.customer || {},
      showCurrencySelector: window.store.state.options.theme?.global?.show_currency_selector,
    });

    // 然后创建 Svelte 组件
    new SeelWidget({
      target: container,
    });
  };

  initializeComponent();
  return container;
});

// 渲染产品页欢迎横幅
window.UIExtensionPointSimpleMgr.extend('SalesFeaturesAfterSeelWidget', () => {
  const container = document.createElement('div');
  container.className = 'seel-banner-container';
  new SeelBanner({
    target: container,
  });
  return container;
});



// thank you 页面客服中心入口
window.UIExtensionPointSimpleMgr.extend('ThankYouAfterOrderTrackSeelWidget', () => {
  const container = document.createElement('div');
  container.className = 'seel-customer-help-container';
  new SeelCustomerHelp({
    target: container,
  });
  return container;
});


// 订单详情页客服中心入口
window.UIExtensionPointSimpleMgr.extend('OrderDetailBeforeTableSeelWidget', () => {
  const container = document.createElement('div');
  container.className = 'seel-customer-help-container';
  new SeelCustomerHelp({
    target: container,
  });
  return container;
});
