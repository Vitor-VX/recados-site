<script lang="ts">
  import { UserCheck, Zap, Shield } from "lucide-svelte";
</script>

<section class="benefits">
  <div class="container">
    <h2 class="text-center mb-8">
      ❤️ Por que escolher nosso Certificado do Amor?
    </h2>

    <div class="grid grid-3">
      <div class="benefit-card card">
        <div class="benefit-icon">
          <UserCheck size={48} color="#3b82f6" />
        </div>
        <h3>100% Personalizado</h3>
        <p>
          Cada certificado é criado com o nome do casal, data especial e uma
          mensagem exclusiva escolhida por você.
        </p>
      </div>

      <div class="benefit-card card">
        <div class="benefit-icon">
          <Zap size={48} color="#f59e0b" />
        </div>
        <h3>Entrega rápida</h3>
        <p>
          Receba seu certificado do amor em imagem digital poucos minutos após a
          confirmação do pagamento.
        </p>
      </div>

      <div class="benefit-card card">
        <div class="benefit-icon">
          <Shield size={48} color="#10b981" />
        </div>
        <h3>Pagamento seguro</h3>
        <p>Pix instantâneo com confirmação automática e total segurança.</p>
      </div>
    </div>
  </div>
</section>

<style>
  .benefits {
    padding: 80px 0;
    background: #ffffff;
  }

  .benefit-card {
    text-align: center;
    border: 2px solid transparent;
    transition: all 0.3s ease;
  }

  .benefit-card:hover {
    border-color: #3b82f6;
    transform: translateY(-8px);
  }

  .benefit-icon {
    margin: 0 auto 24px;
    width: fit-content;
    padding: 16px;
    background: rgba(59, 130, 246, 0.1);
    border-radius: 50%;
  }

  .benefit-card:nth-child(2) .benefit-icon {
    background: rgba(245, 158, 11, 0.1);
  }

  .benefit-card:nth-child(3) .benefit-icon {
    background: rgba(16, 185, 129, 0.1);
  }

  .benefit-card h3 {
    color: #2d3748;
    margin-bottom: 16px;
  }

  .benefit-card p {
    color: #4a5568;
    line-height: 1.6;
  }

  @media (max-width: 768px) {
    .benefits {
      padding: 60px 0;
    }
  }
</style>
