class Pedido {
    constructor(idpedido, produto_id, quantidade, data_pedido, produto_nome, preco_unitario, produto_descricao, file){
        this.idpedido = idpedido,
        this.produto_id = produto_id,
        this.produto_nome = produto_nome,
        this.quantidade = quantidade,
        this.data_pedido = data_pedido,
        this.preco_unitario = preco_unitario,
        this.produto_descricao = produto_descricao,
        this.file = file;

    }
}

module.exports = Pedido