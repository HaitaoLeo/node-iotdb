/*
 *  color.js
 *
 *  David Janes
 *  IOTDB.org
 *  2014-01-05
 *
 *  Helper functions for colors. We
 *  need this so often, we might as well
 *  make it part of the library
 *
 *  A lot of code is from here:
 *  http://stackoverflow.com/a/9493060/96338
 *
 *  Copyright [2013-2014] [David P. Janes]
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

"use strict";

var Color = function (value) {
    var self = this;

    var r = 0;
    var g = 0;
    var b = 0;

    var h = 0;
    var s = 0;
    var l = 0;

    if (value !== undefined) {
        self.parseColor(value);
    }
};

Color.prototype.parseColor = function (value) {
    var self = this;
    var match;

    if (!value) {
        console.trace();
        return self;
    }

    match = value.match(/^#?([0-9A-Za-z]{2})([0-9A-Za-z]{2})([0-9A-Za-z]{2})$/);
    if (match) {
        self.set_rgb_255(parseInt(match[1], 16), parseInt(match[2], 16), parseInt(match[3], 16));
        return self;
    }

    match = value.match(/^hsl\(([.\d]+),([.\d]+),([.\d]+)\);*$/);
    if (match) {
        self.set_hsl(parseFloat(match[1]), parseFloat(match[2]), parseFloat(match[3]));
        return self;
    }

    match = value.match(/^rgb\(([\d]+),([\d]+),([\d]+)\);*$/);
    if (match) {
        self.set_rgb_255(parseInt(match[1]), parseInt(match[2]), parseInt(match[3]));
        return self;
    }

    return self;
};

Color.prototype.set_rgb_1 = function (r, g, b) {
    var self = this;

    if (r !== undefined) {
        self.r = r;
    }
    if (g !== undefined) {
        self.g = g;
    }
    if (b !== undefined) {
        self.b = b;
    }
    self._rgb_to_hsl();

    return self;
};

Color.prototype.set_rgb_255 = function (r, g, b) {
    var self = this;


    if (r !== undefined) {
        self.r = r / 255.0;
    }
    if (g !== undefined) {
        self.g = g / 255.0;
    }
    if (b !== undefined) {
        self.b = b / 255.0;
    }

    self._rgb_to_hsl();

    return self;
};

Color.prototype.set_hsl = function (h, s, l) {
    var self = this;

    if (h !== undefined) {
        self.h = h;
    }
    if (s !== undefined) {
        self.s = s;
    }
    if (l !== undefined) {
        self.l = l;
    }
    self._hsl_to_rgb();

    return self;
};

Color.prototype.get_hex = function () {
    var self = this;

    var r = Math.floor(self.r * 255);
    var g = Math.floor(self.g * 255);
    var b = Math.floor(self.b * 255);

    var r$ = r.toString(16);
    if (r$.length === 1) {
        r$ = "0" + r$;
    }
    var g$ = g.toString(16);
    if (g$.length === 1) {
        g$ = "0" + g$;
    }
    var b$ = b.toString(16);
    if (b$.length === 1) {
        b$ = "0" + b$;
    }

    return "#" + r$ + g$ + b$;
};

Color.prototype.get_rgb = function () {
    var self = this;

    return "rgb(" + self.r + "," + self.g + "," + self.b + ")";
};

Color.prototype.get_hsl = function () {
    var self = this;

    return "hsl(" + self.h + "," + self.s + "," + self.l + ")";
};

var _hue2rgb = function (p, q, t) {
    if (t < 0) {
        t += 1;
    }
    if (t > 1) {
        t -= 1;
    }
    if (t < 1 / 6) {
        return p + (q - p) * 6 * t;
    }
    if (t < 1 / 2) {
        return q;
    }
    if (t < 2 / 3) {
        return p + (q - p) * (2 / 3 - t) * 6;
    }
    return p;
};

Color.prototype._hsl_to_rgb = function () {
    var self = this;

    var h = self.h;
    var s = self.s;
    var l = self.l;
    var r, g, b;

    if (s === 0) {
        r = g = b = l; // achromatic
    } else {

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = _hue2rgb(p, q, h + 1 / 3);
        g = _hue2rgb(p, q, h);
        b = _hue2rgb(p, q, h - 1 / 3);
    }

    self.r = r;
    self.g = g;
    self.b = b;
};

Color.prototype._rgb_to_hsl = function () {
    var self = this;

    var r = self.r;
    var g = self.g;
    var b = self.b;
    var max = Math.max(r, g, b),
        min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0; // achromatic
    } else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
        case r:
            h = (g - b) / d + (g < b ? 6 : 0);
            break;
        case g:
            h = (b - r) / d + 2;
            break;
        case b:
            h = (r - g) / d + 4;
            break;
        }
        h /= 6;
    }

    self.h = h;
    self.s = s;
    self.l = l;
};

/*
var color = new Color("#FF0000");
console.log("rgb=" + color.get_rgb());
console.log("hsl=" + color.get_hsl());
console.log("hex=" + color.get_hex());

color.set_hsl(undefined, undefined, 1);
console.log("rgb=" + color.get_rgb());
console.log("hsl=" + color.get_hsl());
console.log("hex=" + color.get_hex());



rgb_to_hex = function(rgb) {
}

var color = "#FF0000"
var rgb = hex_to_rgb(color)
var hsl = rgb_to_hsl(rgb)
console.log(color, rgb, hsl)
hsl[2] = 1
var rgb_1 = hsl_to_rgb(hsl)
console.log(color, rgb_1, hsl)
*/

exports.Color = Color;


/*
 *  From:
 *  http://stackoverflow.com/a/1573141/96338
 */
