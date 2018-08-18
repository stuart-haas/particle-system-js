import Color from '../utils/color';

class ColorTransition {
    constructor(fps, duration) {
        this.fps = fps || 30;
        this.duration = duration || 1;
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

    startTransition() {
        clearInterval(this.transition);
        
        this.currentColor = this.currentColor || Color.generateRGB();
        this.targetColor = Color.generateRGB();
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
        this.globalColor = Color.rgb2hex(this.currentColor);
        
        // transition ended. start a new one
        if (this.increment[0] == 0 && this.increment[1] == 0 && this.increment[2] == 0) {
            this.startTransition();
        }
    }
}

export {ColorTransition as default}