<script lang="ts">
  import { onMount } from 'svelte';
  import CheckBox from './CheckBox.svelte';
  import {
    shouldShowWidget,
    isAccepted,
    price,
    handleChange,
    initializeSeelWidget
  } from '../store/seel';

  // 从扩展点传入的props
  export let props: any = {};

  // 响应式变量
  $: showWidget = $shouldShowWidget;
  $: accepted = $isAccepted;
  $: formattedPrice = $price;

  // 处理复选框变化
  function onCheckboxChange(checked: boolean) {
    handleChange(checked);
  }

  // 组件挂载时初始化
  onMount(() => {
    initializeSeelWidget(props);
  });
</script>

{#if showWidget}
  <div class="seel-widget">
    <CheckBox
      checked={accepted}
      onChange={onCheckboxChange}
      class="seel-widget__checkbox"
    />

    <div class="seel-widget__content">
      <div class="seel-widget__title">
        <span class="seel-widget__title-text">Worry-Free Delivery</span>
        <span class="seel-widget__title-price">
          for {formattedPrice}
        </span>
      </div>
      <span class="seel-widget__desc">
        Get a full refund if the order doesn't arrive as described, including loss & damage in transit
      </span>
      <div class="seel-widget__powered">
        Powered by <span class="seel-widget__brand">seel</span>
      </div>
    </div>
  </div>
{/if}

<style lang="scss">
.seel-widget {
  display: flex;
  margin-top: 20px;
  border: 1px solid #d6d7da;
  padding: 12px;
  border-radius: 5px;

  :global(.seel-widget__checkbox) {
    margin-right: 12px;
    margin-top: 4px;
  }

  &__content {
    flex: 1;
  }

  &__title {
    display: flex;
    align-items: center;
    color: #333;
    line-height: 24px;
    font-size: 16px;
    margin-bottom: 8px;

    &-text {
      font-weight: 600;
    }

    &-price {
      margin-left: 4px;
    }
  }

  &__desc {
    font-size: 14px;
    color: #333;
    line-height: 150%;
    padding-bottom: 4px;
  }

  &__powered {
    font-size: 12px;
    color: #909399;
    line-height: 150%;
  }

  &__brand {
    color: #645aff;
  }
}
</style>
