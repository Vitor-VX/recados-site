<script lang="ts">
  import {
    CheckCircle2,
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
          <!-- UI Elements -->
          <div class="card-ui-top">
            <div class="badge-tag">{pack.tag}</div>
            <div
              class="instruction-tap"
              class:active-instruction={activePackage === pack.id}
            >
              {#if activePackage === pack.id}
                <X size={14} />
                <span>Fechar</span>
              {:else}
                <MousePointerClick size={14} />
                <span>Ver os dois</span>
              {/if}
            </div>
          </div>

          <!-- Stack de Cartas -->
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

          <!-- Informações -->
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
      <div class="stat">
        <Layout size={20} />
        <span>Designs exclusivos e autorais</span>
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
    font-size: clamp(2.8rem, 8vw, 4.2rem);
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
    padding: 0 20px;
  }

  .packages-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
    gap: 40px;
    max-width: 1100px;
    margin: 0 auto 60px;
    padding: 0 20px;
  }

  .package-card {
    background: white;
    border-radius: 35px;
    padding: 80px 25px 35px;
    border: 1px solid #feeafa;
    box-shadow: 0 10px 30px rgba(74, 14, 14, 0.04);
    position: relative;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    cursor: pointer;
    overflow: hidden;
  }

  .package-card:hover {
    border-color: #ffccd5;
    transform: translateY(-5px);
  }

  .card-ui-top {
    position: absolute;
    top: 25px;
    left: 0;
    width: 100%;
    padding: 0 25px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 40;
  }

  .badge-tag {
    background: #5e0b15;
    color: white;
    padding: 6px 14px;
    border-radius: 50px;
    font-size: 0.65rem;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .instruction-tap {
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
    transition: 0.3s;
    border: 1px solid #ffccd5;
    white-space: nowrap;
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
    margin-bottom: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    perspective: 1200px;
  }

  .card-item {
    position: absolute;
    width: 195px;
    left: 50%; /* Âncora central */
    aspect-ratio: 3/4.2;
    border-radius: 14px;
    overflow: hidden;
    background: white;
    border: 3px solid white;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
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
    background: rgba(0, 0, 0, 0.75);
    color: white;
    padding: 8px;
    font-size: 0.65rem;
    font-weight: 700;
    text-align: center;
    backdrop-filter: blur(4px);
  }

  .label-premium {
    background: rgba(201, 24, 74, 0.95);
  }

  /* Posição Inicial (Sobrepostas e Centralizadas) */
  .premium {
    z-index: 1;
    opacity: 0.5;
    transform: translateX(-55%) rotate(-6deg);
  }

  .standard {
    z-index: 2;
    transform: translateX(-45%) rotate(3deg);
  }

  /* Posição Expandida */
  .package-card.expanded .premium {
    transform: translateX(calc(-50% - 85px)) rotate(-10deg) scale(1.05);
    opacity: 1;
    z-index: 10;
  }

  .package-card.expanded .standard {
    transform: translateX(calc(-50% + 85px)) rotate(8deg) scale(1.05);
    opacity: 1;
    z-index: 10;
  }

  /* Hover Desktop */
  @media (min-width: 1024px) {
    .package-card:hover:not(.expanded) .premium {
      transform: translateX(-65%) rotate(-8deg);
      opacity: 0.8;
    }
    .package-card:hover:not(.expanded) .standard {
      transform: translateX(-35%) rotate(5deg);
    }
  }

  .package-info h3 {
    font-family: "Poppins", sans-serif;
    font-size: 1.4rem;
    color: #4a0e0e;
    margin-bottom: 8px;
    font-weight: 700;
    text-align: center;
  }

  .package-info p {
    color: #8d5b5b;
    font-size: 0.95rem;
    margin-bottom: 25px;
    text-align: center;
    line-height: 1.5;
  }

  .features {
    display: flex;
    justify-content: center;
    gap: 15px;
    flex-wrap: wrap;
  }

  .feature {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 0.7rem;
    color: #5e0b15;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .footer-stats {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 40px;
    padding-top: 30px;
    border-top: 1px solid #ffccd5;
  }

  .stat {
    display: flex;
    align-items: center;
    gap: 10px;
    color: #5e0b15;
    font-weight: 600;
    font-size: 0.95rem;
  }

  @media (max-width: 768px) {
    .packages-grid {
      grid-template-columns: 1fr;
      gap: 30px;
    }

    .package-card {
      padding: 70px 20px 30px;
    }

    .cards-stack {
      height: 280px;
    }

    .card-item {
      width: 150px;
    }

    .package-card.expanded .premium {
      transform: translateX(calc(-50% - 60px)) rotate(-8deg) scale(1.05);
    }

    .package-card.expanded .standard {
      transform: translateX(calc(-50% + 60px)) rotate(6deg) scale(1.05);
    }

    .section-title {
      font-size: 2.8rem;
    }
  }
</style>
