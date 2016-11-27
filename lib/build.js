var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define("types/Color", ["require", "exports"], function (require, exports) {
    "use strict";
    var Color = (function () {
        function Color(red, green, blue, alpha) {
            this.red = red;
            this.green = green;
            this.blue = blue;
            this.alpha = alpha;
        }
        return Color;
    }());
    exports.Color = Color;
});
define("types/Point", ["require", "exports"], function (require, exports) {
    "use strict";
    var Point = (function () {
        function Point(x, y) {
            this.x = x;
            this.y = y;
        }
        return Point;
    }());
    exports.Point = Point;
});
define("types/Size", ["require", "exports"], function (require, exports) {
    "use strict";
    var Size = (function () {
        function Size(width, height) {
            this.width = width;
            this.height = height;
        }
        return Size;
    }());
    exports.Size = Size;
});
define("types/Rect", ["require", "exports"], function (require, exports) {
    "use strict";
    var Rect = (function () {
        function Rect(point, size) {
            this.point = point;
            this.size = size;
        }
        return Rect;
    }());
    exports.Rect = Rect;
});
define("types/Shadow", ["require", "exports"], function (require, exports) {
    "use strict";
    var Shadow = (function () {
        function Shadow(offset, blurRadius, color) {
            this.offset = offset;
            this.blurRadius = blurRadius;
            this.color = color;
        }
        return Shadow;
    }());
    exports.Shadow = Shadow;
});
define("utils/Logger", ["require", "exports", "../bridge/utils"], function (require, exports, utils_1) {
    "use strict";
    var Logger = (function () {
        function Logger() {
        }
        // TODO: Look at how console.log is done
        // TODO: Rename to Log or create a standard Output class and have an Output for the console
        /// Prints text to the console with a new line.
        Logger.print = function (text) {
            this.output(text + "\n");
        };
        /// Outputs raw text to the console.
        Logger.output = function (text) {
            utils_1.QKLogger.output(text);
        };
        return Logger;
    }());
    exports.Logger = Logger;
});
define("ui/View", ["require", "exports", "bridge/UI", "utils/Logger"], function (require, exports, UI_1, Logger_1) {
    "use strict";
    var View = (function () {
        function View(view, save) {
            if (save === void 0) { save = false; }
            // Assign the proper view or create it
            if (view) {
                this.view = view;
            }
            else {
                this.view = new UI_1.QKView();
            }
            // Save the view if needed
            if (save) {
                this.saveJSView();
            }
        }
        /// This saves this view to the QKView.jsView
        View.prototype.saveJSView = function () {
            this.view.jsView = this;
        };
        Object.defineProperty(View.prototype, "rect", {
            /* Positioning */
            get: function () { return this.view.jsRect; },
            set: function (rect) { this.view.jsRect = rect; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(View.prototype, "superview", {
            /* View hierarchy */
            get: function () { return this.view.jsSuperview; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(View.prototype, "subviews", {
            get: function () { return this.view.jsSubviews; },
            enumerable: true,
            configurable: true
        });
        View.prototype.addSubview = function (view) { this.view.jsAddSubview(view); };
        View.prototype.removeFromSuperview = function () { this.view.jsRemoveFromSuperview(); };
        /* Events */
        /* Layout */
        /// Override point for subviews of a View.
        View.prototype.layout = function () {
            Logger_1.Logger.print("Layout " + this);
        };
        Object.defineProperty(View.prototype, "hidden", {
            /* Visibility */
            get: function () { return this.view.jsHidden; },
            set: function (newValue) { this.view.jsHidden = newValue; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(View.prototype, "backgroundColor", {
            /* Style */
            get: function () { return this.view.jsBackgroundColor; },
            set: function (newValue) { this.view.jsBackgroundColor = newValue; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(View.prototype, "alpha", {
            get: function () { return this.view.jsAlpha; },
            set: function (newValue) { this.view.jsAlpha = newValue; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(View.prototype, "shadow", {
            get: function () { return this.view.jsShadow; },
            set: function (newValue) { this.view.jsShadow = newValue; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(View.prototype, "cornerRadius", {
            get: function () { return this.view.jsCornerRadius; },
            set: function (newValue) { this.view.jsCornerRadius = newValue; },
            enumerable: true,
            configurable: true
        });
        return View;
    }());
    exports.View = View;
});
define("ui/Button", ["require", "exports", "../bridge/UI", "ui/View"], function (require, exports, UI_2, View_1) {
    "use strict";
    var Button = (function (_super) {
        __extends(Button, _super);
        function Button() {
            _super.call(this, new UI_2.QKButton(), true);
        }
        Object.defineProperty(Button.prototype, "button", {
            get: function () { return this.view; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Button.prototype, "title", {
            get: function () { return this.button.jsTitle; },
            set: function (newValue) { this.button.jsTitle = newValue; },
            enumerable: true,
            configurable: true
        });
        return Button;
    }(View_1.View));
    exports.Button = Button;
});
define("index", ["require", "exports", "types/Color", "types/Point", "types/Rect", "types/Shadow", "types/Size", "ui/View", "ui/Button", "utils/Logger"], function (require, exports, Color_1, Point_1, Rect_1, Shadow_1, Size_1, View_2, Button_1, Logger_2) {
    "use strict";
    // Types
    exports.Color = Color_1.Color;
    exports.Point = Point_1.Point;
    exports.Rect = Rect_1.Rect;
    exports.Shadow = Shadow_1.Shadow;
    exports.Size = Size_1.Size;
    // UI
    exports.View = View_2.View;
    exports.Button = Button_1.Button;
    // Utils
    exports.Logger = Logger_2.Logger;
});
//# sourceMappingURL=build.js.map