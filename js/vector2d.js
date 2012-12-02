define(['lib/jrsi'], function (Class) {
    var vector2d = Class.extend({
        x: 0.0,
        y: 0.0,
        init: function (ax, ay) {
            this.x = ax;
            this.y = ay;
        },
        add: function (vec) {
            return new vector2d(this.x + vec.x, this.y + vec.y);
        },
        sub: function (vec) {
            return new vector2d(this.x - vec.y, this.y - vec.y);
        },
        scale: function (scalar) {
            return new vector2d(this.x * scalar, this.y * scalar);
        },
        dot: function (vec) {
            return this.x * vec.x + this.y * vec.y;
        },
        len: function () {
            return Math.sqrt(this.x * this.x + this.y * this.y);
        },
        
        sadd: function (vec) {
            this.x += vec.x;
            this.y += vec.y;
        },
        ssub: function (vec) {
            this.x -= vec.x;
            this.y -= vec.y;
        },
        sscale: function (scalar) {
            this.x *=  scalar;
            this.y *=  scalar;
        }
    });
    
    return vector2d;
});