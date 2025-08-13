<script lang="ts">
  import type { LoadingSize } from "../types";

  export let size: LoadingSize = "medium";
  export let color: string = "";
  export let text: string = "";
  export let overlay: boolean = false;
  export let visible: boolean = true;

  // 尺寸映射
  const sizeMap = {
    small: "20px",
    medium: "32px",
    large: "48px",
  };

  $: loadingSize = sizeMap[size];
  $: loadingColor = color || "var(--seel-brand-color, #645aff)";
</script>

{#if visible}
  <div
    class="seel-loading"
    class:overlay
    role="status"
    aria-label={text || "Loading"}
  >
    <div class="seel-loading__container">
      <div
        class="seel-loading__spinner"
        style="width: {loadingSize}; height: {loadingSize}; border-color: {loadingColor}20; border-top-color: {loadingColor};"
      ></div>

      {#if text}
        <div class="seel-loading__text">{text}</div>
      {/if}
    </div>
  </div>
{/if}

<style lang="scss">
  @import "../styles/variables.scss";

  .seel-loading {
    display: inline-flex;
    align-items: center;
    justify-content: center;

    &.overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(255, 255, 255, 0.8);
      backdrop-filter: blur(2px);
      z-index: 9999;
    }

    &__container {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
    }

    &__text {
      font-size: 14px;
      color: $seel-text-color;
      text-align: center;
    }

    &__spinner {
      border: 3px solid;
      border-radius: 50%;
      animation: seel-spin 1s linear infinite;
      will-change: transform;
    }
  }

  @keyframes seel-spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  // 暗色主题支持
  @media (prefers-color-scheme: dark) {
    .seel-loading.overlay {
      background-color: rgba(0, 0, 0, 0.8);
    }

    .seel-loading__text {
      color: #ffffff;
    }
  }
</style>
