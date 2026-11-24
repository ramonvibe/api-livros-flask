import { useState } from 'react'
import './App.css'

// O proxy do Vite encaminha /api para o Flask em http://127.0.0.1:5000
const API_URL = '/api/livros'

function App() {
  const [livros, setLivros] = useState([])
  const [carregando, setCarregando] = useState(false)
  const [erro, setErro] = useState('')

  // Só é chamada no clique do botão
  async function buscarLivros() {
    setCarregando(true)
    setErro('')
    setLivros([])

    try {
      const response = await fetch(API_URL, { method: 'GET' })

      if (!response.ok) {
        throw new Error(`Erro HTTP ${response.status}`)
      }

      const dados = await response.json()
      setLivros(dados.livros)
    } catch (e) {
      console.error(e)
      setErro('Não foi possível buscar os livros. Confira se a API Flask está rodando na porta 5000 e tente de novo.')
    } finally {
      setCarregando(false)
    }
  }

  return (
    <main className="container">
      <header>
        <h1>Catálogo de Livros</h1>
        <button type="button" onClick={buscarLivros} disabled={carregando}>
          Buscar Livros
        </button>
      </header>

      <div className="mensagens" aria-live="polite">
        {carregando && <p className="carregando">Carregando livros...</p>}
        {erro && <p className="erro" role="alert">{erro}</p>}
        {!carregando && !erro && livros.length === 0 && (
          <p className="vazio">Nenhum livro carregado ainda.</p>
        )}
      </div>

      <ul className="livros">
        {livros.map((livro) => (
          <li key={livro.id} className="livro">
            <dl>
              <dt>ID</dt>
              <dd>{livro.id}</dd>
              <dt>Título</dt>
              <dd className="titulo">{livro.titulo}</dd>
              <dt>Autor</dt>
              <dd>{livro.autor}</dd>
              <dt>Ano</dt>
              <dd>{livro.ano}</dd>
            </dl>
          </li>
        ))}
      </ul>
    </main>
  )
}

export default App
