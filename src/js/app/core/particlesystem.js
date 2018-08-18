import Shape from '../draw/shape';

class ParticleSystem {
    constructor() {
        this.mx = 0;
        this.my = 0;
        this.emitters = [];
        this.canvas = document.querySelector('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.drawEmitters = false;
        this.drawFields = false;
    }

    addEmitter(emitter) {
        this.emitters.push(emitter);
    }

    addField(field) {
        for(let i = 0; i < this.emitters.length; i ++) {
            let emitter = this.emitters[i];
            emitter.fields.push(field);
        }
    }

    start() {
        this.clear();
        this.update();
        this.render();
        this.queue();
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  
    update () {
        for(let i = 0; i < this.emitters.length; i ++) {
            let emitter = this.emitters[i];
            emitter.add();
            emitter.update(this.canvas.width, this.canvas.height);
        }
    }
  
    render() {
        for(let i = 0; i < this.emitters.length; i ++) {
            let emitter = this.emitters[i];
            emitter.render(this.ctx);
            if(this.drawEmitters)
                Shape.circle(this.ctx, emitter.pos, emitter.drawSize, emitter.drawColor);

            if(this.drawFields) {
                for(let j = 0; j < emitter.fields.length; j ++) {
                    let field = emitter.fields[j];
                    Shape.circle(this.ctx, field.pos, field.drawSize, field.drawColor);
                }
            }
        }
    }
  
    queue() {
        window.requestAnimationFrame(this.start.bind(this));
    }
}

export {ParticleSystem as default}