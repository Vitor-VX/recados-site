export function getUTMs() {
    const params = new URLSearchParams(window.location.search);
    return {
        utm_source: params.get("utm_source") || null,
        utm_medium: params.get("utm_medium") || null,
        utm_campaign: params.get("utm_campaign") || null,
        utm_term: params.get("utm_term") || null,
        utm_content: params.get("utm_content") || null,
    };
}