<script lang="ts">
    import { onMount, createEventDispatcher } from "svelte";

    export let couple: string;
    export let date: string;
    export let city: string;
    export let couplePhoto: string | null = "/casal.jpeg"; 

    export let autoGenerate = true;

    export let onRendered: ((base64: string) => void) | null = null;

    let canvas: HTMLCanvasElement;
    let ctx: CanvasRenderingContext2D;

    const W = 1080;
    const H = 1920;

    const dispatch = createEventDispatcher();

    const photoConfig = {
        x: 130, 
        y: 640, 
        w: 300, 
        h: 350, 
        radius: 24,
    };

    async function draw() {
        ctx = canvas.getContext("2d")!;
        canvas.width = W;
        canvas.height = H;

        await document.fonts.load('40px "Breathing"');
        await document.fonts.load('33px "Breathing"');
        await document.fonts.ready;

        const bg = new Image();
        bg.src = "/input2.png";
        await bg.decode();

        ctx.clearRect(0, 0, W, H);
        ctx.drawImage(bg, 0, 0, W, H);

        if (couplePhoto) {
            const img = new Image();
            img.src = couplePhoto;
            await img.decode();

            ctx.save();

            ctx.beginPath();
            ctx.roundRect(
                photoConfig.x,
                photoConfig.y,
                photoConfig.w,
                photoConfig.h,
                photoConfig.radius,
            );
            ctx.clip();

            const imgRatio = img.width / img.height;
            const canvasRatio = photoConfig.w / photoConfig.h;
            let drawX, drawY, drawW, drawH;

            if (imgRatio > canvasRatio) {
                drawH = photoConfig.h;
                drawW = img.width * (photoConfig.h / img.height);
                drawX = photoConfig.x + (photoConfig.w - drawW) / 2;
                drawY = photoConfig.y;
            } else {
                drawW = photoConfig.w;
                drawH = img.height * (photoConfig.w / img.width);
                drawX = photoConfig.x;
                drawY = photoConfig.y + (photoConfig.h - drawH) / 2;
            }

            ctx.drawImage(img, drawX, drawY, drawW, drawH);
            ctx.restore();
        }

        ctx.fillStyle = "#393939";
        ctx.textAlign = "center";

        ctx.font = '25px "Breathing"';
        ctx.fillText(couple, 820, 785);

        ctx.font = '25px "Breathing"';
        ctx.fillText(date, 860, 855);

        ctx.font = '25px "Breathing"';
        ctx.fillText(city, 825, 925);

        ctx.font = '33px "Breathing"';
        ctx.fillText("Gustavo", 298, 1550);

        ctx.font = '33px "Breathing"';
        ctx.fillText("Amanda", 800, 1550);

        const base64 = getBase64();
        onRendered?.(base64);
        dispatch("rendered", { base64 });
    }

    function getBase64(): string {
        return canvas.toDataURL("image/png");
    }

    function download(filename = "certidao.png") {
        const link = document.createElement("a");
        link.download = filename;
        link.href = getBase64();
        link.click();
    }

    export { draw, getBase64, download };

    onMount(() => {
        if (autoGenerate) draw();
    });
</script>

<canvas
    bind:this={canvas}
    width="1080"
    height="1920"
    style="width: 100%; max-width: 420px; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.1);"
/>

<style>
    @font-face {
        font-family: "Breathing";
        src: url("/breathing.ttf") format("opentype");
        font-weight: normal;
        font-style: normal;
    }
</style>
