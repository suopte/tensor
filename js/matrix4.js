define(['lib/jrsi', 'vector3d'], function (Class, vector3d) {
    var matrix4 = Class.extend({
        m: null,
        init: function (am) {
            if (am instanceof Array) this.m = am;
            else this.clear();
        },
        clear: function () {
            this.m = [[0.0, 0.0, 0.0, 0.0],
                    [0.0, 0.0, 0.0, 0.0],
                    [0.0, 0.0, 0.0, 0.0],
                    [0.0, 0.0, 0.0, 0.0]];
        },
        identity: function () {
            this.m = [[1.0, 0.0, 0.0, 0.0],
                    [0.0, 1.0, 0.0, 0.0],
                    [0.0, 0.0, 1.0, 0.0],
                    [0.0, 0.0, 0.0, 1.0]];
        },
        add: function (mat) {
            var res = new matrix4(),
                i, j;
            for (i = 0; i < 4; i++)
                for (j = 0; j < 4; j++)
                    res.m[i][j] = this.m[i][j] + mat.m[i][j];
            return res;
        },
        mul: function (mat) {
            var res = new matrix4(),
                i,  j, k;
            for (i = 0; i < 4; i++)
                for (j = 0; j < 4; j++)
                    for (k = 0; k < 4; k++)
                        res.m[i][j] += this.m[i][k] * mat.m[k][j];
            return res;
        },
        mulVec: function (vec) {
            var m = this.m,
                xh = m[0][0] * vec.x + m[0][1] * vec.y + m[0][2] * vec.z + m[0][3],
                yh = m[1][0] * vec.x + m[1][1] * vec.y + m[1][2] * vec.z + m[1][3],
                zh = m[2][0] * vec.x + m[2][1] * vec.y + m[2][2] * vec.z + m[2][3],
                h  = m[3][0] * vec.x + m[3][1] * vec.y + m[3][2] * vec.z + m[3][3];
            return new vector3d(xh / h, yh / h, zh / h);
        }
    });
    
    matrix4.translation = function (vec) {
        return new matrix4([[1.0, 0.0, 0.0, vec.x],
                            [0.0, 1.0, 0.0, vec.y],
                            [0.0, 0.0, 1.0, vec.z],
                            [0.0, 0.0, 0.0, 1.0]]);
    }
    
    matrix4.lookAt = function (eye, lookat, up) {
        var u, v, w, mat;
        w = new vector3d(eye.x - lookat.x, eye.y - lookat.y, eye.z - lookat.z);
        w.sunit();
        u = up.cross(w);
        u.sunit();
        v = w.cross(u);
        
        mat = new matrix4([[u.x, v.x, w.x, 0.0],
                            [u.y, v.y, w.y, 0.0],
                            [u.z, v.z, w.z, 0.0],
                            [0.0, 0.0, 0.0, 1.0]]);
        return mat.mul(matrix4.translation(eye.scale(-1.0)))
    }
    
    matrix4.perspective = function (fov, aspect, fp, bp) {
        var slopey = Math.tan(fov * Math.PI / 180.0),
            m00 = 1.0 / slopey / aspect,
            m11 = 1.0 / slopey,
            m22 = -(fp + bp) / (bp - fp),
            m32 = -2.0 * fp * bp / (bp - fp);
            
            return new matrix4([[m00, 0.0, 0.0, 0.0],
                                [0.0, m11, 0.0, 0.0],
                                [0.0, 0.0, m22, -1.0],
                                [0.0, 0.0, m32, 0.0]]);
    }
    
    return matrix4;
});