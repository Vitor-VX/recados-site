<script lang="ts">
  import { Heart } from "lucide-svelte";
  import { products, selectProduct } from "$lib/stores/checkoutStore";

  export let onNext: () => void;
</script>

<div class="step-order">
  <div class="step-header">
    <h2>Escolha a dose de amor ideal</h2>
    <p>
      Cada certidão é única e pode ser personalizada individualmente para o seu
      momento especial.
    </p>
  </div>

  <div class="products-grid">
    {#each products as product}
      <div class="product-card card">
        <div class="product-icon">
          <Heart size={32} fill="#ff4d6d" color="#ff4d6d" />
        </div>

        <h3>{product.name}</h3>
        <p class="product-description">{product.description}</p>

        <div class="pricing">
          {#if product.oldPrice}
            <span class="price-old"
              >De R$ {product.oldPrice.toFixed(2).replace(".", ",")}</span
            >
          {/if}
          <div class="price-wrapper">
            <span class="currency">R$</span>
            <span class="price"
              >{product.price.toFixed(2).replace(".", ",")}</span
            >
          </div>
        </div>

        <button
          class="product-btn"
          on:click={() => {
            selectProduct(product);
            onNext();
          }}
        >
          Selecionar esta opção.
        </button>
      </div>
    {/each}
  </div>
</div>

<style>
  .step-order {
    max-width: 900px;
    margin: 0 auto;
    padding: 20px 0;
  }

  .step-header {
    text-align: center;
    margin-bottom: 50px;
  }

  .step-header h2 {
    font-family: "Great Vibes", cursive;
    color: #4a0e0e;
    font-size: 3.5rem;
    margin-bottom: 12px;
  }

  .step-header p {
    color: #8d5b5b;
    font-size: 1.1rem;
    max-width: 500px;
    margin: 0 auto;
  }

  .products-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 30px;
  }

  .product-card {
    text-align: center;
    position: relative;
    border: 2px solid #fff0f3;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    padding: 40px 24px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .product-card:hover {
    border-color: #ffccd5;
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(230, 57, 70, 0.1);
  }

  .product-icon {
    background: #fff0f3;
    padding: 16px;
    border-radius: 50%;
    margin: 0 auto 24px;
    width: fit-content;
    transition: transform 0.3s ease;
  }

  .product-card:hover .product-icon {
    transform: scale(1.1);
  }

  .product-card h3 {
    font-family: "Poppins", sans-serif;
    font-size: 1.4rem;
    color: #4a0e0e;
    margin-bottom: 12px;
    font-weight: 600;
  }

  .product-description {
    color: #8d5b5b;
    margin-bottom: 24px;
    font-size: 0.95rem;
    min-height: 45px;
  }

  .pricing {
    margin-bottom: 32px;
  }

  .price-old {
    display: block;
    color: #bfa2a2;
    font-size: 0.95rem;
    text-decoration: line-through;
    margin-bottom: 4px;
  }

  .price-wrapper {
    color: #e63946;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
  }

  .currency {
    font-size: 1.1rem;
    font-weight: 600;
  }

  .price {
    font-size: 2.2rem;
    font-weight: 800;
  }

  .product-btn {
    padding: 20px 40px;
    font-size: 1.3rem;
    border-radius: 50px;
    background: linear-gradient(135deg, #ff4d6d 0%, #c9184a 100%);
    box-shadow: 0 10px 25px rgba(201, 24, 74, 0.3);
    color: white;
    border: none;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 12px;
    transition: all 0.3s ease;
  }

  @media (max-width: 768px) {
    .step-header h2 {
      font-size: 2.5rem;
    }

    .products-grid {
      grid-template-columns: 1fr;
      padding: 0 10px;
    }

    .product-card {
      padding: 30px 20px;
    }
  }
</style>
