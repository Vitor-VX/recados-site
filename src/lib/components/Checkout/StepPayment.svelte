<script lang="ts">
  import { onDestroy, onMount } from "svelte";
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
  import { track } from "$lib/track/meta";

  export let onComplete: () => void;

  let isGeneratingCertificate = false;
  let certificateReady = false;
  let certificateUrl = "";

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
          cpf: customerData.cpf,
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
      handleSuccessfulPayment();
      track("purchase", {
        value: totalAmount,
      });
    }
  }

  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D;

  const W = 1080;
  const H = 1920;

  async function draw(
    couple: string,
    date: string,
    city: string,
    ass: { one: string; two: string },
    couplePhoto: string | null,
  ) {
    ctx = canvas.getContext("2d")!;

    canvas.width = W;
    canvas.height = H;

    await document.fonts.load('40px "Breathing"');
    await document.fonts.load('33px "Breathing"');
    await document.fonts.ready;

    const bg = new Image();
    bg.src = couplePhoto ? "/input2.png" : "/input.png";
    await bg.decode();

    ctx.clearRect(0, 0, W, H);
    ctx.drawImage(bg, 0, 0, W, H);

    if (selectedExtras.find((el) => el.id === "with_photo" && el.selected)) {
      if (couplePhoto) {
        const photoConfig = {
          x: 130,
          y: 640,
          w: 300,
          h: 350,
          radius: 24,
        };

        const img = new Image();
        img.src = couplePhoto;
        await img.decode();

        ctx.save();

        ctx.beginPath();
        ctx.roundRect(
          photoConfig.x,
          photoConfig.y,
          photoConfig.w,
          photoConfig.h,
          photoConfig.radius,
        );
        ctx.clip();

        const imgRatio = img.width / img.height;
        const canvasRatio = photoConfig.w / photoConfig.h;
        let drawX, drawY, drawW, drawH;

        if (imgRatio > canvasRatio) {
          drawH = photoConfig.h;
          drawW = img.width * (photoConfig.h / img.height);
          drawX = photoConfig.x + (photoConfig.w - drawW) / 2;
          drawY = photoConfig.y;
        } else {
          drawW = photoConfig.w;
          drawH = img.height * (photoConfig.w / img.width);
          drawX = photoConfig.x;
          drawY = photoConfig.y + (photoConfig.h - drawH) / 2;
        }

        ctx.drawImage(img, drawX, drawY, drawW, drawH);
        ctx.restore();

        ctx.fillStyle = "#393939";
        ctx.textAlign = "center";

        ctx.font = '25px "Breathing"';
        ctx.fillText(couple, 820, 785);

        ctx.font = '25px "Breathing"';
        ctx.fillText(date, 860, 855);

        ctx.font = '25px "Breathing"';
        ctx.fillText(city, 825, 925);

        ctx.font = '33px "Breathing"';
        ctx.fillText(ass.one, 298, 1550);

        ctx.font = '33px "Breathing"';
        ctx.fillText(ass.two, 800, 1550);
      }

      ctx.fillStyle = "#393939";
      ctx.textAlign = "center";

      ctx.font = '25px "Breathing"';
      ctx.fillText(couple, 820, 785);

      ctx.font = '25px "Breathing"';
      ctx.fillText(date, 860, 855);

      ctx.font = '25px "Breathing"';
      ctx.fillText(city, 825, 925);

      ctx.font = '33px "Breathing"';
      ctx.fillText(ass.one, 298, 1550);

      ctx.font = '33px "Breathing"';
      ctx.fillText(ass.two, 800, 1550);

      certificateUrl = getBase64();
      return;
    }

    ctx.fillStyle = "#393939";
    ctx.textAlign = "center";

    ctx.font = '40px "Breathing"';
    ctx.fillText(couple, 620, 775);

    ctx.font = '33px "Breathing"';
    ctx.fillText(date, 680, 835);

    ctx.font = '33px "Breathing"';
    ctx.fillText(city, 580, 905);

    ctx.font = '33px "Breathing"';
    ctx.fillText(ass.one, 298, 1515);

    ctx.font = '33px "Breathing"';
    ctx.fillText(ass.two, 775, 1515);

    certificateUrl = getBase64();
  }

  function getBase64(): string {
    return canvas.toDataURL("image/png");
  }

  async function handleSuccessfulPayment() {
    setPaymentStatus("paid");
    isGeneratingCertificate = true;

    const { name, startDate, city, photo } = people[0];
    const names = name
      .split(/\s+(?:e|&{1,2}|\+|\|)\s+/i)
      .map((n) => n.trim())
      .filter(Boolean);

    const one = names[0] ?? "";
    const two = names[1] ?? "";

    await draw(
      name,
      startDate,
      city,
      {
        one,
        two,
      },
      photo,
    );

    isGeneratingCertificate = false;
    certificateReady = true;
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

<canvas bind:this={canvas} width="1080" height="1920" style="display: none" />

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
              <strong>{customerData.whatsapp}</strong>
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
  @font-face {
    font-family: "Breathing";
    src: url("/breathing.ttf") format("opentype");
    font-weight: normal;
    font-style: normal;
  }
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
