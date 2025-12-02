'use strict';

{
  let user = {
    name: 'John',
    go: function () {
      console.log(this.name); //john
    },
  };
  user.go(); // error!
}

let user = {
  name: 'John',
  go: function () {
    console.log(this.name);
  },
}(user.go)(); // error!
