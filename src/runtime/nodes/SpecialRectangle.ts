import { ensureBoolean, ensureColor, ensureFloat, ensureInt, Node } from "./Node";
import { Stage, Element, Texture } from "tree2d/lib";
import RoundRectTexture, { RoundRectOptions } from "tree2d/lib/textures/RoundRectTexture";
import { ElementResizeEventCallback } from "tree2d/lib/tree/ElementListeners";

export class SpecialRectangle extends Node {
    private options: Partial<RoundRectOptions> = {};

    private rectangleElement = new Element(this.stage);

    private roundRectTexture = new RoundRectTexture(this.stage);

    constructor(stage: Stage) {
        super(stage);

        this.el.childList.add(this.rectangleElement);

        this.rectangleElement.texture = this.roundRectTexture;

        this.el.onResize = (element: Element, w: number, h: number) => this.handleResize(element, w, h);
        this.rectangleElement.onTextureLoaded = (element, texture) => this.handleTextureLoaded(element, texture);
    }

    set radius(radius: number) {
        const r = ensureFloat(radius);
        this.setOption("radius", [r, r, r, r]);
    }

    set strokeWidth(v: number) {
        this.setOption("strokeWidth", ensureInt(v));
    }

    set strokeColor(v: number) {
        this.setOption("strokeWidth", ensureColor(v));
    }

    set fill(v: boolean) {
        this.setOption("fill", ensureBoolean(v));
    }

    set fillColor(v: number) {
        this.setOption("fillColor", ensureColor(v));
    }

    set shadowBlur(v: number) {
        this.setOption("shadowBlur", ensureFloat(v));
    }

    set shadowColor(v: number) {
        this.setOption("shadowColor", ensureColor(v));
    }

    set shadowOffsetX(v: number) {
        this.setOption("shadowOffsetX", ensureFloat(v));
    }

    set shadowOffsetY(v: number) {
        this.setOption("shadowOffsetY", ensureFloat(v));
    }

    private updateDimensions(w: number, h: number) {
        this.options.w = w;
        this.options.h = h;
        this.updateRoundedRectangleTextureOptions();
    }

    private setOption<T extends keyof RoundRectOptions>(property: T, value: RoundRectOptions[T]) {
        this.options[property] = value;
        this.updateRoundedRectangleTextureOptions();
    }

    private updateRoundedRectangleTextureOptions() {
        this.roundRectTexture.options = this.options;
    }

    set onResize(v: ElementResizeEventCallback | undefined) {
        console.warn("You can't set onResize on a special-rectangle");
    }

    private handleResize(element: Element, w: number, h: number) {
        if (this.options) {
            this.updateDimensions(w, h);
        }
    }

    private handleTextureLoaded(element: Element, texture: Texture) {
        const renderInfo = texture.getSource()?.getRenderInfo();
        this.rectangleElement.x = -(renderInfo?.offsetX || 0);
        this.rectangleElement.y = -(renderInfo?.offsetY || 0);
    }
}