import Type from '../utils/type';
import Vector from '../math/vector';
import Particle from '../core/particle';

class Emitter {
    constructor(type, pos, vel, spread, max, rate, damp, mass, size, color) {
        this.particles = [];
        this.fields = [];
        this.type = type;
        this.pos = pos;
        this.vel = vel;
        this.spread = spread || Math.PI / 32;
        this.max = max || 10000;
        this.rate = rate || 20;
        this.damp = damp || 0.98;
        this.mass = mass || 500;
        this.size = size || 1;
        this.color = color || '#000ffc';
        this.drawSize = 3;
        this.drawColor = type == 'point' ? '#999' : 'area' ? 'transparent' : null;
    }

    add() {
        if(this.particles.length > this.max) return;
        for(let i = 0; i < this.rate; i ++) {
            this.particles.push(this.get());
        }
    }

    get() {
        let angle = this.vel.getAngle() + this.spread - (Math.random() * this.spread * 2);
        let magnitude = this.vel.getMagnitude();
        let pos = this.type == 'point' ? new Vector(this.pos.x, this.pos.y) : 'area' ? new Vector(Math.random() * this.pos.x, Math.random() * this.pos.y) : new Vector();
        let vel = Vector.fromAngle(angle, magnitude);
        return new Particle(pos, vel, null, this.damp, this.mass, this.size, this.color);
    }

    update(bx, by) {
        let currentParticles = [];

        for(let i = 0; i < this.particles.length; i ++) {
            let particle = this.particles[i];
            let pos = particle.pos;

            if(pos.x < 0 || pos.x > bx || pos.y < 0 || pos.y > by) continue;

            particle.update();

            for(let j = 0; j < this.fields.length; j ++) {
                let field = this.fields[j];
                particle.addForce(field.pos, field.mass);
            }

            currentParticles.push(particle);
        }
        this.particles = currentParticles;
    }

    render(ctx) {

        for(let i = 0; i < this.particles.length; i ++) {  
            let particle = this.particles[i];
            particle.render(ctx);
        }
    }

    static get TYPE() {
        return Type;
    }
}

export {Emitter as default}