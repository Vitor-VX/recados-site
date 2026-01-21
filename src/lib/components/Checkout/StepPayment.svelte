<script lang="ts">
  import { onMount } from "svelte";
  import {
    Copy,
    CircleCheck as CheckCircle,
    Clock,
    ShoppingCart,
  } from "lucide-svelte";
  import {
    checkoutStore,
    setPaymentStatus,
    setPixData,
  } from "$lib/stores/checkoutStore";
  import { ordersStore } from "$lib/stores/ordersStore";

  export let onComplete: () => void;

  $: ({
    selectedProduct,
    selectedExtras,
    people,
    customerData,
    totalAmount,
    paymentStatus,
    pixCode,
    pixQrCode,
  } = $checkoutStore);

  let copySuccess = false;

  onMount(() => {
    generatePixPayment();
  });

  async function generatePixPayment() {
    setPaymentStatus("generating");

    // Simulate PIX generation
    setTimeout(() => {
      const mockPixCode = `00020126580014BR.GOV.BCB.PIX013654321234-5678-90ab-cdef-123456789abc5204000053039865802BR5913RECADO DO NOEL6009SAO PAULO62070503***6304${Math.random().toString(36).substr(2, 4).toUpperCase()}`;
      const mockQrCode =
        "data:image/svg+xml;base64," +
        btoa(`
        <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">
          <rect width="200" height="200" fill="white"/>
          <text x="100" y="100" text-anchor="middle" font-size="14" fill="black">QR Code Pix</text>
          <text x="100" y="120" text-anchor="middle" font-size="12" fill="gray">Valor: R$ ${totalAmount.toFixed(2)}</text>
        </svg>
      `);

      setPixData(mockPixCode, mockQrCode);
      setPaymentStatus("waiting");

      // Simulate payment confirmation after 10 seconds
      setTimeout(() => {
        setPaymentStatus("paid");

        // Add order to store
        const selectedExtrasFiltered = selectedExtras.filter((e) => e.selected);
        ordersStore.update((orders) => [
          {
            id: `ord-${Date.now()}`,
            customerName: customerData.name,
            customerWhatsapp: customerData.whatsapp,
            customerEmail: customerData.email,
            customerCpf: customerData.cpf,
            productName: selectedProduct?.name || "",
            quantity: selectedProduct?.quantity || 0,
            people: people,
            extras: selectedExtrasFiltered.map((e) => ({
              name: e.name,
              price: e.price,
            })),
            totalAmount: totalAmount,
            status: "paid",
            createdAt: new Date(),
            paidAt: new Date(),
          },
          ...orders,
        ]);

        setTimeout(() => {
          onComplete();
        }, 300000);
      }, 100000);
    }, 2000);
  }

  function copyPixCode() {
    navigator.clipboard.writeText(pixCode).then(() => {
      copySuccess = true;
      setTimeout(() => (copySuccess = false), 2000);
    });
  }
</script>

