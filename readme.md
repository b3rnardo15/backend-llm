# Backend LLM Acadêmico

Projeto backend simples que realiza consultas a uma API de LLM gratuita (Groq) e entrega respostas dentro de um contexto educacional específico.

## 🚀 Tecnologias Utilizadas

- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **Groq API** - LLM gratuito (Llama 3)
- **CORS** - Permitir requisições cross-origin

## 📋 Pré-requisitos

- Node.js (versão 16 ou superior)
- NPM ou Yarn
- Chave da API Groq (gratuita)

## 🔧 Configuração

### 1. Clone/baixe o projeto e instale dependências

```bash
npm install
```

### 2. Configure as variáveis de ambiente

1. Copie o arquivo `.env.example` para `.env`
2. Acesse [console.groq.com](https://console.groq.com/keys)
3. Crie uma conta gratuita e gere uma API key
4. Adicione sua chave no arquivo `.env`:

```
GROQ_API_KEY=sua_chave_aqui_da_groq
PORT=3001
```

### 3. Execute o servidor

```bash
# Desenvolvimento (com auto-reload)
npm run dev

# Produção
npm start
```

O servidor estará rodando em `http://localhost:3001`

## 🧪 Como Testar o Sistema

### Método 1: Interface Visual (Recomendado)
1. Abra o arquivo `visual.html` no navegador
2. Clique em "Verificar Status do Servidor"
3. Use os botões de teste ou digite perguntas personalizadas
4. Veja a avaliação automática do contexto

### Método 2: Script Automático
```bash
npm test
```

### Método 3: Teste Manual (cURL)
```bash
# Verificar status
curl http://localhost:3001/api/status

# Fazer pergunta
curl -X POST http://localhost:3001/api/perguntar \
  -H "Content-Type: application/json" \
  -d '{"pergunta": "O que é JavaScript?"}'
```

## 📝 Endpoints da API

### GET `/api/status`
Verifica se o servidor está funcionando

**Resposta:**
```json
{
  "status": "Servidor funcionando",
  "contexto": "Você é um assistente educacional especializado..."
}
```

### POST `/api/perguntar`
Faz uma pergunta ao LLM

**Body:**
```json
{
  "pergunta": "O que é JavaScript?"
}
```

**Resposta:**
```json
{
  "pergunta": "O que é JavaScript?",
  "resposta": "JavaScript é uma linguagem de programação...",
  "contexto": "Assistente educacional de programação",
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

### GET `/api/modelos`
Lista os modelos LLM disponíveis

**Resposta:**
```json
{
  "modelos_disponiveis": ["llama3-8b-8192", "llama3-70b-8192"],
  "modelo_atual": "llama3-8b-8192",
  "provedor": "Groq (gratuito)"
}
```

## 🎯 Contexto Específico

O LLM está configurado com o seguinte contexto educacional:

> "Você é um assistente educacional especializado em programação e tecnologia. Responda de forma didática e clara, sempre incluindo exemplos práticos quando possível."

### Como Avaliar se o Contexto Funciona:

✅ **Sinais Positivos:**
- Resposta didática e clara
- Inclui exemplos de código
- Tom educacional ("vamos ver", "por exemplo")
- Foca em programação/tecnologia

❌ **Sinais de Problema:**
- Resposta muito genérica
- Sem exemplos práticos
- Tom robótico/formal
- Não mantém foco educacional

## 🔄 Personalização

### Alterar o contexto

Edite a variável `CONTEXT` no arquivo `server.js`:

```javascript
const CONTEXT = {
  role: "Seu novo contexto aqui...",
  maxTokens: 500
};
```

### Usar outro modelo

Altere o modelo na função `consultarLLM()`:

```javascript
model: 'llama3-70b-8192', // Modelo maior (mais lento)
```

### Alterar a porta

No arquivo `.env`:
```
PORT=4000
```

## 📁 Estrutura do Projeto

```
projeto/
│
├── server.js              # Servidor principal
├── package.json           # Dependências e scripts
├── .env.example          # Exemplo de configuração
├── .env                  # Suas configurações (não commitar)
├── test.js               # Script de teste automático
├── visual.html           # Interface visual para testes
└── README.md             # Este arquivo
```

## 🆓 Por que Groq?

- **Totalmente gratuito** para uso acadêmico
- **API simples** e bem documentada
- **Modelos poderosos** (Llama 3, Mixtral)
- **Rápido** e confiável
- **Sem necessidade de cartão de crédito**

## 🔍 Perguntas de Teste Sugeridas

Para testar o contexto educacional:

1. **"O que é JavaScript?"** → Deve explicar de forma didática
2. **"Como criar uma função em Python?"** → Deve incluir código
3. **"Explique o que são arrays"** → Deve dar exemplos práticos
4. **"Qual a capital da França?"** → Deve tentar voltar para tech

## ⚠️ Resolução de Problemas

### Erro: "address already in use"
```bash
# Usar outra porta
PORT=3002 npm run dev

# Ou matar processo na porta 3001
netstat -ano | findstr :3001
taskkill /PID <numero_pid> /F
```

### Erro 401: API key inválida
- Verifique se copiou a chave corretamente no `.env`
- Confirme que a chave está ativa no console da Groq

### Erro 429: Muitas requisições
- Aguarde alguns segundos entre as requisições
- API gratuita tem limite de rate

### Interface visual não funciona
- Certifique-se que o servidor está rodando
- Verifique se a porta no `visual.html` está correta
- Abra o console do navegador (F12) para ver erros

## 📊 Exemplo de Uso Completo

1. **Iniciar servidor:**
   ```bash
   npm run dev
   ```

2. **Testar visualmente:**
   - Abrir `visual.html` no navegador
   - Clicar em "Verificar Status do Servidor"
   - Testar com perguntas dos botões

3. **Ver resposta esperada:**
   ```json
   {
     "pergunta": "O que é JavaScript?",
     "resposta": "JavaScript é uma linguagem de programação interpretada e de alto nível, amplamente utilizada para desenvolvimento web. Vamos ver um exemplo prático:\n\n```javascript\nconsole.log('Olá, mundo!');\n```\n\nEsta linguagem permite...",
     "contexto": "Assistente educacional de programação",
     "timestamp": "2024-05-26T10:30:00.000Z"
   }
   ```

## 📚 Recursos Adicionais

- [Documentação Groq](https://console.groq.com/docs)
- [Express.js Docs](https://expressjs.com/)
- [Node.js Docs](https://nodejs.org/)

## 📄 Licença

MIT - Projeto acadêmico livre para uso educacional.