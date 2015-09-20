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

Vector.fromString = function (str) {
  // e.g.  'x:100, y:200'
  var array = str
    .split(', ')
    .map(function (s) {
      return s.substring(2);
    })
    .map(parseFloat);

  if (array.some(isNaN)) {
    throw new TypeError('"' + str + '" is not a valid Vector string.');
  }

  return Vector.fromArray(array);
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

/**
 * Returns a vector of the same direction but with a length of 1, or the given length.
 * @param  {number} [scalar=1] Length of returned vector.
 * @return {Vector}
 */
Vector.prototype.normalize = function (scalar) {
  var length = this.length();
  scalar = scalar || 1;

  if (length === 0) {
    throw new TypeError('Vector has length 0. Cannot normalize().');
  }
  return this.divide(length).multiply(scalar);
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

Vector.prototype.snap = function (snapTo) {
  var snap = function(val) {
    return Math.round(val / snapTo) * snapTo;
  };
  return new Vector(snap(this.x), snap(this.y));
};

/**
 * Expand this vector to a given minimum length in the same direction as the original.
 *
 * Not valid on zero-length vectors.
 *
 * @param  {number} scalar Minimum length
 * @return {Vector}
 */
Vector.prototype.minLength = function (scalar) {
  return this.length() < scalar ? this.normalize(scalar) : this;
};

/**
 * Reduce this vector to a given maximum length in the same direction as the original.
 *
 * @param  {number} scalar Maximum length
 * @return {Vector}
 */
Vector.prototype.maxLength = function (scalar) {
  return this.length() > scalar ? this.normalize(scalar) : this;
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

Vector.prototype.equals = function (vec) {
  return this.x === vec.x && this.y === vec.y;
}

var degrees = 180 / Math.PI;

function radian2degrees (rad) {
  return rad * degrees;
}

function degrees2radian (deg) {
  return deg / degrees;
}

module.exports = Vector;
