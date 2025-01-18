---
layout: post
title: Short Notes on Fuzzy Logic
date: 2015-06-10 08:36 +0800
categories:
   - Academic
   - Computer Science
author: chris
tags:
   - Fuzzy Logic
   - Computer Science
permalink: /blog/comp-sci/fuzzy-logic
amp:
   youtube: true
image:
   path: /images/posts/notebook-4839909_o128.png
   hide: true
excerpt: A summary about the types of Fuzzy Logic and their applications in control systems.
---

{% include toc.md %}

## What is Fuzzy Logic

<i class="far fa-play-circle"></i> **Suggested Video**
{% include youtube.html id="rln_kZbYaWc" title="An Introduction to Fuzzy Logic" %}

## Fuzzy Inference Systems (FIS)

### Mamdani-Type and Takagi-Sugeno-Kang (TSK)-Type FIS

There are mainly two types of fuzzy inference systems, namely,

+ Mamdani-type {% cite mamdani_experiment_1975 mamdani_advances_1976 %}
  + fuzzy consequents (also being called type-I)
  + Singleton consequents (also being called type-II)
+ TSK-type (also being called type-III) {% cite tanaka_stability_1992 %}

#### Mamdani-type FIS

Characteristics:

+ A model-free approach
+ Mainly based on human skills and experience (, or expert/prior knowledge)
+ Possibly achieve the performance with generally satisfactory

Shortages:

+ Lack of systematic approaches for the design of control systems
+ Cannot guarantee the stability, controllability, parametric sensitivity and robustness {% cite sugeno_stability_1999 precup_survey_2011 %}

#### TSK-type FIS

Advantages:

+ Any model-based technique (including a nonlinear one) can be applied to the fuzzy dynamic models
+ The FL controller can be considered as a fuzzy system, usually based on a set of local linear models

### Principal Design Parameters For FIS

1. fuzzification strategies and the interpretation  of a fuzzification  operator (fuzzifier),
2. data base:

   {:type="a"}
   1. discretization/normalization of universes of discourse,
   2. fuzzy partition of the input and output spaces,
   3. completeness,
   4. choice of the membership function of a primary fuzzy set;

3. rule base:

   {:type="a"}
   1. choice of process state (input)  variables and control (output) variables of fuzzy control rules,
   2. source and derivation of fuzzy control rules,
   3. types of fuzzy control rules,
   4. consistency, interactivity, completeness of fuzzy control rules;

4. decision making logic:

   {:type="a"}
   1. definition of a fuzzy implication,
   2. interpretation of the sentence connective and,
   3. interpretation of the sentence connective also,
   4. definitions of a compositional operator,
   5. inference mechanism;

5. defuzzification strategies and the interpretation of a defuzzification operator (defuzzifier).

### Adaptive Fuzzy Systems

An adaptive fuzzy system is has a supervisory module, which can learn the data from the process to modify the components of the fuzzy system, such as {% cite precup_survey_2011 %}

+ the size of the membership functions of the fuzzy sets,
+ the position of the membership functions, and
+ the rule weights and/or the link values.

The adaptation of the size of the membership functions is often implemented by monitoring four criteria of error correction:

1. The error average value (<var>EAV</var>)
1. Its first derivative (<var>ΔEAV</var>)
1. Maximum value of the error (<var>V_err</var>)
1. The average value of the output values (<var>UAV</var>)

The adaptation of the position of the membership functions typically uses a clustering algorithm to identify the data clusters.

The adaptation of the rule base is performed by increasing or decreasing the rule weights between **0** and **1**; in addition, the adaptation of the link values is the concept derived from neutral networks and is not natural for fuzzy systems.

## Fuzzy Logic applications

### Fuzzy Logic controller (FLC) / control systems

> **Fuzzy control** is originally introduced as a model-free control design approach, model-based fuzzy control has gained widespread significance in the past decade. {% cite precup_survey_2011 %}

Lee {% cite lee_fuzzy_1990 %} gave an overview of fuzzy logic controllers by 1990. The review paper summarized the concept and the structure of fuzzy logic controllers. It also provided a survey of the methods of fuzzifying membership functions, defining the rule base, and justification of fuzzy control rules.

Some Mamdani-type FLC are listed below {% cite precup_survey_2011 %}:

+ Control of machining processes
+ Laser tracking systems
+ Plastic injection molding
+ Vibration suppression
+ Manufacturing area related to robotics, such as manipulators and mobile robots

Other FLC:

+ Fuzzy Statistical Process Control {% cite ross_fuzzy_2004 %}

## Fuzzy Logic in Python

<i class="far fa-play-circle"></i> **Suggested Video**
{% include youtube.html id="qUQf1JxnTnY" title="Scikit-Fuzzy: A New SciPy Toolkit for Fuzzy Logic; SciPy 2013 Presentation" %}

## References

{% bibliography --cited %}
