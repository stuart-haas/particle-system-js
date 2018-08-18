import Color from './utils/color';
import Vector from './math/vector';
import Emitter from './core/emitter';
import Field from './core/field';
import ParticleSystem from './core/particlesystem';

let particlesystem = new ParticleSystem();

particlesystem.addEmitter(new Emitter(Emitter.TYPE.AREA, new Vector(particlesystem.canvas.width, particlesystem.canvas.height), Vector.fromAngle(1, 1), 1, 20000, 20, 0.98, 100, 1, Color.RANDOM));

particlesystem.addField(new Field(new Vector(200, 400), -500));
particlesystem.addField(new Field(new Vector(800, 400), 500));

particlesystem.allowInteraction = true;
particlesystem.interactionMass = -300;
particlesystem.animateColor();

particlesystem.start();