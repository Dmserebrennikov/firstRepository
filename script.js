'use strict';

function next() {
  let i = 0;
  function check() {
    return ++i;
  }
  return check;
}

let g = next();
console.log(g());
console.log(g());
