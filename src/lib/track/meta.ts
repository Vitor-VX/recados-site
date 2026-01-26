type MetaEvent =
    | "view_content"
    | "add_to_cart"
    | "initiate_checkout"
    | "purchase";

const firedEvents = new Set<string>();

export function track(event: MetaEvent, data: any = {}) {
    if (typeof window === "undefined") return;
    if (!(window as any).fbq) return;

    if (firedEvents.has(event)) return;
    firedEvents.add(event);

    const map = {
        view_content: "ViewContent",
        add_to_cart: "AddToCart",
        initiate_checkout: "InitiateCheckout",
        purchase: "Purchase",
    };

    (window as any).fbq("track", map[event], {
        content_name: "Certificado do Amor",
        currency: "BRL",
        ...data,
    });
}