export class IframeScaler {
    #previewFrame;
    #resizeObserver;
    #A4_WIDTH_MM = 209.7;

    constructor() {
        this.#previewFrame = document.querySelector('#previewFrame');
        if (!this.#previewFrame) return;

        this.#setupScaling();
    }

    #setupScaling() {
        this.#previewFrame.addEventListener('load', () => {
            this.#applyScale();
        });

        this.#resizeObserver = new ResizeObserver(() => {
            this.#applyScale();
        });

        this.#resizeObserver.observe(this.#previewFrame);
    }

    #applyScale() {
        const iframeDoc =
            this.#previewFrame.contentDocument ||
            this.#previewFrame.contentWindow?.document;
        if (!iframeDoc?.body) return;

        const iframeRect = this.#previewFrame.getBoundingClientRect();
        const currentWidth = iframeRect.width;

        const A4_WIDTH_PX = (this.#A4_WIDTH_MM * 96) / 25.4;

        const adjustedWidth = currentWidth - 30;
        const scale = adjustedWidth / A4_WIDTH_PX;

        iframeDoc.body.style.transformOrigin = 'top left';
        iframeDoc.body.style.transform = `scale(${scale})`;
        iframeDoc.body.style.width = `${A4_WIDTH_PX}px`;
        iframeDoc.body.style.height = 'auto';
        iframeDoc.body.style.margin = '1px 10px';

        iframeDoc.documentElement.style.height = '0px';
        iframeDoc.documentElement.style.overflowX = 'hidden';
        iframeDoc.body.style.overflowX = 'hidden';
    }

    destroy() {
        if (this.#resizeObserver) {
            this.#resizeObserver.disconnect();
        }
    }
}
