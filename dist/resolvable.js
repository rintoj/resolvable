"use strict";
module.exports = function resolvable(target) {
    var _this = this;
    if (typeof target !== 'function') {
        throw 'Cannot make a non-function resolvable';
    }
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return new Promise(function (resolve, reject) {
            try {
                target.apply(_this, args.concat(function (err, data) {
                    if (err)
                        return reject(err);
                    return resolve(data);
                }));
            }
            catch (e) {
                reject(e);
            }
        });
    };
};
