<script lang="ts">
  import {
    Heart,
    CheckCircle2,
    MessageSquare,
    Sparkles,
    Layout,
    MousePointerClick,
    X,
  } from "lucide-svelte";

  const packages = [
    {
      id: "minimalist",
      name: "Pacote Minimalista",
      description: "Design moderno com foco na tipografia e elegância.",
      tag: "Mais Escolhido",
      mainImg:
        "https://files.botsync.site/modelos-certificados/certificado_02_sem_img.png",
      premiumImg:
        "https://files.botsync.site/modelos-certificados/certificado_02_com_img.png",
    },
    {
      id: "classic",
      name: "Pacote Vintage",
      description: "Estilo vintage que remete às certidões tradicionais.",
      tag: "Elegante",
      mainImg:
        "https://files.botsync.site/modelos-certificados/modelo_padrao.jpeg",
      premiumImg:
        "https://files.botsync.site/modelos-certificados/certificado_01_com_img.png",
    },
  ];

  let activePackage: string | null = null;

  function togglePackage(id: string) {
    activePackage = activePackage === id ? null : id;
  }
</script>

<section class="templates-showcase">
  <div class="container">
    <div class="text-center mb-8">
      <div class="badge-mini">
        <Sparkles size={14} fill="currentColor" />
        <span>Design & Estilo</span>
      </div>
      <h2 class="section-title">Escolha seu Modelo</h2>
      <p class="subtitle">
        O plano padrão inclui a versão <strong>Sem Foto</strong>. Ao garantir o
        Certificado do Amor Premium, você também recebe a versão com
        <strong>Foto do Casal</strong>.
      </p>
    </div>

    <div class="packages-grid">
      {#each packages as pack}
        <div
          class="package-card"
          class:expanded={activePackage === pack.id}
          on:click={() => togglePackage(pack.id)}
          role="button"
          tabindex="0"
        >
          <div
            class="instruction-tap"
            class:active-instruction={activePackage === pack.id}
          >
            {#if activePackage === pack.id}
              <X size={16} />
              <span>Toque para fechar</span>
            {:else}
              <MousePointerClick size={16} />
              <span>Toque para ver os dois</span>
            {/if}
          </div>

          <div class="cards-stack">
            <div class="card-item premium">
              <img src={pack.premiumImg} alt="Versão Com Foto" />
              <div class="label-premium">
                <Sparkles size={10} fill="white" /> Versão com Foto
              </div>
            </div>

            <div class="card-item standard">
              <img src={pack.mainImg} alt="Versão Padrão" />
              <div class="label-standard">Versão Padrão (Sem Foto)</div>
            </div>
          </div>

          <div class="package-info">
            <h3>{pack.name}</h3>
            <p>{pack.description}</p>

            <div class="features">
              <div class="feature">
                <CheckCircle2 size={16} color="#c9184a" />
                <span>Alta Definição</span>
              </div>
              <div class="feature">
                <CheckCircle2 size={16} color="#c9184a" />
                <span>Pronto para Imprimir</span>
              </div>
            </div>
          </div>
        </div>
      {/each}
    </div>

    <div class="footer-stats">
      <div class="divider-dot"></div>
      <div class="stat">
        <Layout size={20} />
        <span>Designs exclusivos</span>
      </div>
    </div>
  </div>
</section>

<style>
  .templates-showcase {
    padding: 80px 0;
    background: #fffafa;
    overflow: hidden;
  }

  .badge-mini {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: #ffe3e3;
    color: #e63946;
    padding: 8px 20px;
    border-radius: 50px;
    font-size: 0.85rem;
    font-weight: 700;
    text-transform: uppercase;
    margin-bottom: 20px;
  }

  .section-title {
    font-family: "Great Vibes", cursive;
    color: #5e0b15;
    font-size: clamp(2.5rem, 8vw, 4rem);
    margin-bottom: 15px;
    line-height: 1;
  }

  .subtitle {
    color: #8d5b5b;
    font-size: 1.1rem;
    max-width: 650px;
    margin: 0 auto 40px;
    line-height: 1.6;
    text-align: center;
  }

  .packages-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 40px;
    max-width: 1100px;
    margin: 0 auto 60px;
    padding: 0 20px;
  }

  .package-card {
    background: white;
    border-radius: 32px;
    padding: 60px 30px 30px; /* Padding top maior para não bater nos badges */
    border: 1px solid #feeafa;
    box-shadow: 0 10px 30px rgba(74, 14, 14, 0.03);
    position: relative;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    cursor: pointer;
  }

  .package-card:hover {
    border-color: #ffccd5;
    transform: translateY(-5px);
  }

  /* Badge de Categoria */
  .badge-tag {
    position: absolute;
    top: 20px;
    left: 25px;
    background: #5e0b15;
    color: white;
    padding: 5px 14px;
    border-radius: 50px;
    font-size: 0.65rem;
    font-weight: 800;
    text-transform: uppercase;
    z-index: 30; /* Acima de tudo */
  }

  /* Instrução de Toque */
  .instruction-tap {
    position: absolute;
    top: 20px;
    right: 25px;
    display: flex;
    align-items: center;
    gap: 6px;
    color: #c9184a;
    font-size: 0.7rem;
    font-weight: 800;
    text-transform: uppercase;
    background: #fff0f3;
    padding: 6px 12px;
    border-radius: 50px;
    z-index: 30;
    transition: 0.3s;
    border: 1px solid #ffccd5;
  }

  .active-instruction {
    background: #c9184a;
    color: white;
    border-color: #c9184a;
  }

  .cards-stack {
    position: relative;
    height: 320px;
    width: 100%;
    margin-bottom: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    perspective: 1000px;
  }

  .card-item {
    position: absolute;
    width: 190px;
    aspect-ratio: 3/4.2;
    border-radius: 12px;
    overflow: hidden;
    background: white;
    border: 3px solid white;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
    transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .card-item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    pointer-events: none;
  }

  .label-standard,
  .label-premium {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 8px;
    font-size: 0.6rem;
    font-weight: 700;
    text-align: center;
    backdrop-filter: blur(4px);
  }

  .label-premium {
    background: rgba(201, 24, 74, 0.9);
  }

  /* Posição Inicial (Sobrepostas) */
  .premium {
    transform: rotate(-6deg) translateX(-15px);
    z-index: 1;
    opacity: 0.5;
  }

  .standard {
    transform: rotate(3deg) translateX(15px);
    z-index: 2;
  }

  .package-card.expanded .premium {
    transform: translateX(-85px) rotate(-10deg) scale(1.05);
    opacity: 1;
    z-index: 10;
  }

  .package-card.expanded .standard {
    transform: translateX(85px) rotate(8deg) scale(1.05);
    opacity: 1;
    z-index: 10;
  }

  @media (min-width: 1024px) {
    .package-card:hover:not(.expanded) .premium {
      transform: translateX(-40px) rotate(-8deg);
    }
    .package-card:hover:not(.expanded) .standard {
      transform: translateX(40px) rotate(5deg);
    }
  }

  .package-info h3 {
    font-family: "Poppins", sans-serif;
    font-size: 1.3rem;
    color: #4a0e0e;
    margin-bottom: 8px;
    font-weight: 700;
    text-align: center;
  }

  .package-info p {
    color: #8d5b5b;
    font-size: 0.9rem;
    margin-bottom: 20px;
    text-align: center;
  }

  .features {
    display: flex;
    justify-content: center;
    gap: 15px;
  }

  .feature {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 0.7rem;
    color: #5e0b15;
    font-weight: 800;
    text-transform: uppercase;
  }

  .footer-stats {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 30px;
    margin-top: 40px;
    padding-top: 40px;
    border-top: 1px solid #ffccd5;
  }

  .stat {
    display: flex;
    align-items: center;
    gap: 10px;
    color: #5e0b15;
    font-weight: 600;
    font-size: 0.9rem;
  }

  .divider-dot {
    width: 6px;
    height: 6px;
    background: #ffccd5;
    border-radius: 50%;
  }

  @media (max-width: 768px) {
    .packages-grid {
      gap: 30px;
    }

    .package-card {
      padding: 60px 15px 25px;
    }

    .cards-stack {
      height: 280px;
    }

    .card-item {
      width: 145px;
    }

    .package-card.expanded .premium {
      transform: translateX(-65px) rotate(-10deg) scale(1.05);
    }

    .package-card.expanded .standard {
      transform: translateX(65px) rotate(8deg) scale(1.05);
    }

    .footer-stats {
      flex-direction: column;
      gap: 15px;
      text-align: center;
    }

    .divider-dot {
      display: none;
    }
  }
</style>
