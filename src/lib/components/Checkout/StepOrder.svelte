<script lang="ts">
  import { Gift } from 'lucide-svelte';
  import { products, selectProduct } from '$lib/stores/checkoutStore';
  
  export let onNext: () => void;
</script>

<div class="step-order">
  <div class="step-header">
    <h2>Escolha quantas certidões deseja gerar</h2>
    <p>Cada certidão permite personalizar o nome do casal, data especial e uma mensagem exclusiva.</p>
  </div>
  
  <div class="products-grid">
    {#each products as product}
      <div class="product-card card">
        <div class="product-icon">
          <Gift size={32} color="#667eea" />
        </div>
        
        <h3>{product.name}</h3>
        <p class="product-description">{product.description}</p>
        
        <div class="pricing">
          {#if product.oldPrice}
            <span class="price-old">R$ {product.oldPrice.toFixed(2).replace('.', ',')}</span>
          {/if}
          <span class="price">R$ {product.price.toFixed(2).replace('.', ',')}</span>
        </div>
        
        <button 
          class="btn btn-primary product-btn"
          on:click={() => {
            selectProduct(product);
            onNext();
          }}
        >
          Selecionar
        </button>
      </div>
    {/each}
  </div>
</div>

<style>
  .step-order {
    max-width: 800px;
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
  
  .products-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 24px;
  }
  
  .product-card {
    text-align: center;
    position: relative;
    border: 2px solid transparent;
    transition: all 0.3s ease;
  }
  
  .product-card:hover {
    border-color: #667eea;
    transform: translateY(-4px);
  }
  
  .product-icon {
    background: rgba(102, 126, 234, 0.1);
    padding: 16px;
    border-radius: 50%;
    margin: 0 auto 20px;
    width: fit-content;
  }
  
  .product-card h3 {
    font-size: 1.3rem;
    color: #2d3748;
    margin-bottom: 8px;
  }
  
  .product-description {
    color: #4a5568;
    margin-bottom: 20px;
    font-size: 0.95rem;
  }
  
  .pricing {
    margin-bottom: 24px;
  }
  
  .price-old {
    display: block;
    color: #a0aec0;
    font-size: 0.9rem;
    text-decoration: line-through;
    margin-bottom: 4px;
  }
  
  .price {
    font-size: 1.8rem;
    font-weight: 700;
    color: #2d3748;
  }
  
  .product-btn {
    width: 100%;
    padding: 16px;
    font-weight: 600;
  }
  
  @media (max-width: 768px) {
    .products-grid {
      grid-template-columns: 1fr;
    }
    
    .step-header h2 {
      font-size: 1.6rem;
    }
  }
</style>