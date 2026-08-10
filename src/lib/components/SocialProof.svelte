<script lang="ts">
  import {
    Star,
    Heart,
    CheckCircle2,
    ChevronLeft,
    ChevronRight,
    MessageSquare,
  } from "lucide-svelte";

  const reviews = [
    // {
    //   img: "https://files.botsync.site/casais/img_04.jpeg",
    //   couple: "Luan & Grazi",
    //   tag: "Eternizado",
    // },
    {
      img: "https://i.postimg.cc/fbKysDPc/Whats-App-Image-2026-08-08-at-22-47-01.jpg",
      couple: "Sofía & Mateo",
      tag: "Presente Surpresa",
    },
    {
      img: "https://i.postimg.cc/zvLGTWGM/Whats-App-Image-2026-08-08-at-22-47-01-(1).jpg",
      couple: "Valentina & Santiago",
      tag: "Presente Surpresa",
    },
    {
      img: "https://i.postimg.cc/76tLCXwn/Whats-App-Image-2026-08-08-at-22-47-01-(2).jpg",
      couple: "Lucía & Alejandro",
      tag: "Pedido de Namoro",
    },
    {
      img: "https://i.postimg.cc/HkrwX0sG/Whats-App-Image-2026-08-09-at-18-29-43.jpg",
      couple: "Juan e Valeria",
      tag: "Pedido de Namoro",
    },
    {
      img: "https://i.postimg.cc/Y2VYkGzC/Whats-App-Image-2026-08-09-at-18-43-52.jpg",
      couple: "Emiliano & Mariana",
      tag: "Pedido de Namoro",
    },
  ];

  let scrollContainer: HTMLDivElement;

  function scroll(direction: "left" | "right") {
    const amount = 320;
    scrollContainer.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  }
</script>

<section class="social-proof">
  <div class="container">
    <div class="text-center mb-8">
      <div class="badge-mini">
        <Heart size={14} fill="currentColor" />
        <span>Lo que dicen nuestros clientes</span>
      </div>
      <h2 class="section-title">Parejas que ya lo hicieron oficial</h2>
      <p class="subtitle">
        Mira cómo quedaron los certificados de algunas de nuestras parejas
      </p>
    </div>

    <div class="carousel-wrapper">
      <button class="nav-btn prev" on:click={() => scroll("left")}>
        <ChevronLeft size={24} />
      </button>

      <div class="carousel-track" bind:this={scrollContainer}>
        {#each reviews as review}
          <div class="proof-card">
            <div class="image-container">
              <img src={review.img} alt="Certificado de Pareja" />
              <div class="overlay">
                <!-- <span class="tag">{review.tag}</span> -->
              </div>
            </div>
            <div class="info">
              <div class="stars">
                <Star size={14} fill="#ffb5a7" color="#ffb5a7" />
                <Star size={14} fill="#ffb5a7" color="#ffb5a7" />
                <Star size={14} fill="#ffb5a7" color="#ffb5a7" />
                <Star size={14} fill="#ffb5a7" color="#ffb5a7" />
                <Star size={14} fill="#ffb5a7" color="#ffb5a7" />
              </div>
              <h3>{review.couple}</h3>
              <div class="verified">
                <CheckCircle2 size={14} />
                <span>¡Certificado enviado!</span>
              </div>
            </div>
          </div>
        {/each}
      </div>

      <button class="nav-btn next" on:click={() => scroll("right")}>
        <ChevronRight size={24} />
      </button>
    </div>

    <div class="footer-stats">
      <div class="stat">
        <MessageSquare size={20} />
        <span>Recíbelo directamente en tu WhatsApp y correo electrónico</span>
      </div>
      <div class="divider-dot"></div>
      <div class="stat">
        <CheckCircle2 size={20} />
        <span>Satisfacción garantizada</span>
      </div>
    </div>
  </div>
</section>

<style>
  .social-proof {
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
    padding: 6px 16px;
    border-radius: 50px;
    font-size: 0.8rem;
    font-weight: 700;
    text-transform: uppercase;
    margin-bottom: 15px;
  }

  .section-title {
    font-family: "Great Vibes", cursive;
    color: #5e0b15;
    font-size: 3.5rem;
    margin-bottom: 10px;
    line-height: 1;
  }

  .subtitle {
    color: #8d5b5b;
    font-size: 1.1rem;
    max-width: 600px;
    margin: 0 auto;
  }

  .carousel-wrapper {
    position: relative;
    margin-top: 50px;
    padding: 0 40px;
  }

  .carousel-track {
    display: flex;
    gap: 25px;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scrollbar-width: none;
    padding: 20px 0;
  }

  .carousel-track::-webkit-scrollbar {
    display: none;
  }

  .proof-card {
    flex: 0 0 280px;
    scroll-snap-align: start;
    background: white;
    border-radius: 24px;
    overflow: hidden;
    box-shadow: 0 10px 25px rgba(74, 14, 14, 0.05);
    border: 1px solid #feeafa;
    transition: transform 0.3s ease;
  }

  .proof-card:hover {
    transform: translateY(-5px);
  }

  .image-container {
    position: relative;
    aspect-ratio: 9/14;
    overflow: hidden;
  }

  .image-container img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 20px;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.6), transparent);
  }

  .tag {
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(5px);
    color: white;
    padding: 4px 12px;
    border-radius: 50px;
    font-size: 0.75rem;
    font-weight: 600;
  }

  .info {
    padding: 20px;
    text-align: left;
  }

  .stars {
    display: flex;
    gap: 2px;
    margin-bottom: 8px;
  }

  .info h3 {
    font-size: 1.1rem;
    color: #4a0e0e;
    margin-bottom: 5px;
  }

  .verified {
    display: flex;
    align-items: center;
    gap: 5px;
    color: #2f855a;
    font-size: 0.8rem;
    font-weight: 600;
  }

  .nav-btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 45px;
    height: 45px;
    border-radius: 50%;
    background: white;
    border: none;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 10;
    color: #c9184a;
    transition: all 0.3s;
  }

  .nav-btn:hover {
    background: #c9184a;
    color: white;
  }

  .prev {
    left: 0;
  }
  .next {
    right: 0;
  }

  .footer-stats {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    margin-top: 50px;
  }

  .stat {
    display: flex;
    align-items: center;
    gap: 8px;
    color: #8d5b5b;
    font-weight: 600;
    font-size: 0.9rem;
  }

  .divider-dot {
    width: 5px;
    height: 5px;
    background: #ffccd5;
    border-radius: 50%;
  }

  @media (max-width: 768px) {
    .carousel-wrapper {
      padding: 0;
    }
    .nav-btn {
      display: none;
    }
    .section-title {
      font-size: 2.5rem;
    }
    .proof-card {
      flex: 0 0 250px;
    }
    .footer-stats {
      flex-direction: column;
      gap: 10px;
    }
    .divider-dot {
      display: none;
    }
  }
</style>
