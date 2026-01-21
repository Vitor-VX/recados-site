<script lang="ts">
  export let title: string;
  export let value: string | number;
  export let description: string;
  export let icon: any;
  export let color: string = "#3b82f6";
</script>

<div class="stat-card card">
  <div class="stat-icon" style="background: {color}20">
    <svelte:component this={icon} size={24} {color} />
  </div>

  <div class="stat-content">
    <div class="stat-value">{value}</div>
    <div class="stat-title">{title}</div>
    <div class="stat-description">{description}</div>
  </div>
</div>

<style>
  .stat-card {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 24px;
    border: 1px solid #e2e8f0;
    transition: all 0.3s ease;
  }

  .stat-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
  }

  .stat-icon {
    padding: 12px;
    border-radius: 8px;
    flex-shrink: 0;
  }

  .stat-content {
    flex: 1;
  }

  .stat-value {
    font-size: 2rem;
    font-weight: 700;
    color: #2d3748;
    line-height: 1;
    margin-bottom: 4px;
  }

  .stat-title {
    font-weight: 600;
    color: #2d3748;
    margin-bottom: 4px;
  }

  .stat-description {
    font-size: 0.9rem;
    color: #4a5568;
  }

  @media (max-width: 768px) {
    .stat-value {
      font-size: 1.6rem;
    }
  }
</style>
