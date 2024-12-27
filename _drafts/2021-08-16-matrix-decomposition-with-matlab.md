---
layout: post
title: Matrix Decomposition With MATLAB
date: 2014-10-08 16:15 +0800
categories: [Academic]
author: chris
tags: [MATLAB, Linear Algebra]
permalink: /blog/matlab/matrix-decomposition-with-matlab
image: 
   path: /images/posts/.png
#excerpt: 
---

[L,U,P] = lu(A)
L = tril(A)
D = diag(A)
U = triu(A)

[LU matrix factorization - MATLAB lu](https://www.mathworks.com/help/matlab/ref/lu.html)
[Create diagonal matrix or get diagonals from symbolic matrices - MATLAB diag](https://www.mathworks.com/help/symbolic/diag.html)
[Return lower triangular part of symbolic matrix - MATLAB tril](https://www.mathworks.com/help/symbolic/tril.html)
[Return upper triangular part of symbolic matrix - MATLAB triu](https://www.mathworks.com/help/symbolic/triu.html)

factorizes the full or sparse matrix A into an upper triangular matrix U and a permuted lower triangular matrix L such that A = L*U.
also returns a permutation matrix P such that A = P'*L*U. With this syntax, L is unit lower triangular and U is upper triangular.

Compute the LU factorization of a matrix and examine the resulting factors. LU factorization is a way of decomposing a matrix A into an upper triangular matrix U, a lower triangular matrix L, and a permutation matrix P such that PA=LU.


Solve Linear System with LU Factorization


Solve a linear system by performing an LU factorization and using the factors to simplify the problem.


Matrix Structure
bandwidth	Lower and upper matrix bandwidth
tril	Lower triangular part of matrix
triu	Upper triangular part of matrix

istril	Determine if matrix is lower triangular
istriu	Determine if matrix is upper triangular

isdiag	Determine if matrix is diagonal

[Matrix Decomposition (or factorization in Matlab)](https://www.matrixlab-examples.com/matrix-decomposition.html)

## Learn More About Linear Algeba

[Essence of linear algebra - YouTube](https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab)
