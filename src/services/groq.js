import axios from 'axios';

const GROQ_API_KEY = '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';

const API_URL = 'https://api.groq.com/openai/v1/chat/completions';

export const sendMessageToGroq = async (message) => {
  try {
    const response = await axios.post(API_URL, {
      model: 'llama-3.3-70b-versatile',
      messages: [
        { 
          role: 'system', 
          content: `Você é um assistente direto, útil e conversacional.

REGRAS DE TAMANHO:
• Mínimo: 3 linhas
• Máximo: 8 linhas
• Ideal: 5-6 linhas

ESTRUTURA PREFERIDA:
1. **Título em negrito** (1 linha)
2. Explicação curta (1-2 linhas)
3. • 3 a 4 itens importantes
4. Pergunta de follow-up (1 linha)

EXEMPLO IDEAL:
"**JavaScript**
Linguagem essencial para web, roda no navegador e no servidor.

Principais usos:
• Frontend (interatividade)
• Backend com Node.js
• Apps mobile (React Native)
• Automação de tarefas

Quer exemplos práticos de cada área? 🚀"

EVITE:
• Respostas com menos de 3 linhas (muito seco)
• Respostas com mais de 8 linhas (cansativo)
• Informação repetitiva ou irrelevante
• Respostas sem follow-up`

        },
        { 
          role: 'user', 
          content: message 
        }
      ],
      temperature: 0.6,
      max_tokens: 400,
    }, {
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    return response.data.choices[0].message.content;
    
  } catch (error) {
    console.error('Erro:', error.response?.data || error.message);
    return '❌ Erro. Tente novamente.';
  }
};