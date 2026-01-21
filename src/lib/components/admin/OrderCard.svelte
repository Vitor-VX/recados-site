<script lang="ts">
  import {
    Trash2,
    CircleCheck as CheckCircle,
    ChevronDown,
    ChevronUp,
    User,
    Gift,
    Users,
  } from "lucide-svelte";
  import {
    updateOrderStatus,
    deleteOrder,
    type Order,
  } from "$lib/stores/ordersStore";

  export let order: Order;

  let expanded = false;

  function toggleExpanded() {
    expanded = !expanded;
  }

  function confirmPayment() {
    if (confirm("Confirmar pagamento deste pedido?")) {
      updateOrderStatus(order.id, "paid");
    }
  }

  function removeOrder() {
    if (
      confirm(
        "Tem certeza que deseja apagar este pedido? Esta ação não pode ser desfeita.",
      )
    ) {
      deleteOrder(order.id);
    }
  }

  function getStatusColor(status: Order["status"]) {
    switch (status) {
      case "paid":
        return "#10b981";
      case "pending":
        return "#f59e0b";
      case "cancelled":
        return "#dc2626";
      default:
        return "#6b7280";
    }
  }

  function getStatusText(status: Order["status"]) {
    switch (status) {
      case "paid":
        return "Pago";
      case "pending":
        return "Pendente";
      case "cancelled":
        return "Cancelado";
      default:
        return status;
    }
  }
</script>

<div class="order-card card">
  <div
    class="order-header"
    on:click={toggleExpanded}
    role="button"
    tabindex="0"
  >
    <div class="order-info">
      <h3>
        <User size={18} />
        {order.customerName} - {order.id}
      </h3>
      <div class="order-meta">
        <span class="status" style="color: {getStatusColor(order.status)}">
          {getStatusText(order.status)}
        </span>
        <span class="amount"
          >R$ {order.totalAmount.toFixed(2).replace(".", ",")}</span
        >
        <span class="date">{order.createdAt.toLocaleDateString("pt-BR")}</span>
      </div>
    </div>

    <div class="expand-icon">
      {#if expanded}
        <ChevronUp size={20} />
      {:else}
        <ChevronDown size={20} />
      {/if}
    </div>
  </div>

  {#if expanded}
    <div class="order-details">
      <div class="details-grid">
        <div class="detail-section">
          <h4>
            <User size={16} />
            Cliente
          </h4>
          <div class="detail-item">
            <strong>Nome:</strong>
            {order.customerName}
          </div>
          <div class="detail-item">
            <strong>WhatsApp:</strong>
            {order.customerWhatsapp}
          </div>
          <div class="detail-item">
            <strong>E-mail:</strong>
            {order.customerEmail}
          </div>
          <div class="detail-item">
            <strong>CPF:</strong>
            {order.customerCpf}
          </div>
        </div>

        <div class="detail-section">
          <h4>
            <Gift size={16} />
            Pedido
          </h4>
          <div class="detail-item">
            <strong>Produto:</strong>
            {order.productName}
          </div>
          <div class="detail-item">
            <strong>Quantidade:</strong>
            {order.quantity} casal{order.quantity > 1 ? "s" : ""}
          </div>
          {#if order.extras.length > 0}
            <div class="detail-item">
              <strong>Extras:</strong>
              {#each order.extras as extra}
                <div class="extra-item">
                  {extra.name} (+R$ {extra.price.toFixed(2).replace(".", ",")})
                </div>
              {/each}
            </div>
          {/if}
          <div class="detail-item">
            <strong>Valor total:</strong> R$ {order.totalAmount
              .toFixed(2)
              .replace(".", ",")}
          </div>
        </div>
      </div>

      <div class="detail-section people-section">
        <h4>
          <Users size={16} />
          Pessoas cadastradas
        </h4>
        <div class="people-list">
          {#each order.people as person, index}
            <div class="person-item">
              <strong>Casal {index + 1}:</strong>
              {person.name}
              {#if person.message}
                <div class="person-message">Mensagem: "{person.message}"</div>
              {/if}
            </div>
          {/each}
        </div>
      </div>

      <div class="order-actions">
        {#if order.status === "pending"}
          <button class="btn btn-success" on:click={confirmPayment}>
            <CheckCircle size={16} />
            Confirmar pagamento
          </button>
        {/if}

        <button class="btn btn-danger" on:click={removeOrder}>
          <Trash2 size={16} />
          Apagar pedido
        </button>
      </div>
    </div>
  {/if}
</div>

<style>
  .order-card {
    margin-bottom: 16px;
    transition: all 0.3s ease;
  }

  .order-card:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  }

  .order-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    padding: 4px 0;
  }

  .order-info h3 {
    color: #2d3748;
    margin: 0 0 8px 0;
    font-size: 1.1rem;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .order-meta {
    display: flex;
    gap: 16px;
    align-items: center;
    flex-wrap: wrap;
  }

  .status {
    font-weight: 600;
    padding: 4px 8px;
    border-radius: 4px;
    background: currentColor;
    color: white !important;
    font-size: 0.85rem;
  }

  .amount {
    font-weight: 600;
    color: #2d3748;
    font-size: 1.1rem;
  }

  .date {
    color: #4a5568;
    font-size: 0.9rem;
  }

  .expand-icon {
    color: #4a5568;
    transition: transform 0.3s ease;
  }

  .order-details {
    border-top: 1px solid #e2e8f0;
    padding-top: 20px;
    margin-top: 16px;
  }

  .details-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
    margin-bottom: 24px;
  }

  .detail-section h4 {
    color: #2d3748;
    font-size: 1rem;
    margin-bottom: 12px;
    padding-bottom: 4px;
    border-bottom: 2px solid #e2e8f0;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .detail-item {
    margin-bottom: 8px;
    color: #4a5568;
    line-height: 1.5;
  }

  .detail-item strong {
    color: #2d3748;
  }

  .extra-item {
    margin-left: 16px;
    color: #10b981;
    font-size: 0.9rem;
  }

  .people-section {
    grid-column: 1 / -1;
  }

  .people-list {
    display: grid;
    gap: 12px;
  }

  .person-item {
    background: #f8fafc;
    padding: 12px;
    border-radius: 8px;
    border-left: 4px solid #3b82f6;
  }

  .person-message {
    margin-top: 4px;
    font-style: italic;
    color: #4a5568;
    font-size: 0.9rem;
  }

  .order-actions {
    display: flex;
    gap: 12px;
    justify-content: flex-end;
    padding-top: 16px;
    border-top: 1px solid #e2e8f0;
  }

  .btn-success {
    background: #10b981;
    color: white;
  }

  .btn-success:hover {
    background: #059669;
  }

  .btn-danger {
    background: #dc2626;
    color: white;
  }

  .btn-danger:hover {
    background: #b91c1c;
  }

  @media (max-width: 768px) {
    .details-grid {
      grid-template-columns: 1fr;
    }

    .order-meta {
      gap: 8px;
    }

    .order-actions {
      flex-direction: column;
    }
  }
</style>
