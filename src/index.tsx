import { render } from 'preact';
import SeelWidget from '@/components/SeelWidget';

// 扩展购物车内容后的Seel运费险组件
window.UIExtensionPointSimpleMgr.extend('CartContentsAfterSeelWidget', () => {
	const container = document.createElement('div');
	container.className = 'seel-widget-container';
	const initializeComponent = async () => {
		const {value: props} = await window.pollUntilAvailable(() => window.store?.state?.cart);
		render(<SeelWidget props={props} />, container);
	};
	initializeComponent();
	return container;
});
