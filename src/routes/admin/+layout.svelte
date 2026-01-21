<script lang="ts">
  import "../../app.css";
  import Sidebar from '$lib/components/admin/Sidebar.svelte';
</script>

<div class="admin-layout">
  <Sidebar />
  
  <main class="admin-main">
    <slot />
  </main>
</div>

<style>
  .admin-layout {
    display: flex;
    min-height: 100vh;
    background: #f8fafc;
  }
  
  .admin-main {
    flex: 1;
    margin-left: 280px;
    overflow: hidden;
  }
  
  @media (max-width: 768px) {
    .admin-main {
      margin-left: 0;
    }
  }
</style>