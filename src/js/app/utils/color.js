import Type from '../utils/type';
import Math2 from '../math/math2';

class Color {

    static get TYPE() {
        return Type;
    }

    static get RANDOM() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    static generateRGB(min, max) {
        var min		= min || 0;
        var max		= min || 255;
        var color	= [];
        for (var i = 0; i < 3; i++) {
            var num = Math2.random(min, max);
            color.push(num);
        }
        return color;
    }

    static rgb2hex(colorArray) {
        var color = [];
        for (var i = 0; i < colorArray.length; i++) {
            var hex = colorArray[i].toString(16);
            if (hex.length < 2) { hex = "0" + hex; }
            color.push(hex);
        }
        return "#" + color.join("");
    }
}

export {Color as default}