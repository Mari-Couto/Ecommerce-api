class Pedido {
    constructor(produto_id, quantidade, produto_nome, preco_unitario){
        this.produto_id = produto_id,
        this.produto_nome = produto_nome,
        this.quantidade = quantidade,
        this.preco_unitario = preco_unitario

    }
}

module.exports = Pedido