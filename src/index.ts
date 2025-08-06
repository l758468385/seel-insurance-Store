import SeelWidget from './components/SeelWidget.svelte';

window.UIExtensionPointSimpleMgr.extend('CartContentsAfterSeelWidget', () => {
  const container = document.createElement('div');
  container.className = 'seel-widget-container';

  const initializeComponent = async () => {
    const {value: props} = await window.pollUntilAvailable(() => window.store?.state?.cart);
    // 这边还需要 根据接口来获取 报价
    new SeelWidget({
      target: container,
      props: {props}
    });

  };

  initializeComponent();
  return container;
});
