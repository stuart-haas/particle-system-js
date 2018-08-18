import Shape from '../draw/shape';
import ColorTransition from '../animate/colorTransition';

class ParticleSystem {
    constructor() {
        this.canvas = document.querySelector('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.emitters = [];
        this.mx = 0;
        this.my = 0;
        this.drawEmitters = false;
        this.drawFields = false;
        this.interaction = false;
        this.interactionMass = 100;
    }

    animateColor(fps, duration) {
        this.transition = new ColorTransition(fps, duration);
        this.transition.startTransition();
    }

    mouseMoveHandler(e) {
        this.mx = e.clientX;
        this.my = e.clientY;
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
            if(this.interaction)
                emitter.update(this.canvas.width, this.canvas.height, this.mx, this.my, this.interactionMass);
            else 
                emitter.update(this.canvas.width, this.canvas.height);
        }
    }
  
    render() {
        for(let i = 0; i < this.emitters.length; i ++) {
            let emitter = this.emitters[i];
            emitter.render(this.ctx, this.transition.globalColor);
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

    set allowInteraction(value) {
        this.interaction = value;
        if(this.interaction)
            document.onmousemove = this.mouseMoveHandler.bind(this);
    }
}

export {ParticleSystem as default}