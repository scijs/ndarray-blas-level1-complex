'use strict';

var assert = require('chai').assert,
    ndarray = require('ndarray'),
    pool = require('ndarray-scratch'),
    ops = require('ndarray-ops'),
    cblas1 = require('../index.js');

assert.ndCloseTo = function(a,b,tol) {
  assert(a.dimension===b.dimension, 'expected dimension '+a.dimension+' to equal dimension '+b.dimension+'.');
  assert.deepEqual(a.shape, b.shape, 'expected shape '+a.shape+' to equal shape '+b.shape+'.');
  var c = pool.zeros(a.shape, a.dtype);
  ops.sub(c,a,b);
  var err = ops.norm2(c);
  assert( err < tol, 'Expected error '+err+' to be less than tolerance '+tol+'.');
};

describe("BLAS Level 1",function() {

  var a, b, a0, b0, a_r, a_i, b_r, b_i, a0_r, a0_i, b0_r, b0_i;

  beforeEach(function() {
    var A = [1, 2,  2,-1,  3, 4];
    var B = [2, 3,  1, 0,  4,-3];
    a = ndarray(new Float64Array(A), [3,2]);
    a0 = ndarray(new Float64Array(A), [3,2]);
    b = ndarray(new Float64Array(B), [3,2]);
    b0 = ndarray(new Float64Array(B), [3,2]);

    a_r = a.pick(null,0);
    a_i = a.pick(null,1);

    b_r = b.pick(null,0);
    b_i = b.pick(null,1);

    a0_r = a0.pick(null,0);
    a0_i = a0.pick(null,1);

    b0_r = b0.pick(null,0);
    b0_i = b0.pick(null,1);
  });

  it('swap',function() {
    cblas1.swap(a_r, a_i, b_r, b_i);
    assert.ndCloseTo( b0_r, a_r, 1e-8 );
    assert.ndCloseTo( b0_i, a_i, 1e-8 );
    assert.ndCloseTo( a0_r, b_r, 1e-8 );
    assert.ndCloseTo( a0_i, b_i, 1e-8 );
  });

  it('scal',function() {
    cblas1.scal(2, -1, a_r, a_i);
    assert.ndCloseTo( a, ndarray([4, 3, 3, -4, 10, 5],[3,2]), 1e-8 );
  });

  it('copy',function() {
    cblas1.copy(a_r,a_i,b_r,b_i);
    assert.ndCloseTo(a,a0, 1e-8);
    assert.ndCloseTo(b,a0, 1e-8);
  });

  it('cpsc',function() {
    cblas1.cpsc(2,-1,a_r,a_i,b_r,b_i);
    assert.ndCloseTo(a,a0, 1e-8);
    assert.ndCloseTo(b, ndarray([4,3,3,-4,10,5],[3,2]), 1e-8);
  });

  it('axpy',function() {
    cblas1.axpy(2, -1, a_r, a_i, b_r, b_i);
    assert.ndCloseTo( b, ndarray([ 6, 6, 4, -4, 14, 2], [3,2]), 1e-8 );
  });

  it('dotu',function() {
    var result = cblas1.dotu(a_r,a_i,b_r,b_i)
    var result2 = ndarray(new Float64Array(result));
    assert.ndCloseTo( result2, ndarray(new Float64Array([22,13])), 1e-8 );
  });

  it('doth',function() {
    var result = cblas1.doth(a_r,a_i,b_r,b_i)
    var result2 = ndarray(new Float64Array(result));
    assert.ndCloseTo( result2, ndarray(new Float64Array([10,-25])), 1e-8 );
  });

  it('nrm2',function() {
    assert.closeTo( cblas1.nrm2(a_r,a_i), 5.9160797830996161, 1e-8);
  });

  it('asum',function() {
    assert.closeTo( cblas1.asum(a_r,a_i), 1 + 2 + 2 + 1 + 3 + 4, 1e-8 );
  });

  xit('iamax',function() {
    assert.closeTo( cblas1.iamax(a_r,a_i), 3 );
  });




});

