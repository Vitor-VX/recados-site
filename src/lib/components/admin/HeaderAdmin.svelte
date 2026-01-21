<script lang="ts">
  import { Menu, Bell } from 'lucide-svelte';
  
  export let title: string;
</script>

<header class="admin-header">
  <div class="header-content">
    <div class="header-left">
      <button class="menu-btn">
        <Menu size={24} />
      </button>
      <h1>{title}</h1>
    </div>
    
    <div class="header-right">
      <button class="notification-btn">
        <Bell size={20} />
        <span class="notification-badge">3</span>
      </button>
      
      <div class="user-avatar">
        <div class="avatar-circle">A</div>
        <span>Admin</span>
      </div>
    </div>
  </div>
</header>

<style>
  .admin-header {
    height: 70px;
    background: white;
    border-bottom: 1px solid #e2e8f0;
    position: sticky;
    top: 0;
    z-index: 50;
  }
  
  .header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    padding: 0 32px;
    margin-left: 280px;
  }
  
  .header-left {
    display: flex;
    align-items: center;
    gap: 16px;
  }
  
  .menu-btn {
    display: none;
    background: none;
    border: none;
    cursor: pointer;
    padding: 8px;
    border-radius: 6px;
    color: #4a5568;
  }
  
  .menu-btn:hover {
    background: #f8fafc;
  }
  
  .header-left h1 {
    color: #2d3748;
    font-size: 1.5rem;
    font-weight: 600;
    margin: 0;
  }
  
  .header-right {
    display: flex;
    align-items: center;
    gap: 20px;
  }
  
  .notification-btn {
    position: relative;
    background: none;
    border: none;
    cursor: pointer;
    padding: 8px;
    border-radius: 6px;
    color: #4a5568;
  }
  
  .notification-btn:hover {
    background: #f8fafc;
  }
  
  .notification-badge {
    position: absolute;
    top: 2px;
    right: 2px;
    background: #dc2626;
    color: white;
    font-size: 0.7rem;
    padding: 2px 6px;
    border-radius: 10px;
    min-width: 18px;
    height: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .user-avatar {
    display: flex;
    align-items: center;
    gap: 8px;
    color: #2d3748;
    font-weight: 500;
  }
  
  .avatar-circle {
    width: 32px;
    height: 32px;
    background: #667eea;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
  }
  
  @media (max-width: 768px) {
    .header-content {
      margin-left: 0;
      padding: 0 16px;
    }
    
    .menu-btn {
      display: block;
    }
    
    .user-avatar span {
      display: none;
    }
  }
</style>