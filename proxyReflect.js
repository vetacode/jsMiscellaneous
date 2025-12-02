'use strict';

//PROXY: is a special “exotic object”. It doesn’t have own properties
//Syntax: let proxy = new Proxy(target, handler)
//iterable

let target = {};
let proxy = new Proxy(target, {
  /*traps*/
});

proxy.test = 10; //set value on the target
console.log(proxy.test); //return value from target
console.log(target.test); //return value from target

for (let key in proxy) {
  console.log(key); //test, return value from target
}

//PROXY HANDLER METHOD
/**
 * 
Internal Method       |	Handler Method            |	Triggers when…
------------------------------------------------------------------------------------------------------------
[[Get]]	              | get	                     |  reading a property
[[Set]]               |	set                      |	writing to a property
[[HasProperty]]	      | has                      |  in operator
[[Delete]]            |	deleteProperty           |	delete operator
[[Call]]              |	apply                    |	function call
[[Construct]]         |	construct                |	new operator
[[GetPrototypeOf]]    |	getPrototypeOf	         |  Object.getPrototypeOf
[[SetPrototypeOf]]    |	setPrototypeOf           |	Object.setPrototypeOf
[[IsExtensible]]      |	isExtensible             |	Object.isExtensible
[[PreventExtensions]] |	preventExtensions        |	Object.preventExtensions
[[DefineOwnProperty]] |	defineProperty           |	Object.defineProperty, Object.defineProperties
[[GetOwnProperty]]    |	getOwnPropertyDescriptor |	Object.getOwnPropertyDescriptor, for..in, Object.keys/values/entries
[[OwnPropertyKeys]]   |	ownKeys	                 |  Object.getOwnPropertyNames, Object.getOwnPropertySymbols, for..in, Object.keys/values/entries
 */

//Default value with “get” trap

/**
 * let user = {
  name: "John"
};

function wrap(target) {
  return new Proxy(target, {
      / your code /
  });
}

user = wrap(user);

alert(user.name); // John
alert(user.age); // ReferenceError: Property doesn't exist: "age"
 */

let user = {
  name: 'Willy',
};
console.log(user.age); //undefined

function wrap(target) {
  return new Proxy(target, {
    get(target, prop, receiver) {
      if (prop in target) {
        return Reflect.get(target, prop, receiver);
      } else {
        throw new ReferenceError(`Property doesnt exist: '${prop}'`);
      }
    },
  });
}

user = wrap(user);
console.log(user.name);
console.log(user.age); // show ref error we set in the function wrap