<div class="step-payment">
  <div class="content-wrapper">
    <div class="payment-section">
      <div class="section-header">
        <h2>Pagamento via PIX</h2>
        <p>Escaneie o QR Code ou copie o código para realizar o pagamento</p>
      </div>

      {#if paymentStatus === "generating"}
        <div class="loading-state">
          <div class="loading"></div>
          <h3>Gerando QR Code Pix...</h3>
          <p>Aguarde enquanto preparamos seu pagamento</p>
        </div>
      {:else if paymentStatus === "waiting"}
        <div class="payment-content">
          <div class="qr-section">
            <img src={pixQrCode} alt="QR Code PIX" class="qr-code" />

            <div class="pix-code-section">
              <label>Código PIX (Copia e Cola)</label>
              <div class="code-container">
                <input type="text" value={pixCode} readonly />
                <button
                  class="copy-btn"
                  on:click={copyPixCode}
                  class:success={copySuccess}
                >
                  {#if copySuccess}
                    <CheckCircle size={20} />
                    Copiado!
                  {:else}
                    <Copy size={20} />
                    Copiar
                  {/if}
                </button>
              </div>
            </div>

            <div class="instructions">
              <h4>Como pagar:</h4>
              <ol>
                <li>Abra o app do seu banco</li>
                <li>Procure por "PIX" ou "Pagar com QR Code"</li>
                <li>Escaneie o código acima ou cole o código PIX</li>
                <li>
                  Confirme o pagamento de <strong
                    >R$ {totalAmount.toFixed(2).replace(".", ",")}</strong
                  >
                </li>
              </ol>
            </div>
          </div>

          <div class="status-waiting">
            <Clock size={24} color="#f59e0b" />
            <h4>Aguardando confirmação do pagamento...</h4>
            <p>
              Assim que o pagamento for aprovado, você receberá o certificado no
              WhatsApp informado.
            </p>
          </div>
        </div>
      {:else if paymentStatus === "paid"}
        <div class="payment-success">
          <CheckCircle size={48} color="#10b981" />
          <h3>Pagamento aprovado!</h3>
          <p>
            Seu vídeo será enviado em instantes no WhatsApp <strong
              >{customerData.whatsapp}</strong
            >
          </p>
          <div class="success-animation">
            <div class="pulse"></div>
          </div>
        </div>
      {/if}
    </div>

    <div class="order-summary-section">
      <div class="order-summary card">
        <h3>Resumo do pedido</h3>

        <div class="summary-section">
          <h4>Produto</h4>
          <p>{selectedProduct?.name}</p>
        </div>

        <div class="summary-section">
          <h4>Cliente</h4>
          <p>{customerData.name}</p>
        </div>

        <div class="summary-section">
          <h4>Para quem</h4>
          {#each people as person}
            <p>• {person.name}</p>
          {/each}
        </div>

        {#if selectedExtras.some((e) => e.selected)}
          <div class="summary-section">
            <h4>Extras</h4>
            {#each selectedExtras.filter((e) => e.selected) as extra}
              <p>• {extra.name}</p>
            {/each}
          </div>
        {/if}

        <div class="summary-divider"></div>

        <div class="summary-total">
          <span>Total:</span>
          <span>R$ {totalAmount.toFixed(2).replace(".", ",")}</span>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .step-payment {
    max-width: 1200px;
    margin: 0 auto;
  }

  .content-wrapper {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 40px;
  }

  .section-header {
    text-align: center;
    margin-bottom: 40px;
  }

  .section-header h2 {
    color: #2d3748;
    margin-bottom: 8px;
  }

  .section-header p {
    color: #4a5568;
  }

  .loading-state {
    text-align: center;
    padding: 60px 20px;
  }

  .loading-state .loading {
    margin: 0 auto 24px;
    width: 40px;
    height: 40px;
    border: 4px solid #e2e8f0;
    border-top: 4px solid #667eea;
  }

  .loading-state h3 {
    color: #2d3748;
    margin-bottom: 8px;
  }

  .loading-state p {
    color: #4a5568;
  }

  .payment-content {
    text-align: center;
  }

  .qr-section {
    margin-bottom: 32px;
  }

  .qr-code {
    width: 250px;
    height: 250px;
    border: 4px solid #e2e8f0;
    border-radius: 12px;
    margin-bottom: 24px;
    background: white;
  }

  .pix-code-section {
    margin-bottom: 32px;
  }

  .pix-code-section label {
    display: block;
    margin-bottom: 8px;
    font-weight: 500;
    color: #2d3748;
  }

  .code-container {
    display: flex;
    gap: 8px;
    max-width: 500px;
    margin: 0 auto;
  }

  .code-container input {
    flex: 1;
    padding: 12px;
    border: 2px solid #e2e8f0;
    border-radius: 8px;
    font-family: monospace;
    font-size: 0.9rem;
    background: #f8fafc;
  }

  .copy-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 16px;
    background: #3b82f6;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 500;
    transition: all 0.3s ease;
    white-space: nowrap;
  }

  .copy-btn:hover {
    background: #2563eb;
  }

  .copy-btn.success {
    background: #10b981;
  }

  .instructions {
    background: #f8fafc;
    padding: 24px;
    border-radius: 12px;
    text-align: left;
    max-width: 500px;
    margin: 0 auto;
  }

  .instructions h4 {
    color: #2d3748;
    margin-bottom: 12px;
  }

  .instructions ol {
    color: #4a5568;
    line-height: 1.6;
  }

  .instructions li {
    margin-bottom: 8px;
  }

  .status-waiting {
    background: #fffbeb;
    border: 2px solid #fbbf24;
    border-radius: 12px;
    padding: 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
  }

  .status-waiting h4 {
    color: #92400e;
    margin: 0;
  }

  .status-waiting p {
    color: #a16207;
    margin: 0;
    text-align: center;
  }

  .payment-success {
    text-align: center;
    padding: 60px 20px;
    position: relative;
  }

  .payment-success h3 {
    color: #10b981;
    margin: 16px 0 8px;
    font-size: 2rem;
  }

  .payment-success p {
    color: #4a5568;
    font-size: 1.1rem;
  }

  .success-animation {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    pointer-events: none;
  }

  .pulse {
    width: 100px;
    height: 100px;
    border: 4px solid #10b981;
    border-radius: 50%;
    opacity: 0;
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0% {
      transform: scale(0.5);
      opacity: 1;
    }
    100% {
      transform: scale(2);
      opacity: 0;
    }
  }

  .order-summary {
    position: sticky;
    top: 100px;
  }

  .order-summary h3 {
    color: #2d3748;
    margin-bottom: 24px;
    font-size: 1.2rem;
  }

  .summary-section {
    margin-bottom: 20px;
    padding-bottom: 16px;
    border-bottom: 1px solid #f1f5f9;
  }

  .summary-section:last-of-type {
    border-bottom: none;
  }

  .summary-section h4 {
    font-size: 1rem;
    color: #2d3748;
    margin-bottom: 8px;
  }

  .summary-section p {
    color: #4a5568;
    margin: 4px 0;
    font-size: 0.95rem;
  }

  .summary-divider {
    height: 2px;
    background: #e2e8f0;
    margin: 20px 0;
  }

  .summary-total {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1.3rem;
    font-weight: 700;
    color: #2d3748;
  }

  @media (max-width: 768px) {
    .content-wrapper {
      grid-template-columns: 1fr;
      gap: 24px;
    }

    .order-summary {
      position: static;
      order: -1;
    }

    .qr-code {
      width: 200px;
      height: 200px;
    }

    .code-container {
      flex-direction: column;
    }

    .instructions {
      text-align: left;
    }
  }
</style>
