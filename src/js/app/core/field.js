class Field{
    constructor(pos, mass) {
        this.pos = pos;
        this.setMass(mass);
    }

    setMass(mass) {
        this.mass = mass || 100;
        this.color = mass < 0 ? '#f00' : '#0f0';
    }
}

export {Field as default}