<script lang="ts">
    import {
        FileText,
        Download,
        Calendar,
        Clock,
        ShieldCheck,
        Heart,
        ExternalLink,
        AlertTriangle,
        Image as ImageIcon,
        Printer,
        Sparkles,
    } from "lucide-svelte";
    import { onMount } from "svelte";
    import { fly, fade } from "svelte/transition";
    import { page } from "$app/stores";
    import { get } from "svelte/store";

    export let data;
    let id = "";
    let product = null;
    const daysRemaining = 7;

    onMount(() => {
        id = get(page).params.id ?? "";
        getPage();
    });

    const getPage = async () => {
        try {
            const request = await fetch(
                `https://vxsoftware.space/api/v1/offers/certificate/slug/${id}`,
            );
            const response = await request.json();

            if (response.success) {
                const data = response.data;

                product = {
                    id: data.id,
                    name: data.name || "Certificado do Amor",
                    type: data.type || "pdf",
                    size: data.size || "1.5 MB",
                    createAt: new Date(data.createAt as string),
                    downloadUrl: data.downloadUrl,
                    previewUrl:
                        data.previewUrl ||
                        "https://files.botsync.site/modelos-certificados/certificado_02_com_img.png",
                };
            }
        } catch (err) {
            console.error("Erro ao buscar o certificado:", err);
        }
    };
</script>

<svelte:head>
    <title>Download - Certificado do Amor</title>
    <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Great+Vibes&display=swap"
        rel="stylesheet"
    />
</svelte:head>

