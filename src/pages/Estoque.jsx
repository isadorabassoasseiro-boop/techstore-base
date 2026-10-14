// Página usada pelo time de estoque para acompanhar a quantidade de cada produto
export default function Estoque({ produtos }) {
  const ordenados = produtos.slice().sort((a, b) => a.estoque - b.estoque)

  const resumoPorCategoria = produtos.reduce((acc, produto) => {
    if (!acc[produto.category]) {
      acc[produto.category] = {
        valorEstoque: 0,
        unidades: 0,
        semPreco: 0,
      }
    }

    acc[produto.category].unidades += produto.estoque

    if (produto.price != null && produto.price !== undefined) {
      acc[produto.category].valorEstoque += produto.estoque * produto.price
    } else {
      acc[produto.category].semPreco += 1
    }

    return acc
  }, {})

  const semPreco = produtos.filter(
    (produto) => produto.price === undefined || produto.price === null
  )

  return (
    <section>
      <p className="sobretitulo">Área interna</p>
      <h1>Estoque</h1>
      <p className="aviso">Produtos com menos de 5 unidades precisam de reposição.</p>

      <div className="cards-resumo">
        {Object.entries(resumoPorCategoria).map(([categoria, dados]) => (
          <div key={categoria} className="card-resumo">
            <h2>{categoria}</h2>
            <p>Valor em estoque: R$ {dados.valorEstoque.toFixed(2).replace('.', ',')}</p>
            <p>Unidades: {dados.unidades}</p>
            <p>Sem preço: {dados.semPreco}</p>
          </div>
        ))}
      </div>

      <div className="bloco-lista">
        <h2>Produtos aguardando preço</h2>
        {semPreco.length === 0 ? (
          <p>Nenhum produto aguardando preço.</p>
        ) : (
          <ul>
            {semPreco.map((produto) => (
              <li key={produto.id}>
                {produto.title} — {produto.category}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="tabela-moldura">
        <table className="tabela">
          <thead>
            <tr>
              <th>Produto</th>
              <th>Categoria</th>
              <th>Unidades</th>
              <th>Situação</th>
            </tr>
          </thead>
          <tbody>
            {ordenados.map((produto) => (
              <tr key={produto.id}>
                <td>{produto.title}</td>
                <td>{produto.category}</td>
                <td>{produto.estoque}</td>
                <td>
                  {produto.estoque === 0 && <span className="selo selo-esgotado">Esgotado</span>}
                  {produto.estoque > 0 && produto.estoque < 5 && (
                    <span className="selo selo-alerta">Repor</span>
                  )}
                  {produto.estoque >= 5 && <span className="selo selo-ok">OK</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}