<script lang="ts">
  import { ShoppingBag, Edit3, Send, DollarSign, Heart } from "lucide-svelte";

  export let onStartCheckout: () => void;
</script>

<section class="how-it-works">
  <div class="container">
    <h2 class="text-center section-title">Passo a passo para a surpresa</h2>

    <div class="steps">
      <div class="step">
        <div class="step-number">
          <Heart size={16} fill="white" />
          <span>1</span>
        </div>
        <div class="step-icon">
          <ShoppingBag size={32} color="#ff4d6d" />
        </div>
        <h3>Escolha o pacote</h3>
        <p>
          Selecione quantos certificados do amor você deseja criar para
          presentear.
        </p>
      </div>

      <div class="step-connector"></div>

      <div class="step">
        <div class="step-number">
          <Heart size={16} fill="white" />
          <span>2</span>
        </div>
        <div class="step-icon">
          <Edit3 size={32} color="#ff4d6d" />
        </div>
        <h3>Personalize tudo</h3>
        <p>
          Informe o nome do casal, a data de início do relacionamento e a
          cidade/estado onde moram.
        </p>
      </div>

      <div class="step-connector"></div>

      <div class="step">
        <div class="step-number">
          <Heart size={16} fill="white" />
          <span>3</span>
        </div>
        <div class="step-icon">
          <DollarSign size={32} color="#ff4d6d" />
        </div>
        <h3>Pagamento Pix</h3>
        <p>Finalize com Pix de forma instantânea e totalmente segura.</p>
      </div>

      <div class="step-connector"></div>

      <div class="step">
        <div class="step-number">
          <Heart size={16} fill="white" />
          <span>4</span>
        </div>
        <div class="step-icon">
          <Send size={32} color="#ff4d6d" />
        </div>
        <h3>Receba o Amor</h3>
        <p>
          Sua certidão digital chega direto no seu WhatsApp em poucos minutos.
        </p>
      </div>
    </div>

    <div class="text-center mt-8">
      <button class="btn btn-primary btn-large" on:click={onStartCheckout}>
        Quero criar a minha agora
      </button>
    </div>
  </div>
</section>

<style>
  .how-it-works {
    padding: 100px 0;
    background: #ffffff;
    background-image: linear-gradient(#fff5f5 1px, transparent 1px),
      linear-gradient(90deg, #fff5f5 1px, transparent 1px);
    background-size: 40px 40px;
  }

  .section-title {
    font-family: "Great Vibes", cursive;
    color: #5e0b15;
    font-size: 3rem;
    margin-bottom: 80px;
  }

  .steps {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    max-width: 1100px;
    margin: 0 auto;
    position: relative;
  }

  .step {
    flex: 1;
    text-align: center;
    position: relative;
    padding: 0 10px;
    z-index: 1;
  }

  .step-number {
    position: absolute;
    top: -15px;
    left: 50%;
    transform: translateX(-50%);
    background: #ff4d6d;
    color: white;
    padding: 8px 12px;
    border-radius: 20px;
    display: flex;
    align-items: center;
    gap: 5px;
    font-weight: 700;
    font-size: 14px;
    box-shadow: 0 4px 10px rgba(255, 77, 109, 0.3);
  }

  .step-icon {
    background: #fff0f3;
    padding: 24px;
    border-radius: 24px;
    margin: 20px auto 24px;
    width: fit-content;
    border: 2px solid #feeafa;
    transition: all 0.3s ease;
  }

  .step:hover .step-icon {
    transform: rotate(-5deg);
    background: #ffe3e3;
    border-color: #ffccd5;
  }

  .step-connector {
    height: 2px;
    background: #ffccd5;
    background-image: linear-gradient(to right, #ffccd5 50%, transparent 50%);
    background-size: 10px 1px;
    flex: 1;
    margin-top: 65px;
    opacity: 0.6;
  }

  .step h3 {
    font-family: "Poppins", sans-serif;
    font-size: 1.15rem;
    color: #4a0e0e;
    font-weight: 600;
    margin-bottom: 12px;
  }

  .step p {
    color: #8d5b5b;
    font-size: 0.95rem;
    line-height: 1.5;
  }

  .btn-large {
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

  @media (max-width: 992px) {
    .step-connector {
      display: none;
    }
  }

  @media (max-width: 768px) {
    .how-it-works {
      padding: 60px 0;
    }

    .steps {
      flex-direction: column;
      gap: 50px;
    }

    .step {
      width: 100%;
    }

    .step-number {
      position: relative;
      top: 0;
      margin-bottom: -10px;
      display: inline-flex;
    }

    .step-icon {
      margin-top: 0;
    }

    .btn-large {
      width: 100%;
      padding: 18px;
    }
  }
</style>
