const recast = require("recast");
const {
  variableDeclaration,
  variableDeclarator,
  functionExpression,
  arrowFunctionExpression,
} = recast.types.builders;

const code = `function add (a, b) {
    return a + b
    }`;

const ast = recast.parse(code);
const add = ast.program.body[0];

ast.program.body[0] = variableDeclaration("var", [
  variableDeclarator(add.id, arrowFunctionExpression(add.params, add.body)),
]);
const output = recast.prettyPrint(ast, { tabWidth: 2 }).code;
console.log(typeof recast.print(ast).code);
eval(recast.print(ast).code);
// console.log(add("1", 2));
console.log(output);
document.body.innerHTML = output;
import { a } from "./test";
console.log(a, 1234);

class PromiseS {
  stack = [];
  data = [];
  status = "pedding";
  rej = (data) => {
    this.status = "done";
    this.data = data;
    this.stack.length && this.stack.pop()(this.data);
  };
  constructor(cbk) {
    cbk(this.rej);
  }
  then = (a) => {
    if (this.status === "pedding") {
      this.stack.push(a);
    } else {
      a(this.data);
    }
  };
}
const s = new PromiseS((rej, rep) => {
  setTimeout(() => {
    rej(3344);
  }, 3000);
});
s.then((rej) => {
  console.log(rej);
});
