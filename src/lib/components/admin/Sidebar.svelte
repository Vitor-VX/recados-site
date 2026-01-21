<script lang="ts">
  import { page } from "$app/stores";
  import {
    ChartBar as BarChart3,
    Package,
    FileText,
    LogOut,
  } from "lucide-svelte";

  $: currentPath = $page.url.pathname;
</script>

<aside class="sidebar">
  <div class="sidebar-header">
    <div class="logo">
      <BarChart3 size={28} color="#3b82f6" />
      <span>Admin Panel</span>
    </div>
  </div>

  <nav class="sidebar-nav">
    <a
      href="/admin/dashboard"
      class="nav-item"
      class:active={currentPath === "/admin/dashboard"}
    >
      <BarChart3 size={20} />
      <span>Dashboard</span>
    </a>

    <a
      href="/admin/pedidos"
      class="nav-item"
      class:active={currentPath === "/admin/pedidos"}
    >
      <Package size={20} />
      <span>Pedidos</span>
    </a>

    <a
      href="/admin/relatorios"
      class="nav-item"
      class:active={currentPath === "/admin/relatorios"}
    >
      <FileText size={20} />
      <span>Relatórios</span>
    </a>
  </nav>

  <div class="sidebar-footer">
    <button class="nav-item logout-btn">
      <LogOut size={20} />
      <span>Sair</span>
    </button>
  </div>
</aside>

<style>
  .sidebar {
    width: 280px;
    height: 100vh;
    background: white;
    border-right: 1px solid #e2e8f0;
    display: flex;
    flex-direction: column;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 100;
  }

  .sidebar-header {
    padding: 24px 20px;
    border-bottom: 1px solid #e2e8f0;
  }

  .logo {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 1.3rem;
    font-weight: 700;
    color: #2d3748;
  }

  .sidebar-nav {
    flex: 1;
    padding: 24px 0;
  }

  .nav-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 20px;
    color: #4a5568;
    text-decoration: none;
    transition: all 0.3s ease;
    border: none;
    background: none;
    width: 100%;
    cursor: pointer;
    font-size: 1rem;
  }

  .nav-item:hover {
    background: #f8fafc;
    color: #2d3748;
  }

  .nav-item.active {
    background: #eef2ff;
    color: #3b82f6;
    border-right: 3px solid #3b82f6;
  }

  .sidebar-footer {
    padding: 24px 0;
    border-top: 1px solid #e2e8f0;
  }

  .logout-btn {
    color: #dc2626;
  }

  .logout-btn:hover {
    background: #fef2f2;
    color: #b91c1c;
  }

  @media (max-width: 768px) {
    .sidebar {
      transform: translateX(-100%);
      transition: transform 0.3s ease;
    }

    .sidebar.open {
      transform: translateX(0);
    }
  }
</style>
