'use strict';

//PROXY
//Syntax: let proxy = new Proxy(target, handler)
//iterable

let target = {};
let proxy = new Proxy(target, {});

proxy.test = 10;
console.log(proxy.test);
console.log(target.test);

for (let key in proxy) {
  console.log(key); //test
}
