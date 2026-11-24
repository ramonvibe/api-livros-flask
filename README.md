# API de Livros — Flask + React

Atividade da disciplina **Programação — Web Coding** (AV2 — Revisão 1 e 2).

- **Lista 1:** API mínima em Python/Flask com a rota `GET /livros`, que retorna três livros em JSON (arquivos na raiz: `app.py`, `requirements.txt`).
- **Lista 2:** interface React (Vite) em `frontend-livros/` com o botão **Buscar Livros**, que consulta a API e mostra os livros na tela.

## Estrutura

```
api-livros-flask/
├── app.py                  # API Flask
├── requirements.txt        # Dependências Python
├── README.md
└── frontend-livros/        # Interface React (Vite)
    ├── public/
    ├── src/
    │   ├── App.jsx
    │   ├── App.css
    │   └── main.jsx
    ├── index.html
    ├── package.json
    └── vite.config.js
```

---

## Parte 1 — API Flask

### Objetivo

Disponibilizar o catálogo de uma livraria em uma rota HTTP GET que retorna, em JSON, três livros com `id`, `titulo`, `autor` e `ano`.

### Instalação das dependências

```bash
python -m venv venv

# Linux/macOS
source venv/bin/activate
# Windows
venv\Scripts\activate

pip install -r requirements.txt
```

Para reconstruir o ambiente: apague a pasta `venv`, recrie com `python -m venv venv` e rode `pip install -r requirements.txt` de novo.

### Execução

```bash
python app.py
```

### Rota disponibilizada

| Método | Endereço                        |
|--------|---------------------------------|
| GET    | http://127.0.0.1:5000/livros    |

Exemplo de resposta:

```json
{
  "livros": [
    {"id": 1, "titulo": "Dom Casmurro", "autor": "Machado de Assis", "ano": 1899},
    {"id": 2, "titulo": "O Cortiço", "autor": "Aluísio Azevedo", "ano": 1890},
    {"id": 3, "titulo": "A Hora da Estrela", "autor": "Clarice Lispector", "ano": 1977}
  ]
}
```

---

## Parte 2 — Frontend React

### Instalação e execução

Requer Node.js. Com a API Flask **já rodando** na porta 5000, em outro terminal:

```bash
cd frontend-livros
npm install
npm run dev
```

Abra o endereço mostrado pelo Vite (normalmente http://localhost:5173) e clique em **Buscar Livros**.

### Funcionamento

- A requisição só é feita quando o botão é clicado (`onClick={buscarLivros}`).
- `fetch('/api/livros')` faz o GET; o proxy do Vite (`vite.config.js`) encaminha `/api/livros` para `http://127.0.0.1:5000/livros`, evitando problemas de CORS.
- O código confere `response.ok`, converte com `response.json()` e guarda os livros no estado (`useState`).
- Os livros são renderizados com `map()`, usando `key={livro.id}`.
- Durante a consulta aparece **"Carregando livros..."**; se a API estiver fora do ar, aparece uma mensagem de erro.

### Testes

1. Inicie a API e confirme que `GET /livros` retorna os três livros.
2. Inicie o React e abra a página: o título e o botão aparecem, sem livros ainda.
3. Clique em **Buscar Livros**: os três livros aparecem.
4. Pare o Flask e clique de novo: aparece a mensagem de erro.

---

## Questões para revisão

### Lista 1 — Flask

1. **Finalidade de `Flask(__name__)`:** cria a instância da aplicação. O `__name__` diz ao Flask qual é o módulo principal, para ele localizar recursos (templates, arquivos estáticos) a partir desse local.
2. **Função de `@app.route()`:** é um decorador que associa uma URL (e métodos HTTP) a uma função. Quando a URL é acessada, o Flask executa essa função e devolve o retorno como resposta.
3. **Por que `/livros` usa GET:** porque a rota apenas consulta/lê dados, sem criar, alterar ou excluir nada. GET é o método HTTP para leitura.
4. **Finalidade de `jsonify()`:** converte dicionários/listas Python em uma resposta HTTP com corpo JSON e cabeçalho `Content-Type: application/json`.
5. **Lista Python x JSON:** a lista Python é uma estrutura de dados em memória, que só existe dentro do programa. O JSON é texto em formato padronizado, enviado pela rede, que qualquer linguagem ou sistema consegue ler.
6. **`app.run(debug=True)`:** inicia o servidor de desenvolvimento (por padrão em 127.0.0.1:5000) com modo debug: recarrega sozinho quando o código muda e mostra erros detalhados. Não deve ser usado em produção.
7. **Endereço para consulta local:** http://127.0.0.1:5000/livros

### Lista 2 — React

1. **Finalidade de um componente React:** é uma parte reutilizável da interface (uma função que retorna JSX), com sua própria lógica e estado. A tela é montada combinando componentes.
2. **Função de `onClick`:** associa uma função ao evento de clique; o React a executa quando o usuário clica no botão.
3. **Por que o `fetch()` fica na função do clique:** para que a consulta aconteça só quando o usuário pedir, e não automaticamente ao carregar a página ou a cada renderização.
4. **Finalidade de `response.json()`:** lê o corpo da resposta HTTP e converte o texto JSON em objeto JavaScript (retorna uma Promise).
5. **Por que guardar no estado:** quando o estado muda, o React renderiza o componente de novo e mostra os dados novos. Uma variável comum não provoca essa atualização da tela.
6. **Função de `map()`:** percorre a lista de livros e transforma cada livro em um elemento JSX para ser exibido.
7. **Por que usar `key`:** a key identifica cada item da lista de forma única, permitindo que o React saiba qual item mudou, foi adicionado ou removido e atualize a tela de forma correta e eficiente.
8. **Se a API estiver indisponível:** a interface deve capturar o erro (`try/catch`) e mostrar uma mensagem informando que não foi possível buscar os livros, em vez de falhar em silêncio.
