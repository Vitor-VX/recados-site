<script lang="ts">
  import "../app.css";
  import icon from "$lib/assets/ic_site.png";
  import Hero from "$lib/components/Hero.svelte";
  import Benefits from "$lib/components/Benefits.svelte";
  import HowItWorks from "$lib/components/HowItWorks.svelte";
  import Templates from "$lib/components/Templates.svelte";
  import StepIndicator from "$lib/components/Checkout/StepIndicator.svelte";
  import StepOrder from "$lib/components/Checkout/StepOrder.svelte";
  import StepExtras from "$lib/components/Checkout/StepExtras.svelte";
  import StepCustomer from "$lib/components/Checkout/StepCustomer.svelte";
  import StepPayment from "$lib/components/Checkout/StepPayment.svelte";
  import {
    checkoutStore,
    setCurrentStep,
    resetCheckout,
  } from "$lib/stores/checkoutStore";
  import { track } from "$lib/track/meta";
  import SocialProof from "$lib/components/SocialProof.svelte";

  let showCheckout = false;
  let viewContentTracked = false;

  $: ({ currentStep } = $checkoutStore);

  function startCheckout() {
    showCheckout = true;
    setCurrentStep(0);

    if (!viewContentTracked && typeof fbq !== "undefined") {
      track("view_content");
    }
  }

  function nextStep() {
    setCurrentStep(currentStep + 1);
  }

  function completeCheckout() {
    showCheckout = false;
    resetCheckout();
  }

  $: if (currentStep === 2) {
    track("add_to_cart", { value: 4.9 });
  }
</script>

<svelte:head>
  <title>Certificado do Amor – Presente Personalizado Digital</title>
  <meta
    name="description"
    content="Surpreenda quem você ama com um Certificado do Amor personalizado. Um presente simbólico para celebrar histórias especiais, datas importantes e momentos únicos."
  />
  <link rel="icon" href={icon} />

  <script>
    !(function (f, b, e, v, n, t, s) {
      if (f.fbq) return;
      n = f.fbq = function () {
        n.callMethod
          ? n.callMethod.apply(n, arguments)
          : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = !0;
      n.version = "2.0";
      n.queue = [];
      t = b.createElement(e);
      t.async = !0;
      t.src = v;
      s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
    })(
      window,
      document,
      "script",
      "https://connect.facebook.net/en_US/fbevents.js",
    );
    fbq("init", "875484495259675");
    fbq("track", "PageView");
  </script>

  <noscript>
    <img
      height="1"
      width="1"
      style="display:none"
      src="https://www.facebook.com/tr?id=875484495259675&ev=PageView&noscript=1"
    />
  </noscript>

  <script
    async
    src="https://www.googletagmanager.com/gtag/js?id=G-SHQ596VRV3"
  ></script>

  <script
    src="https://cdn.utmify.com.br/scripts/utms/latest.js"
    data-utmify-prevent-xcod-sck
    data-utmify-prevent-subids
    async
    defer
  >
  </script>

  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      dataLayer.push(arguments);
    }
    gtag("js", new Date());

    gtag("config", "G-SHQ596VRV3");
  </script>
</svelte:head>

{#if !showCheckout}
  <Hero onStartCheckout={startCheckout} />
  <SocialProof />
  <Templates />
  <Benefits />
  <HowItWorks onStartCheckout={startCheckout} />
{:else}
  <!-- Checkout Flow -->
  <div class="checkout-container">
    <div class="checkout-header">
      <div class="container">
        <a href="/" class="back-link" on:click={() => (showCheckout = false)}>
          ← Voltar para página inicial
        </a>
        <h1>Finalizar pedido</h1>
      </div>
    </div>

    <div class="checkout-content">
      <div class="container">
        <StepIndicator {currentStep} />

        {#if currentStep === 0}
          <StepOrder onNext={nextStep} />
        {:else if currentStep === 1}
          <StepExtras onNext={nextStep} />
        {:else if currentStep === 2}
          <StepCustomer onNext={nextStep} />
        {:else if currentStep === 3}
          <StepPayment onComplete={completeCheckout} />
        {/if}
      </div>
    </div>
  </div>
{/if}

<style>
  .checkout-container {
    min-height: 100vh;
    background: #f8fafc;
  }

  .checkout-header {
    background: white;
    border-bottom: 1px solid #e2e8f0;
    padding: 20px 0;
  }

  .back-link {
    color: #4a0e0e;
    text-decoration: none;
    font-weight: 500;
    margin-bottom: 16px;
    display: inline-block;
  }

  .back-link:hover {
    color: #5a67d8;
  }

  .checkout-header h1 {
    color: #2d3748;
    margin: 0;
    font-size: 1.8rem;
  }

  .checkout-content {
    padding: 40px 0 80px;
  }

  @media (max-width: 768px) {
    .checkout-content {
      padding: 24px 0 60px;
    }

    .checkout-header h1 {
      font-size: 1.5rem;
    }
  }
</style>
