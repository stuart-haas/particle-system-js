import Type from '../utils/type';
import Vector from '../math/vector';
import Particle from '../core/particle';
import ColorTransition from '../animate/colorTransition';

class Emitter {
    constructor(type, pos, vel, spread, max, rate, damp, mass, size, color) {
        this.particles = [];
        this.fields = [];
        this.type = type;
        this.pos = pos;
        this.vel = vel;
        this.spread = spread || Math.PI / 32;
        this.max = max || 10000;
        this.rate = rate || 10;
        this.damp = damp || 0.98;
        this.mass = mass || 100;
        this.size = size || 1;
        this.color = color || '#000ffc';
        this.drawSize = 3;
        this.drawColor = type == 'point' ? '#999' : 'area' ? 'transparent' : null;
        this.drawFields = false;
        this.transition = null;
    }

    addField(field) {
        this.fields.push(field);
    }

    animateColor(fps, duration) {
        this.transition = new ColorTransition(fps, duration);
        this.transition.startTransition();
    }

    addParticles() {
        if(this.particles.length > this.max) return;
        for(let i = 0; i < this.rate; i ++) {
            this.particles.push(this.getParticle());
        }
    }

    getParticle() {
        let angle = this.vel.getAngle() + this.spread - (Math.random() * this.spread * 2);
        let magnitude = this.vel.getMagnitude();
        let pos = this.type == 'point' ? new Vector(this.pos.x, this.pos.y) : 'area' ? new Vector(Math.random() * this.pos.x, Math.random() * this.pos.y) : new Vector();
        let vel = Vector.fromAngle(angle, magnitude);
        return new Particle(pos, vel, null, this.damp, this.mass, this.size, this.color);
    }

    update(bx, by, mx, my, mass) {
        this.mx = mx || null;
        this.my = my || null;
        
        let currentParticles = [];

        for(let i = 0; i < this.particles.length; i ++) {
            let particle = this.particles[i];
            let pos = particle.pos;

            if(pos.x < 0 || pos.x > bx || pos.y < 0 || pos.y > by) continue;

            particle.update();

            if(this.mx && this.my)
                particle.addForce(new Vector(this.mx, this.my), mass);

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
            if(this.transition)
                particle.render(ctx, this.transition.globalColor);
            else
                particle.render(ctx);
        }

        if(this.drawFields) {
            for(let j = 0; j < this.fields.length; j ++) {
                let field = this.fields[j];
                Shape.circle(this.ctx, field.pos, field.drawSize, field.drawColor);
            }
        }
    }

    static get TYPE() {
        return Type;
    }
}

export {Emitter as default}