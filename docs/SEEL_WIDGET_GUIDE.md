# Seel Widget Svelte 组件使用指南

## 概述

这是一个基于原Vue组件 `SeelWidget.vue` 重新实现的Svelte版本运费险组件。该组件通过扩展点 `CartContentsAfterSeelWidget` 集成到主项目中，提供运费险选择功能。

## 功能特性

- ✅ 运费险选择/取消功能
- ✅ 实时价格显示和格式化
- ✅ 购物车变化监听
- ✅ 响应式设计
- ✅ 样式隔离，避免与主项目冲突
- ✅ TypeScript 支持
- ✅ 错误处理和日志记录

## 组件结构

```
src/
├── components/
│   ├── CheckBox.svelte          # 自定义复选框组件
│   ├── SeelWidget.svelte        # 主要的运费险组件
│   └── SeelWidget.vue           # 原Vue组件（参考）
├── store/
│   └── seel.ts                  # Svelte store状态管理
├── utils/
│   └── seel.ts                  # Seel相关工具函数
├── types/
│   └── index.ts                 # TypeScript类型定义
├── styles/
│   └── global.scss              # 全局样式
└── index.ts                     # 入口文件
```

## 主要组件说明

### SeelWidget.svelte
主要的运费险组件，包含：
- 运费险选择复选框
- 价格显示
- 描述文本
- 品牌标识

### CheckBox.svelte
自定义复选框组件，模拟Element UI的el-checkbox样式和行为。

### Store (seel.ts)
使用Svelte的store管理组件状态：
- `isAccepted`: 是否接受运费险
- `responseBody`: API响应数据
- `price`: 格式化的价格
- `shouldShowWidget`: 是否显示组件

## API接口

### 主要函数

#### `createQuotes()`
创建运费险报价
```typescript
await createQuotes();
```

#### `setSeelShippingInsurance(params)`
设置运费险状态
```typescript
await setSeelShippingInsurance({
  isAccepted: true,
  quote_id: 'quote_123',
  quote: 2.99
});
```

#### `handleChange(accepted)`
处理运费险选择变化
```typescript
await handleChange(true); // 接受运费险
```

## 扩展点集成

组件通过 `UIExtensionPointSimpleMgr.extend` 集成：

```typescript
UIExtensionPointSimpleMgr.extend('CartContentsAfterSeelWidget', (props) => {
  const container = document.createElement('div');
  const seelWidget = new SeelWidget({
    target: container,
    props: { props }
  });
  return container;
});
```

## 样式说明

### CSS变量
组件使用CSS变量确保主题兼容性：
```scss
:root {
  --main-btn-bg: #409eff;        // 主按钮背景色
  --seel-border-color: #d6d7da;  // 边框颜色
  --seel-text-color: #333;       // 文本颜色
  --seel-brand-color: #645aff;   // 品牌色
}
```

### 样式隔离
- 使用 `seel-widget-container` 类名包装
- 通过Vite配置的 `cssHash` 实现样式隔离
- `emitCss: false` 确保CSS内联到JS中

## 开发和构建

### 开发模式
```bash
npm run dev
# 或
yarn dev
```

### 构建生产版本
```bash
npm run build
# 或
yarn build
```

### 类型检查
```bash
npm run check
# 或
yarn check
```

## 与Vue版本的差异

| 特性 | Vue版本 | Svelte版本 |
|------|---------|------------|
| 状态管理 | Vuex + computed | Svelte stores + derived |
| 生命周期 | mounted | onMount |
| 响应式 | Vue响应式系统 | Svelte响应式语法 |
| 组件通信 | props + emit | props + callbacks |
| 样式 | scoped CSS | CSS隔离 + 全局变量 |

## 错误处理

组件包含完善的错误处理：
- API调用失败时的fallback
- 组件初始化失败时的错误显示（开发环境）
- 控制台日志记录

## 注意事项

1. **扩展点依赖**: 确保主项目提供了 `UIExtensionPointSimpleMgr` 全局对象
2. **样式兼容**: 组件使用CSS变量，确保主项目定义了相关变量
3. **API集成**: 当前使用模拟数据，需要根据实际API调整 `create_quotes_api` 函数
4. **购物车数据**: 确保扩展点传入正确的购物车数据格式

## 未来改进

- [ ] 添加国际化支持
- [ ] 添加更多的自定义配置选项
- [ ] 优化错误处理和用户反馈
- [ ] 添加单元测试
- [ ] 支持更多的主题定制
