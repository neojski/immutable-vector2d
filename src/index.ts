const degrees = 180 / Math.PI;

function radian2degrees(rad: number) {
  return rad * degrees;
}

function degrees2radian(deg: number) {
  return deg / degrees;
}

export interface VectorLike {
  x: number;
  y: number;
}

export default class Vector implements VectorLike {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  add(vec: Vector) {
    return new Vector(this.x + vec.x, this.y + vec.y);
  }

  subtract(vec: Vector) {
    return new Vector(this.x - vec.x, this.y - vec.y);
  }

  invert() {
    return new Vector(-this.x, -this.y);
  }

  multiply(scalar: number) {
    return new Vector(scalar * this.x, scalar * this.y);
  }

  divide(scalar: number) {
    if (scalar === 0) {
      throw new TypeError("Division by 0.");
    }
    return this.multiply(1 / scalar);
  }

  lengthSq() {
    return this.x * this.x + this.y * this.y;
  }

  length() {
    return Math.sqrt(this.lengthSq());
  }

  /**
   * Returns a vector of the same direction but with a length of 1, or the given length.
   * @param  {number} [scalar=1] Length of returned vector.
   * @return {Vector}
   */
  normalize(scalar: number = 1): Vector {
    let length = this.length();

    if (length === 0) {
      throw new TypeError("Vector has length 0. Cannot normalize().");
    }
    return this.divide(length).multiply(scalar);
  }

  mix(vec: Vector, amount: number = 0.5) {
    let x = (1 - amount) * this.x + amount * vec.x;
    let y = (1 - amount) * this.y + amount * vec.y;
    return new Vector(x, y);
  }

  perpendicular() {
    return new Vector(-this.y, this.x); // this is 90 degrees counter-clockwise
  }

  snap(snapTo: number) {
    let snap = function(val: number) {
      return Math.round(val / snapTo) * snapTo;
    };
    return new Vector(snap(this.x), snap(this.y));
  }

  /**
   * Expand this vector to a given minimum length in the same direction as the original.
   *
   * Not valid on zero-length vectors.
   *
   * @param  {number} scalar Minimum length
   * @return {Vector}
   */
  minLength(scalar: number): Vector {
    return this.length() < scalar ? this.normalize(scalar) : this;
  }

  /**
   * Reduce this vector to a given maximum length in the same direction as the original.
   *
   * @param  {number} scalar Maximum length
   * @return {Vector}
   */
  maxLength(scalar: number): Vector {
    return this.length() > scalar ? this.normalize(scalar) : this;
  }

  clone() {
    return new Vector(this.x, this.y);
  }

  dot(vec2: Vector) {
    return this.x * vec2.x + this.y * vec2.y;
  }

  projectOnto(vec2: Vector) {
    return vec2.multiply(this.dot(vec2) / vec2.lengthSq());
  }

  angle() {
    return Math.atan2(this.y, this.x);
  }

  angleDeg() {
    return radian2degrees(this.angle());
  }

  slope() {
    return this.y / this.x;
  }

  toString() {
    return "x:" + this.x + ", y:" + this.y;
  }

  toArray() {
    return [this.x, this.y];
  }

  toObject() {
    return { x: this.x, y: this.y };
  }

  equals(vec: Vector) {
    return this.x === vec.x && this.y === vec.y;
  }

  static fromArray(arr: Array<number>) {
    return new Vector(arr[0], arr[1]);
  }

  static fromObject(obj: VectorLike) {
    return new Vector(obj.x, obj.y);
  }

  static fromString(str: string) {
    // e.g.  'x:100, y:200'
    let array = str
      .split(", ")
      .map(function(s) {
        return s.substring(2);
      })
      .map(parseFloat);

    if (array.some(isNaN)) {
      throw new TypeError('"' + str + '" is not a valid Vector string.');
    }

    return Vector.fromArray(array);
  }
}

let x = 1;
export { x };
