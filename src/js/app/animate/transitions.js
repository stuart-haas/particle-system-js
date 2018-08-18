class Transition {
    constructor(fps, duration) {
        this.fps = fps || 30;
        this.duration = duration || 1;
        this.transHandler = null;
        this.color = null;
    }

    // A function to generate random numbers.
    // Will be needed to generate random RGB value between 0-255.
    random() {
        if (arguments.length > 2) {
            return 0;
        }
        switch (arguments.length) {
            case 0:
                return Math.random();
            case 1:
                return Math.round(Math.random() * arguments[0]);
            case 2:
                var min = arguments[0];
                var max = arguments[1];
                return Math.round(Math.random() * (max - min) + min);
        }
    }

    // Generates a random RGB value.
    generateRGB(min, max) {
        var min		= min || 0;
        var max		= min || 255;
        var color	= [];
        for (var i = 0; i < 3; i++) {
            var num = this.random(min, max);
            color.push(num);
        }
        return color;
    }

    // Calculates the distance between the RGB values.
    // We need to know the distance between two colors
    // so that we can calculate the increment values for R, G, and B.
    calculateDistance(colorArray1, colorArray2) {
        var distance = [];
        for (var i = 0; i < colorArray1.length; i++) {
            distance.push(Math.abs(colorArray1[i] - colorArray2[i]));
        }
        return distance;
    }

    // Calculates the increment values for R, G, and B using distance, fps, and duration.
    // This calculation can be made in many different ways.
    calculateIncrement(distanceArray, fps, duration) {
        var fps			= fps;
        var duration	= duration;
        var increment	= [];
        for (var i = 0; i < distanceArray.length; i++) {
            var incr = Math.abs(Math.floor(distanceArray[i] / (fps * duration)));
            if (incr == 0) {
                incr = 1;
            }
            increment.push(incr);
        }
        return increment;
    }

    // Converts RGB array [32,64,128] to HEX string #204080
    // It's easier to apply HEX color than RGB color.
    rgb2hex(colorArray) {
        var color = [];
        for (var i = 0; i < colorArray.length; i++) {
            var hex = colorArray[i].toString(16);
            if (hex.length < 2) { hex = "0" + hex; }
            color.push(hex);
        }
        return "#" + color.join("");
    }

    startTransition() {
        clearInterval(this.transHandler);
        
        this.currentColor = this.currentColor == null ? this.generateRGB() : this.currentColor;
        this.targetColor = this.generateRGB();
        this.distance = this.calculateDistance(this.currentColor, this.targetColor);
        this.increment = this.calculateIncrement(this.distance, this.fps, this.duration);
        
        setInterval(this.transition.bind(this), 1000/this.fps);
    }

    transition() {
        // checking R
        if (this.currentColor[0] > this.targetColor[0]) {
            this.currentColor[0] -= this.increment[0];
            if (this.currentColor[0] <= this.targetColor[0]) {
                this.increment[0] = 0;
            }
        } else {
            this.currentColor[0] += this.increment[0];
            if (this.currentColor[0] >= this.targetColor[0]) {
                this.increment[0] = 0;
            }
        }
        
        // checking G
        if (this.currentColor[1] > this.targetColor[1]) {
            this.currentColor[1] -= this.increment[1];
            if (this.currentColor[1] <= this.targetColor[1]) {
                this.increment[1] = 0;
            }
        } else {
            this.currentColor[1] += this.increment[1];
            if (this.currentColor[1] >= this.targetColor[1]) {
                this.increment[1] = 0;
            }
        }
        
        // checking B
        if (this.currentColor[2] > this.targetColor[2]) {
            this.currentColor[2] -= this.increment[2];
            if (this.currentColor[2] <= this.targetColor[2]) {
                this.increment[2] = 0;
            }
        } else {
            this.currentColor[2] += this.increment[2];
            if (this.currentColor[2] >= this.targetColor[2]) {
                this.increment[2] = 0;
            }
        }
        
        // applying the new modified color
        this.color = this.rgb2hex(this.currentColor);
        
        // transition ended. start a new one
        if (this.increment[0] == 0 && this.increment[1] == 0 && this.increment[2] == 0) {
            this.startTransition();
        }
    }
}

export {Transition as default}