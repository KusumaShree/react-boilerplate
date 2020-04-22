console.log("utils.js is running")

const square = (x) => { return x *x};
const cube = (x) => { return x*x*x};

const subtract = (a,b) => a - b; 
//exports two types
//1. named exports  -- export { square, cube };  -- can be as many as possible
//2. default exports -- export default square; -- can be only one 
// export default square;
// can export as when it is defined
//export const square = (x) => { return x *x};
//export const cube = (x) => { return x*x*x};
// export { square, cube, subtract as default}; -- in this case while importing it is going to look for a named subtact export

// export default subtract;
//cant put an statement infront of export default like export default const subtract = ().....
// can export just an expression as default
export default (a,b) => a-b;
// export { square, cube, subtract as default};