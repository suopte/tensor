define(['lib/jrsi'], function (Class) {
    var vector3d = Class.extend({
        x: 0.0,
        y: 0.0,
        z: 0.0,
        
        init: function (ax, ay, az) {
            this.x = ax;
            this.y = ay;
            this.z = az;
        },
        
        toString: function () {
            return '(' + this.x + ', ' + this.y + ', ' + this.z + ')';
        },
        
        add: function (vec) {
            return new vector3d(this.x + vec.x, this.y + vec.y, this.z + vec.z);
        },
        sub: function (vec) {
            return new vector3d(this.x - vec.x, this.y - vec.y, this.z + vec.z);
        },
        dot: function (vec) {
            return this.x * vec.x + this.y * vec.y + this.z * vec.z;
        },
        cross: function (vec) {
            return new vector3d(
                    this.y * vec.z - vec.y * this.z,
                    this.z * vec.x - vec.z * this.x,
                    this.x * vec.y - vec.x * this.y
                );
        },
        scale: function (scalar) {
            return new vector3d(this.x * scalar, this.y * scalar, this.z * scalar);
        },
        unit: function () {
            var len = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
            if (len > 0.0) 
                return new vector3d(this.x / len, this.y / len, this.z / len);
            else 
                return new vector3d(0.0, 0.0, 0.0);
        },
        len: function () {
            return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
        },
        
        sadd: function (vec) {
            this.x += vec.x;
            this.y += vec.y;
            this.z += vec.z;
        },
        ssub: function (vec) {
            this.x -= vec.x;
            this.y -= vec.y;
            this.z -= vec.z;
        },
        sscale: function (scalar) {
            this.x *= scalar;
            this.y *= scalar;
            this.z *= scalar;
        },
        sunit: function () {
            var len = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
            if (len > 0.0) {
                this.x /= len;
                this.y /= len;
                this.z /= len;
            }
        },
        
        fromSpher: function (phi, theta, r) {
            this.x = r * Math.cos(phi) * Math.sin(theta);
            this.y = r * Math.sin(phi) * Math.sin(theta);
			this.z = r * Math.cos(theta);
		},
		fromSpherDeg: function (phi, theta, r) {
			phi   *= Math.PI / 180.0;
			theta *= Math.PI / 180.0;
			this.x = r * Math.cos(phi) * Math.sin(theta);
			this.y = r * Math.sin(phi) * Math.sin(theta);
			this.z = r * Math.cos(theta);
		},
        toSpher: function () {            
            var spher = {};
            spher.r = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
            spher.phi = Math.atan2(this.y, this.x);
            spher.theta = Math.acos(this.z / spher.r);
            return spher;
        },
        toSpherDeg: function () {            
            var spher = {};
            spher.r = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
            spher.phi = Math.atan2(this.y, this.x) * 180.0 / Math.PI;
            spher.theta = Math.acos(this.z / spher.r) * 180.0 / Math.PI;
            if (spher.phi < 0.0) spher.phi += 360.0; 
            return spher;
        }
    });
    
    vector3d.spher = function(phi, theta, r) {
		return new vector3d(
			r * Math.cos(phi) * Math.sin(theta),
			r * Math.sin(phi) * Math.sin(theta),
			r * Math.cos(theta)
		);
	};
    vector3d.spherDeg = function(phi, theta, r) {
		phi   *= Math.PI / 180.0;
		theta *= Math.PI / 180.0;
		return new vector3d(
			r * Math.cos(phi) * Math.sin(theta),
			r * Math.sin(phi) * Math.sin(theta),
			r * Math.cos(theta)
		);
	};
    
    return vector3d;
});