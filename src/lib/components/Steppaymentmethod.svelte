<script lang="ts">
    /**
     * StepPaymentMethod — seletor de pagamento com tema customizável
     *
     * Props obrigatórias:
     *   totalAmount  : number
     *   onPix        : () => void
     *   onCard       : (formData: CardFormData) => void
     *
     * Props de tema (todas opcionais — tem defaults):
     *   theme        : PaymentTheme
     *
     * Exemplos de uso:
     *
     *   // Quadro Pet (dark/gold)
     *   <StepPaymentMethod {totalAmount} {onPix} {onCard} />
     *
     *   // Certidão Amor (red/hearts)
     *   <StepPaymentMethod {totalAmount} {onPix} {onCard} theme={redTheme} />
     */

    import { onMount, onDestroy } from "svelte";
    import { PUBLIC_MERCADO_PAGO_KEY } from "$env/static/public";
    import { CreditCard, QrCode, Lock, ChevronDown } from "lucide-svelte";

    export interface PaymentTheme {
        /** Cor de fundo dos painéis */
        bgPanel?: string;
        /** Cor primária (botões, dots, tab ativa) */
        colorPrimary?: string;
        /** Cor de texto sobre primária */
        colorOnPrimary?: string;
        /** Cor de acento / destaque (badges, savings, hover) */
        colorAccent?: string;
        /** Cor de texto sobre acento */
        colorOnAccent?: string;
        /** Cor do texto principal */
        colorText?: string;
        /** Cor do texto secundário/muted */
        colorMuted?: string;
        /** Cor da borda */
        colorBorder?: string;
        /** Família de fonte para valores/display */
        fontDisplay?: string;
        /** Família de fonte para o corpo */
        fontBody?: string;
        /** Ícone decorativo opcional (emoji ou string) — aparece no painel Pix */
        decorIcon?: string;
    }

    export interface CardFormData {
        token: string;
        paymentMethodId: string;
        issuerId: string;
        cardholderEmail: string;
        installments: string;
        identificationNumber: string;
        identificationType: string;
    }

    // ── Props ────────────────────────────────────────────────────────────────

    export let totalAmount: number;
    export let onPix: () => void;
    export let onCard: (formData: CardFormData) => void;
    export let currency = "R$";
    export let pixDiscount = 0;
    export let publicKey: string = PUBLIC_MERCADO_PAGO_KEY ?? "";

    export let theme: PaymentTheme = {};

    $: t = {
        bgPanel: theme.bgPanel ?? "#faf8f4",
        colorPrimary: theme.colorPrimary ?? "#2d2520",
        colorOnPrimary: theme.colorOnPrimary ?? "#d4aa72",
        colorAccent: theme.colorAccent ?? "#b8935a",
        colorOnAccent: theme.colorOnAccent ?? "#ffffff",
        colorText: theme.colorText ?? "#2d2520",
        colorMuted: theme.colorMuted ?? "#8a7e74",
        colorBorder: theme.colorBorder ?? "rgba(184,147,90,.2)",
        fontDisplay: theme.fontDisplay ?? "'Cormorant Garamond', serif",
        fontBody: theme.fontBody ?? "'DM Sans', sans-serif",
        decorIcon: theme.decorIcon ?? "",
    };

    type Method = "pix" | "card";
    let selected: Method = "pix";
    let cardFormInstance: any = null;
    let mpLoaded = false;
    let submitting = false;
    let cardError = "";

    $: pixAmount =
        pixDiscount > 0 ? totalAmount * (1 - pixDiscount / 100) : totalAmount;

    function fmt(val: number) {
        return `${currency} ${val.toFixed(2).replace(".", ",")}`;
    }

    async function mountCardForm() {
        if (mpLoaded || selected !== "card") return;
        try {
            const { loadMercadoPago } = await import("@mercadopago/sdk-js");
            await loadMercadoPago();
            mpLoaded = true;

            const mp = new (window as any).MercadoPago(publicKey, {
                locale: "pt-BR",
            });

            cardFormInstance = mp.cardForm({
                amount: String(totalAmount),
                iframe: true,
                form: {
                    id: "mp-card-form",
                    cardNumber: {
                        id: "mp__cardNumber",
                        placeholder: "0000 0000 0000 0000",
                    },
                    expirationDate: {
                        id: "mp__expirationDate",
                        placeholder: "MM/AA",
                    },
                    securityCode: {
                        id: "mp__securityCode",
                        placeholder: "CVV",
                    },
                    cardholderName: {
                        id: "mp__cardholderName",
                        placeholder: "Nome como no cartão",
                    },
                    issuer: { id: "mp__issuer" },
                    installments: { id: "mp__installments" },
                    identificationType: { id: "mp__identificationType" },
                    identificationNumber: {
                        id: "mp__identificationNumber",
                        placeholder: "000.000.000-00",
                    },
                },
                callbacks: {
                    onFormMounted: (err: unknown) => {
                        if (err) console.error("CardForm mount error:", err);
                    },
                    onSubmit: async (event: Event) => {
                        event.preventDefault();
                        submitting = true;
                        cardError = "";
                        try {
                            const data =
                                cardFormInstance.getCardFormData() as CardFormData;
                            await onCard(data);
                        } catch (e: any) {
                            cardError =
                                e?.message ?? "Erro ao processar o cartão.";
                        } finally {
                            submitting = false;
                        }
                    },
                },
            });
        } catch (e) {
            console.error("Erro ao carregar MP SDK:", e);
        }
    }

    function unmountCardForm() {
        try {
            cardFormInstance?.unmount();
        } catch {}
        cardFormInstance = null;
        mpLoaded = false;
    }

    function selectMethod(m: Method) {
        if (m === selected) return;
        if (selected === "card") unmountCardForm();
        selected = m;
        if (m === "card") setTimeout(mountCardForm, 50);
    }

    onMount(() => {
        if (selected === "card") mountCardForm();
    });
    onDestroy(() => {
        unmountCardForm();
    });
