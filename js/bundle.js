!function(t){var n={};function s(e){if(n[e])return n[e].exports;var r=n[e]={i:e,l:!1,exports:{}};return t[e].call(r.exports,r,r.exports,s),r.l=!0,r.exports}s.m=t,s.c=n,s.d=function(e,r,t){s.o(e,r)||Object.defineProperty(e,r,{enumerable:!0,get:t})},s.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(r,e){if(1&e&&(r=s(r)),8&e)return r;if(4&e&&"object"==typeof r&&r&&r.__esModule)return r;var t=Object.create(null);if(s.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:r}),2&e&&"string"!=typeof r)for(var n in r)s.d(t,n,function(e){return r[e]}.bind(null,n));return t},s.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return s.d(r,"a",r),r},s.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},s.p="",s(s.s=0)}({"./src/js/app/core/emitter.js":function(module,exports,__webpack_require__){"use strict";eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\nexports.default = undefined;\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _type = __webpack_require__(/*! ../utils/type */ \"./src/js/app/utils/type.js\");\n\nvar _type2 = _interopRequireDefault(_type);\n\nvar _vector = __webpack_require__(/*! ../math/vector */ \"./src/js/app/math/vector.js\");\n\nvar _vector2 = _interopRequireDefault(_vector);\n\nvar _particle = __webpack_require__(/*! ../core/particle */ \"./src/js/app/core/particle.js\");\n\nvar _particle2 = _interopRequireDefault(_particle);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar Emitter = function () {\n    function Emitter(type, pos, vel, spread, max, rate, damp, mass, size, color) {\n        _classCallCheck(this, Emitter);\n\n        this.particles = [];\n        this.fields = [];\n        this.type = type;\n        this.pos = pos;\n        this.vel = vel;\n        this.spread = spread || Math.PI / 32;\n        this.max = max || 10000;\n        this.rate = rate || 20;\n        this.damp = damp || 0.98;\n        this.mass = mass || 500;\n        this.size = size || 1;\n        this.color = color || '#000ffc';\n        this.drawSize = 3;\n        this.drawColor = type == 'point' ? '#999' : 'area' ? 'transparent' : undefined;\n    }\n\n    _createClass(Emitter, [{\n        key: 'add',\n        value: function add() {\n            if (this.particles.length > this.max) return;\n            for (var i = 0; i < this.rate; i++) {\n                this.particles.push(this.get());\n            }\n        }\n    }, {\n        key: 'get',\n        value: function get() {\n            var angle = this.vel.getAngle() + this.spread - Math.random() * this.spread * 2;\n            var magnitude = this.vel.getMagnitude();\n            var pos = this.type == 'point' ? new _vector2.default(this.pos.x, this.pos.y) : 'area' ? new _vector2.default(Math.random() * this.pos.x, Math.random() * this.pos.y) : undefined;\n            var vel = _vector2.default.fromAngle(angle, magnitude);\n            return new _particle2.default(pos, vel, null, this.damp, this.mass, this.size, this.color);\n        }\n    }, {\n        key: 'update',\n        value: function update(bx, by) {\n            var currentParticles = [];\n\n            for (var i = 0; i < this.particles.length; i++) {\n                var particle = this.particles[i];\n                var pos = particle.pos;\n\n                if (pos.x < 0 || pos.x > bx || pos.y < 0 || pos.y > by) continue;\n\n                particle.update();\n\n                for (var j = 0; j < this.fields.length; j++) {\n                    var field = this.fields[j];\n                    particle.addForce(field.pos, field.mass);\n                }\n\n                currentParticles.push(particle);\n            }\n            this.particles = currentParticles;\n        }\n    }, {\n        key: 'render',\n        value: function render(ctx) {\n\n            for (var i = 0; i < this.particles.length; i++) {\n                var particle = this.particles[i];\n                particle.render(ctx);\n            }\n        }\n    }], [{\n        key: 'TYPE',\n        get: function get() {\n            return _type2.default;\n        }\n    }]);\n\n    return Emitter;\n}();\n\nexports.default = Emitter;\n\n//# sourceURL=webpack:///./src/js/app/core/emitter.js?")},"./src/js/app/core/field.js":function(module,exports,__webpack_require__){"use strict";eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar Field = function () {\n    function Field(pos, mass) {\n        _classCallCheck(this, Field);\n\n        this.pos = pos || new vector();\n        this.setMass(mass);\n        this.drawSize = 3;\n    }\n\n    _createClass(Field, [{\n        key: 'setMass',\n        value: function setMass(mass) {\n            this.mass = mass || 100;\n            this.drawColor = mass < 0 ? '#f00' : '#0f0';\n        }\n    }]);\n\n    return Field;\n}();\n\nexports.default = Field;\n\n//# sourceURL=webpack:///./src/js/app/core/field.js?")},"./src/js/app/core/particle.js":function(module,exports,__webpack_require__){"use strict";eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\nexports.default = undefined;\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _color = __webpack_require__(/*! ../utils/color */ \"./src/js/app/utils/color.js\");\n\nvar _color2 = _interopRequireDefault(_color);\n\nvar _vector = __webpack_require__(/*! ../math/vector */ \"./src/js/app/math/vector.js\");\n\nvar _vector2 = _interopRequireDefault(_vector);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar Particle = function () {\n    function Particle(pos, vel, acc, damp, mass, size, color) {\n        _classCallCheck(this, Particle);\n\n        this.pos = pos || new _vector2.default();\n        this.vel = vel || new _vector2.default();\n        this.acc = acc || new _vector2.default();\n        this.damp = damp || 0.98;\n        this.mass = mass || 100;\n        this.size = size || 1;\n        this.color = color == 'random' ? _color2.default.RANDOM : color;\n    }\n\n    _createClass(Particle, [{\n        key: 'update',\n        value: function update() {\n            this.vel.add(this.acc);\n            this.vel.multiply(this.damp);\n            this.acc.divide(this.mass);\n            this.pos.add(this.vel);\n        }\n    }, {\n        key: 'render',\n        value: function render(ctx) {\n            ctx.fillStyle = this.color;\n            ctx.fillRect(this.pos.x, this.pos.y, this.size, this.size);\n        }\n    }, {\n        key: 'addForce',\n        value: function addForce(force, mass) {\n            var tForce = this.calculateForce(force, mass);\n            this.acc.add(tForce);\n        }\n    }, {\n        key: 'calculateForce',\n        value: function calculateForce(force, mass) {\n            var fx = 0;\n            var fy = 0;\n\n            var vx = force.x - this.pos.x;\n            var vy = force.y - this.pos.y;\n\n            var tForce = mass / Math.pow(vx * vx + vy * vy, 1.5);\n\n            fx += vx * tForce;\n            fy += vy * tForce;\n\n            return new _vector2.default(fx, fy);\n        }\n    }]);\n\n    return Particle;\n}();\n\nexports.default = Particle;\n\n//# sourceURL=webpack:///./src/js/app/core/particle.js?")},"./src/js/app/core/particlesystem.js":function(module,exports,__webpack_require__){"use strict";eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\nexports.default = undefined;\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _shape = __webpack_require__(/*! ../draw/shape */ \"./src/js/app/draw/shape.js\");\n\nvar _shape2 = _interopRequireDefault(_shape);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar ParticleSystem = function () {\n    function ParticleSystem() {\n        _classCallCheck(this, ParticleSystem);\n\n        this.mx = 0;\n        this.my = 0;\n        this.emitters = [];\n        this.canvas = document.querySelector('canvas');\n        this.ctx = this.canvas.getContext('2d');\n        this.canvas.width = window.innerWidth;\n        this.canvas.height = window.innerHeight;\n        this.drawEmitters = false;\n        this.drawFields = false;\n    }\n\n    _createClass(ParticleSystem, [{\n        key: 'addEmitter',\n        value: function addEmitter(emitter) {\n            this.emitters.push(emitter);\n        }\n    }, {\n        key: 'addField',\n        value: function addField(field) {\n            for (var i = 0; i < this.emitters.length; i++) {\n                var emitter = this.emitters[i];\n                emitter.fields.push(field);\n            }\n        }\n    }, {\n        key: 'start',\n        value: function start() {\n            this.clear();\n            this.update();\n            this.render();\n            this.queue();\n        }\n    }, {\n        key: 'clear',\n        value: function clear() {\n            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);\n        }\n    }, {\n        key: 'update',\n        value: function update() {\n            for (var i = 0; i < this.emitters.length; i++) {\n                var emitter = this.emitters[i];\n                emitter.add();\n                emitter.update(this.canvas.width, this.canvas.height);\n            }\n        }\n    }, {\n        key: 'render',\n        value: function render() {\n            for (var i = 0; i < this.emitters.length; i++) {\n                var emitter = this.emitters[i];\n                emitter.render(this.ctx);\n                if (this.drawEmitters) _shape2.default.circle(this.ctx, emitter.pos, emitter.drawSize, emitter.drawColor);\n\n                if (this.drawFields) {\n                    for (var j = 0; j < emitter.fields.length; j++) {\n                        var field = emitter.fields[j];\n                        _shape2.default.circle(this.ctx, field.pos, field.drawSize, field.drawColor);\n                    }\n                }\n            }\n        }\n    }, {\n        key: 'queue',\n        value: function queue() {\n            window.requestAnimationFrame(this.start.bind(this));\n        }\n    }]);\n\n    return ParticleSystem;\n}();\n\nexports.default = ParticleSystem;\n\n//# sourceURL=webpack:///./src/js/app/core/particlesystem.js?")},"./src/js/app/draw/shape.js":function(module,exports,__webpack_require__){"use strict";eval('\n\nObject.defineProperty(exports, "__esModule", {\n    value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }\n\nvar Shape = function () {\n    function Shape() {\n        _classCallCheck(this, Shape);\n    }\n\n    _createClass(Shape, null, [{\n        key: "circle",\n        value: function circle(ctx, pos, radius, color) {\n            ctx.fillStyle = color;\n            ctx.beginPath();\n            ctx.arc(pos.x, pos.y, radius, 0, Math.PI * 2);\n            ctx.closePath();\n            ctx.fill();\n        }\n    }]);\n\n    return Shape;\n}();\n\nexports.default = Shape;\n\n//# sourceURL=webpack:///./src/js/app/draw/shape.js?')},"./src/js/app/index.js":function(module,exports,__webpack_require__){"use strict";eval('\n\nvar _color = __webpack_require__(/*! ./utils/color */ "./src/js/app/utils/color.js");\n\nvar _color2 = _interopRequireDefault(_color);\n\nvar _vector = __webpack_require__(/*! ./math/vector */ "./src/js/app/math/vector.js");\n\nvar _vector2 = _interopRequireDefault(_vector);\n\nvar _emitter = __webpack_require__(/*! ./core/emitter */ "./src/js/app/core/emitter.js");\n\nvar _emitter2 = _interopRequireDefault(_emitter);\n\nvar _field = __webpack_require__(/*! ./core/field */ "./src/js/app/core/field.js");\n\nvar _field2 = _interopRequireDefault(_field);\n\nvar _particlesystem = __webpack_require__(/*! ./core/particlesystem */ "./src/js/app/core/particlesystem.js");\n\nvar _particlesystem2 = _interopRequireDefault(_particlesystem);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar particlesystem = new _particlesystem2.default();\n\nparticlesystem.addEmitter(new _emitter2.default(_emitter2.default.TYPE.AREA, new _vector2.default(particlesystem.canvas.width, particlesystem.canvas.height), _vector2.default.fromAngle(1, 1), 1, 20000, 20, 0.98, 100, 1.5, _color2.default.RANDOM));\n\nparticlesystem.addField(new _field2.default(new _vector2.default(200, 400), -500));\nparticlesystem.addField(new _field2.default(new _vector2.default(800, 400), 500));\n\nparticlesystem.start();\n\n//# sourceURL=webpack:///./src/js/app/index.js?')},"./src/js/app/math/vector.js":function(module,exports,__webpack_require__){"use strict";eval('\n\nObject.defineProperty(exports, "__esModule", {\n    value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }\n\nvar Vector = function () {\n    function Vector(x, y) {\n        _classCallCheck(this, Vector);\n\n        this.x = x || 0;\n        this.y = y || 0;\n    }\n\n    _createClass(Vector, [{\n        key: "add",\n        value: function add(vector) {\n            this.x += vector.x;\n            this.y += vector.y;\n        }\n    }, {\n        key: "getMagnitude",\n        value: function getMagnitude() {\n            return Math.sqrt(this.x * this.x + this.y * this.y);\n        }\n    }, {\n        key: "getAngle",\n        value: function getAngle() {\n            return Math.atan2(this.y, this.x);\n        }\n    }, {\n        key: "multiply",\n        value: function multiply(value) {\n            return new Vector(this.x *= value, this.y *= value);\n        }\n    }, {\n        key: "divide",\n        value: function divide(value) {\n            return new Vector(this.x /= value, this.y /= value);\n        }\n    }], [{\n        key: "fromAngle",\n        value: function fromAngle(angle, magnitude) {\n            return new Vector(magnitude * Math.cos(angle), magnitude * Math.sin(angle));\n        }\n    }]);\n\n    return Vector;\n}();\n\nexports.default = Vector;\n\n//# sourceURL=webpack:///./src/js/app/math/vector.js?')},"./src/js/app/utils/color.js":function(module,exports,__webpack_require__){"use strict";eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\nexports.default = undefined;\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _type = __webpack_require__(/*! ../utils/type */ \"./src/js/app/utils/type.js\");\n\nvar _type2 = _interopRequireDefault(_type);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar Color = function () {\n    function Color() {\n        _classCallCheck(this, Color);\n    }\n\n    _createClass(Color, null, [{\n        key: 'TYPE',\n        get: function get() {\n            return _type2.default;\n        }\n    }, {\n        key: 'RANDOM',\n        get: function get() {\n            var letters = '0123456789ABCDEF';\n            var color = '#';\n            for (var i = 0; i < 6; i++) {\n                color += letters[Math.floor(Math.random() * 16)];\n            }\n            return color;\n        }\n    }]);\n\n    return Color;\n}();\n\nexports.default = Color;\n\n//# sourceURL=webpack:///./src/js/app/utils/color.js?")},"./src/js/app/utils/type.js":function(module,exports,__webpack_require__){"use strict";eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar Type = function () {\n    function Type() {\n        _classCallCheck(this, Type);\n    }\n\n    _createClass(Type, null, [{\n        key: 'POINT',\n        get: function get() {\n            return 'point';\n        }\n    }, {\n        key: 'AREA',\n        get: function get() {\n            return 'area';\n        }\n    }, {\n        key: 'RANDOM',\n        get: function get() {\n            return 'random';\n        }\n    }]);\n\n    return Type;\n}();\n\nexports.default = Type;\n\n//# sourceURL=webpack:///./src/js/app/utils/type.js?")},0:function(module,exports,__webpack_require__){eval('__webpack_require__(/*! /Users/stuarthaas/Sites/sandbox/src/js/app/index.js */"./src/js/app/index.js");\n__webpack_require__(/*! /Users/stuarthaas/Sites/sandbox/src/js/app/core/emitter.js */"./src/js/app/core/emitter.js");\n__webpack_require__(/*! /Users/stuarthaas/Sites/sandbox/src/js/app/core/field.js */"./src/js/app/core/field.js");\n__webpack_require__(/*! /Users/stuarthaas/Sites/sandbox/src/js/app/core/particle.js */"./src/js/app/core/particle.js");\n__webpack_require__(/*! /Users/stuarthaas/Sites/sandbox/src/js/app/core/particlesystem.js */"./src/js/app/core/particlesystem.js");\n__webpack_require__(/*! /Users/stuarthaas/Sites/sandbox/src/js/app/math/vector.js */"./src/js/app/math/vector.js");\n__webpack_require__(/*! /Users/stuarthaas/Sites/sandbox/src/js/app/utils/color.js */"./src/js/app/utils/color.js");\nmodule.exports = __webpack_require__(/*! /Users/stuarthaas/Sites/sandbox/src/js/app/utils/type.js */"./src/js/app/utils/type.js");\n\n\n//# sourceURL=webpack:///multi_./src/js/app/index.js_./src/js/app/core/emitter.js_./src/js/app/core/field.js_./src/js/app/core/particle.js_./src/js/app/core/particlesystem.js_./src/js/app/math/vector.js_./src/js/app/utils/color.js_./src/js/app/utils/type.js?')}});