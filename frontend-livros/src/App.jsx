import { useState } from 'react'
import './App.css'

// Endereço da API. Usa o proxy do Vite (/api -> http://127.0.0.1:5000)
const API_URL = '/api/livros'

function App() {
  // Estado que armazena os livros recebidos da API
  const [livros, setLivros] = useState([])
  const [carregando, setCarregando] = useState(false)
  const [erro, setErro] = useState('')

  // Função executada somente quando o botão é clicado
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
      setErro('Não foi possível buscar os livros. Verifique se a API Flask está em execução.')
    } finally {
      setCarregando(false)
    }
  }

  return (
    <main className="container">
      <h1>Catálogo de Livros</h1>

      <button onClick={buscarLivros} disabled={carregando}>
        Buscar Livros
      </button>

      {/* Área de mensagens */}
      <div className="mensagens">
        {carregando && <p className="carregando">Carregando livros...</p>}
        {erro && <p className="erro">{erro}</p>}
      </div>

      {/* Área de exibição dos livros */}
      <section className="livros">
        {livros.map((livro) => (
          <article key={livro.id} className="livro">
            <p><strong>ID:</strong> {livro.id}</p>
            <p><strong>Título:</strong> {livro.titulo}</p>
            <p><strong>Autor:</strong> {livro.autor}</p>
            <p><strong>Ano:</strong> {livro.ano}</p>
          </article>
        ))}
      </section>
    </main>
  )
}

export default App
