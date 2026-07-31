// api/chat.js
export default async function handler(req, res) {
    // Apenas aceita requisições do tipo POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Método não permitido' });
    }

    const { message } = req.body;

    // Pegamos a chave de segurança nas variáveis de ambiente da Vercel
    const apiKey = process.env.GEMINI_API_KEY; 

    if (!apiKey) {
        return res.status(500).json({ error: 'Chave de API não configurada no servidor.' });
    }

    // =================================================================
    // O CONTEXTO (RAG SIMPLIFICADO)
    // Aqui você vai colocar o resumo do PCC, regras de financiamento, 
    // disciplinas, etc. A IA vai ler isso antes de responder o aluno.
    // =================================================================
    const systemPrompt = `
    Você é o Assistente Virtual Oficial do curso de Jogos Digitais da UNICAP.
    Seja amigável, direto e use tom tech/gamer.
    
    Informações sobre o curso:
    - Foco: Programação, Game Design, Arte 3D e Empreendedorismo.
    - O mercado cresce 8% ao ano (faturamento de R$12 bilhões).
    - Temos parceria com o Porto Digital.
    
    Responda apenas com base nestas informações. Se não souber, peça para o aluno entrar em contato com a coordenação.
    `;

    try {
        // Fazendo a chamada para a API do Google Gemini
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                system_instruction: { parts: { text: systemPrompt } },
                contents: [{ parts: [{ text: message }] }]
            })
        });

        const data = await response.json();
        
        // Extrai a resposta de texto da IA
        const botReply = data.candidates[0].content.parts[0].text;

        return res.status(200).json({ reply: botReply });
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erro ao conectar com a IA.' });
    }
}