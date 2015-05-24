var expect = require('chai').expect;
var Vector = require('../index');

var EPSILON = 0.00000001;

describe('static methods', function () {

  describe('new Vector', function () {
    var x, y, vec1, vec2;

    before(function () {
      x = 100;
      y = 200;
      vec1 = new Vector(x, y);
      vec2 = Vector(x, y);
    });

    it('should be an instance of Vector', function () {
      expect(vec1).to.be.an.instanceof(Vector);
      expect(vec2).to.be.an.instanceof(Vector);
    });

    it('should have axis from arguments', function () {
      expect(vec1).to.have.property('x', x);
      expect(vec1).to.have.property('y', y);

      expect(vec2).to.have.property('x', x);
      expect(vec2).to.have.property('y', y);
    });
  });

  describe('#fromArray()', function () {
    var arr, vec;

    before(function () {
      arr = [100, 200];
      vec = Vector.fromArray(arr);
    });

    it('should return an instance of Vector', function () {
      expect(vec).to.be.an.instanceof(Vector);
    });

    it('should have axis from array', function () {
      expect(vec).to.have.property('x', arr[0]);
      expect(vec).to.have.property('y', arr[1]);
    });
  });

  describe('#fromObject()', function () {
    var obj, vec;

    before(function () {
      obj = { x: 100, y: 200 };
      vec = Vector.fromObject(obj);
    });

    it('should return an instance of Vector', function () {
      expect(vec).to.be.an.instanceof(Vector);
    });

    it('should have axis from object', function () {
      expect(vec).to.have.property('x', obj.x);
      expect(vec).to.have.property('y', obj.y);
    });
  });

});

describe('chainable instance methods', function () {
  var vec1, vec2;

  before(function () {
    vec1 = new Vector(2, 6);
    vec2 = new Vector(3, 4);
  });

  after(function () {
    // Check immutability of vec1 and vec2
    expect(vec1).to.deep.equal(new Vector(2, 6));
    expect(vec2).to.deep.equal(new Vector(3, 4));
  });

  it('should add a vector', function () {
    var vec3 = vec1.add(vec2);
    expect(vec3).to.deep.equal(new Vector(5, 10));
  });

  it('should add a vector', function () {
    var vec3 = vec1.subtract(vec2);
    expect(vec3).to.deep.equal(new Vector(-1, 2));
  });

  it('should invert a vector', function () {
    var vec3 = vec1.invert();
    expect(vec3).to.deep.equal(new Vector(-2, -6));
  });

  it('should multipy a vector by a scalar', function () {
    var vec3 = vec1.multiply(2);
    expect(vec3).to.deep.equal(new Vector(4, 12));
  });

  it('should divide a vector by a scalar', function () {
    var vec3 = vec1.divide(2);
    expect(vec3).to.deep.equal(new Vector(1, 3));
  });

  it('should calculate square of length of a vector', function () {
    var lenSq = vec1.lengthSq();
    expect(lenSq).to.deep.equal(40);
  });

  it('should calculate length of a vector', function () {
    var len = vec2.length();
    expect(len).to.deep.equal(5);
  });

  it('should normalize length of a vector', function () {
    var vec3 = vec1.normalize();
    expect(vec3.length()).to.be.within(1 - EPSILON, 1 + EPSILON);
  });

  it('should throw when normalizing zero vector', function () {
    expect(function () {
      var vec3 = Vector(0, 0).normalize();
    }).to.throw(TypeError);
  });

  it('should clone a vector', function () {
    var vec3 = vec1.clone();
    expect(vec3).to.deep.equal(vec1);
  });

  it('should calculate dot product', function () {
    var res = vec1.dot(vec2);
    expect(res).to.deep.equal(30);
  });

  it('should project onto a vector', function () {
    var vec3 = vec2.projectOnto(Vector(7, 0));
    expect(vec3).to.deep.equal(Vector(3, 0));
  });

  it('should project onto a vector (2)', function () {
    var vec3 = vec1.projectOnto(Vector(1, 1));
    expect(vec3).to.deep.equal(Vector(4, 4));
  });

  it('should calculate the angle', function () {
    function check(vector, expectedAngle) {
      var angle = vector.angle();
      if (angle < 0) {
        angle += 2 * Math.PI;
      }
      expect(angle).to.be.within(expectedAngle - EPSILON, expectedAngle + EPSILON);
    }
    check(Vector( 1,  1), 1 * Math.PI / 4);
    check(Vector(-1,  1), 3 * Math.PI / 4);
    check(Vector(-1, -1), 5 * Math.PI / 4);
    check(Vector( 1, -1), 7 * Math.PI / 4);
  });

  it('should calculate the angle', function () {
    function check(vector, expectedAngle) {
      var angle = vector.angleDeg();
      if (angle < 0) {
        angle += 360;
      }
      expect(angle).to.be.within(expectedAngle - EPSILON, expectedAngle + EPSILON);
    }
    check(Vector( 1,  1),  45);
    check(Vector(-1,  1), 135);
    check(Vector(-1, -1), 225);
    check(Vector( 1, -1), 315);
  });

  it('should calculate the slope', function () {
    var res = vec1.slope();
    expect(res).to.deep.equal(3);
  });

  it('should mix (blend) two vectors equally', function () {
    var res = vec1.mix(vec2);
    expect(res).to.deep.equal(new Vector(2.5, 5));
  });

  it('should mix (blend) two vectors by a given amount', function () {
    var res = vec1.mix(vec2, 0.75);
    expect(res).to.deep.equal(new Vector(2.75, 4.5));
  });

  it('should calculate a perpendicular vector', function () {
    var res = vec1.perpendicular();
    expect(res).to.deep.equal(new Vector(-6, 2));
  });

  it('should be perpendicular', function () {
    var res = vec1.dot(vec1.perpendicular());
    expect(res).to.deep.equal(0);
  });

  it('should snap to the nearest multiple of a given value', function () {
    var res = vec1.snap(5);
    expect(res).to.deep.equal(new Vector(0, 5));
  });

  it('should snap negative vectors to the nearest multiple of a given value', function () {
    var res = new Vector(-2, -6).snap(5);
    expect(res).to.deep.equal(new Vector(-0, -5));
  });
});

describe('utility methods', function () {

  it('should return a string representation of the vector', function () {
    var vec = new Vector(100, 200);
    var ret = vec.toString();
    expect(ret).to.be.a('string');
    expect(ret).to.have.string('x:100, y:200');
  });


  it('should return an array representation of the vector', function () {
    var vec = new Vector(100, 200);
    var ret = vec.toArray();
    expect(ret).to.be.instanceof(Array);
    expect(ret).to.eql([ 100, 200 ]);
  });

  it('should return an object representation of the vector', function () {
    var vec = new Vector(100, 200);
    var ret = vec.toObject();
    expect(ret).to.be.instanceof(Object);
    expect(ret).to.eql({ x: 100, y: 200 });
  });
});
