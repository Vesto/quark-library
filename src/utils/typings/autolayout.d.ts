declare namespace AutoLayout {
    type SpacingConfigurations =
        number | // Single spacing
        [number, number] | // Horizontal, vertical
        [number, number, number] | // Horizontal, vertical, zIndex
        [number, number, number, number, number, number] | // Top, right, bottom, left, width, height
        [number, number, number, number, number, number, number] // Top, right, bottom, left, width, height, zIndex

    interface ViewOptions {
        width?: number;
        height?: number;
        spacing?: SpacingConfigurations;
        constraints?: Constraint[];
    }

    class View {
        public constructor(options?: ViewOptions);

        public setSize(width: number, height: number): View;
        public readonly width: number;
        public readonly height: number;
        public readonly fittingWidth: number;
        public readonly fittingHeight: number;
        public setSpacing(spacing: SpacingConfigurations): View;
        public addConstraint(constraint: Constraint): View;
        public addConstraints(constraints: Constraint[]): View;
        public readonly subViews: { [name: string]: SubView }
    }

    type AttributeValue = "const" | "var" | "left" | "right" | "top" | "bottom" | "width" | "height" | "centerX" | "centerY" | "zIndex";
    let Attribute: {
        CONST: string,
        NOTANATTRIBUTE: string,
        VARIABLE: string,
        LEFT: string,
        RIGHT: string,
        TOP: string,
        BOTTOM: string,
        WIDTH: string,
        HEIGHT: string,
        CENTERX: string,
        CENTERY: string,
        ZINDEX: string
    };

    type RelationValue = "leq" | "equ" | "geq";
    let Relation: {
        LEQ: string,
        EQU: string,
        GEQ: string
    };

    let Priority: {
        REQUIRED: number,
        DEFAULTHIGH: number,
        DEFAULTLOW: number
    };

    class SubView {
        readonly name: string;
        readonly left: number;
        readonly right: number;
        readonly width: number;
        readonly height: number;
        readonly intrinsicWidth: number;
        readonly intrinsicHeight: number;
        readonly top: number;
        readonly bottom: number;
        readonly centerX: number;
        readonly centerY: number;
        readonly zIndex: number;
        readonly type: string;
        getVavlue(attr: AttributeValue): number | undefined;
    }

    interface Constraint {
        view1?: string;
        attr1: AttributeValue;
        relation: RelationValue;
        view2?: string;
        attr2: AttributeValue;
        multiplier: number;
        constant: number;
        priority: number; // 0..1000
    }

    interface VisualFormatParseLineOptions {
        extended?: boolean;
        outFormat?: "constraints" | "raw";
        lineIndex?: number;
    }

    interface VisualFormatParseOptions extends VisualFormatParseLineOptions {
        strict?: boolean;
        lineSeperator?: string;
    }

    interface VisualFormatParseMetaOptions {
        lineSeperator?: string;
        prefix?: string;
    }

    class VisualFormat {
        static parseLine(visualFormat: string, options?: VisualFormatParseLineOptions): Constraint[];
        static parse(visualFormat: string | string[], options?: VisualFormatParseOptions): Constraint[];
        static parseMetaInfo(visualFormat: string | string[], options?: VisualFormatParseMetaOptions): any;
    }
}

declare module "autolayout" {
    export = AutoLayout;
}
