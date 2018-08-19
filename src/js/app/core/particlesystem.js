import Shape from '../draw/shape';

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
        this.interaction = false;
        this.interactionMass = 100;
    }

    mouseMoveHandler(e) {
        this.mx = e.clientX;
        this.my = e.clientY;
    }

    addEmitter(emitter) {
        this.emitters.push(emitter);
    }

    getEmitter(index) {
        return this.emitters[index];
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
            emitter.render(this.ctx);
            if(this.drawEmitters)
                Shape.circle(this.ctx, emitter.pos, emitter.drawSize, emitter.drawColor);
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