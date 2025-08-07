<script lang="ts">
  import CheckBox from './CheckBox.svelte';
  import { shouldShowWidget, isAccepted, price, handleChange } from '../store/seel';

  // 所有状态都是全局共享的，多个组件实例会自动同步
  $: showWidget = $shouldShowWidget;
  $: accepted = $isAccepted;
  $: formattedPrice = $price;

  export let pointName: string = ''
</script>

{#if showWidget}
  <div class={`seel-widget ${pointName}`}>
    <CheckBox
      checked={accepted}
      onChange={handleChange}
      class="seel-widget__checkbox"
    />

    <div class="seel-widget__content">
      <div class="seel-widget__title">
        <span class="seel-widget__title-text">Worry-Free Delivery</span>&nbsp;
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


.CartPageAfterContentSeelWidget {
  margin: 20px 10px 0 10px;
}


.CartPageRightTopSeelWidget {
  margin: 0 20px 10px 20px;
}

</style>