var colord = {
    "aliceblue": "#f0f8ff",
    "antiquewhite": "#faebd7",
    "aqua": "#00ffff",
    "aquamarine": "#7fffd4",
    "azure": "#f0ffff",
    "beige": "#f5f5dc",
    "bisque": "#ffe4c4",
    "black": "#000000",
    "blanchedalmond": "#ffebcd",
    "blue": "#0000ff",
    "blueviolet": "#8a2be2",
    "brown": "#a52a2a",
    "burlywood": "#deb887",
    "cadetblue": "#5f9ea0",
    "chartreuse": "#7fff00",
    "chocolate": "#d2691e",
    "coral": "#ff7f50",
    "cornflowerblue": "#6495ed",
    "cornsilk": "#fff8dc",
    "crimson": "#dc143c",
    "cyan": "#00ffff",
    "darkblue": "#00008b",
    "darkcyan": "#008b8b",
    "darkgoldenrod": "#b8860b",
    "darkgray": "#a9a9a9",
    "darkgreen": "#006400",
    "darkkhaki": "#bdb76b",
    "darkmagenta": "#8b008b",
    "darkolivegreen": "#556b2f",
    "darkorange": "#ff8c00",
    "darkorchid": "#9932cc",
    "darkred": "#8b0000",
    "darksalmon": "#e9967a",
    "darkseagreen": "#8fbc8f",
    "darkslateblue": "#483d8b",
    "darkslategray": "#2f4f4f",
    "darkturquoise": "#00ced1",
    "darkviolet": "#9400d3",
    "deeppink": "#ff1493",
    "deepskyblue": "#00bfff",
    "dimgray": "#696969",
    "dodgerblue": "#1e90ff",
    "firebrick": "#b22222",
    "floralwhite": "#fffaf0",
    "forestgreen": "#228b22",
    "fuchsia": "#ff00ff",
    "gainsboro": "#dcdcdc",
    "ghostwhite": "#f8f8ff",
    "gold": "#ffd700",
    "goldenrod": "#daa520",
    "gray": "#808080",
    "green": "#008000",
    "greenyellow": "#adff2f",
    "honeydew": "#f0fff0",
    "hotpink": "#ff69b4",
    "indianred ": "#cd5c5c",
    "indigo ": "#4b0082",
    "ivory": "#fffff0",
    "khaki": "#f0e68c",
    "lavender": "#e6e6fa",
    "lavenderblush": "#fff0f5",
    "lawngreen": "#7cfc00",
    "lemonchiffon": "#fffacd",
    "lightblue": "#add8e6",
    "lightcoral": "#f08080",
    "lightcyan": "#e0ffff",
    "lightgoldenrodyellow": "#fafad2",
    "lightgrey": "#d3d3d3",
    "lightgreen": "#90ee90",
    "lightpink": "#ffb6c1",
    "lightsalmon": "#ffa07a",
    "lightseagreen": "#20b2aa",
    "lightskyblue": "#87cefa",
    "lightslategray": "#778899",
    "lightsteelblue": "#b0c4de",
    "lightyellow": "#ffffe0",
    "lime": "#00ff00",
    "limegreen": "#32cd32",
    "linen": "#faf0e6",
    "magenta": "#ff00ff",
    "maroon": "#800000",
    "mediumaquamarine": "#66cdaa",
    "mediumblue": "#0000cd",
    "mediumorchid": "#ba55d3",
    "mediumpurple": "#9370d8",
    "mediumseagreen": "#3cb371",
    "mediumslateblue": "#7b68ee",
    "mediumspringgreen": "#00fa9a",
    "mediumturquoise": "#48d1cc",
    "mediumvioletred": "#c71585",
    "midnightblue": "#191970",
    "mintcream": "#f5fffa",
    "mistyrose": "#ffe4e1",
    "moccasin": "#ffe4b5",
    "navajowhite": "#ffdead",
    "navy": "#000080",
    "oldlace": "#fdf5e6",
    "olive": "#808000",
    "olivedrab": "#6b8e23",
    "orange": "#ffa500",
    "orangered": "#ff4500",
    "orchid": "#da70d6",
    "palegoldenrod": "#eee8aa",
    "palegreen": "#98fb98",
    "paleturquoise": "#afeeee",
    "palevioletred": "#d87093",
    "papayawhip": "#ffefd5",
    "peachpuff": "#ffdab9",
    "peru": "#cd853f",
    "pink": "#ffc0cb",
    "plum": "#dda0dd",
    "powderblue": "#b0e0e6",
    "purple": "#800080",
    "red": "#ff0000",
    "rosybrown": "#bc8f8f",
    "royalblue": "#4169e1",
    "saddlebrown": "#8b4513",
    "salmon": "#fa8072",
    "sandybrown": "#f4a460",
    "seagreen": "#2e8b57",
    "seashell": "#fff5ee",
    "sienna": "#a0522d",
    "silver": "#c0c0c0",
    "skyblue": "#87ceeb",
    "slateblue": "#6a5acd",
    "slategray": "#708090",
    "snow": "#fffafa",
    "springgreen": "#00ff7f",
    "steelblue": "#4682b4",
    "tan": "#d2b48c",
    "teal": "#008080",
    "thistle": "#d8bfd8",
    "tomato": "#ff6347",
    "turquoise": "#40e0d0",
    "violet": "#ee82ee",
    "wheat": "#f5deb3",
    "white": "#ffffff",
    "whitesmoke": "#f5f5f5",
    "yellow": "#ffff00",
    "yellowgreen": "#9acd32"
};

var color_to_hex = function (name, otherwise) {
    name = name.toLowerCase();

    var hex = colord[name];
    if (hex !== undefined) {
        return hex.toUpperCase();
    } else {
        return otherwise;
    }
};

exports.color = {
    color_to_hex: color_to_hex,
    colord: colord,
};
