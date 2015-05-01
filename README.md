# ndarray-blas-level1-complex

[![Build Status](https://travis-ci.org/scijs/ndarray-blas-level1-complex.svg?branch=master)](https://travis-ci.org/scijs/ndarray-blas-level1-complex) [![npm version](https://badge.fury.io/js/ndarray-blas-level1-complex.svg)](http://badge.fury.io/js/ndarray-blas-level1-complex)

BLAS Level 1 operations for complex-valued [ndarrays](https://github.com/scijs/ndarray)


## A note on working with complex ndarrays

ndarrays only hold real numbers of varying types and javascript has no native complex type, so the best we can do for now is to try to encapsulate a decent amount of that. This library deals with vectors, but to start with the more general case of storing, for example, the matrix

![sample matrix](/docs/images/sample-matrix.png),

here are two methods:

1. Store the real and imaginary components in multiple arrays:

```javascript
var a_r = ndarray([1,3,7, -2,1,-5], [2,3]),
    a_i = ndarray([2,4,8,  4,-2,6], [2,3]);
```

2. Interleave the real and imaginary components:

```javascript
var a = ndarray([1,2,3,4,7,8,-2,4,1,-2,-5,6], [2,3,2]),
    a_r = a.pick(null,null,0),
    a_i = a.pick(null,null,1);
```

In this example, there's an additional final dimension of the array. This applies to vectors, matrices, and higher-dimensional arrays.

I won't comment on the relative effiency of each method.


## Usage

This library implements the basic vector operations of the Level 1 Basic Linear Algebra Subprograms (BLAS). Many of these functions are also implemented in [ndarray-ops](https://github.com/scijs/ndarray-ops)—which also has functions that are not included in BLAS. So the right answer is probably some blend of the two. This library exists mainly to frame things in a relatively standard, coherent framework.

*NB: This library performs no checks to ensure you're only passing one-dimensional vectors. That's either a bug or a feature, depending on how you think about it.*

| Function | Operation | Description |
| -------- | --------- | ----------- |
| `swap(x_r,x_i,y_r,y_i)` | ![swap](/docs/images/swap.png) | Swap the elements of x and y |
| `scal(alpha,x_r,x_i)` | ![scal](/docs/images/scal.png) | Multiple vector x by scalar alpha |
| `copy(x_r,x_i,y_r,y_i)` | ![copy](/docs/images/copy.png) | Copy x into y |
| `axpy(alpha, x_r,x_i, y_r,y_i)` | ![axpy](/docs/images/axpy.png) | Multiple x by alpha and add it to y |
| `cpsc(alpha, x_r,x_i, y_r,y_i)` | ![cpsc](/docs/images/cpsc.png) | Multiply x by alpha and assign it to y |
| `dotu(x_r,x_i,y_r,y_i)` | ![dot](/docs/images/dotu.png) | Calculate the product transpose(x) * y. |
| `doth(x_r,x_i,y_r,y_i)` | ![dot](/docs/images/doth.png) | Calculate the product conj(x) * y. |
| `nrm2(x_r,x_i)` | ![nrm2](/docs/images/nrm2.png) | Calculate the 2-norm of x |
| `asum(x_r,x_i)` | ![asum](/docs/images/asum.png) | Calculate the 1-norm of x |
| `iamax(x_r,x_i)` |  | Not yet implemented |


## Example

Usage should be pretty straightforward. There aren't really any options or variations.

```javascript
var cblas1 = require('ndarray-blas-level1-complex');

var x = ndarray([1,2,3,5,6,7],[3,2]);
var y = ndarray([3,4,5,2,3,1],[3,2]);

var x_r = x.pick(null,0),
    x_i = x.pick(null,1),
    y_r = y.pick(null,0),
    y_i = y.pick(null,1);

cblas1.axpy( 2, 3, x_r, x_i, y_r, y_i );
```


## Credits
(c) 2015 Ricky Reusser. MIT License
