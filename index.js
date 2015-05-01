'use strict';

var cwise = require('cwise');

exports.swap = cwise({
  args: ['array', 'array', 'array', 'array'],
  body: function(a_r, a_i, b_r, b_i) {
    var tmp;
    tmp = a_r;
    a_r = b_r;
    b_r = tmp;

    tmp = a_i;
    a_i = b_i;
    b_i = tmp;
  }
});

exports.scal = cwise({
  args: ['scalar', 'scalar', 'array', 'array'],
  body: function(alpha_r, alpha_i, x_r, x_i) {
    var tmp = x_r;
    tmp = alpha_r * x_r - alpha_i * x_i;
    x_i = alpha_i * x_r + alpha_r * x_i;
    x_r = tmp;
  }
});

exports.copy = cwise({
  args: ['array', 'array', 'array', 'array'],
  body: function(x_r, x_i, y_r, y_i) {
    y_r = x_r;
    y_i = x_i;
  }
});

exports.cpsc = cwise({
  args:['scalar', 'scalar', 'array', 'array', 'array', 'array'],
  body: function(alpha_r, alpha_i, x_r, x_i, y_r, y_i) {
    y_r = alpha_r * x_r - alpha_i * x_i;
    y_i = alpha_r * x_i + alpha_i * x_r;
  }
});

exports.axpy = cwise({
  args:['scalar', 'scalar', 'array', 'array', 'array', 'array'],
  body: function(alpha_r, alpha_i, x_r, x_i, y_r, y_i) {
    y_r += alpha_r * x_r - alpha_i * x_i;
    y_i += alpha_r * x_i + alpha_i * x_r;
  }
});

exports.dotu = cwise({
  args:['array', 'array', 'array', 'array'],
  pre: function() {
    this.r = 0;
    this.i = 0;
  },
  body: function(a_r, a_i, b_r, b_i) {
    this.r += a_r * b_r - a_i * b_i;
    this.i += a_r * b_i + a_i * b_r;
  },
  post: function() {
    return [this.r, this.i];
  }
});

exports.doth = cwise({
  args:['array', 'array', 'array', 'array'],
  pre: function() {
    this.r = 0;
    this.i = 0;
  },
  body: function(a_r, a_i, b_r, b_i) {
    this.r += a_r * b_r + a_i * b_i;
    this.i += a_r * b_i - a_i * b_r;
  },
  post: function() {
    return [this.r, this.i];
  }
});

exports.nrm2 = cwise({
  args:['array', 'array'],
  pre: function() {
    this.sum = 0;
  },
  body: function(a_r,a_i) {
    this.sum += a_r * a_r + a_i * a_i;
  },
  post: function() {
    return Math.sqrt(this.sum);
  }
});

exports.asum = cwise({
  args:['array','array'],
  pre: function() {
    this.sum = 0;
  },
  body: function(a_r, a_i) {
    this.sum += Math.abs(a_r) + Math.abs(a_i);
  },
  post: function() {
    return this.sum;
  }
});

exports.iamax = function() {
  console.error('iamax is not yet implemented in ndarray-blas-level1');
};
