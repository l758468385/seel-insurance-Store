import SeelWidget from './components/SeelWidget.svelte';
import { initializeSeelWidget } from './store/seel';

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
