<script lang="ts">
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
        {index + 1}
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
    margin-bottom: 40px;
    padding: 0 20px;
  }
  
  .step-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
  }
  
  .step-circle {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #e2e8f0;
    color: #a0aec0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    transition: all 0.3s ease;
  }
  
  .step-item.active .step-circle {
    background: #667eea;
    color: white;
  }
  
  .step-item.completed .step-circle {
    background: #10b981;
    color: white;
  }
  
  .step-label {
    font-size: 0.9rem;
    color: #4a5568;
    font-weight: 500;
  }
  
  .step-item.active .step-label {
    color: #667eea;
    font-weight: 600;
  }
  
  .step-line {
    width: 60px;
    height: 2px;
    background: #e2e8f0;
    margin: 0 16px;
    transition: all 0.3s ease;
  }
  
  .step-line.completed {
    background: #10b981;
  }
  
  @media (max-width: 768px) {
    .step-indicator {
      margin-bottom: 32px;
    }
    
    .step-circle {
      width: 32px;
      height: 32px;
      font-size: 14px;
    }
    
    .step-label {
      font-size: 0.8rem;
    }
    
    .step-line {
      width: 40px;
      margin: 0 8px;
    }
  }
</style>