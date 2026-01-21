<script lang="ts">
  import { HandHeart, Heart, Play } from "lucide-svelte";

  export let onStartCheckout: () => void;
</script>

<section class="hero">
  <div class="container">
    <div class="hero-content">
      <div class="badge">Eternize seu sentimento</div>

      <h1 class="hero-title">
        <span class="title-icon">
          <Heart size={40} fill="currentColor" />
        </span>
        Sua Certidão de Namoro
        <span class="title-icon">
          <Heart size={40} fill="currentColor" />
        </span>
      </h1>

      <p class="hero-subtitle">
        Transforme sua história em um documento oficial do coração. Um presente
        único, emocionante e eterno para o seu grande amor.
      </p>

      <div class="video-preview">
        <div class="video-frame">
          <div class="video-thumbnail pulse">
            <img
              src="https://pub-d997896d0b944e3f97ade771c4a3aeaf.r2.dev/a74c71a5-ba46-4af7-b566-f258e9179df5.jfif"
              alt="Prévia da Certidão"
            />
          </div>
        </div>
      </div>

      <div class="cta-section">
        <button class="btn btn-primary btn-large" on:click={onStartCheckout}>
          <HandHeart size={20} />
          Criar Nossa Certidão Agora
        </button>
        <div class="price-container">
          <p class="price-info">
            Por apenas <span class="price-old">R$ 29,90</span> por apenas
            <span class="price">R$ 14,90</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  @import url("https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap");

  .hero {
    background: linear-gradient(180deg, #fff5f5 0%, #fff 100%);
    color: #4a0e0e;
    padding: 60px 0 100px 0;
    text-align: center;
    position: relative;
    overflow: hidden;
  }

  .hero::before {
    content: "❤";
    position: absolute;
    top: 10%;
    left: 5%;
    font-size: 2rem;
    color: #ffccd5;
    opacity: 0.5;
    animation: floating 3s ease-in-out infinite;
  }

  .hero::after {
    content: "❤";
    position: absolute;
    bottom: 10%;
    right: 5%;
    font-size: 2.5rem;
    color: #ffccd5;
    opacity: 0.5;
    animation: floating 4s ease-in-out infinite;
  }

  @keyframes floating {
    0% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-20px);
    }
    100% {
      transform: translateY(0px);
    }
  }

  .badge {
    background: #ffe3e3;
    color: #e63946;
    padding: 8px 20px;
    border-radius: 50px;
    font-weight: 600;
    font-size: 0.9rem;
    display: inline-block;
    margin-bottom: 20px;
    text-transform: uppercase;
    letter-spacing: 1px;
    border: 1px solid #ffb5a7;
  }

  .hero-title {
    font-family: "Great Vibes", cursive;
    color: #c9184a;
    font-size: clamp(2.5rem, 8vw, 4.5rem);
    margin-bottom: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    line-height: 1.1;
  }

  .title-icon {
    color: #ff4d6d;
    display: flex;
    align-items: center;
  }

  .hero-subtitle {
    font-size: 1.25rem;
    color: #8d5b5b;
    max-width: 650px;
    margin: 0 auto 48px;
    line-height: 1.6;
  }

  .video-frame {
    display: inline-block;
    padding: 12px;
    background: white;
    border-radius: 24px;
    box-shadow: 0 20px 50px rgba(230, 57, 70, 0.15);
    margin-bottom: 48px;
  }

  .video-thumbnail {
    position: relative;
    max-width: 280px;
    margin: 0 auto;
    border-radius: 16px;
    overflow: hidden;
    cursor: pointer;
    aspect-ratio: 9/16;
    border: 2px solid #fff5f5;
  }

  .video-thumbnail img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .pulse {
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 rgba(230, 57, 70, 0.4);
    }
    70% {
      box-shadow: 0 0 0 20px rgba(230, 57, 70, 0);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(230, 57, 70, 0);
    }
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

  .btn-large:hover {
    transform: scale(1.05);
    box-shadow: 0 15px 35px rgba(201, 24, 74, 0.4);
  }

  .price-container {
    margin-top: 20px;
  }

  .price-info {
    font-size: 1.1rem;
    color: #8d5b5b;
  }

  .price-old {
    text-decoration: line-through;
    opacity: 0.6;
    font-size: 1rem;
    margin: 0 5px;
  }

  .price {
    font-size: 1.8rem;
    font-weight: 800;
    color: #c9184a;
    display: block;
    margin-top: 5px;
  }

  @media (max-width: 768px) {
    .hero {
      padding: 40px 0 60px 0;
    }
    .hero-title {
      flex-direction: column;
      gap: 0;
    }
    .title-icon {
      display: none;
    }
    .hero-subtitle {
      font-size: 1.1rem;
      padding: 0 10px;
    }
    .video-thumbnail {
      max-width: 240px;
    }
    .btn-large {
      width: 90%;
      font-size: 1.1rem;
      padding: 16px;
    }
  }
</style>
