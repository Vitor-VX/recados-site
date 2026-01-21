<script lang="ts">
  import { HandHeart, Heart, Play } from "lucide-svelte";

  export let onStartCheckout: () => void;
</script>

<section class="hero">
  <div class="container">
    <div class="hero-content">
      <h1 class="hero-title">
        <span class="title-icon">
          <Heart size={32} fill="currentColor" />
        </span>
        Mensagem Especial do Amor
      </h1>

      <p class="hero-subtitle">
        Surpreenda quem você ama com uma certidão do amor personalizada, feita
        para eternizar o nome do casal e registrar esse sentimento único.
      </p>

      <div class="video-preview">
        <div class="video-thumbnail pulse">
          <!-- <div class="play-button">
            <Play size={48} fill="white" color="white" />
          </div> -->
          <img
            src="https://pub-d997896d0b944e3f97ade771c4a3aeaf.r2.dev/a74c71a5-ba46-4af7-b566-f258e9179df5.jfif"
            alt="Prévia do vídeo personalizado"
          />
        </div>
      </div>

      <div class="cta-section">
        <button class="btn btn-secondary btn-large" on:click={onStartCheckout}>
          Criar minha certidão
        </button>
        <p class="price-info">
          A partir de <span class="price">R$ 14,90</span>
        </p>
      </div>
    </div>
  </div>
</section>

<style>
  .pulse {
    animation: pulse 1.5s infinite;
  }

  @keyframes pulse {
    0% {
      transform: scale(1);
      opacity: 1;
    }

    50% {
      transform: scale(1.05);
      opacity: 0.85;
    }

    100% {
      transform: scale(1);
      opacity: 1;
    }
  }

  .hero {
    background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
    color: #2d3748;
    padding: 80px 0;
    text-align: center;
  }

  .hero-title {
    color: #1a202c;
    font-size: 3rem;
    margin-bottom: 24px;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
  }

  .title-icon {
    color: #3b82f6;
  }

  .hero-subtitle {
    font-size: 1.3rem;
    color: #4a5568;
    max-width: 700px;
    margin: 0 auto 48px;
    line-height: 1.6;
  }

  .video-preview {
    margin-bottom: 48px;
  }

  .video-thumbnail {
    position: relative;
    max-width: 300px;
    margin: 0 auto;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
    cursor: pointer;
    transition: transform 0.3s ease;
    aspect-ratio: 9/16;
  }

  .video-thumbnail:hover {
    transform: scale(1.05);
  }

  .video-thumbnail img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .play-button {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(0, 0, 0, 0.7);
    border-radius: 50%;
    padding: 20px;
    transition: all 0.3s ease;
  }

  .play-button:hover {
    background: rgba(0, 0, 0, 0.8);
    transform: translate(-50%, -50%) scale(1.1);
  }

  .btn-large {
    padding: 18px 36px;
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 16px;
  }

  .price-info {
    font-size: 1.1rem;
    color: #4a5568;
  }

  .price {
    font-size: 1.4rem;
    font-weight: 700;
    color: #10b981;
  }

  @media (max-width: 768px) {
    .hero {
      padding: 60px 0;
    }

    .hero-title {
      font-size: 2.2rem;
    }

    .hero-subtitle {
      font-size: 1.1rem;
      margin-bottom: 32px;
    }

    .video-thumbnail img {
      height: 100%;
    }

    .btn-large {
      padding: 16px 24px;
      font-size: 1.1rem;
    }
  }
</style>
