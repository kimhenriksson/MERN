
const contentNode = document.getElementById('contents');

const continents = ['Africa','America','Asia','Australia','Europa'];
const message = continents.map(c => `Hello ${c}!`).join('<br>');

const component = <p>{message}</p>;
console.log("in App.jsx");
ReactDOM.render(component,contentNode);