{#if product}
    <main class="download-page">
        <div class="bg-elements">
            <div class="floating-heart h1">❤</div>
            <div class="floating-heart h2">❤</div>
        </div>

        <div class="container">
            <header class="page-header">
                <div class="logo">
                    <div class="icon-circle">
                        <Heart size={24} fill="white" color="white" />
                    </div>
                    <span>Certificado do Amor</span>
                </div>
            </header>

            <div class="content" in:fly={{ y: 30, duration: 1000 }}>
                <div class="product-card">
                    <div class="expiration-banner">
                        <Clock size={16} />
                        <span
                            >Disponível para download por mais <strong
                                >{daysRemaining} dias</strong
                            ></span
                        >
                    </div>

                    <div class="product-main">
                        <div class="file-display">
                            <div class="preview-frame">
                                <img
                                    src={product.previewUrl}
                                    alt="Preview do Certificado"
                                />
                            </div>
                            <div class="file-type-badge {product.type}">
                                {#if product.type === "pdf"}
                                    <FileText size={14} /> PDF
                                {:else}
                                    <ImageIcon size={14} /> IMG
                                {/if}
                            </div>
                        </div>

                        <div class="product-details">
                            <div class="badge-new">
                                <Sparkles size={12} /> Pronto para você
                            </div>
                            <h1>{product.name}</h1>
                            <p class="description">
                                Sua história eternizada em um documento oficial
                                do coração.
                            </p>

                            <div class="meta-grid">
                                <div class="meta-item">
                                    <Calendar size={16} />
                                    <span
                                        >Criado em {product.createAt.toLocaleDateString(
                                            "pt-BR",
                                        )}</span
                                    >
                                </div>
                                <div class="meta-item">
                                    <ShieldCheck size={16} />
                                    <span>Arquivo Seguro</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="action-area">
                        <a
                            href={product.downloadUrl}
                            class="btn-download"
                            download
                        >
                            <Download size={22} />
                            Baixar Meu Certificado
                        </a>
                        <span class="file-info"
                            >Formato {product.type.toUpperCase()} • {product.size}</span
                        >
                    </div>

                    <div class="tips-section">
                        <div class="tip-card">
                            <Printer size={20} color="#c9184a" />
                            <div>
                                <strong>Dica de Eternização</strong>
                                <p>
                                    Para quadros, imprima em papel fotográfico
                                    fosco ou linho 180g.
                                </p>
                            </div>
                        </div>
                        <div class="tip-card">
                            <ExternalLink size={20} color="#c9184a" />
                            <div>
                                <strong>Surpreenda</strong>
                                <p>
                                    Envie o arquivo digital ou poste uma foto e
                                    marque nosso Instagram.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="warning-box">
                    <AlertTriangle size={20} />
                    <p>
                        Atenção: Por questões de privacidade, este arquivo será <strong
                            >excluído permanentemente</strong
                        > do nosso servidor em 7 dias. Certifique-se de salvar em
                        um local seguro.
                    </p>
                </div>
            </div>

            <footer class="page-footer">
                <p>Feito com ❤ por Certificado do Amor</p>
                <p class="copy">
                    © {new Date().getFullYear()} Todos os direitos reservados.
                </p>
            </footer>
        </div>
    </main>
{:else}
    <div class="loading-screen" out:fade>
        <div class="heart-loader">❤</div>
        <p>Buscando sua surpresa...</p>
    </div>
{/if}

<style>
    :root {
        --primary-love: #ff4d6d;
        --secondary-love: #c9184a;
        --text-love: #4a0e0e;
        --bg-love: #fff5f5;
    }

    .download-page {
        min-height: 100vh;
        background-color: var(--bg-love);
        font-family: "Poppins", sans-serif;
        color: var(--text-love);
        padding: 40px 0;
        position: relative;
        overflow-x: hidden;
    }

    .bg-elements {
        position: absolute;
        inset: 0;
        pointer-events: none;
    }
    .floating-heart {
        position: absolute;
        color: #ffccd5;
        font-size: 3rem;
        opacity: 0.5;
        animation: float 6s infinite ease-in-out;
    }
    .h1 {
        top: 10%;
        left: 5%;
    }
    .h2 {
        bottom: 10%;
        right: 5%;
        animation-delay: 3s;
    }
    @keyframes float {
        0%,
        100% {
            transform: translateY(0);
        }
        50% {
            transform: translateY(-20px);
        }
    }

    .container {
        max-width: 850px;
        margin: 0 auto;
        padding: 0 20px;
        position: relative;
        z-index: 2;
    }

    .page-header {
        display: flex;
        justify-content: center;
        margin-bottom: 40px;
    }
    .logo {
        display: flex;
        align-items: center;
        gap: 12px;
        font-weight: 700;
        font-size: 1.4rem;
        color: var(--secondary-love);
    }
    .icon-circle {
        background: var(--primary-love);
        padding: 8px;
        border-radius: 12px;
        display: flex;
        box-shadow: 0 4px 12px rgba(255, 77, 109, 0.3);
    }

    .product-card {
        background: white;
        border-radius: 35px;
        box-shadow: 0 20px 60px rgba(74, 14, 14, 0.05);
        border: 1px solid #feeafa;
        overflow: hidden;
    }

    .expiration-banner {
        background: #fff0f3;
        padding: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        color: var(--secondary-love);
        font-size: 0.85rem;
        font-weight: 600;
        border-bottom: 1px solid #feeafa;
    }

    .product-main {
        padding: 50px;
        display: grid;
        grid-template-columns: 240px 1fr;
        gap: 40px;
        align-items: center;
    }

    .file-display {
        position: relative;
    }
    .preview-frame {
        background: white;
        padding: 8px;
        border: 1px solid #eee;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
        border-radius: 4px;
        transform: rotate(-2deg);
    }
    .preview-frame img {
        width: 100%;
        display: block;
        border-radius: 2px;
    }

    .file-type-badge {
        position: absolute;
        bottom: -10px;
        right: -10px;
        padding: 6px 12px;
        border-radius: 8px;
        color: white;
        font-size: 0.75rem;
        font-weight: 700;
        display: flex;
        align-items: center;
        gap: 4px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    }
    .file-type-badge.pdf {
        background: #e11d48;
    }
    .file-type-badge.image {
        background: #2563eb;
    }

    .badge-new {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        background: #fff5f7;
        color: var(--primary-love);
        padding: 4px 12px;
        border-radius: 50px;
        font-size: 0.75rem;
        font-weight: 700;
        margin-bottom: 15px;
    }

    .product-details h1 {
        font-family: "Poppins", sans-serif;
        font-size: 1.8rem;
        font-weight: 800;
        margin: 0 0 10px;
        line-height: 1.2;
    }
    .description {
        color: #8d5b5b;
        font-size: 1rem;
        margin-bottom: 25px;
        line-height: 1.5;
    }

    .meta-grid {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
    .meta-item {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 0.9rem;
        color: #bfa2a2;
        font-weight: 500;
    }

    .action-area {
        padding: 0 50px 50px;
        text-align: center;
    }

    .btn-download {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 12px;
        background: linear-gradient(
            135deg,
            var(--primary-love) 0%,
            var(--secondary-love) 100%
        );
        color: white;
        text-decoration: none;
        padding: 22px 40px;
        border-radius: 100px;
        font-size: 1.2rem;
        font-weight: 700;
        box-shadow: 0 12px 30px rgba(201, 24, 74, 0.25);
        transition: 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
    .btn-download:hover {
        transform: translateY(-5px);
        box-shadow: 0 18px 40px rgba(201, 24, 74, 0.35);
    }

    .file-info {
        display: block;
        margin-top: 15px;
        font-size: 0.8rem;
        color: #bfa2a2;
        font-weight: 600;
    }

    .tips-section {
        background: #fafafa;
        padding: 30px 50px;
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 30px;
        border-top: 1px solid #f0f0f0;
    }
    .tip-card {
        display: flex;
        gap: 15px;
    }
    .tip-card strong {
        display: block;
        font-size: 0.9rem;
        margin-bottom: 4px;
    }
    .tip-card p {
        font-size: 0.8rem;
        color: #8d5b5b;
        margin: 0;
        line-height: 1.4;
    }

    .warning-box {
        margin-top: 30px;
        background: #fff8f8;
        border: 1px solid #ffebeb;
        border-radius: 20px;
        padding: 20px;
        display: flex;
        align-items: center;
        gap: 15px;
        color: #c9184a;
    }
    .warning-box p {
        font-size: 0.85rem;
        margin: 0;
        line-height: 1.5;
        font-weight: 500;
    }

    .page-footer {
        margin-top: 50px;
        text-align: center;
        color: #bfa2a2;
    }
    .page-footer .copy {
        font-size: 0.75rem;
        margin-top: 5px;
    }

    /* Loader */
    .loading-screen {
        height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background: white;
    }
    .heart-loader {
        font-size: 3rem;
        color: var(--primary-love);
        animation: pulse 1s infinite;
    }
    @keyframes pulse {
        0%,
        100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.2);
        }
    }

    @media (max-width: 768px) {
        .product-main {
            grid-template-columns: 1fr;
            text-align: center;
            padding: 40px 20px;
        }
        .file-display {
            display: flex;
            justify-content: center;
        }
        .preview-frame {
            width: 180px;
        }
        .tips-section {
            grid-template-columns: 1fr;
            padding: 30px 20px;
        }
        .action-area {
            padding: 0 20px 40px;
        }
        .btn-download {
            font-size: 1rem;
            padding: 18px;
        }
    }
</style>
