import { pccContent } from '../RAG/contexto_pcc.js';

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Método não permitido' });

    const { message } = req.body;
    const apiKey = process.env.GEMINI_API_KEY; 

    if (!apiKey) return res.status(500).json({ error: 'A Vercel não carregou a Chave de API.' });

    try {
        // =================================================================
        // O TRUQUE: Unimos tudo em um único "prompt de usuário"
        // Isso evita erros de suporte a "system_instruction" na API.
        // =================================================================
        const promptCompleto = `
        Você é o Assistente Virtual Oficial do curso de Jogos Digitais da UNICAP.
        Responda as dúvidas do usuário usando estritamente os dados do documento abaixo.
        Seja amigável, direto e use um tom tech/gamer.
        
        DOCUMENTO BASE (PCC DO CURSO):
        ${pccContent}
        
        --- FIM DO CONTEXTO ---
        
        Pergunta do usuário: ${message}
        `;

        const payload = {
            contents: [
                {
                    role: "user",
                    parts: [{ text: promptCompleto }]
                }
            ]
        };

        // 🟢 CORREÇÃO: Usando o modelo universal 'gemini-pro' que funciona em 100% das contas
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const data = await response.json();
        
        // Se o Google recusar a requisição
        if (data.error) {
            return res.status(500).json({ error: 'Erro do Google: ' + data.error.message });
        }

        const botReply = data.candidates[0].content.parts[0].text;
        return res.status(200).json({ reply: botReply });
        
    } catch (error) {
        console.error("Erro interno:", error);
        return res.status(500).json({ error: 'Erro interno no servidor (RAG/Vercel).' });
    }
}