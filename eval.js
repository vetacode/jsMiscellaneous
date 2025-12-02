'use strict';

//EVAL
//Syntax: let result = eval(code);

let sayHi = `console.log('Hellow')`;
eval(sayHi); //Hellow

let value = eval('let i = 0; ++i');
console.log(value); //1

{
  //Eval can access outer variable coz lexical env, closure
  let a = 10;

  function f() {
    // let a = 2;
    console.log(a); //10
    eval('console.log(a)'); //10
  }
  f();
}

{
  //Can change outrer variable as well
  let x = 3;
  eval('x=1');
  console.log(x); //1
}

{
  // in 'use strict' mode, eval have its own lexical environment
  // reminder: 'use strict' is enabled in runnable examples by default

  eval('let x = 5; function f() {}');
  console.log(typeof x); // undefined (no such variable)
  // function f is also not visible
  //NOTES: without 'use strict' mode, eval doesnt have its own lexical environment => can access x and f() outside
}
