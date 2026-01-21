<script lang="ts">
  import HeaderAdmin from "$lib/components/admin/HeaderAdmin.svelte";
  import StatCard from "$lib/components/admin/StatCard.svelte";
  import { dashboardStats } from "$lib/stores/dashboardStore";
  import {
    Package,
    DollarSign,
    ChartBar as BarChart3,
    CircleCheck as CheckCircle,
    CreditCard,
    Video,
  } from "lucide-svelte";
</script>

<svelte:head>
  <title>Dashboard - Admin Panel</title>
</svelte:head>

<HeaderAdmin title="Visão geral" />

<div class="dashboard-content">
  <div class="container">
    <div class="stats-grid">
      <StatCard
        title="Total de pedidos"
        value={$dashboardStats.totalOrders}
        description="Pedidos realizados"
        icon={Package}
        color="#3b82f6"
      />

      <StatCard
        title="Valor total faturado"
        value="R$ {$dashboardStats.totalRevenue.toFixed(2).replace('.', ',')}"
        description="Receita total"
        icon={DollarSign}
        color="#10b981"
      />

      <StatCard
        title="Ticket médio geral"
        value="R$ {$dashboardStats.averageTicket.toFixed(2).replace('.', ',')}"
        description="Valor médio por pedido"
        icon={BarChart3}
        color="#f59e0b"
      />

      <StatCard
        title="Ticket médio de pedidos pagos"
        value="R$ {$dashboardStats.paidAverageTicket
          .toFixed(2)
          .replace('.', ',')}"
        description="Valor médio dos pagos"
        icon={CheckCircle}
        color="#8b5cf6"
      />

      <StatCard
        title="Total de pedidos pagos"
        value={$dashboardStats.paidOrdersCount}
        description="Pedidos confirmados"
        icon={CreditCard}
        color="#06b6d4"
      />

      <StatCard
        title="Quantidade de vídeos gerados"
        value={$dashboardStats.videosGenerated}
        description="Vídeos entregues"
        icon={Video}
        color="#ec4899"
      />
    </div>
  </div>
</div>

<style>
  .dashboard-content {
    padding: 32px;
  }

  .container {
    max-width: 1400px;
    margin: 0 auto;
  }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 24px;
  }

  @media (max-width: 768px) {
    .dashboard-content {
      padding: 20px;
    }

    .stats-grid {
      grid-template-columns: 1fr;
      gap: 16px;
    }
  }
</style>