import Vector from './math/vector';
import Emitter from './core/emitter';
import Field from './core/field';
import ParticleSystem from './core/particleSystem';

let particlesystem = new ParticleSystem();

particlesystem.addEmitter(new Emitter(Emitter.TYPE.AREA, new Vector(particlesystem.canvas.width, particlesystem.canvas.height), new Vector(Math.random() * 1, Math.random() * 1), 1, 5000, 20));
particlesystem.addEmitter(new Emitter(Emitter.TYPE.AREA, new Vector(particlesystem.canvas.width, particlesystem.canvas.height), new Vector(Math.random() * 1, Math.random() * 1), 1, 5000, 20));

particlesystem.getEmitter(0).addField(new Field(new Vector(200, 400), -500));
particlesystem.getEmitter(0).addField(new Field(new Vector(800, 400), 500));

particlesystem.getEmitter(1).addField(new Field(new Vector(400, 800), -500));
particlesystem.getEmitter(1).addField(new Field(new Vector(800, 600), 500));

particlesystem.getEmitter(0).animateColor(30, 180);
particlesystem.getEmitter(1).animateColor(30, 180);

particlesystem.allowInteraction = true;
particlesystem.interactionMass = -100;

particlesystem.start();




