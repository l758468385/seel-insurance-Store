import { JSX } from 'preact';
import { useEffect } from 'preact/hooks';
import CheckBox from './CheckBox';
import {
  shouldShowWidget,
  isAccepted,
  price,
  handleChange,
  initializeSeelWidget
} from '@/store/seel';
import './SeelWidget.scss';

interface SeelWidgetProps {
  props: any;
}

export default function SeelWidget({ props }: SeelWidgetProps): JSX.Element | null {
  const showWidget = shouldShowWidget.value;
  const accepted = isAccepted.value;
  const formattedPrice = price.value;

  const onCheckboxChange = (checked: boolean) => {
    handleChange(checked);
  };

  useEffect(() => {
    initializeSeelWidget(props);
  }, [props]);

  if (!showWidget) {
    return null;
  }

  return (
    <div className="seel-widget">
      <CheckBox
        checked={accepted}
        onChange={onCheckboxChange}
      />

      <div className="seel-widget__content">
        <div className="seel-widget__title">
          <span className="seel-widget__title-text">Worry-Free Delivery</span>
          <span className="seel-widget__title-price">
            for {formattedPrice}
          </span>
        </div>
        <span className="seel-widget__desc">
          Get a full refund if the order doesn't arrive as described, including loss & damage in transit
        </span>
        <div className="seel-widget__powered">
          Powered by <span className="seel-widget__brand">seel</span>
        </div>
      </div>
    </div>
  );
}
