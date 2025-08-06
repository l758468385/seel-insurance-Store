import { render } from 'preact';
import SeelWidget from '@/components/SeelWidget';
import '@/styles/global.scss';

// Polyfill for pollUntilAvailable if not available
function pollUntilAvailable<T>(
  checkFn: () => T, 
  options: { timeout?: number; interval?: number } = {}
): Promise<{ value: T }> {
  const { timeout = 5000, interval = 100 } = options;
  
  return new Promise((resolve, reject) => {
    const startTime = Date.now();
    
    const poll = () => {
      const result = checkFn();
      if (result) {
        resolve({ value: result });
        return;
      }
      
      if (Date.now() - startTime > timeout) {
        reject(new Error('Polling timeout'));
        return;
      }
      
      setTimeout(poll, interval);
    };
    
    poll();
  });
}

// 扩展购物车内容后的Seel运费险组件
UIExtensionPointSimpleMgr.extend('CartContentsAfterSeelWidget', (extensionProps) => {
  const container = document.createElement('div');
  container.className = 'seel-widget-container';
  
  const initializeComponent = async () => {
    const pollFn = window.pollUntilAvailable || pollUntilAvailable;
    const {value: props} = await pollFn(() => window.store?.state?.cart);
    
    render(<SeelWidget props={props} />, container);
  };

  initializeComponent();
  return container;
});
