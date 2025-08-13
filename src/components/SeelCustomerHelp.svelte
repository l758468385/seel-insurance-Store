<script lang="ts">
  export let title: string = "Worry-Free Delivery";
  export let description: string =
    "Your order includes Worry-Free Delivery. If any issues arise, you can file a claim.";
  export let buttonText: string = "File a Claim";

  export let pointName: string = "";

  function handleFileClaim() {
    console.log("File a claim");
  }
</script>

<div class={`seel-customer-help ${pointName}`}>
  <div class="seel-customer-help__content">
    <div class="seel-customer-help__icon">
      <svg
        width="20"
        height="24"
        viewBox="0 0 20 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_1152_4929)">
          <path
            d="M10.0013 20.3307C5.3988 20.3307 1.66797 16.5999 1.66797 11.9974C1.66797 7.3949 5.3988 3.66406 10.0013 3.66406C14.6038 3.66406 18.3346 7.3949 18.3346 11.9974C18.3346 16.5999 14.6038 20.3307 10.0013 20.3307ZM9.17047 15.3307L15.0621 9.43823L13.8838 8.2599L9.17047 12.9741L6.81297 10.6166L5.63464 11.7949L9.17047 15.3307Z"
            fill="#0ACC8B"
          />
        </g>
        <defs>
          <clipPath id="clip0_1152_4929">
            <rect
              width="20"
              height="20"
              fill="white"
              transform="translate(0 2)"
            />
          </clipPath>
        </defs>
      </svg>
    </div>
    <div class="seel-customer-help__text">
      <h3>{title}</h3>
      <p>{description}</p>
      <div class="seel-customer-help__powered">
        Power by <span class="seel-logo">seel</span>
      </div>
    </div>
  </div>
  <button class="seel-customer-help__button" on:click={handleFileClaim}>
    {buttonText}
  </button>
</div>

<style lang="scss">
  @use "../styles/variables.scss" as vars;

  .seel-customer-help {
    padding: 15px;
    border: 1px solid vars.$seel-border-color;
    border-radius: 5px;
    background-color: #fff;
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-family: inherit;
    text-align: left;

    &__content {
      display: flex;
      flex: 1;
    }

    &__icon {
      margin-right: 8px;
    }

    &__text {
      h3 {
        font-size: 16px;
        font-weight: 600;
        line-height: 24px;
        margin-bottom: 8px;
      }

      p {
        font-size: 14px;
        line-height: 150%;
        color: #666;
        margin-bottom: 4px;
      }
    }

    &__powered {
      font-size: 12px;
      color: vars.$seel-powered-color;
      line-height: 150%;
    }

    &__button {
      background-color: vars.$main-btn-bg;
      color: white;
      border: none;
      border-radius: 5px;
      padding: 12px 24px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: background-color 0.2s;
      margin-left: 12px;

      &:hover {
        opacity: 0.9;
      }
    }
  }

  .seel-logo {
    color: vars.$seel-brand-color;
    font-weight: 600;
  }

  .OrderDetailBeforeTable {
    margin-bottom: 30px;
  }

  @media screen and (max-width: 767px) {
    .seel-customer-help {
      flex-direction: column;
      align-items: flex-start;
    }

    .seel-customer-help__button {
      width: 100%;
      margin-left: 0;
      margin-top: 12px;
    }

    .OrderDetailBeforeTable {
      margin: 15px 15px 20px 15px;
    }
  }
</style>
