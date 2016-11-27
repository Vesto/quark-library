declare module "types/Color" {
    export class Color {
        red: number;
        green: number;
        blue: number;
        alpha: number;
        constructor(red: number, green: number, blue: number, alpha: number);
    }
}
declare module "types/Point" {
    export class Point {
        x: number;
        y: number;
        constructor(x: number, y: number);
    }
}
declare module "types/Size" {
    export class Size {
        width: number;
        height: number;
        constructor(width: number, height: number);
    }
}
declare module "types/Rect" {
    import { Point } from "types/Point";
    import { Size } from "types/Size";
    export class Rect {
        point: Point;
        size: Size;
        constructor(point: Point, size: Size);
    }
}
declare module "types/Shadow" {
    import { Color } from "types/Color";
    import { Point } from "types/Point";
    export class Shadow {
        offset: Point;
        blurRadius: number;
        color: Color;
        constructor(offset: Point, blurRadius: number, color: Color);
    }
}
declare module "utils/Logger" {
    export class Logger {
        static print(text: string): void;
        static output(text: string): void;
    }
}
declare module "ui/View" {
    import { Color } from "types/Color";
    import { Rect } from "types/Rect";
    import { Shadow } from "types/Shadow";
    import { QKView } from "bridge/UI";
    export class View {
        protected view: QKView;
        constructor(view?: QKView, save?: boolean);
        protected saveJSView(): void;
        rect: Rect;
        readonly superview: View | undefined;
        readonly subviews: View[];
        addSubview(view: View): void;
        removeFromSuperview(): void;
        layout(): void;
        hidden: boolean;
        backgroundColor: Color;
        alpha: number;
        shadow: Shadow;
        cornerRadius: number;
    }
}
declare module "ui/Button" {
    import { QKButton } from "../bridge/UI";
    import { View } from "ui/View";
    export class Button extends View {
        protected readonly button: QKButton;
        constructor();
        title: string;
    }
}
declare module "index" {
    export { Color } from "types/Color";
    export { Point } from "types/Point";
    export { Rect } from "types/Rect";
    export { Shadow } from "types/Shadow";
    export { Size } from "types/Size";
    export { View } from "ui/View";
    export { Button } from "ui/Button";
    export { Logger } from "utils/Logger";
}
