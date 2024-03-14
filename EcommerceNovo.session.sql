SELECT * FROM osprodutos;

SELECT * FROM ospedidos;

SELECT ospedidos.*, osprodutos.*
FROM ospedidos
INNER JOIN osprodutos ON ospedidos.produto_id = osprodutos.id;
