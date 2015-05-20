function Vector (x, y) {
  if (!(this instanceof Vector)) {
    return new Vector(x, y);
  }

  if (typeof x !== 'number') {
    console.log (typeof x);
    throw new TypeError('x coordinate must be a Number');
  }
  if (typeof y !== 'number') {
    throw new TypeError('y coordinate must be a Number');
  }

  this.x = x;
  this.y = y;
};

Vector.fromArray = function (arr) {
  return new Vector(arr[0], arr[1]);
};

Vector.fromObject = function (obj) {
  return new Vector(obj.x, obj.y);
};

Vector.prototype.add = function (vec) {
  return new Vector(this.x + vec.x, this.y + vec.y);
};

Vector.prototype.subtract = function (vec) {
  return new Vector(this.x - vec.x, this.y - vec.y);
};

Vector.prototype.invert = function () {
  return new Vector(-this.x, -this.y);
};

Vector.prototype.multiply = function (scalar) {
  return new Vector(scalar * this.x, scalar * this.y);
};

Vector.prototype.divide = function (scalar) {
  if (scalar === 0) {
    throw new TypeError('Division by 0.');
  }
  return this.multiply(1/scalar);
};

Vector.prototype.lengthSq = function () {
  return this.x * this.x + this.y * this.y;
};

Vector.prototype.length = function () {
  return Math.sqrt(this.lengthSq());
};

Vector.prototype.normalize = function () {
  var length = this.length();

  if (length === 0) {
    throw new TypeError('Vector has length 0. Cannot normalize().');
  }
  return this.divide(length);
};

Vector.prototype.mix = function (vec, amount) {
  amount = amount || 0.5;
  var x = (1 - amount) * this.x + amount * vec.x;
  var y = (1 - amount) * this.y + amount * vec.y;
  return new Vector(x, y);
};

Vector.prototype.perpendicular = function () {
  return new Vector(-this.y, this.x); // this is 90 degrees counter-clockwise
};

Vector.prototype.clone = function () {
  return new Vector(this.x, this.y);
};

Vector.prototype.dot = function (vec2) {
  return this.x * vec2.x + this.y * vec2.y;
};

Vector.prototype.projectOnto = function (vec2) {
  return vec2.multiply(this.dot(vec2) / vec2.lengthSq());
};

Vector.prototype.angle = function () {
  return Math.atan2(this.y, this.x);
};

Vector.prototype.angleDeg = function () {
  return radian2degrees(this.angle());
};

Vector.prototype.slope = function () {
  return this.y / this.x;
};

Vector.prototype.toString = function () {
  return 'x:' + this.x + ', y:' + this.y;
};

Vector.prototype.toArray = function () {
  return [ this.x, this.y ];
};

Vector.prototype.toObject = function () {
  return { x: this.x, y: this.y };
};

var degrees = 180 / Math.PI;

function radian2degrees (rad) {
  return rad * degrees;
}

function degrees2radian (deg) {
  return deg / degrees;
}

module.exports = Vector;
