// test.js - Script para testar a API
const BASE_URL = 'http://localhost:3000/api';

async function testarAPI() {
  console.log('🧪 Testando API do LLM Backend...\n');

  // Teste 1: Status do servidor
  try {
    console.log('1. Testando status do servidor...');
    const statusResponse = await fetch(`${BASE_URL}/status`);
    const statusData = await statusResponse.json();
    console.log('✅ Status:', statusData);
    console.log('');
  } catch (error) {
    console.log('❌ Erro no teste de status:', error.message);
    return;
  }

  // Teste 2: Consulta ao LLM
  try {
    console.log('2. Testando consulta ao LLM...');
    const perguntaResponse = await fetch(`${BASE_URL}/perguntar`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        pergunta: 'O que é JavaScript e para que serve?'
      })
    });
    
    const perguntaData = await perguntaResponse.json();
    console.log('✅ Resposta do LLM:');
    console.log('Pergunta:', perguntaData.pergunta);
    console.log('Resposta:', perguntaData.resposta?.substring(0, 200) + '...');
    console.log('Contexto:', perguntaData.contexto);
    console.log('');
  } catch (error) {
    console.log('❌ Erro na consulta ao LLM:', error.message);
  }

  // Teste 3: Modelos disponíveis
  try {
    console.log('3. Testando lista de modelos...');
    const modelosResponse = await fetch(`${BASE_URL}/modelos`);
    const modelosData = await modelosResponse.json();
    console.log('✅ Modelos:', modelosData);
    console.log('');
  } catch (error) {
    console.log('❌ Erro ao listar modelos:', error.message);
  }

  console.log('🎉 Testes concluídos!');
}

// Executar testes
testarAPI();