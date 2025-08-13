# Loading 组件使用指南

## 概述

Loading 组件是一个轻量级、高性能的旋转加载指示器，专为插件环境优化设计。

## 特性

- 🚀 **高性能**: 使用纯 CSS 动画和 `will-change` 属性优化
- 📦 **轻量级**: 极简设计，代码体积小，适合插件使用
- 📱 **响应式**: 支持 3 种尺寸规格
- 🎯 **可访问性**: 内置 ARIA 标签支持
- 🌙 **主题支持**: 自动适配暗色模式
- ⚡ **无依赖**: 纯 CSS 动画，无外部依赖

## 基本用法

```svelte
<script>
  import Loading from './components/Loading.svelte';
</script>

<!-- 基本用法 -->
<Loading />

<!-- 带文本 -->
<Loading text="加载中..." />

<!-- 不同尺寸 -->
<Loading size="small" />
<Loading size="large" />

<!-- 自定义颜色 -->
<Loading color="#ff6b6b" />

<!-- 全屏遮罩 -->
<Loading overlay text="正在处理..." />
```

## Props 参数

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | 加载器尺寸 |
| `color` | `string` | `''` | 自定义颜色，默认使用主题色 |
| `text` | `string` | `''` | 显示的文本 |
| `overlay` | `boolean` | `false` | 是否显示为全屏遮罩 |
| `visible` | `boolean` | `true` | 是否显示组件 |

## 样式说明

### 动画样式

使用经典的旋转圆环（spinner）动画，简洁高效，适合所有使用场景。

### 性能优化

- 使用 `will-change` 属性优化动画性能
- 支持 `prefers-reduced-motion` 减少动画
- 遵循 60fps 动画原则
- 避免触发重排和重绘

### 无障碍访问

- 内置 `role="status"` 属性
- 自动设置 `aria-label`
- 支持屏幕阅读器

## 最佳实践

```svelte
<script>
  import Loading from './components/Loading.svelte';
  
  let isLoading = false;
  
  async function handleSubmit() {
    isLoading = true;
    try {
      await someAsyncOperation();
    } finally {
      isLoading = false;
    }
  }
</script>

<button on:click={handleSubmit} disabled={isLoading}>
  {#if isLoading}
    <Loading size="small" />
  {:else}
    提交
  {/if}
</button>

<!-- 全屏加载 -->
<Loading 
  overlay 
  visible={isLoading} 
  text="正在保存数据..." 
/>
```

## 样式定制

组件使用项目的 SCSS 变量，可通过修改以下变量来定制：

```scss
// 在 variables.scss 中
$seel-brand-color: #645aff;  // 主品牌色
$seel-text-color: #333;     // 文本颜色
```

或通过 CSS 变量：

```css
:root {
  --seel-brand-color: #your-color;
}
```