</script>

<div
    class="pay-wrap"
    style="
        --bg-panel:         {t.bgPanel};
        --color-primary:    {t.colorPrimary};
        --color-on-primary: {t.colorOnPrimary};
        --color-accent:     {t.colorAccent};
        --color-on-accent:  {t.colorOnAccent};
        --color-text:       {t.colorText};
        --color-muted:      {t.colorMuted};
        --color-border:     {t.colorBorder};
        --font-display:     {t.fontDisplay};
        --font-body:        {t.fontBody};
    "
>
    <!-- Tabs -->
    <div class="tabs">
        <button
            class="tab"
            class:active={selected === "pix"}
            on:click={() => selectMethod("pix")}
        >
            <QrCode size={16} />
            Pix
            {#if pixDiscount > 0}
                <span class="tab-badge">{pixDiscount}% OFF</span>
            {/if}
        </button>
        <button
            class="tab"
            class:active={selected === "card"}
            on:click={() => selectMethod("card")}
        >
            <CreditCard size={16} />
            Cartão de Crédito
        </button>
    </div>

    {#if selected === "pix"}
        <div class="panel">
            <div class="pix-info">
                <div class="pix-step">
                    <span class="dot">1</span> Clique em "Gerar QR Code"
                </div>
                <div class="pix-step">
                    <span class="dot">2</span> Escaneie ou copie o código no seu
                    banco
                </div>
                <div class="pix-step">
                    <span class="dot">3</span> O pagamento é confirmado na hora
                </div>
            </div>

            <button class="btn-primary" on:click={onPix}>
                <QrCode size={18} /> Gerar QR Code Pix
            </button>

            <div class="secure-row">
                <Lock size={11} /> Pagamento seguro com SSL
            </div>
        </div>
    {/if}

    {#if selected === "card"}
        <div class="panel">
            <form id="mp-card-form" on:submit|preventDefault>
                <div class="field-group">
                    <label for="mp__cardNumber">Número do Cartão</label>
                    <div id="mp__cardNumber" class="mp-field"></div>
                </div>

                <div class="field-row">
                    <div class="field-group">
                        <label for="mp__expirationDate">Validade</label>
                        <div id="mp__expirationDate" class="mp-field"></div>
                    </div>
                    <div class="field-group">
                        <label for="mp__securityCode">CVV</label>
                        <div id="mp__securityCode" class="mp-field"></div>
                    </div>
                </div>

                <div class="field-group">
                    <label for="mp__cardholderName">Nome no Cartão</label>
                    <input
                        id="mp__cardholderName"
                        class="field-input"
                        placeholder="Nome como no cartão"
                    />
                </div>

                <div class="field-row">
                    <div class="field-group">
                        <label for="mp__identificationType">Documento</label>
                        <div class="select-wrap">
                            <select
                                id="mp__identificationType"
                                class="field-input"
                            ></select>
                            <ChevronDown size={14} class="select-icon" />
                        </div>
                    </div>
                    <div class="field-group">
                        <label for="mp__identificationNumber">CPF / CNPJ</label>
                        <input
                            id="mp__identificationNumber"
                            class="field-input"
                            placeholder="000.000.000-00"
                        />
                    </div>
                </div>

                <div class="field-group" style="display:none">
                    <select id="mp__issuer" class="field-input"></select>
                </div>

                <div
                    class="field-group"
                    style:display={submitting ? "block" : "none"}
                >
                    <label for="mp__installments">Parcelas</label>
                    <div class="select-wrap">
                        <select id="mp__installments" class="field-input"
                        ></select>
                        <ChevronDown size={14} class="select-icon" />
                    </div>
                </div>

                {#if cardError}
                    <div class="card-error">{cardError}</div>
                {/if}

                <button type="submit" class="btn-primary" disabled={submitting}>
                    {#if submitting}
                        <span class="spinner"></span> Processando...
                    {:else}
                        <Lock size={16} /> Pagar {fmt(totalAmount)}
                    {/if}
                </button>

                <div class="secure-row">
                    <Lock size={11} /> Dados criptografados · Powered by Mercado
                    Pago
                </div>
            </form>
        </div>
    {/if}
</div>

<style>
    .pay-wrap {
        margin-top: 20px;
        font-family: var(--font-body, "DM Sans", sans-serif);
        width: 100%;
    }

    .tabs {
        display: grid;
        grid-template-columns: 1fr 1fr;
        border: 1px solid var(--color-border);
        border-radius: 4px;
        overflow: hidden;
        margin-bottom: 20px;
    }

    .tab {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 7px;
        padding: 13px;
        background: white;
        border: none;
        font-family: inherit;
        font-size: 0.85rem;
        font-weight: 500;
        color: var(--color-muted);
        cursor: pointer;
        transition: all 0.2s;
    }

    .tab:first-child {
        border-right: 1px solid var(--color-border);
    }

    .tab.active {
        background: var(--color-primary);
        color: var(--color-on-primary);
    }

    .tab-badge {
        background: var(--color-accent);
        color: var(--color-on-accent);
        font-size: 0.6rem;
        font-weight: 700;
        padding: 2px 6px;
        border-radius: 10px;
        letter-spacing: 0.05em;
    }

    .tab.active .tab-badge {
        background: var(--color-on-primary);
        color: var(--color-primary);
    }

    .panel {
        background: var(--bg-panel);
        border: 1px solid var(--color-border);
        border-radius: 4px;
        padding: 24px;
    }

    .pix-info {
        display: flex;
        flex-direction: column;
        gap: 10px;
        margin-bottom: 22px;
    }

    .pix-step {
        display: flex;
        align-items: center;
        gap: 12px;
        font-size: 0.85rem;
        color: var(--color-text);
        font-weight: 300;
    }

    .dot {
        width: 22px;
        height: 22px;
        border-radius: 50%;
        background: var(--color-primary);
        color: var(--color-on-primary);
        font-size: 0.7rem;
        font-weight: 700;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
    }

    .field-group {
        margin-bottom: 14px;
    }

    .field-group label {
        display: block;
        font-size: 0.68rem;
        font-weight: 500;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        color: var(--color-text);
        margin-bottom: 6px;
    }

    .mp-field {
        height: 42px;
        border: 1px solid var(--color-border);
        border-radius: 2px;
        background: white;
        padding: 0 12px;
        transition: border 0.2s;
    }

    .mp-field:focus-within {
        border-color: var(--color-accent);
    }

    .field-input {
        width: 100%;
        height: 42px;
        padding: 0 12px;
        border: 1px solid var(--color-border);
        border-radius: 2px;
        background: white;
        font-family: inherit;
        font-size: 0.88rem;
        color: var(--color-text);
        outline: none;
        transition: border 0.2s;
        box-sizing: border-box;
        appearance: none;
    }

    .field-input:focus {
        border-color: var(--color-accent);
    }

    .field-row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 12px;
    }

    .select-wrap {
        position: relative;
    }

    .select-wrap :global(.select-icon) {
        position: absolute;
        right: 12px;
        top: 50%;
        transform: translateY(-50%);
        pointer-events: none;
        color: var(--color-muted);
    }

    .card-error {
        background: #fff5f5;
        border: 1px solid #fed7d7;
        color: #c53030;
        padding: 10px 14px;
        border-radius: 2px;
        font-size: 0.82rem;
        margin-bottom: 14px;
    }

    .btn-primary {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        width: 100%;
        padding: 16px;
        background: var(--color-primary);
        color: var(--color-on-primary);
        border: none;
        border-radius: 2px;
        font-family: inherit;
        font-size: 0.95rem;
        font-weight: 500;
        letter-spacing: 0.04em;
        cursor: pointer;
        transition: background 0.25s;
        border-radius: 20px;
        margin-top: 4px;
    }

    .btn-primary:hover:not(:disabled) {
        background: var(--color-accent);
        color: var(--color-on-accent);
    }
    .btn-primary:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }

    .secure-row {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 5px;
        margin-top: 12px;
        font-size: 0.68rem;
        color: var(--color-muted);
        font-weight: 300;
        letter-spacing: 0.03em;
    }

    .spinner {
        width: 14px;
        height: 14px;
        border: 2px solid rgba(255, 255, 255, 0.3);
        border-top-color: white;
        border-radius: 50%;
        animation: spin 0.7s linear infinite;
        display: inline-block;
    }

    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }

    @media (max-width: 480px) {
        .field-row {
            grid-template-columns: 1fr;
        }
    }
</style>
