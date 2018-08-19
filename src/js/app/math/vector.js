class Vector{
    constructor(x, y) {
        this.x = x || 0;
        this.y = y || 0;
    }

    add(vector) {
        this.x += vector.x;
        this.y += vector.y;
    }

    multiply(value) {
        return new Vector(this.x *= value, this.y *= value);
    }

    divide(value) {
        return new Vector(this.x /= value, this.y /= value);
    }
    
    getMagnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    getAngle() {
        return Math.atan2(this.y, this.x);
    }

    static fromAngle(angle, magnitude) {
        return new Vector(magnitude * Math.cos(angle), magnitude * Math.sin(angle));
    }
}

export {Vector as default}