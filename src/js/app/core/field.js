class Field{
    constructor(pos, mass) {
        this.pos = pos || new vector();
        this.setMass(mass);
        this.drawSize = 3;
    }

    setMass(mass) {
        this.mass = mass || 100;
        this.drawColor = mass < 0 ? '#f00' : '#0f0';
    }
}

export {Field as default}