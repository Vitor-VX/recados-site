<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import {
    Copy,
    CircleCheck as CheckCircle,
    Clock,
    Heart,
    Lock,
    Sparkles,
    MessageSquare,
    Mail,
    ShieldCheck,
    AlertCircle,
  } from "lucide-svelte";
  import {
    checkoutStore,
    setPaymentStatus,
    setPixData,
  } from "$lib/stores/checkoutStore";
  import { track } from "$lib/track/meta";

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

  let paymentInterval: any = null;

  function startPaymentWatcher() {
    if (paymentInterval) return;

    paymentInterval = setInterval(async () => {
      await checkPayment();
    }, 20000);
  }

  function stopPaymentWatcher() {
    if (paymentInterval) {
      clearInterval(paymentInterval);
      paymentInterval = null;
      localStorage.removeItem("order-payment");
    }
  }

  onMount(() => {
    generatePixPayment();
    startPaymentWatcher();
  });

  onDestroy(() => {
    stopPaymentWatcher();
  });

  async function generatePixPayment() {
    setPaymentStatus("generating");

    const upsell = selectedExtras
      .filter((el) => el.selected)
      .map((el) => el.id);
    const certificates = people.map((el) => ({
      couple: el.name,
      startDate: el.startDate,
      city: el.city,
      photo: el.photo,
      theme: el.selectedTheme,
    }));

    const request = await fetch(
      "https://vxsoftware.space/api/v1/offers/certificate/orders/create",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product: {
            plan: "single",
            extras: upsell,
            certificates,
          },
          name: customerData.name,
          whatsapp: customerData.whatsapp,
          email: customerData.email,
        }),
      },
    );

    const response = await request.json();
    const { payment, token } = response.data;
    const { qrCode, qrCodeBase64 } = payment;

    setPixData(qrCode, `data:imagepng;base64,${qrCodeBase64}`);
    setPaymentStatus("waiting");
    localStorage.setItem("order-payment", token);
  }

  async function checkPayment() {
    const token = localStorage.getItem("order-payment");
    if (!token) return;

    const res = await fetch(
      "https://vxsoftware.space/api/v1/offers/certificate/orders/current",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const data = await res.json();
    if (data.data.status === "approved") {
      stopPaymentWatcher();
      setPaymentStatus("paid");
      track("purchase", { value: totalAmount });
    }
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
      {#if paymentStatus !== "paid"}
        <div class="section-header">
          <h2>
            {paymentStatus === "generating"
              ? "Preparando tudo..."
              : "Quase lá, falta pouco!"}
          </h2>
          <p>Realize o pagamento para liberarmos sua certidão personalizada.</p>
        </div>
      {/if}

      {#if paymentStatus === "generating"}
        <div class="loading-state">
          <div class="heart-loader">
            <Heart size={48} fill="#ff4d6d" color="#ff4d6d" />
          </div>
          <h3>Gerando QR Code...</h3>
        </div>
      {:else if paymentStatus === "waiting"}
        <div class="payment-content">
          <div class="qr-section card">
            <div class="badge-pix">
              <Sparkles size={14} />
              Pix Instantâneo
            </div>
            <img src={pixQrCode} alt="QR Code PIX" class="qr-code" />
            <div class="pix-code-section">
              <label>Pix Copia e Cola</label>
              <div class="code-container">
                <input type="text" value={pixCode} readonly />
                <button
                  class="copy-btn"
                  on:click={copyPixCode}
                  class:success={copySuccess}
                >
                  {#if copySuccess}<CheckCircle size={18} />{:else}<Copy
                      size={18}
                    />{/if}
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
      {:else if paymentStatus === "paid"}
        <div class="success-container animate-in">
          <div class="success-card card">
            <div class="icon-header">
              <CheckCircle size={64} color="#2f855a" strokeWidth={1.5} />
            </div>
            <h2>Pagamento Confirmado!</h2>
            <p class="main-msg">
              Obrigado por confiar em nós para eternizar esse momento.
            </p>

            <div class="delivery-steps">
              <div class="delivery-item">
                <div class="step-icon">
                  <MessageSquare size={24} color="#25D366" />
                </div>
                <div class="step-text">
                  <strong>Confira seu WhatsApp</strong>
                  <span
                    >Enviamos sua certidão agora mesmo para o número <b
                      >{customerData.whatsapp}</b
                    >.</span
                  >
                </div>
              </div>
              <div class="delivery-item">
                <div class="step-icon"><Mail size={24} color="#c9184a" /></div>
                <div class="step-text">
                  <strong>Entrega alternativa por e-mail</strong>
                  <span>
                    Caso haja qualquer dificuldade na entrega via WhatsApp,
                    entraremos em contato e enviaremos o certificado para o
                    e-mail
                    <b>{customerData.email}</b>.
                  </span>
                </div>
              </div>
            </div>

            <div class="guarantee-box">
              <div class="guarantee-header">
                <ShieldCheck size={20} />
                <span>Garantia de Entrega</span>
              </div>
              <p>
                Fique tranquilo(a)! Nosso sistema garante a entrega do seu
                produto. Caso ocorra qualquer imprevisto técnico, você conta com
                <strong>reembolso integral automático</strong>.
              </p>
            </div>

            <div class="support-info">
              <AlertCircle size={16} />
              <span
                >Não recebeu? Verifique sua caixa de spam ou entre em contato
                com nosso suporte.</span
              >
            </div>
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
  @import url("https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap");
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
    flex-direction: column;
    align-items: center;
    padding: 25px;
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
    background: #fafafa;
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
    margin-top: 25px;
    background: #fffafa;
    padding: 20px;
    border-radius: 15px;
    width: 100%;
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
  .animate-in {
    animation: fadeIn 0.8s ease-out;
  }
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  .success-card {
    padding: 40px;
    text-align: center;
    border: 2px solid #e6fffa;
    background: #ffffff;
    border-radius: 30px;
  }
  .icon-header {
    margin-bottom: 20px;
  }
  .success-card h2 {
    font-family: "Playfair Display", serif;
    color: #1a202c;
    font-size: 2rem;
    margin-bottom: 10px;
  }
  .main-msg {
    color: #4a5568;
    margin-bottom: 30px;
  }
  .delivery-steps {
    display: grid;
    gap: 20px;
    text-align: left;
    margin-bottom: 40px;
  }
  .delivery-item {
    display: flex;
    gap: 15px;
    align-items: flex-start;
    padding: 15px;
    background: #f8fafc;
    border-radius: 15px;
  }
  .step-text strong {
    display: block;
    color: #2d3748;
    font-size: 1rem;
  }
  .step-text span {
    font-size: 0.85rem;
    color: #718096;
    line-height: 1.4;
  }
  .guarantee-box {
    background: #fff5f5;
    border: 1px solid #fed7d7;
    padding: 20px;
    border-radius: 15px;
    text-align: left;
  }
  .guarantee-header {
    display: flex;
    align-items: center;
    gap: 8px;
    color: #c53030;
    font-weight: 700;
    margin-bottom: 8px;
    font-size: 0.9rem;
    text-transform: uppercase;
  }
  .guarantee-box p {
    font-size: 0.85rem;
    color: #742a2a;
    margin: 0;
    line-height: 1.5;
  }
  .support-info {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 25px;
    color: #a0aec0;
    font-size: 0.75rem;
    justify-content: center;
  }
  .order-summary {
    position: sticky;
    top: 20px;
    padding: 25px;
    background: white;
    border-radius: 20px;
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
    font-weight: 600;
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
  @media (max-width: 768px) {
    .content-wrapper {
      grid-template-columns: 1fr;
    }
    .summary-side {
      order: -1;
    }
    .code-container {
      flex-direction: column;
    }
    .copy-btn {
      padding: 15px;
    }
    .success-card {
      padding: 20px;
    }
  }
</style>
