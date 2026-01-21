<script lang="ts">
  import HeaderAdmin from '$lib/components/admin/HeaderAdmin.svelte';
  import ReportTable from '$lib/components/admin/ReportTable.svelte';
  import { reportData, selectedPeriod, type ReportPeriod } from '$lib/stores/reportsStore';
  import { RefreshCw } from 'lucide-svelte';
  
  let isRefreshing = false;
  
  const periods: Array<{ value: ReportPeriod; label: string }> = [
    { value: '7days', label: 'Últimos 7 dias' },
    { value: '15days', label: 'Últimos 15 dias' },
    { value: '30days', label: 'Últimos 30 dias' },
    { value: 'thisMonth', label: 'Este mês' }
  ];
  
  function updateReports() {
    isRefreshing = true;
    // Simulate API call
    setTimeout(() => {
      isRefreshing = false;
    }, 1000);
  }
</script>

<svelte:head>
  <title>Relatórios - Admin Panel</title>
</svelte:head>

<HeaderAdmin title="Relatórios financeiros" />

<div class="reports-content">
  <div class="container">
    <div class="reports-header">
      <div class="filters">
        <label>
          Período:
          <select bind:value={$selectedPeriod}>
            {#each periods as period}
              <option value={period.value}>{period.label}</option>
            {/each}
          </select>
        </label>
        
        <button 
          class="btn btn-primary refresh-btn" 
          on:click={updateReports}
          disabled={isRefreshing}
        >
          <RefreshCw size={16} class={isRefreshing ? 'spinning' : ''} />
          {isRefreshing ? 'Atualizando...' : 'Atualizar relatórios'}
        </button>
      </div>
    </div>
    
    <ReportTable reportData={$reportData} />
  </div>
</div>

<style>
  .reports-content {
    padding: 32px;
  }
  
  .container {
    max-width: 1400px;
    margin: 0 auto;
  }
  
  .reports-header {
    margin-bottom: 32px;
  }
  
  .filters {
    display: flex;
    gap: 24px;
    align-items: end;
    background: white;
    padding: 24px;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .filters label {
    display: flex;
    flex-direction: column;
    gap: 8px;
    font-weight: 500;
    color: #2d3748;
  }
  
  .filters select {
    padding: 10px 12px;
    border: 2px solid #e2e8f0;
    border-radius: 6px;
    font-size: 1rem;
    background: white;
    cursor: pointer;
  }
  
  .filters select:focus {
    outline: none;
    border-color: #667eea;
  }
  
  .refresh-btn {
    padding: 10px 16px;
    font-size: 0.95rem;
  }
  
  .refresh-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  :global(.spinning) {
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  
  @media (max-width: 768px) {
    .reports-content {
      padding: 20px;
    }
    
    .filters {
      flex-direction: column;
      align-items: stretch;
    }
    
    .refresh-btn {
      align-self: center;
    }
  }
</style>