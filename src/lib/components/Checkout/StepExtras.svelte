<script lang="ts">
  import { Zap } from 'lucide-svelte';
  import { checkoutStore, toggleExtra } from '$lib/stores/checkoutStore';
  
  export let onNext: () => void;
  
  $: ({ selectedExtras, totalAmount } = $checkoutStore);
</script>

<div class="step-extras">
  <div class="step-header">
    <h2>Deixe o dia ainda mais especial</h2>
    <p>Adicione extras opcionais ao seu pedido</p>
  </div>
  
  <div class="extras-list">
    {#each selectedExtras as extra}
      <div class="extra-card card">
        <div class="extra-content">
          <div class="extra-icon">
            <Zap size={24} color={extra.selected ? '#ffffff' : '#667eea'} />
          </div>
          
          <div class="extra-info">
            <h3>{extra.name}</h3>
            <p>{extra.description}</p>
          </div>
          
          <div class="extra-price">
            + R$ {extra.price.toFixed(2).replace('.', ',')}
          </div>
        </div>
        
        <label class="extra-checkbox">
          <input 
            type="checkbox" 
            checked={extra.selected}
            on:change={() => toggleExtra(extra.id)}
          />
          <span class="checkmark"></span>
          {extra.selected ? 'Adicionado' : 'Adicionar'}
        </label>
      </div>
    {/each}
  </div>
  
  <div class="step-footer">
    <div class="total-amount">
      <span>Total: <strong>R$ {totalAmount.toFixed(2).replace('.', ',')}</strong></span>
    </div>
    
    <button class="btn btn-primary" on:click={onNext}>
      Continuar
    </button>
  </div>
</div>

<style>
  .step-extras {
    max-width: 600px;
    margin: 0 auto;
  }
  
  .step-header {
    text-align: center;
    margin-bottom: 40px;
  }
  
  .step-header h2 {
    color: #2d3748;
    margin-bottom: 16px;
  }
  
  .step-header p {
    color: #4a5568;
    font-size: 1.1rem;
  }
  
  .extras-list {
    margin-bottom: 40px;
  }
  
  .extra-card {
    margin-bottom: 16px;
    border: 2px solid transparent;
    transition: all 0.3s ease;
  }
  
  .extra-card:hover {
    border-color: #667eea;
  }
  
  .extra-content {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 16px;
  }
  
  .extra-icon {
    background: rgba(102, 126, 234, 0.1);
    padding: 12px;
    border-radius: 50%;
    flex-shrink: 0;
  }
  
  .extra-card:has(input:checked) .extra-icon {
    background: #667eea;
  }
  
  .extra-info {
    flex: 1;
  }
  
  .extra-info h3 {
    font-size: 1.1rem;
    color: #2d3748;
    margin-bottom: 4px;
  }
  
  .extra-info p {
    color: #4a5568;
    font-size: 0.9rem;
    margin: 0;
  }
  
  .extra-price {
    font-weight: 600;
    color: #10b981;
    font-size: 1.1rem;
  }
  
  .extra-checkbox {
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    font-weight: 500;
  }
  
  .extra-checkbox input {
    display: none;
  }
  
  .checkmark {
    width: 20px;
    height: 20px;
    border: 2px solid #d1d5db;
    border-radius: 4px;
    position: relative;
    transition: all 0.3s ease;
  }
  
  .extra-checkbox input:checked + .checkmark {
    background: #667eea;
    border-color: #667eea;
  }
  
  .extra-checkbox input:checked + .checkmark::after {
    content: '✓';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    font-size: 12px;
    font-weight: bold;
  }
  
  .step-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 24px 0;
    border-top: 1px solid #e2e8f0;
  }
  
  .total-amount {
    font-size: 1.2rem;
    color: #2d3748;
  }
  
  @media (max-width: 768px) {
    .extra-content {
      flex-direction: column;
      align-items: flex-start;
      text-align: left;
    }
    
    .extra-price {
      align-self: flex-end;
    }
    
    .step-footer {
      flex-direction: column;
      gap: 16px;
      text-align: center;
    }
  }
</style>