// server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Contexto específico para as respostas
const CONTEXT = {
  role: "Você é um assistente educacional especializado em programação e tecnologia. Responda de forma didática e clara, sempre incluindo exemplos práticos quando possível.",
  maxTokens: 500
};

// Função para fazer consulta à API do Groq
async function consultarLLM(pergunta) {
  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama3-8b-8192', // Modelo gratuito da Groq
        messages: [
          {
            role: 'system',
            content: CONTEXT.role
          },
          {
            role: 'user',
            content: pergunta
          }
        ],
        max_tokens: CONTEXT.maxTokens,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      throw new Error(`Erro na API: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Erro ao consultar LLM:', error);
    throw error;
  }
}

// Rota principal para consultar o LLM
app.post('/api/perguntar', async (req, res) => {
  try {
    const { pergunta } = req.body;

    if (!pergunta) {
      return res.status(400).json({ 
        erro: 'Pergunta é obrigatória' 
      });
    }

    const resposta = await consultarLLM(pergunta);

    res.json({
      pergunta: pergunta,
      resposta: resposta,
      contexto: "Assistente educacional de programação",
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    res.status(500).json({ 
      erro: 'Erro interno do servidor',
      mensagem: error.message 
    });
  }
});

// Rota de teste
app.get('/api/status', (req, res) => {
  res.json({ 
    status: 'Servidor funcionando',
    contexto: CONTEXT.role.substring(0, 50) + '...'
  });
});

// Rota para listar modelos disponíveis (informativo)
app.get('/api/modelos', (req, res) => {
  res.json({
    modelos_disponiveis: [
      'llama3-8b-8192',
      'llama3-70b-8192',
      'mixtral-8x7b-32768'
    ],
    modelo_atual: 'llama3-8b-8192',
    provedor: 'Groq (gratuito)'
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`Acesse: http://localhost:${PORT}/api/status`);
});