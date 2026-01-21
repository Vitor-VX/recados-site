<script lang="ts">
  import { HandHeart, Video } from "lucide-svelte";

  export let onStartCheckout: () => void;
</script>

<header class="header">
  <div class="container">
    <div class="header-content">
      <div class="logo">
        <HandHeart size={32} color="#3b82f6" />
        <span>Certidão do Amor</span>
      </div>

      <button class="btn btn-primary" on:click={onStartCheckout}>
        Criar minha certidão
      </button>
    </div>
  </div>
</header>

<style>
  .header {
    background: white;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    position: sticky;
    top: 0;
    z-index: 100;
  }

  .header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 0;
  }

  .logo {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 1.5rem;
    font-weight: 700;
    color: #2d3748;
  }

  @media (max-width: 768px) {
    .logo span {
      font-size: 1.2rem;
    }

    .btn {
      padding: 10px 16px;
      font-size: 14px;
    }
  }
</style>
