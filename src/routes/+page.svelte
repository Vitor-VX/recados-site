<script lang="ts">
  import "../app.css";
  import Header from '$lib/components/Header.svelte';
  import Hero from '$lib/components/Hero.svelte';
  import Benefits from '$lib/components/Benefits.svelte';
  import HowItWorks from '$lib/components/HowItWorks.svelte';
  import StepIndicator from '$lib/components/Checkout/StepIndicator.svelte';
  import StepOrder from '$lib/components/Checkout/StepOrder.svelte';
  import StepExtras from '$lib/components/Checkout/StepExtras.svelte';
  import StepCustomer from '$lib/components/Checkout/StepCustomer.svelte';
  import StepPayment from '$lib/components/Checkout/StepPayment.svelte';
  import { checkoutStore, setCurrentStep, resetCheckout } from '$lib/stores/checkoutStore';
  
  let showCheckout = false;
  
  $: ({ currentStep } = $checkoutStore);
  
  function startCheckout() {
    showCheckout = true;
    setCurrentStep(0);
  }
  
  function nextStep() {
    setCurrentStep(currentStep + 1);
  }
  
  function completeCheckout() {
    showCheckout = false;
    resetCheckout();
  }
</script>

<svelte:head>
  <title>Recado Especial do Papai Noel - Vídeos Personalizados</title>
  <meta name="description" content="Surpreenda quem você ama com um vídeo personalizado do Papai Noel. O personagem chama pelo nome e fala diretamente com a pessoa. A partir de R$ 14,90." />
</svelte:head>

{#if !showCheckout}
  <!-- Landing Page -->
  <Header onStartCheckout={startCheckout} />
  <Hero onStartCheckout={startCheckout} />
  <Benefits />
  <HowItWorks onStartCheckout={startCheckout} />
{:else}
  <!-- Checkout Flow -->
  <div class="checkout-container">
    <div class="checkout-header">
      <div class="container">
        <a href="/" class="back-link" on:click={() => showCheckout = false}>
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
    color: #667eea;
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