<script lang="ts">
  import { UserCheck, Zap, Shield, MessageSquare } from "lucide-svelte";
</script>

<section class="benefits">
  <div class="container">
    <h2 class="text-center section-title" style="">
      Por que escolher nosso Certificado do Amor?
    </h2>

    <div class="grid grid-3">
      <div class="benefit-card card">
        <div class="benefit-icon icon-red">
          <UserCheck size={40} />
        </div>
        <h3>100% Personalizado</h3>
        <p>
          Cada certificado é criado com o nome do casal, a data especial e a
          cidade/estado informados por você.
        </p>
      </div>

      <div class="benefit-card card">
        <div class="benefit-icon icon-pink">
          <MessageSquare size={40} />
        </div>
        <h3>Entrega Instantânea</h3>
        <p>
          Receba sua certidão digital poucos minutos após a confirmação, direto
          no seu <strong>WhatsApp</strong>.
        </p>
      </div>

      <div class="benefit-card card">
        <div class="benefit-icon icon-gold">
          <Shield size={40} />
        </div>
        <h3>Amor com Segurança</h3>
        <p>
          Pagamento via Pix com processamento criptografado e garantia de
          entrega imediata.
        </p>
      </div>
    </div>
  </div>
</section>

<style>
  .benefits {
    padding: 100px 0;
    background: #fffafa;
    position: relative;
  }

  .section-title {
    font-family: "Great Vibes", cursive;
    color: #5e0b15;
    font-size: 3rem;
    margin-bottom: 60px;
    position: relative;
  }

  .section-title::after {
    content: "❤❤❤";
    display: block;
    font-size: 1rem;
    color: #ff4d6d;
    margin-top: 10px;
    letter-spacing: 5px;
  }

  .benefit-card {
    text-align: center;
    border: 1px solid #feeafa;
    padding: 40px 30px;
    background: #ffffff;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .benefit-card:hover {
    border-color: #ffccd5;
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(230, 57, 70, 0.08);
  }

  .benefit-icon {
    margin-bottom: 24px;
    width: 80px;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: transform 0.3s ease;
  }

  .benefit-card:hover .benefit-icon {
    transform: rotate(10deg) scale(1.1);
  }

  .icon-red {
    background: #fff0f3;
    color: #ff4d6d;
  }

  .icon-pink {
    background: #fdf0f0;
    color: #ff8fa3;
  }

  .icon-gold {
    background: #fff9eb;
    color: #d4af37;
  }

  .benefit-card h3 {
    font-family: "Poppins", sans-serif;
    color: #4a0e0e;
    font-size: 1.4rem;
    font-weight: 600;
    margin-bottom: 16px;
  }

  .benefit-card p {
    color: #8d5b5b;
    font-size: 1rem;
    line-height: 1.6;
    margin-bottom: 0;
  }

  @media (max-width: 768px) {
    .benefits {
      padding: 60px 0;
    }

    .section-title {
      font-size: 2rem;
      margin-bottom: 40px;
    }

    .benefit-card {
      padding: 30px 20px;
    }
  }
</style>
