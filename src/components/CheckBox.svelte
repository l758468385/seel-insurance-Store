<script lang="ts">
  export let checked: boolean = false;
  export let onChange: (checked: boolean) => void = () => {};
  const { class: customClass = "", ...rest } = $$restProps;
  function handleChange(event: Event) {
    const target = event.target as HTMLInputElement;
    checked = target.checked;
    onChange(checked);
  }
</script>

<label class={`seel-checkbox ${customClass}`}>
  <input
    type="checkbox"
    bind:checked
    on:change={handleChange}
    {...rest}
    class="seel-checkbox__input"
  />
  <span class="seel-checkbox__checkmark"></span>
</label>

<style lang="scss">
  @import "../styles/variables.scss";

  .seel-checkbox {
    display: inline-block;
    position: relative;
    cursor: pointer;

    &__input {
      position: absolute;
      opacity: 0;
      cursor: pointer;
      height: 0;
      width: 0;
    }

    &__checkmark {
      position: relative;
      display: inline-block;
      width: 16px;
      height: 16px;
      background-color: transparent;
      border: 1px solid #d6d7da;
      border-radius: 2px;
      transition: all 0.2s ease;

      &::after {
        content: "";
        position: absolute;
        display: none;
        left: 5px;
        top: 2px;
        width: 4px;
        height: 8px;
        border: solid white;
        border-width: 0 2px 2px 0;
        transform: rotate(45deg);
      }
    }

    &__input:checked ~ &__checkmark {
      background-color: $main-btn-bg;
      border-color: $main-btn-bg;

      &::after {
        display: block;
      }
    }

    &:hover &__checkmark {
      border-color: $main-btn-bg;
    }
  }
</style>
