<script lang="ts">
  import Loading from "./Loading.svelte";
  import { isLoading } from "../store/seel";
</script>

<!-- 全局 Seel Loading 组件，只需要在应用根部渲染一次 -->
<Loading visible={$isLoading} overlay={true} />
