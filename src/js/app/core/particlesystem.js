class ParticleSystem {
    constructor() {
        this.mx = 0;
        this.my = 0;
        this.emitters = [];
        this.fields = [];
        this.canvas = document.querySelector('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
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
        }
    }
  
    queue() {
        window.requestAnimationFrame(this.start.bind(this));
    }
}

export {ParticleSystem as default}