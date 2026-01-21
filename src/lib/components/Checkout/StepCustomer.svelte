<script lang="ts">
  import { User, Phone, Mail, CreditCard, Users, Calendar1, Building2 } from "lucide-svelte";
  import {
    checkoutStore,
    updateCustomerData,
    updatePersonData,
  } from "$lib/stores/checkoutStore";

  export let onNext: () => void;

  let customerData = {
    name: "",
    whatsapp: "",
    email: "",
    cpf: "",
  };

  let confirmWhatsapp = false;

  $: ({ selectedProduct, people, totalAmount, selectedExtras } =
    $checkoutStore);

  function handlePersonUpdate(
    index: number,
    field: "name" | "message",
    value: string,
  ) {
    const updatedPerson = { ...people[index], [field]: value };
    updatePersonData(index, updatedPerson);
  }

  function handleSubmit() {
    if (!confirmWhatsapp) {
      alert("Você deve confirmar que o número do WhatsApp está correto.");
      return;
    }

    updateCustomerData(customerData);
    onNext();
  }

  function formatCPF(value: string) {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})/, "$1-$2")
      .replace(/(-\d{2})\d+?$/, "$1");
  }

  function formatPhone(value: string) {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d{4})/, "$1-$2");
  }
</script>

<div class="step-customer">
  <div class="content-wrapper">
    <div class="form-section">
      <div class="section-header">
        <h2>Dados do pedido</h2>
        <p>Preencha as informações para finalizar sua compra</p>
      </div>

      <div class="people-section">
        <h3>
          <Users size={20} />
          Qual é o nome do casal apaixonado?
        </h3>
        {#each people as person, index}
          <div class="person-form">
            <div class="person-header">
              <span class="person-number">Casal {index + 1}</span>
            </div>

            <div class="form-group">
              <label>
                <User size={18} />
                Nome do casal
              </label>
              <input
                type="text"
                placeholder="ex: Gustavo && Ana"
                value={person.name}
                on:input={(e) =>
                  handlePersonUpdate(index, "name", e.target.value)}
                required
              />
            </div>
            <div class="form-group">
              <label>
                <Calendar1 size={18} />
                Data de Início do namoro
              </label>
              <input
                type="text"
                placeholder="ex: 08/12/2025"
                value={person.name}
                on:input={(e) =>
                  handlePersonUpdate(index, "name", e.target.value)}
                required
              />
            </div>
            
            <div class="form-group">
              <label>
                <Building2 size={18} />
                Cidade/Estado
              </label>
              <input
                type="text"
                placeholder="ex: São Paulo SP"
                value={person.name}
                on:input={(e) =>
                  handlePersonUpdate(index, "name", e.target.value)}
                required
              />
            </div>

            <!-- <div class="form-group">
              <label>Mensagem personalizada (opcional)</label>
              <textarea
                placeholder="Ex: Feliz Natal! Você foi muito especial este ano..."
                value={person.message || ""}
                on:input={(e) =>
                  handlePersonUpdate(index, "message", e.target.value)}
                rows="3"
              ></textarea>
            </div> -->
          </div>
        {/each}
      </div>

      <!-- Dados do cliente -->
      <div class="customer-section">
        <h3>
          <User size={20} />
          Seus dados
        </h3>

        <div class="form-row">
          <div class="form-group">
            <label>
              <User size={18} />
              Nome completo
            </label>
            <input
              type="text"
              placeholder="Seu nome completo"
              bind:value={customerData.name}
              required
            />
          </div>

          <div class="form-group">
            <label>
              <Phone size={18} />
              WhatsApp
            </label>
            <input
              type="text"
              placeholder="(11) 99999-9999"
              value={customerData.whatsapp}
              on:input={(e) =>
                (customerData.whatsapp = formatPhone(e.target.value))}
              required
            />
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label>
              <Mail size={18} />
              E-mail
            </label>
            <input
              type="email"
              placeholder="seu@email.com"
              bind:value={customerData.email}
              required
            />
          </div>

          <div class="form-group">
            <label>
              <CreditCard size={18} />
              CPF
            </label>
            <input
              type="text"
              placeholder="000.000.000-00"
              value={customerData.cpf}
              on:input={(e) => (customerData.cpf = formatCPF(e.target.value))}
              required
            />
          </div>
        </div>

        <div class="checkbox-group">
          <label class="checkbox-label">
            <input type="checkbox" bind:checked={confirmWhatsapp} required />
            <span class="checkmark"></span>
            Confirmo que o número do WhatsApp informado está correto e que o vídeo
            será enviado neste número.
          </label>
        </div>
      </div>

      <div class="form-actions">
        <button class="btn btn-primary btn-large" on:click={handleSubmit}>
          Ir para pagamento
        </button>
      </div>
    </div>

    <div class="summary-section">
      <div class="order-summary card">
        <h3>Resumo do pedido</h3>

        <div class="summary-item">
          <span class="label">Produto:</span>
          <span class="value">{selectedProduct?.name}</span>
        </div>

        <div class="summary-item">
          <span class="label">Valor:</span>
          <span class="value"
            >R$ {selectedProduct?.price.toFixed(2).replace(".", ",")}</span
          >
        </div>

        {#each selectedExtras.filter((e) => e.selected) as extra}
          <div class="summary-item">
            <span class="label">{extra.name}:</span>
            <span class="value"
              >+ R$ {extra.price.toFixed(2).replace(".", ",")}</span
            >
          </div>
        {/each}

        <div class="summary-divider"></div>

        <div class="summary-total">
          <span class="label">Total:</span>
          <span class="value"
            >R$ {totalAmount.toFixed(2).replace(".", ",")}</span
          >
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .step-customer {
    max-width: 1200px;
    margin: 0 auto;
  }

  .content-wrapper {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 40px;
  }

  .section-header {
    text-align: center;
    margin-bottom: 40px;
  }

  .section-header h2 {
    color: #2d3748;
    margin-bottom: 8px;
  }

  .section-header p {
    color: #4a5568;
  }

  .people-section,
  .customer-section {
    margin-bottom: 40px;
  }

  .people-section h3,
  .customer-section h3 {
    font-size: 1.3rem;
    color: #2d3748;
    margin-bottom: 24px;
    padding-bottom: 8px;
    border-bottom: 2px solid #e2e8f0;
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .person-form {
    background: #f8fafc;
    padding: 24px;
    border-radius: 12px;
    margin-bottom: 24px;
  }

  .person-header {
    margin-bottom: 20px;
  }

  .person-number {
    background: #667eea;
    color: white;
    padding: 6px 12px;
    border-radius: 20px;
    font-size: 0.9rem;
    font-weight: 600;
  }

  .form-group {
    margin-bottom: 20px;
  }

  .form-group label {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 8px;
    font-weight: 500;
    color: #2d3748;
  }

  .form-group input,
  .form-group textarea {
    width: 100%;
    padding: 12px 16px;
    border: 2px solid #e2e8f0;
    border-radius: 8px;
    font-size: 1rem;
    transition: border-color 0.3s ease;
  }

  .form-group input:focus,
  .form-group textarea:focus {
    outline: none;
    border-color: #667eea;
  }

  .form-group textarea {
    resize: vertical;
    min-height: 80px;
  }

  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }

  .checkbox-group {
    margin-top: 24px;
  }

  .checkbox-label {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    cursor: pointer;
    font-size: 0.95rem;
    line-height: 1.5;
    color: #4a5568;
  }

  .checkbox-label input {
    display: none;
  }

  .checkmark {
    width: 20px;
    height: 20px;
    border: 2px solid #d1d5db;
    border-radius: 4px;
    flex-shrink: 0;
    margin-top: 2px;
    transition: all 0.3s ease;
  }

  .checkbox-label input:checked + .checkmark {
    background: #667eea;
    border-color: #667eea;
  }

  .checkbox-label input:checked + .checkmark::after {
    content: "✓";
    position: absolute;
    color: white;
    font-size: 12px;
    font-weight: bold;
    margin-top: -2px;
    margin-left: 4px;
  }

  .form-actions {
    text-align: center;
    padding-top: 24px;
    border-top: 1px solid #e2e8f0;
  }

  .btn-large {
    padding: 16px 40px;
    font-size: 1.1rem;
    font-weight: 600;
  }

  .order-summary {
    position: sticky;
    top: 100px;
  }

  .order-summary h3 {
    color: #2d3748;
    margin-bottom: 20px;
    font-size: 1.2rem;
  }

  .summary-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 0;
  }

  .summary-item .label {
    color: #4a5568;
  }

  .summary-item .value {
    font-weight: 600;
    color: #2d3748;
  }

  .summary-divider {
    height: 1px;
    background: #e2e8f0;
    margin: 16px 0;
  }

  .summary-total {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 0;
    font-size: 1.2rem;
    font-weight: 700;
  }

  .summary-total .label {
    color: #2d3748;
  }

  .summary-total .value {
    color: #10b981;
  }

  @media (max-width: 768px) {
    .content-wrapper {
      grid-template-columns: 1fr;
      gap: 24px;
    }

    .form-row {
      grid-template-columns: 1fr;
    }

    .order-summary {
      position: static;
      order: -1;
    }
  }
</style>