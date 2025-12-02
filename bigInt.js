'use strict';

//BIGINT provide integers of arbitrary length
{
  const bigint = 1234567890123456789012345678901234567890n;

  const sameBigint = BigInt('1234567890123456789012345678901234567890');

  const bigintFromNumber = BigInt(10); // same as 10n
}

//Math operators
console.log(1n + 2n); //3n
console.log(5n / 2n); //2n

//NOTES: All operations on bigints return bigints.
//We can’t mix bigints and regular numbers
//Convert type to do the math:
let bigint = 1n;
let number = 2;

// number to bigint
console.log(bigint + BigInt(number)); // 3n

// bigint to number
console.log(Number(bigint) + number); // 3

{
  //NOTES: The unary plus (convert value to number) is not supported on bigints
  let bigint = 1n;

  // alert(+bigint); // error
}

//Comparisons
console.log(2n > 1n); // true
console.log(2n > 1); // true
console.log(1 == 1n); // true
console.log(1 === 1n); // false
