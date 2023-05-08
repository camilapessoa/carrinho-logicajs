const db = require("./database.js");
const readline = require("readline-sync");
console.log("Projeto Carrinho de Compras - lógica");

//console.log(db);

const { produtos } = db;
// produtos.sort((a, b) => b.preco - a.preco);

// for (const produto of produtos) {
//   console.log(produto);
// }

console.table(produtos);

const array = new Array();

let IdProduto;
let procuraId;
let itensCompras;

const compras = () => {
  IdProduto = parseInt(readline.question("Digite um ID do produto\n"));

  procuraId = produtos.find((item) => item.id === IdProduto);
  if (!procuraId) {
    console.log("Id inválido");
    return compras(); //recursão
  }
};
compras();
