---
title: "Test"
date: 2021-03-22T17:37:56+05:30
lastmod: 2021-03-22T17:37:56+05:30
draft: true
keywords: []
description: ""
tags: []
categories: []
author: ""
hiddenFromHomePage: true
layout: "page"
# scrollama 
scrollama: true
---

Test page

<!--more-->
<style>
      #scrolly {
        position: relative;
        background-color: #f3f3f3;
        padding: 1rem;
      }

      article {
        position: relative;
        padding: 0;
        max-width: 20rem;
        margin: 0 auto;
      }

      figure {
        position: -webkit-sticky;
        position: sticky;
        left: 0;
        width: 100%;
        margin: 0;
        -webkit-transform: translate3d(0, 0, 0);
        -moz-transform: translate3d(0, 0, 0);
        transform: translate3d(0, 0, 0);
        background-color: #8a8a8a;
        z-index: 0;
      }

      figure p {
        text-align: center;
        padding: 1rem;
        position: absolute;
        top: 50%;
        left: 50%;
        -moz-transform: translate(-50%, -50%);
        -webkit-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        font-size: 8rem;
        font-weight: 900;
        color: #fff;
      }

      .step {
        margin: 0 auto 2rem auto;
        color: #fff;
        background-color: rgba(0, 0, 0, 0.1);
      }

      .step:last-child {
        margin-bottom: 0;
      }

      .step.is-active p {
        background-color: goldenrod;
        color: #3b3b3b;
      }

      .step p {
        text-align: center;
        padding: 1rem;
        font-size: 1.5rem;
        background-color: #3b3b3b;
      }
    </style>

<section id="intro">
<h1 class="intro__hed">Basic Example</h1>
<p class="intro__dek">
    Start scrolling to see how it works.
</p>
</section>

<section id="scrolly">
  <article>
    <div class="step" data-step="1">
      <p>STEP 1</p>
    </div>
    <div class="step" data-step="2">
      <p>STEP 2</p>
    </div>
    <div class="step" data-step="3">
      <p>STEP 3</p>
    </div>
    <div class="step" data-step="4">
      <p>STEP 4</p>
    </div>
  </article>

  <figure>
    <p>0</p>
  </figure>
</section>


{{<scrollama >}}