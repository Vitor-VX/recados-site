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
    Camera,
    ImageIcon,
    Layout,
    CheckCircle2,
    Copy,
    Sparkles,
    Gem,
  } from "lucide-svelte";
  import {
    checkoutStore,
    updateCustomerData,
    updatePersonData,
    toggleExtra,
  } from "$lib/stores/checkoutStore";
  import { track } from "$lib/track/meta";

  export let onNext: () => void;

  let customerData = {
    name: "",
    whatsapp: "",
    email: "",
  };

  let confirmWhatsapp = false;

  const themes = [
    {
      id: "minimalist",
      name: "Amor Minimalista",
      withPhoto: {
        preview:
          "https://files.botsync.site/modelos-certificados/certificado_02_com_img.png",
      },
      withoutPhoto: {
        preview:
          "https://files.botsync.site/modelos-certificados/certificado_02_sem_img.png",
      },
    },
    {
      id: "vintage",
      name: "Clássico Vintage",
      withPhoto: {
        preview:
          "https://files.botsync.site/modelos-certificados/certificado_01_com_img.png",
      },
      withoutPhoto: {
        preview:
          "https://files.botsync.site/modelos-certificados/modelo_padrao.jpeg",
      },
    },
  ];

  $: ({ selectedProduct, people, totalAmount, selectedExtras } =
    $checkoutStore);

  $: hasPhotoExtra = selectedExtras.some(
    (e) => e.id === "with_photo" && e.selected,
  );
  $: hasFullCollection = selectedExtras.some(
    (e) => e.id === "collection" && e.selected,
  );

  $: isWithPhoto = hasPhotoExtra || hasFullCollection;

  $: displayMode = hasFullCollection
    ? "collection"
    : hasPhotoExtra
      ? "two"
      : "single";

  function onlyNumbers(value: string) {
    return value.replace(/\D/g, "");
  }

  function handleThemeSelect(index: number, theme: any) {
    updatePersonData(index, {
      selectedTheme: theme.id,
    });
  }

  function sanitizeString(str: string) {
    if (!str) return "";
    return str
      .toLowerCase()
      .trim()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  function isValidBrazilWhatsapp(phone: string) {
    const clean = onlyNumbers(phone);
    return clean.length === 11 && /^[1-9]{2}9\d{8}$/.test(clean);
  }

  function formatDisplayDate(value: string) {
    let v = value.replace(/\D/g, "").slice(0, 8);
    if (v.length >= 5) return `${v.slice(0, 2)}/${v.slice(2, 4)}/${v.slice(4)}`;
    if (v.length >= 3) return `${v.slice(0, 2)}/${v.slice(2)}`;
    return v;
  }

  function handlePersonUpdate(index: number, field: string, value: any) {
    let finalValue = value;
    if (field === "startDate") finalValue = formatDisplayDate(value);
    updatePersonData(index, { [field]: finalValue });
  }

  function formatPhone(value: string) {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d{4})/, "$1-$2");
  }

  function isValidFirstName(name: string) {
    const trimmed = name.trim();
    return /^[A-Za-zÀ-ÿ]+$/.test(trimmed);
  }

  function handleSubmit() {
    if (!customerData.email || !customerData.name || !customerData.whatsapp) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    const invalidName = people.some((p) => {
      return (
        !isValidFirstName(p.name1 || "") || !isValidFirstName(p.name2 || "")
      );
    });

    if (invalidName) {
      alert("Digite apenas o primeiro nome de cada pessoa (ex: João).");
      return;
    }

    if (!isValidBrazilWhatsapp(customerData.whatsapp)) {
      alert("Digite um WhatsApp válido com DDD e número iniciando com 9.");
      return;
    }

    const isMissingData = people.some((p) => {
      const basic =
        !p.name1?.trim() ||
        !p.name2?.trim() ||
        !p.cityName?.trim() ||
        !p.stateName?.trim() ||
        !p.startDate?.trim();
      const theme = !p.selectedTheme && displayMode !== "collection";
      const photo = isWithPhoto && !p.photo;
      return basic || theme || photo;
    });

    if (isMissingData) {
      alert("Preencha todos os dados e escolha o estilo do pacote.");
      return;
    }

    if (!confirmWhatsapp) {
      alert("Por favor, confirme que seu WhatsApp está correto.");
      return;
    }

    people.forEach((p, index) => {
      const fullName = `${sanitizeString(p.name1)} e ${sanitizeString(p.name2)}`;
      const fullLocation = `${sanitizeString(p.cityName)} - ${p.stateName.toUpperCase().trim()}`;
      updatePersonData(index, {
        ...p,
        name: fullName,
        city: fullLocation,
        startDate: formatDisplayDate(p.startDate),
      });
    });

    updateCustomerData({
      ...customerData,
      name: sanitizeString(customerData.name),
      whatsapp: customerData.whatsapp.replace(/\D/g, ""),
    });
    onNext();
  }

  function handleFileUpload(index: number, e: Event) {
    const target = e.target as HTMLInputElement;
    if (target.files && target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) =>
        updatePersonData(index, { photo: event.target?.result as string });
      reader.readAsDataURL(target.files[0]);
    }
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
          <Heart size={20} fill="currentColor" /> Dados da Certidão
        </h3>
        {#each people as person, index}
          <div class="person-form card">
            <div class="person-header">
              <span class="badge">Casal {index + 1}</span>
            </div>

            <div class="form-group">
              <label><User size={18} /> Nomes do Casal</label>
              <div class="form-row">
                <input
                  type="text"
                  placeholder="exemplo: João"
                  value={person.name1 || ""}
                  on:input={(e) =>
                    handlePersonUpdate(index, "name1", e.target.value)}
                />
                <input
                  type="text"
                  placeholder="exemplo: Maria"
                  value={person.name2 || ""}
                  on:input={(e) =>
                    handlePersonUpdate(index, "name2", e.target.value)}
                />
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label><Calendar size={18} /> Data do início</label>
                <input
                  type="text"
                  maxlength="10"
                  value={person.startDate || ""}
                  placeholder="DD/MM/AAAA"
                  on:input={(e) =>
                    handlePersonUpdate(index, "startDate", e.target.value)}
                />
              </div>

              <div class="form-group">
                <label><MapPin size={18} /> Localidade</label>
                <div class="location-grid">
                  <input
                    type="text"
                    value={person.cityName || ""}
                    placeholder="Cidade"
                    on:input={(e) =>
                      handlePersonUpdate(index, "cityName", e.target.value)}
                  />
                  <input
                    type="text"
                    maxlength="2"
                    value={person.stateName || ""}
                    placeholder="UF"
                    on:input={(e) =>
                      handlePersonUpdate(index, "stateName", e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div class="form-group">
              <label><Layout size={18} /> Escolha o Estilo do Pacote</label>
              <div class="themes-grid">
                {#if displayMode === "collection"}
                  <button
                    type="button"
                    class="theme-option selected collection-card"
                  >
                    <div class="cards-stack">
                      <div class="stack-card quaternary">
                        <img src={themes[0].withoutPhoto.preview} alt="" />
                      </div>
                      <div class="stack-card tertiary">
                        <img src={themes[0].withPhoto.preview} alt="" />
                      </div>
                      <div class="stack-card secondary">
                        <img src={themes[1].withoutPhoto.preview} alt="" />
                      </div>
                      <div class="stack-card main">
                        <img src={themes[1].withPhoto.preview} alt="" />
                      </div>
                      <div class="model-check">
                        <CheckCircle2 size={28} fill="#c9184a" color="white" />
                      </div>
                    </div>
                    <div class="theme-label">
                      <span class="name">Coleção Completa</span>
                      <span class="bundle-tag">4 Certificados Inclusos</span>
                    </div>
                  </button>
                {:else}
                  {#each themes as theme}
                    <button
                      type="button"
                      class="theme-option"
                      class:selected={person.selectedTheme === theme.id}
                      on:click={() => handleThemeSelect(index, theme)}
                    >
                      <div class="cards-stack">
                        {#if displayMode === "two"}
                          <div class="stack-card secondary">
                            <img src={theme.withoutPhoto.preview} alt="" />
                          </div>
                          <div class="stack-card main">
                            <img src={theme.withPhoto.preview} alt="" />
                          </div>
                        {:else}
                          <div class="stack-card main-single">
                            <img src={theme.withoutPhoto.preview} alt="" />
                          </div>
                        {/if}
                        {#if person.selectedTheme === theme.id}
                          <div class="model-check">
                            <CheckCircle2
                              size={28}
                              fill="#c9184a"
                              color="white"
                            />
                          </div>
                        {/if}
                      </div>
                      <div class="theme-label">
                        <span class="name">{theme.name}</span>
                        {#if hasPhotoExtra}
                          <span class="bundle-tag">Pacote 2 em 1</span>
                        {/if}
                      </div>
                    </button>
                  {/each}
                {/if}
              </div>
            </div>

            {#if isWithPhoto}
              <div class="form-group upload-group">
                <label
                  ><Camera size={18} /> Foto do Casal (Necessária para o plano selecionado)</label
                >
                <div class="photo-upload-container">
                  {#if person.photo}
                    <div class="photo-preview">
                      <img src={person.photo} alt="Preview" />
                      <button
                        class="remove-photo"
                        on:click={() => handlePersonUpdate(index, "photo", "")}
                        >×</button
                      >
                    </div>
                  {:else}
                    <label class="file-input-label">
                      <ImageIcon size={32} />
                      <span>Upload da foto do casal</span>
                      <input
                        type="file"
                        accept="image/*"
                        on:change={(e) => handleFileUpload(index, e)}
                      />
                    </label>
                  {/if}
                </div>
              </div>
            {/if}
          </div>
        {/each}
      </div>

      <div class="customer-section">
        <h3 class="romantic-title"><Mail size={20} /> Informações de Envio</h3>
        <div class="form-group">
          <label><User size={18} /> Seu Nome Completo</label>
          <input
            type="text"
            placeholder="Seu nome completo"
            bind:value={customerData.name}
          />
        </div>
        <div class="form-row">
          <div class="form-group">
            <label><Phone size={18} /> WhatsApp</label>
            <input
              type="text"
              placeholder="(00) 00000-0000"
              value={customerData.whatsapp}
              on:input={(e) =>
                (customerData.whatsapp = formatPhone(e.target.value))}
            />
          </div>
          <div class="form-group">
            <label><Mail size={18} /> E-mail</label>
            <input
              type="email"
              placeholder="seu@email.com"
              bind:value={customerData.email}
            />
          </div>
        </div>
        <div class="checkbox-group">
          <label class="checkbox-label">
            <input type="checkbox" bind:checked={confirmWhatsapp} />
            <div class="custom-checkbox">
              {#if confirmWhatsapp}<Check size={14} strokeWidth={4} />{/if}
            </div>
            <span
              >Confirmo que meu WhatsApp está correto para receber o arquivo.</span
            >
          </label>
        </div>
      </div>

      <div class="form-actions">
        <button class="btn btn-compra btn-large" on:click={handleSubmit}
          >Gerar Certidão & Pagar</button
        >
      </div>
    </div>

    <div class="summary-section">
      <div class="order-summary card">
        <h3>Resumo do Presente</h3>
        <div class="summary-item">
          <span class="label">Pacote:</span><span class="value"
            >{selectedProduct?.name}</span
          >
        </div>
        <div class="summary-item">
          <span class="label">Certidão Digital:</span><span class="value"
            >R$ {selectedProduct?.price.toFixed(2).replace(".", ",")}</span
          >
        </div>
        {#each selectedExtras.filter((e) => e.selected) as extra}
          <div class="summary-item extra">
            <span class="label">{extra.name}:</span><span class="value"
              >+ R$ {extra.price.toFixed(2).replace(".", ",")}</span
            >
          </div>
        {/each}
        <div class="summary-divider"></div>
        <div class="summary-total">
          <span class="label">Total:</span><span class="value"
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
    background: white;
    outline: none;
    transition: border 0.3s;
  }
  .form-group input:focus {
    border-color: #ff4d6d;
  }
  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }
  .location-grid {
    display: grid;
    grid-template-columns: 1fr 80px;
    gap: 10px;
  }

  /* THEMES & CARDS */
  .themes-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 30px;
    margin: 20px 0;
  }
  .theme-option {
    background: white;
    border: 1.5px solid #feeafa;
    cursor: pointer;
    padding: 20px;
    transition: all 0.4s ease;
    border-radius: 28px;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
  }
  .theme-option.selected {
    background: #fff5f5;
    border-color: #c9184a;
    border-width: 2.5px;
    box-shadow: 0 10px 25px rgba(201, 24, 74, 0.1);
  }

  .cards-stack {
    position: relative;
    width: 100%;
    height: 260px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .stack-card {
    position: absolute;
    width: 145px;
    aspect-ratio: 3/4.2;
    border-radius: 10px;
    overflow: hidden;
    border: 3px solid white;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
    transition: 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
    background: #fdfdfd;
  }
  .stack-card img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .stack-card.tertiary {
    transform: translateX(-70px) rotate(-18deg);
    z-index: 0;
    opacity: 0.75;
  }

  .stack-card.quaternary {
    transform: translateX(45px) rotate(12deg);
    z-index: 1;
    opacity: 0.85;
  }

  /* Logica de espalhar as cartas */
  .stack-card.secondary {
    transform: translateX(-35px) rotate(-10deg);
    z-index: 1;
    opacity: 0.8;
  }
  .stack-card.main {
    transform: translateX(15px) rotate(5deg);
    z-index: 2;
  }
  .stack-card.main-single {
    position: relative;
    width: 155px;
    transform: rotate(0);
    z-index: 2;
  }

  .theme-option:hover .stack-card.secondary {
    transform: translateX(-60px) rotate(-15deg);
    opacity: 1;
  }
  .theme-option:hover .stack-card.main {
    transform: translateX(30px) rotate(8deg);
  }
  .theme-option.selected .stack-card.main {
    transform: translateX(20px) rotate(0) scale(1.1);
    border-color: #c9184a;
    z-index: 3;
  }
  .theme-option.selected .stack-card.main-single {
    transform: scale(1.1);
    border-color: #c9184a;
  }

  .model-check {
    position: absolute;
    top: -10px;
    right: 0;
    z-index: 10;
    background: white;
    border-radius: 50%;
    line-height: 0;
  }
  .theme-label .name {
    display: block;
    font-weight: 700;
    color: #4a0e0e;
    font-size: 1.1rem;
    margin-bottom: 10px;
  }
  .bundle-tag {
    font-size: 0.7rem;
    color: #c9184a;
    font-weight: 800;
    text-transform: uppercase;
    background: #fff0f3;
    padding: 4px 12px;
    border-radius: 50px;
    margin-top: 30px;
    border: 1px solid #ffccd5;
  }

  .upsell-container {
    margin-top: 30px;
    margin-bottom: 15px;
    display: flex;
    justify-content: flex-start;
  }

  .upsell-box input {
    display: none;
  }

  .upsell-header {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .upsell-content {
    display: flex;
    flex-direction: column;
    align-items: flex-start; /* texto à esquerda */
    text-align: left;
  }

  .upsell-content p {
    font-size: 0.85rem;
    color: #a16207;
    margin: 0;
  }

  .upsell-content span {
    font-weight: 800;
    color: #c9184a;
  }

  .upsell-content span {
    font-weight: 800;
    color: #c9184a;
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

  /* SUMMARY & ACTIONS */
  .order-summary {
    position: sticky;
    top: 20px;
    padding: 30px;
    background: white;
    border: 2px solid #fff0f3;
    border-radius: 20px;
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
    color: white;
    border: none;
    padding: 20px;
    border-radius: 50px;
    font-size: 1.2rem;
    font-weight: 700;
    width: 100%;
    box-shadow: 0 10px 25px rgba(201, 24, 74, 0.3);
    cursor: pointer;
  }
  .photo-upload-container {
    margin-top: 10px;
  }
  .file-input-label {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 30px;
    border: 2px dashed #ffccd5;
    border-radius: 15px;
    background: white;
    cursor: pointer;
    color: #ff4d6d;
    transition: all 0.3s;
  }
  .file-input-label:hover {
    background: #fff0f3;
    border-color: #ff4d6d;
  }
  .file-input-label input {
    display: none;
  }
  .photo-preview {
    position: relative;
    width: 100px;
    height: 100px;
    border-radius: 12px;
    overflow: hidden;
    border: 3px solid white;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
  .photo-preview img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .remove-photo {
    position: absolute;
    top: 5px;
    right: 5px;
    background: #c9184a;
    color: white;
    border: none;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    cursor: pointer;
    font-size: 12px;
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
    font-size: 0.9rem;
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
  }
  .checkbox-label input {
    display: none;
  }
  .checkbox-label input:checked + .custom-checkbox {
    background: #ff4d6d;
    color: white;
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
