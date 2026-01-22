<script lang="ts">
  import {
    User,
    Phone,
    Mail,
    CreditCard,
    Heart,
    Calendar,
    MapPin,
    Check,
  } from "lucide-svelte";
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

  function handlePersonUpdate(index: number, field: string, value: string) {
    const updatedPerson = { ...people[index], [field]: value };
    updatePersonData(index, updatedPerson);
  }

  function handleSubmit() {
    if (!confirmWhatsapp) {
      alert(
        "Por favor, confirme que seu WhatsApp está correto para receber a certidão.",
      );
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
        <h2>Personalize seu Amor</h2>
        <p>Preencha os dados que aparecerão na sua certidão especial</p>
      </div>

      <div class="people-section">
        <h3 class="romantic-title">
          <Heart size={20} fill="currentColor" />
          Dados da Certidão
        </h3>
        {#each people as person, index}
          <div class="person-form card">
            <div class="person-header">
              <span class="badge">Casal {index + 1}</span>
            </div>

            <div class="form-group">
              <label>
                <User size={18} />
                Nome do casal
              </label>
              <input
                type="text"
                placeholder="ex: Gustavo & Ana"
                value={person.name}
                on:input={(e) =>
                  handlePersonUpdate(index, "name", e.target.value)}
                required
              />
            </div>

            <div class="form-row">
              <div class="form-group">
                <label>
                  <Calendar size={18} />
                  Data do início
                </label>
                <input
                  type="text"
                  placeholder="08/12/2023"
                  on:input={(e) =>
                    handlePersonUpdate(index, "date", e.target.value)}
                  required
                />
              </div>

              <div class="form-group">
                <label>
                  <MapPin size={18} />
                  Cidade/Estado
                </label>
                <input
                  type="text"
                  placeholder="São Paulo - SP"
                  on:input={(e) =>
                    handlePersonUpdate(index, "location", e.target.value)}
                  required
                />
              </div>
            </div>
          </div>
        {/each}
      </div>

      <div class="customer-section">
        <h3 class="romantic-title">
          <Mail size={20} />
          Informações de Envio
        </h3>

        <div class="form-group">
          <label>
            <User size={18} />
            Seu Nome Completo
          </label>
          <input
            type="text"
            placeholder="Quem está presenteando?"
            bind:value={customerData.name}
            required
          />
        </div>

        <div class="form-row">
          <div class="form-group">
            <label>
              <Phone size={18} />
              WhatsApp
            </label>
            <input
              type="text"
              placeholder="(00) 00000-0000"
              value={customerData.whatsapp}
              on:input={(e) =>
                (customerData.whatsapp = formatPhone(e.target.value))}
              required
            />
          </div>

          <div class="form-group">
            <label>
              <CreditCard size={18} />
              CPF (Para a Nota)
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

        <div class="checkbox-group">
          <label class="checkbox-label">
            <input type="checkbox" bind:checked={confirmWhatsapp} />
            <div class="custom-checkbox">
              {#if confirmWhatsapp}<Check size={14} strokeWidth={4} />{/if}
            </div>
            <span
              >Confirmo que meu WhatsApp está correto para receber o arquivo
              digital.</span
            >
          </label>
        </div>
      </div>

      <div class="form-actions">
        <button class="btn btn-compra btn-large" on:click={handleSubmit}>
          Gerar Certidão & Pagar
        </button>
      </div>
    </div>

    <div class="summary-section">
      <div class="order-summary card">
        <h3>Resumo do Presente</h3>

        <div class="summary-item">
          <span class="label">Pacote:</span>
          <span class="value">{selectedProduct?.name}</span>
        </div>

        <div class="summary-item">
          <span class="label">Certidão Digital:</span>
          <span class="value"
            >R$ {selectedProduct?.price.toFixed(2).replace(".", ",")}</span
          >
        </div>

        {#each selectedExtras.filter((e) => e.selected) as extra}
          <div class="summary-item extra">
            <span class="label">{extra.name}:</span>
            <span class="value"
              >+ R$ {extra.price.toFixed(2).replace(".", ",")}</span
            >
          </div>
        {/each}

        <div class="summary-divider"></div>

        <div class="summary-total">
          <span class="label">Total do Amor:</span>
          <span class="value"
            >R$ {totalAmount.toFixed(2).replace(".", ",")}</span
          >
        </div>

        <div class="secure-badge">
          <Check size={14} /> Pagamento 100% Seguro
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .step-customer {
    max-width: 1100px;
    margin: 0 auto;
  }

  .content-wrapper {
    display: grid;
    grid-template-columns: 1.8fr 1.2fr;
    gap: 40px;
    align-items: start;
  }

  .section-header {
    text-align: left;
    margin-bottom: 40px;
  }

  .section-header h2 {
    font-family: "Great Vibes", cursive;
    color: #5e0b15;
    font-size: 3.2rem;
    margin-bottom: 10px;
  }

  .section-header p {
    color: #8d5b5b;
  }

  .romantic-title {
    font-size: 1.3rem;
    color: #c9184a;
    margin: 40px 0 20px;
    display: flex;
    align-items: center;
    gap: 10px;
    font-weight: 600;
  }

  .person-form {
    background: #fffafa;
    border: 1px solid #ffccd5;
    padding: 30px;
    border-radius: 20px;
    margin-bottom: 25px;
  }

  .badge {
    background: #ff4d6d;
    color: white;
    padding: 5px 15px;
    border-radius: 50px;
    font-size: 0.8rem;
    font-weight: 700;
    text-transform: uppercase;
  }

  .form-group {
    margin-bottom: 20px;
  }

  .form-group label {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 8px;
    margin-bottom: 8px;
    font-size: 0.95rem;
    font-weight: 500;
    color: #4a0e0e;
  }

  .form-group input {
    width: 100%;
    padding: 14px 18px;
    border: 2px solid #feeafa;
    border-radius: 12px;
    font-size: 1rem;
    transition: all 0.3s ease;
    background: white;
  }

  .form-group input:focus {
    outline: none;
    border-color: #ff4d6d;
    box-shadow: 0 0 0 4px rgba(255, 77, 109, 0.1);
  }

  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }

  .checkbox-group {
    margin-top: 30px;
    background: #fff0f3;
    padding: 20px;
    border-radius: 15px;
  }

  .checkbox-label {
    display: flex;
    align-items: center;
    gap: 15px;
    cursor: pointer;
    color: #8d5b5b;
    font-size: 0.9rem;
  }

  .checkbox-label input {
    display: none;
  }

  .custom-checkbox {
    width: 24px;
    height: 24px;
    border: 2px solid #ff4d6d;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: white;
    color: #ff4d6d;
    flex-shrink: 0;
  }

  .checkbox-label input:checked + .custom-checkbox {
    background: #ff4d6d;
    color: white;
  }

  .order-summary {
    position: sticky;
    top: 20px;
    padding: 30px;
    background: white;
    border: 2px solid #fff0f3;
  }

  .order-summary h3 {
    font-family: "Playfair Display", serif;
    color: #5e0b15;
    margin-bottom: 25px;
  }

  .summary-item {
    display: flex;
    justify-content: space-between;
    padding: 12px 0;
    font-size: 0.95rem;
  }

  .summary-item .label {
    color: #8d5b5b;
  }
  .summary-item .value {
    font-weight: 600;
    color: #4a0e0e;
  }

  .summary-divider {
    height: 1px;
    background: #feeafa;
    margin: 20px 0;
  }

  .summary-total {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 20px;
  }

  .summary-total .label {
    font-weight: 700;
    color: #4a0e0e;
  }
  .summary-total .value {
    font-size: 1.5rem;
    font-weight: 800;
    color: #c9184a;
  }

  .secure-badge {
    background: #f0fff4;
    color: #2f855a;
    padding: 10px;
    border-radius: 10px;
    font-size: 0.8rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    font-weight: 600;
  }

  .btn-compra {
    background: linear-gradient(135deg, #ff4d6d 0%, #c9184a 100%);
    box-shadow: 0 10px 25px rgba(201, 24, 74, 0.3);
    color: white;
    cursor: pointer;
  }

  .btn-large {
    width: 100%;
    padding: 20px;
    border-radius: 50px;
    font-size: 1.2rem;
  }

  @media (max-width: 850px) {
    .content-wrapper {
      grid-template-columns: 1fr;
    }
    .order-summary {
      position: static;
      margin-bottom: 30px;
    }
    .form-row {
      grid-template-columns: 1fr;
    }
  }
</style>
