<script lang="ts">
  import HeaderAdmin from '$lib/components/admin/HeaderAdmin.svelte';
  import OrderCard from '$lib/components/admin/OrderCard.svelte';
  import { ordersStore } from '$lib/stores/ordersStore';
  import { Search } from 'lucide-svelte';
  
  let searchTerm = '';
  
  $: filteredOrders = $ordersStore.filter(order => 
    order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.id.toLowerCase().includes(searchTerm.toLowerCase())
  );
</script>

<svelte:head>
  <title>Pedidos - Admin Panel</title>
</svelte:head>

<HeaderAdmin title="Gerenciar pedidos" />

<div class="orders-content">
  <div class="container">
    <div class="orders-header">
      <div class="search-bar">
        <Search size={20} />
        <input 
          type="text" 
          placeholder="Buscar por nome, email ou ID do pedido..."
          bind:value={searchTerm}
        />
      </div>
      
      <div class="orders-stats">
        <div class="stat">
          <span class="stat-value">{$ordersStore.length}</span>
          <span class="stat-label">Total</span>
        </div>
        <div class="stat">
          <span class="stat-value">{$ordersStore.filter(o => o.status === 'pending').length}</span>
          <span class="stat-label">Pendentes</span>
        </div>
        <div class="stat">
          <span class="stat-value">{$ordersStore.filter(o => o.status === 'paid').length}</span>
          <span class="stat-label">Pagos</span>
        </div>
      </div>
    </div>
    
    <div class="orders-list">
      {#if filteredOrders.length === 0}
        <div class="empty-state">
          <h3>Nenhum pedido encontrado</h3>
          {#if searchTerm}
            <p>Tente ajustar os termos da busca.</p>
          {:else}
            <p>Ainda não há pedidos cadastrados.</p>
          {/if}
        </div>
      {:else}
        {#each filteredOrders as order (order.id)}
          <OrderCard {order} />
        {/each}
      {/if}
    </div>
  </div>
</div>

<style>
  .orders-content {
    padding: 32px;
  }
  
  .container {
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .orders-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 32px;
    gap: 24px;
  }
  
  .search-bar {
    display: flex;
    align-items: center;
    gap: 12px;
    background: white;
    padding: 12px 16px;
    border-radius: 8px;
    border: 2px solid #e2e8f0;
    flex: 1;
    max-width: 400px;
  }
  
  .search-bar:focus-within {
    border-color: #667eea;
  }
  
  .search-bar input {
    border: none;
    outline: none;
    flex: 1;
    font-size: 1rem;
  }
  
  .orders-stats {
    display: flex;
    gap: 24px;
  }
  
  .stat {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: white;
    padding: 16px 20px;
    border-radius: 8px;
    min-width: 80px;
  }
  
  .stat-value {
    font-size: 1.5rem;
    font-weight: 700;
    color: #2d3748;
  }
  
  .stat-label {
    font-size: 0.9rem;
    color: #4a5568;
    margin-top: 4px;
  }
  
  .orders-list {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  
  .empty-state {
    text-align: center;
    padding: 60px 20px;
    background: white;
    border-radius: 12px;
  }
  
  .empty-state h3 {
    color: #2d3748;
    margin-bottom: 8px;
  }
  
  .empty-state p {
    color: #4a5568;
  }
  
  @media (max-width: 768px) {
    .orders-content {
      padding: 20px;
    }
    
    .orders-header {
      flex-direction: column;
      align-items: stretch;
    }
    
    .search-bar {
      max-width: none;
    }
    
    .orders-stats {
      justify-content: space-around;
    }
  }
</style>