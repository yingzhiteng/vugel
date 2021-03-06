import { Base } from "./Base";

export class TextNode extends Base {
    public readonly text: string;

    constructor(text: string) {
        super(undefined);
        this.text = text;
    }
}
