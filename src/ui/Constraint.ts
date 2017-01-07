import AutoLayout = require("autolayout");
import {View} from "./views/View";
import {Logger} from "../core/Logger";
import { Cloneable } from "../utils/Cloneable";

function autoLayoutToQuarkAttribute(attribute: AutoLayout.AttributeValue): Constraint.Attribute {
    switch (attribute) {
        case "const":
            return Constraint.Attribute.Constant;
        case "var":
            return Constraint.Attribute.Variable;
        case "left":
            return Constraint.Attribute.Left;
        case "right":
            return Constraint.Attribute.Right;
        case "top":
            return Constraint.Attribute.Top;
        case "bottom":
            return Constraint.Attribute.Bottom;
        case "width":
            return Constraint.Attribute.Width;
        case "height":
            return Constraint.Attribute.Height;
        case "centerX":
            return Constraint.Attribute.CenterX;
        case "centerY":
            return Constraint.Attribute.CenterY;
        case "zIndex":
            return Constraint.Attribute.ZIndex;
        default:
            return Constraint.Attribute.Variable;
    }
}

function autoLayoutToQuarkRelation(relation: AutoLayout.RelationValue): Constraint.Relation {
    switch (relation) {
        case "leq":
            return Constraint.Relation.LessThan;
        case "equ":
            return Constraint.Relation.Equal;
        case "geq":
            return Constraint.Relation.GreaterThan;
        default:
            return Constraint.Relation.Equal;
    }
}

function quarkToAutoLayoutAttribute(attribute: Constraint.Attribute): AutoLayout.AttributeValue {
    switch (attribute) {
        case Constraint.Attribute.Constant:
            return "const";
        case Constraint.Attribute.Variable:
            return "var";
        case Constraint.Attribute.Left:
            return "left";
        case Constraint.Attribute.Right:
            return "right";
        case Constraint.Attribute.Top:
            return "top";
        case Constraint.Attribute.Bottom:
            return "bottom";
        case Constraint.Attribute.Width:
            return "width";
        case Constraint.Attribute.Height:
            return "height";
        case Constraint.Attribute.CenterX:
            return "centerX";
        case Constraint.Attribute.CenterY:
            return "centerY";
        case Constraint.Attribute.ZIndex:
            return "zIndex";
    }
}

function quarkToAutoLayoutRelation(relation: Constraint.Relation): AutoLayout.RelationValue {
    switch (relation) {
        case Constraint.Relation.LessThan:
            return "leq";
        case Constraint.Relation.Equal:
            return "equ";
        case Constraint.Relation.GreaterThan:
            return "geq";
    }
}

export class Constraint implements Cloneable {
    public constructor( // Undefined `view` means the superview. `view` can also be a string which means something special.
        public readonly view1: View | string | undefined,
        public readonly attribute1: Constraint.Attribute,
        public readonly relation: Constraint.Relation,
        public readonly view2: View | string | undefined,
        public readonly attribute2: Constraint.Attribute,
        public multiplier: number,
        public constant: number,
        public priority: number
    ) {

    }

    public static fromAutoLayoutConstraint(constraint: AutoLayout.Constraint, view1?: View | string, view2?: View | string): Constraint {
        return new Constraint(
            view1,
            autoLayoutToQuarkAttribute(constraint.attr1),
            autoLayoutToQuarkRelation(constraint.relation),
            view2,
            autoLayoutToQuarkAttribute(constraint.attr2),
            constraint.multiplier,
            constraint.constant,
            constraint.priority
        )
    }

    public static fromVFL(vfl: string | string[], views: { [name: string]: View }) {
        return AutoLayout.VisualFormat.parse(vfl, { extended: true }) // Parse the VFL
            .map(constraint => { // Convert to `Constraint`
                // Lookup the views from the view names
                let view1: View | string | undefined = constraint.view1 ? views[constraint.view1] : undefined;
                let view2: View | string | undefined = constraint.view2 ? views[constraint.view2] : undefined;

                // If there are no views, set to literal string values defined in the constraint
                view1 = view1 ? view1 : constraint.view1;
                view2 = view2 ? view2 : constraint.view2;

                // Create the constraint if the views exists
                return Constraint.fromAutoLayoutConstraint(constraint, view1, view2);
            });
    }

    public toAutoLayoutConstraint(): AutoLayout.Constraint {
        return {
            view1: this.view1 instanceof View ? this.view1.uuid : this.view1,
            attr1: quarkToAutoLayoutAttribute(this.attribute1),
            relation: quarkToAutoLayoutRelation(this.relation),
            view2: this.view2 instanceof View ? this.view2.uuid : this.view2,
            attr2: quarkToAutoLayoutAttribute(this.attribute2),
            multiplier: this.multiplier,
            constant: this.constant,
            priority: this.priority
        }
    }

    public clone(): Constraint {
        return new Constraint(
            this.view1, this.attribute1, this.relation,
            this.view2, this.attribute2,
            this.multiplier, this.constant, this.priority
        );
    }
}

export namespace Constraint {
    export enum Attribute {
        Constant, Variable, Left, Right, Top, Bottom, Width, Height, CenterX, CenterY, ZIndex
    }

    export enum Relation {
        LessThan, Equal, GreaterThan
    }
}
