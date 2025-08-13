<script lang="ts">
  import CheckBox from "./CheckBox.svelte";


  import {
    shouldShowWidget,
    isAccepted,
    price,
    handleChange,
  } from "../store/seel";

  export let pointName: string = "";
</script>

{#if $shouldShowWidget}
  <div class={`seel-widget ${pointName}`}>
    <CheckBox
      checked={$isAccepted}
      onChange={handleChange}
      class="seel-widget__checkbox"
    />

    <div class="seel-widget__content">
      <div class="seel-widget__title">
        <span class="seel-widget__title-text">Worry-Free Delivery</span>&nbsp;
        <span class="seel-widget__title-price">
          for {$price}
        </span>
      </div>
      <span class="seel-widget__desc">
        Get a full refund if the order doesn't arrive as described, including
        loss & damage in transit
      </span>
      <div class="seel-widget__powered">
        Powered by <span class="seel-widget__brand">seel</span>
      </div>
    </div>
  </div>
{/if}



<style lang="scss">
  @use "../styles/variables.scss" as vars;

  .seel-widget {
    display: flex;
    margin-top: 20px;
    border: 1px solid vars.$seel-border-color;
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
      color: vars.$seel-text-color;
      line-height: 24px;
      font-size: 16px;
      margin-bottom: 8px;

      &-text {
        font-weight: 600;
      }
    }

    &__desc {
      font-size: 14px;
      color: vars.$seel-desc-color;
      line-height: 150%;
      padding-bottom: 4px;
    }

    &__powered {
      font-size: 12px;
      color: vars.$seel-powered-color;
      line-height: 150%;
    }

    &__brand {
      color: vars.$seel-brand-color;
    }
  }

  .CartPageContentEnd {
    margin: 20px 10px 0 10px;
  }

  .CartPageContentsBefore {
    margin: 0 20px 10px 20px;
  }
</style>
