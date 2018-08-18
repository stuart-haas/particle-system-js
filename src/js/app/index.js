import Vector from './math/vector';
import Emitter from './core/emitter';
import Field from './core/field';
import ParticleSystem from './core/particleSystem';

let particlesystem = new ParticleSystem();

particlesystem.addEmitter(new Emitter(Emitter.TYPE.AREA, new Vector(particlesystem.canvas.width, particlesystem.canvas.height), new Vector(Math.random() * 1, Math.random() * 1), 1, 20000, 20));

particlesystem.addField(new Field(new Vector(200, 400), -500));
particlesystem.addField(new Field(new Vector(800, 400), 500));

particlesystem.allowInteraction = true;
particlesystem.interactionMass = -50;
particlesystem.animateColor(30, 60);

particlesystem.start();




