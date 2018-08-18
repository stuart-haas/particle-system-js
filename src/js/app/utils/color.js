import Type from '../utils/type';

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
}

export {Color as default}