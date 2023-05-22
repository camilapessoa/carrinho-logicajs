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
let itensCompras = 0;

const compras = () => {
  IdProduto = parseInt(readline.question("Digite um ID do produto\n"));

  procuraId = produtos.find((item) => item.id === IdProduto);
  if (!procuraId) {
    console.log("Id inválido");
    return compras(); //recursão
  }

  const quantity = parseInt(readline.question("Digite a quantidade desejada\n"))

  const produtosNoCarrinho = {...procuraId, quantidade: quantity }
  array.push(produtosNoCarrinho)

  const continuarComprando = readline.keyInYNStrict("Deseja inserir mais algum produto?")
};
compras();

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  currency: "BRL",
  style: "currency"
})

class Order {
  constructor(array){
    this.userItems = array
    this.date = new Date()
    this.subtotal = 0
  }

  calcularSubtotal(){
    this.subtotal = this.userItems.reduce((acumulador, item) => acumulador + (item.preco * item.quantidade), 0)
    return {
      formatted: currencyFormatter.format(this.subtotal),
      raw: this.subtotal,
    }
  }

  get orderDate(){
    const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric'}
   return this.date.toLocaleDateString('pt-BR', options)
  }

}

const order = new Order(array)
console.table(order.userItems)
console.log(order.calcularSubtotal())
console.log(order.orderDate)
