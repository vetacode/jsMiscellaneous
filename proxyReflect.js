'use strict';

//PROXY: is a special “exotic object”. It doesn’t have own properties
//Syntax: let proxy = new Proxy(target, handler)
//iterable

let target = {};
let proxy = new Proxy(target, {});

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
