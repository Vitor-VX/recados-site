<script lang="ts">
  import { onMount } from "svelte";
  import {
    Copy,
    CircleCheck as CheckCircle,
    Clock,
    Heart,
    Lock,
    Download,
    Sparkles,
    Loader2,
    Share2,
  } from "lucide-svelte";
  import {
    checkoutStore,
    setPaymentStatus,
    setPixData,
  } from "$lib/stores/checkoutStore";
  import { ordersStore } from "$lib/stores/ordersStore";

  export let onComplete: () => void;

  let isGeneratingCertificate = false;
  let certificateReady = false;
  let certificateUrl =
    "https://pub-d997896d0b944e3f97ade771c4a3aeaf.r2.dev/a74c71a5-ba46-4af7-b566-f258e9179df5.jfif"; // Mock da imagem gerada

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

    setTimeout(() => {
      const mockPixCode = `00020126580014BR.GOV.BCB.PIX013654321234-5678-90ab-cdef-123456789abc5204000053039865802BR5913CERTIDAO AMOR6009SAO PAULO62070503***6304${Math.random().toString(36).substr(2, 4).toUpperCase()}`;
      const mockQrCode =
        "data:image/svg+xml;base64," +
        btoa(`
        <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">
          <rect width="200" height="200" fill="white"/>
          <path d="M50 50 L150 50 L150 150 L50 150 Z" fill="none" stroke="#e63946" stroke-width="2"/>
          <path d="M100 80 Q100 70 110 70 T120 80 T100 100 T80 80 T90 70 T100 80" fill="#e63946"/>
          <text x="100" y="140" text-anchor="middle" font-size="10" font-family="sans-serif" fill="#4a0e0e">PIX ROMÂNTICO</text>
        </svg>
      `);

      setPixData(mockPixCode, mockQrCode);
      setPaymentStatus("waiting");

      setTimeout(() => {
        handleSuccessfulPayment();
      }, 8000);
    }, 2000);
  }

  function handleSuccessfulPayment() {
    setPaymentStatus("paid");
    isGeneratingCertificate = true;

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
      isGeneratingCertificate = false;
      certificateReady = true;
    }, 4000);
  }

  function copyPixCode() {
    navigator.clipboard.writeText(pixCode).then(() => {
      copySuccess = true;
      setTimeout(() => (copySuccess = false), 2000);
    });
  }

  function downloadCertificate() {
    const link = document.createElement("a");
    link.href = certificateUrl;
    link.download = `Certidao_Amor_${people[0]?.name || "Casal"}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
</script>

<div class="step-payment">
  <div class="content-wrapper">
    <div class="payment-section">
      {#if !certificateReady}
        <div class="section-header">
          <h2>
            {isGeneratingCertificate
              ? "Criando a sua surpresa..."
              : "Quase lá, falta pouco!"}
          </h2>
          <p>
            {isGeneratingCertificate
              ? "Eternizando seu sentimento no papel digital."
              : "Realize o pagamento para liberarmos sua certidão personalizada."}
          </p>
        </div>
      {/if}

      {#if paymentStatus === "generating"}
        <div class="loading-state">
          <div class="heart-loader">
            <Heart size={48} fill="#ff4d6d" color="#ff4d6d" />
          </div>
          <h3>Preparando seu QR Code...</h3>
        </div>
      {:else if paymentStatus === "waiting"}
        <div class="payment-content">
          <div class="qr-section card">
            <div class="badge-pix">
              <Sparkles size={14} />
              Pix Instantâneo
            </div>
            <!-- <img src={pixQrCode} alt="QR Code PIX" class="qr-code" /> -->
            <img
              src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=Example"
              alt="QR Code Example"
              class="qr-code"
            />

            <div class="pix-code-section">
              <label>Pix Copia e Cola</label>
              <div class="code-container">
                <input type="text" value={pixCode} readonly />
                <button
                  class="copy-btn"
                  on:click={copyPixCode}
                  class:success={copySuccess}
                >
                  {#if copySuccess}
                    <CheckCircle size={18} />
                  {:else}
                    <Copy size={18} />
                  {/if}
                  {copySuccess ? "Copiado" : "Copiar"}
                </button>
              </div>
            </div>

            <div class="instructions">
              <h4>Como pagar:</h4>
              <ul>
                <li>
                  Acesse o app do seu banco e escolha <strong>Pix</strong>.
                </li>
                <li>
                  Selecione <strong>Pagar com QR Code</strong> ou
                  <strong>Copia e Cola</strong>.
                </li>
                <li>
                  Valor exato: <span class="highlight"
                    >R$ {totalAmount.toFixed(2).replace(".", ",")}</span
                  >.
                </li>
              </ul>
            </div>
          </div>

          <div class="status-waiting">
            <div class="loader-dots">
              <span></span><span></span><span></span>
            </div>
            <h4>Aguardando pagamento...</h4>
            <p>A confirmação acontece em segundos!</p>
          </div>
        </div>
      {:else if isGeneratingCertificate}
        <div class="generating-box card">
          <div class="magic-loader">
            <Loader2 size={48} class="spin" color="#c9184a" />
            <Heart
              size={20}
              fill="#c9184a"
              color="#c9184a"
              class="heart-inside"
            />
          </div>
          <h3>Sua certidão está sendo gerada!</h3>
          <p>Estamos enviando amor e carinho para os nossos servidores...</p>
          <div class="progress-bar"><div class="progress-fill"></div></div>
        </div>
      {:else if certificateReady}
        <div class="certificate-ready-section">
          <div class="success-header text-center mb-6">
            <div class="icon-circle">
              <CheckCircle size={40} color="white" />
            </div>
            <h2>Sua Certidão Está Pronta!</h2>
            <p>Parabéns! Sua história agora está eternizada.</p>
          </div>

          <div class="certificate-preview card">
            <img src={certificateUrl} alt="Sua Certidão" class="final-img" />
          </div>

          <div class="actions-grid mt-6">
            <button
              class="btn btn-primary btn-download"
              on:click={downloadCertificate}
            >
              <Download size={20} /> Baixar Certidão Digital
            </button>
            <button
              class="btn btn-outline btn-whatsapp"
              on:click={() =>
                window.open(
                  `https://wa.me/${customerData.whatsapp}?text=Olha+que+lindo+o+que+fiz+para+nós!`,
                )}
            >
              <Share2 size={20} /> Enviar no WhatsApp
            </button>
          </div>

          <div class="email-notice mt-4">
            <p>
              <Sparkles size={14} /> Também enviamos uma cópia para
              <strong>{customerData.email}</strong>
            </p>
          </div>
        </div>
      {/if}
    </div>

    <div class="summary-side">
      <div class="order-summary card">
        <div class="secure-checkout">
          <Lock size={14} /> Checkout Seguro
        </div>
        <h3>Resumo do Pedido</h3>

        <div class="summary-details">
          <div class="item">
            <span class="label">Item:</span>
            <span class="val">{selectedProduct?.name}</span>
          </div>
          <div class="item">
            <span class="label">Casal:</span>
            <span class="val">{people[0]?.name || "Personalizado"}</span>
          </div>
        </div>

        <div class="summary-divider"></div>
        <div class="summary-total">
          <span>Total:</span>
          <span class="total-price"
            >R$ {totalAmount.toFixed(2).replace(".", ",")}</span
          >
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .step-payment {
    max-width: 1000px;
    margin: 0 auto;
    padding-bottom: 50px;
  }
  .content-wrapper {
    display: grid;
    grid-template-columns: 1.6fr 1fr;
    gap: 30px;
  }
  .section-header h2 {
    font-family: "Playfair Display", serif;
    color: #5e0b15;
    font-size: 2.2rem;
    margin-bottom: 8px;
  }
  .section-header p {
    color: #8d5b5b;
  }

  .loading-state {
    text-align: center;
    padding: 50px 0;
  }
  .heart-loader {
    animation: heartBeat 1.2s infinite;
    margin-bottom: 20px;
  }

  @keyframes heartBeat {
    0%,
    100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.2);
    }
  }

  .qr-section {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    padding: 15px;
    background: white;
    border: 2px solid #fff0f3;
    border-radius: 24px;
    text-align: center;
  }

  .badge-pix {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: #fff0f3;
    color: #ff4d6d;
    padding: 5px 15px;
    border-radius: 50px;
    font-size: 0.75rem;
    font-weight: 700;
    margin-bottom: 20px;
  }
  .qr-code {
    width: 220px;
    height: 220px;
    border: 1px solid #feeafa;
    border-radius: 15px;
    margin-bottom: 25px;
  }
  .code-container {
    display: flex;
    gap: 10px;
    margin-top: 10px;
  }
  .code-container input {
    flex: 1;
    padding: 14px;
    border: 2px solid #feeafa;
    border-radius: 12px;
    font-size: 0.85rem;
    color: #8d5b5b;
  }
  .copy-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 0 20px;
    background: #c9184a;
    color: white;
    border-radius: 12px;
    cursor: pointer;
    border: none;
    font-weight: 600;
  }
  .copy-btn.success {
    background: #2f855a;
  }

  .instructions {
    text-align: left;
    margin-top: 30px;
    background: #fffafa;
    padding: 20px;
    border-radius: 15px;
  }
  .instructions ul {
    list-style: none;
    padding: 0;
    font-size: 0.85rem;
    color: #8d5b5b;
    margin-top: 10px;
  }
  .instructions li {
    margin-bottom: 6px;
    padding-left: 20px;
    position: relative;
  }
  .instructions li::before {
    content: "❤";
    position: absolute;
    left: 0;
    color: #ffccd5;
  }

  .status-waiting {
    padding: 20px;
    text-align: center;
  }
  .loader-dots span {
    display: inline-block;
    width: 8px;
    height: 8px;
    background: #ffccd5;
    border-radius: 50%;
    margin: 0 4px;
    animation: dots 1.4s infinite;
  }
  .loader-dots span:nth-child(2) {
    animation-delay: 0.2s;
  }
  .loader-dots span:nth-child(3) {
    animation-delay: 0.4s;
  }
  @keyframes dots {
    0%,
    100% {
      opacity: 0.3;
    }
    50% {
      opacity: 1;
    }
  }

  .generating-box {
    text-align: center;
    padding: 60px 40px;
    background: white;
    border: 2px dashed #ffccd5;
  }
  .magic-loader {
    position: relative;
    width: fit-content;
    margin: 0 auto 30px;
  }
  .spin {
    animation: spin 2s linear infinite;
  }
  .heart-inside {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    animation: pulse 1s infinite;
  }
  @keyframes spin {
    100% {
      transform: rotate(360deg);
    }
  }
  .progress-bar {
    width: 100%;
    height: 8px;
    background: #fff0f3;
    border-radius: 10px;
    margin-top: 30px;
    overflow: hidden;
  }
  .progress-fill {
    width: 0%;
    height: 100%;
    background: #c9184a;
    animation: fillProgress 4s forwards linear;
  }
  @keyframes fillProgress {
    to {
      width: 100%;
    }
  }

  .certificate-ready-section {
    animation: fadeIn 0.6s ease-out;
  }
  .icon-circle {
    background: #c9184a;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 20px;
    box-shadow: 0 10px 20px rgba(201, 24, 74, 0.2);
  }
  .certificate-preview {
    position: relative;
    padding: 10px;
    background: white;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  }
  .final-img {
    width: 100%;
    border-radius: 8px;
    display: block;
  }
  .preview-overlay {
    position: absolute;
    bottom: 20px;
    right: 20px;
    color: rgb(255, 0, 0);
    padding: 5px 15px;
    border-radius: 50px;
    font-size: 0.7rem;
  }

  .actions-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 15px;
  }
  .btn-download {
    background: #c9184a;
    padding: 20px;
    border-radius: 50px;
    font-size: 1.1rem;
  }
  .btn-whatsapp {
    border-color: #25d366;
    color: #25d366;
    padding: 20px;
    border-radius: 50px;
  }
  .btn-whatsapp:hover {
    background: #25d366;
    color: white;
  }
  .email-notice {
    text-align: center;
    color: #8d5b5b;
    font-size: 0.9rem;
  }

  .order-summary {
    position: sticky;
    top: 20px;
    padding: 25px;
    background: white;
  }
  .secure-checkout {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    font-size: 0.75rem;
    color: #2f855a;
    margin-bottom: 15px;
    background: #f0fff4;
    padding: 6px;
    border-radius: 6px;
  }
  .summary-total {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: 700;
    margin-top: 20px;
  }
  .total-price {
    font-size: 1.5rem;
    color: #c9184a;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 768px) {
    .content-wrapper {
      grid-template-columns: 1fr;
    }
    .summary-side {
      order: -1;
    }
    .actions-grid {
      grid-template-columns: 1fr;
    }
    .code-container {
      flex-direction: column;
    }
    .copy-btn {
      padding: 15px;
    }
  }
</style>
