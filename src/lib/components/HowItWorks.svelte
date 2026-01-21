<script lang="ts">
  import {
    ShoppingBag,
    CreditCard as Edit3,
    CreditCard,
    Send,
    DollarSign,
  } from "lucide-svelte";

  export let onStartCheckout: () => void;
</script>

<section class="how-it-works">
  <div class="container">
    <h2 class="text-center mb-8">Como funciona</h2>

    <div class="steps">
      <div class="step">
        <div class="step-number">1</div>
        <div class="step-icon">
          <ShoppingBag size={32} color="#3b82f6" />
        </div>
        <h3>Escolha o pacote</h3>
        <p>Selecione quantos certificados do amor você deseja criar.</p>
      </div>

      <div class="step-connector"></div>

      <div class="step">
        <div class="step-number">2</div>
        <div class="step-icon">
          <Edit3 size={32} color="#3b82f6" />
        </div>
        <h3>Preencha os dados</h3>
        <p>
          Informe o nome do casal, a data especial e escreva uma mensagem
          personalizada.
        </p>
      </div>

      <div class="step-connector"></div>

      <div class="step">
        <div class="step-number">3</div>
        <div class="step-icon">
          <DollarSign size={32} color="#3b82f6" />
        </div>
        <h3>Pague via Pix</h3>
        <p>Pagamento instantâneo 100% seguro e confirmação automática.</p>
      </div>

      <div class="step-connector"></div>

      <div class="step">
        <div class="step-number">4</div>
        <div class="step-icon">
          <Send size={32} color="#3b82f6" />
        </div>
        <h3>Receba seu certificado</h3>
        <p>O certificado do amor em imagem digital será enviado automaticamente no seu WhatsApp.</p>
      </div>
    </div>

    <div class="text-center mt-8">
      <button class="btn btn-primary btn-large" on:click={onStartCheckout}>
        Começar agora
      </button>
    </div>
  </div>
</section>

<style>
  .how-it-works {
    padding: 80px 0;
    background: #f8fafc;
  }

  .steps {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    max-width: 1000px;
    margin: 0 auto;
    position: relative;
  }

  .step {
    flex: 1;
    text-align: center;
    position: relative;
    padding: 0 16px;
  }

  .step-number {
    position: absolute;
    top: -12px;
    left: 50%;
    transform: translateX(-50%);
    background: #3b82f6;
    color: white;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 14px;
    z-index: 2;
  }

  .step-icon {
    background: rgba(59, 130, 246, 0.1);
    padding: 20px;
    border-radius: 50%;
    margin: 20px auto 24px;
    width: fit-content;
  }

  .step-connector {
    height: 2px;
    background: #e2e8f0;
    flex: 0 0 40px;
    margin-top: 52px;
  }

  .step h3 {
    font-size: 1.2rem;
    color: #2d3748;
    margin-bottom: 12px;
  }

  .step p {
    color: #4a5568;
    font-size: 0.95rem;
    line-height: 1.5;
  }

  .btn-large {
    padding: 18px 36px;
    font-size: 1.2rem;
    font-weight: 600;
  }

  @media (max-width: 768px) {
    .how-it-works {
      padding: 60px 0;
    }

    .steps {
      flex-direction: column;
      gap: 48px;
    }

    .step-connector {
      display: none;
    }

    .step-number {
      position: static;
      transform: none;
      margin: 0 auto 16px;
    }

    .step-icon {
      margin: 16px auto 20px;
    }
  }
</style>
