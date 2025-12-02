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

/**TASK 1
 * Error on reading non-existent property
Usually, an attempt to read a non-existent property returns undefined.

Create a proxy that throws an error for an attempt to read of a non-existent property instead.

That can help to detect programming mistakes early.

Write a function wrap(target) that takes an object target and return a proxy that adds this functionality aspect.

That’s how it should work:
 * 
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
// console.log(user.age); // show ref error we set in the function wrap

/**TASK 2
 * Accessing array[-1]
In some programming languages, we can access array elements using negative indexes, counted from the end.

Like this:

let array = [1, 2, 3];

array[-1]; // 3, the last element
array[-2]; // 2, one step from the end
array[-3]; // 1, two steps from the end
In other words, array[-N] is the same as array[array.length - N].

Create a proxy to implement that behavior.

That’s how it should work:

let array = [1, 2, 3];

array = new Proxy(array, {
  /* your code /
});

alert( array[-1] ); // 3
alert( array[-2] ); // 2

// Other array functionality should be kept "as is"
 */

let array = [1, 2, 3];

array[-1];
array[-2];
console.log(array[-1]); // undefined
console.log(array[-2]); // undefined

console.log(array.at(-1)); //3
console.log(array.at(-2)); //2

//Pake PROXY supaya array bisa pake index negatif

array = new Proxy(array, {
  get(target, prop, receiver) {
    if (prop < 0) {
      prop = +prop + target.length;
    }
    return Reflect.get(target, prop, receiver);
  },
});

console.log(array[1]); // 2
console.log(array[-1]); // 3
console.log(array[-2]); // 2

/**TASK 3
 * Observable
Create a function makeObservable(target) that “makes the object observable” by returning a proxy.

Here’s how it should work:

function makeObservable(target) {
  /* your code /
}

let user = {};
user = makeObservable(user);

user.observe((key, value) => {
  alert(`SET ${key}=${value}`);
});

user.name = "John"; // alerts: SET name=John
In other words, an object returned by makeObservable is just like the original one, but also has the method observe(handler) that sets handler function to be called on any property change.

Whenever a property changes, handler(key, value) is called with the name and value of the property.

P.S. In this task, please only take care about writing to a property. Other operations can be implemented in a similar way.
 */
{
  let handlers = Symbol('handlers');

  function makeObservable(target) {
    // 1. Initialize handlers store
    target[handlers] = [];

    // Store the handler function in array for future calls
    target.observe = function (handler) {
      this[handlers].push(handler);
    };

    // 2. Create a proxy to handle changes
    return new Proxy(target, {
      set(target, property, value, receiver) {
        let success = Reflect.set(...arguments); // forward the operation to object
        if (success) {
          // if there were no error while setting the property
          // call all handlers
          target[handlers].forEach((handler) => handler(property, value));
        }
        return success;
      },
    });
  }

  let user = {};

  user = makeObservable(user);

  user.observe((key, value) => {
    console.log(`SET ${key}=${value}`); //'SET name=John'
  });

  user.name = 'John';
}
