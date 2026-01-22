<script lang="ts">
  import { Heart, Check } from "lucide-svelte";
  export let currentStep: number;
  
  const steps = [
    'Pedido',
    'Extras', 
    'Dados',
    'Pagamento'
  ];
</script>

<div class="step-indicator">
  {#each steps as step, index}
    <div class="step-item" class:active={index === currentStep} class:completed={index < currentStep}>
      <div class="step-circle">
        {#if index < currentStep}
          <Check size={18} strokeWidth={3} />
        {:else if index === currentStep}
          <Heart size={18} fill="white" />
        {:else}
          {index + 1}
        {/if}
      </div>
      <span class="step-label">{step}</span>
    </div>
    
    {#if index < steps.length - 1}
      <div class="step-line" class:completed={index < currentStep}></div>
    {/if}
  {/each}
</div>

<style>
  .step-indicator {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 20px auto 50px;
    padding: 0 10px;
    max-width: 600px;
  }
  
  .step-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    position: relative;
    z-index: 2;
  }
  
  .step-circle {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background: #ffffff;
    color: #ffccd5;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 16px;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  }
  
  .step-item.active .step-circle {
    background: linear-gradient(135deg, #ff4d6d 0%, #c9184a 100%);
    border-color: #ff4d6d;
    color: white;
    transform: scale(1.15);
    box-shadow: 0 8px 20px rgba(201, 24, 74, 0.3);
  }
  
  .step-item.completed .step-circle {
    background: #ffb5a7;
    border-color: #ffb5a7;
    color: white;
  }
  
  .step-label {
    font-size: 0.85rem;
    color: #8d5b5b;
    font-weight: 500;
    white-space: nowrap;
  }
  
  .step-item.active .step-label {
    color: #c9184a;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    font-size: 0.75rem;
  }
  
  .step-line {
    flex: 1;
    height: 3px;
    background: #fff0f3;
    margin: -25px 10px 0;
    border-radius: 10px;
    position: relative;
    z-index: 1;
  }
  
  .step-line.completed {
    background: #ffccd5;
  }

  .step-line::after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 0;
    background: #ffccd5;
    transition: width 0.4s ease;
  }

  .step-line.completed::after {
    width: 100%;
  }
  
  @media (max-width: 768px) {
    .step-indicator {
      margin-bottom: 40px;
    }
    
    .step-circle {
      width: 36px;
      height: 36px;
      font-size: 14px;
    }
    
    .step-label {
      font-size: 0.75rem;
    }
    
    .step-line {
      margin-top: -22px;
    }
  }
</style>