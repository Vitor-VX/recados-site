<script lang="ts">
  import { checkoutStore, toggleExtra } from "$lib/stores/checkoutStore";

  export let onNext: () => void;

  $: ({ selectedExtras, totalAmount } = $checkoutStore);

  $: hasFullCollection = selectedExtras.some(
    (e) => e.id === "collection" && e.selected,
  );
</script>

<div class="step-extras">
  <div class="step-header">
    <h2>Deixe o dia ainda mais especial</h2>
    <p>Adicione extras opcionais ao seu pedido</p>
  </div>

  <div class="extras-list">
    {#each selectedExtras as extra}
      <!-- Verifica se esse extra está incluso na coleção -->
      {@const includedInCollection =
        hasFullCollection && extra.id === "with_photo"}

      <div class="extra-card card {includedInCollection ? 'disabled' : ''}">
        <div class="extra-content">
          <div class="extra-info">
            <h3>
              {extra.name}

              {#if includedInCollection}
                <span class="included-badge">Incluso na coleção</span>
              {/if}
            </h3>

            <p>{extra.description}</p>
          </div>

          <div class="extra-price">
            {#if includedInCollection}
              Incluso
            {:else}
              + R$ {extra.price.toFixed(2).replace(".", ",")}
            {/if}
          </div>
        </div>

        <label class="extra-checkbox">
          <input
            type="checkbox"
            checked={includedInCollection || extra.selected}
            disabled={includedInCollection}
            on:change={() => toggleExtra(extra.id)}
          />

          <span class="checkmark"></span>

          {#if includedInCollection}
            Incluso
          {:else}
            {extra.selected ? "Adicionado" : "Adicionar"}
          {/if}
        </label>
      </div>
    {/each}
  </div>

  <div class="step-footer">
    <div class="total-amount">
      <span>
        Total: <strong>R$ {totalAmount.toFixed(2).replace(".", ",")}</strong>
      </span>
    </div>

    <button class="btn-continue" on:click={onNext}> Continuar </button>
  </div>
</div>

<style>
  .disabled {
    opacity: 0.6;
    pointer-events: none;
  }

  .included-badge {
    margin-left: 8px;
    font-size: 0.75rem;
    background: #d1fae5;
    color: #065f46;
    padding: 3px 8px;
    border-radius: 999px;
    font-weight: 600;
  }

  .btn-continue {
    padding: 10px 20px;
    font-size: 1.1rem;
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

  .step-extras {
    max-width: 600px;
    margin: 0 auto;
  }

  .step-header {
    text-align: center;
    margin-bottom: 40px;
  }

  .step-header h2 {
    font-family: "Great Vibes", cursive;
    font-size: 3rem;
    color: #4a0e0e;
    margin-bottom: 16px;
  }

  .step-header p {
    color: #8d5b5b;
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
    background: #fff0f3;
    padding: 10px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  .extra-card:has(input:checked) .extra-icon {
    background: linear-gradient(135deg, #ff4d6d 0%, #c9184a 100%);
    border-color: #ff4d6d;
  }

  .extra-info {
    flex: 1;
  }

  .extra-info h3 {
    font-size: 1.1rem;
    color: #c9184a;
    margin-bottom: 4px;
  }

  .extra-info p {
    color: #8d5b5b;
    font-size: 0.9rem;
    margin: 0;
  }

  .extra-price {
    font-weight: 600;
    color: #4a0e0e;
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
    width: 18px;
    height: 18px;
    border: 2px solid #dbd2d1;
    border-radius: 4px;
    position: relative;
    transition: all 0.3s ease;
  }

  .extra-checkbox input:checked + .checkmark {
    background: #c9184a;
    border-color: #c9184a;
  }

  .extra-checkbox input:checked + .checkmark::after {
    content: "✓";
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
