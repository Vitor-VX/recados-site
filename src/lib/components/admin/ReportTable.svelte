<script lang="ts">
  export let reportData: Array<{
    date: Date;
    totalOrders: number;
    paidOrders: number;
    revenue: number;
    videosGenerated: number;
  }>;

  function getDayOfWeek(date: Date) {
    const days = [
      "Domingo",
      "Segunda",
      "Terça",
      "Quarta",
      "Quinta",
      "Sexta",
      "Sábado",
    ];
    return days[date.getDay()];
  }

  function formatDate(date: Date) {
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
    });
  }

  function formatCurrency(value: number) {
    return `R$ ${value.toFixed(2).replace(".", ",")}`;
  }

  function getAverageTicket(revenue: number, paidOrders: number) {
    if (paidOrders === 0) return "R$ 0,00";
    return formatCurrency(revenue / paidOrders);
  }
</script>

<div class="report-table-container">
  {#if reportData.length === 0}
    <div class="empty-state">
      <h3>Nenhum dado encontrado</h3>
      <p>Não há pedidos no período selecionado.</p>
    </div>
  {:else}
    <div class="table-wrapper">
      <table class="report-table">
        <thead>
          <tr>
            <th>Data</th>
            <th>Dia da semana</th>
            <th>Pedidos totais</th>
            <th>Pedidos pagos</th>
            <th>Faturamento</th>
            <th>Vídeos gerados</th>
            <th>Ticket médio</th>
          </tr>
        </thead>
        <tbody>
          {#each reportData as row}
            <tr>
              <td class="date-cell">{formatDate(row.date)}</td>
              <td class="day-cell">{getDayOfWeek(row.date)}</td>
              <td class="number-cell">{row.totalOrders}</td>
              <td class="number-cell success">{row.paidOrders}</td>
              <td class="currency-cell">{formatCurrency(row.revenue)}</td>
              <td class="number-cell primary">{row.videosGenerated}</td>
              <td class="currency-cell"
                >{getAverageTicket(row.revenue, row.paidOrders)}</td
              >
            </tr>
          {/each}
        </tbody>
      </table>
    </div>

    <div class="table-summary">
      <div class="summary-item">
        <span>Total de pedidos:</span>
        <strong
          >{reportData.reduce((sum, row) => sum + row.totalOrders, 0)}</strong
        >
      </div>
      <div class="summary-item">
        <span>Pedidos pagos:</span>
        <strong class="success"
          >{reportData.reduce((sum, row) => sum + row.paidOrders, 0)}</strong
        >
      </div>
      <div class="summary-item">
        <span>Faturamento total:</span>
        <strong class="primary"
          >{formatCurrency(
            reportData.reduce((sum, row) => sum + row.revenue, 0),
          )}</strong
        >
      </div>
      <div class="summary-item">
        <span>Vídeos gerados:</span>
        <strong
          >{reportData.reduce(
            (sum, row) => sum + row.videosGenerated,
            0,
          )}</strong
        >
      </div>
    </div>
  {/if}
</div>

<style>
  .report-table-container {
    background: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .empty-state {
    padding: 60px 20px;
    text-align: center;
  }

  .empty-state h3 {
    color: #2d3748;
    margin-bottom: 8px;
  }

  .empty-state p {
    color: #4a5568;
  }

  .table-wrapper {
    overflow-x: auto;
  }

  .report-table {
    width: 100%;
    border-collapse: collapse;
  }

  .report-table th {
    background: #f8fafc;
    padding: 16px 12px;
    text-align: left;
    font-weight: 600;
    color: #2d3748;
    border-bottom: 2px solid #e2e8f0;
    white-space: nowrap;
  }

  .report-table td {
    padding: 16px 12px;
    border-bottom: 1px solid #f1f5f9;
    color: #4a5568;
  }

  .report-table tbody tr:hover {
    background: #f8fafc;
  }

  .date-cell {
    font-weight: 600;
    color: #2d3748;
  }

  .day-cell {
    color: #4a5568;
    font-size: 0.9rem;
  }

  .number-cell {
    text-align: center;
    font-weight: 600;
  }

  .number-cell.success {
    color: #10b981;
  }

  .number-cell.primary {
    color: #667eea;
  }

  .currency-cell {
    text-align: right;
    font-weight: 600;
    color: #2d3748;
  }

  .table-summary {
    display: flex;
    justify-content: space-around;
    padding: 20px;
    background: #f8fafc;
    border-top: 1px solid #e2e8f0;
  }

  .summary-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
  }

  .summary-item span {
    font-size: 0.9rem;
    color: #4a5568;
  }

  .summary-item strong {
    font-size: 1.1rem;
    color: #2d3748;
  }

  .summary-item strong.success {
    color: #10b981;
  }

  .summary-item strong.primary {
    color: #667eea;
  }

  @media (max-width: 768px) {
    .report-table th,
    .report-table td {
      padding: 12px 8px;
      font-size: 0.9rem;
    }

    .table-summary {
      flex-direction: column;
      gap: 16px;
      align-items: stretch;
    }

    .summary-item {
      flex-direction: row;
      justify-content: space-between;
    }
  }
</style>
