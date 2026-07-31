import { pccContent } from '../RAG/contexto_pcc.js';

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Método não permitido' });

    const { message } = req.body;
    const apiKey = process.env.GEMINI_API_KEY; 

    if (!apiKey) return res.status(500).json({ error: 'A Vercel não carregou a Chave de API.' });

    try {
        const systemPrompt = `
        Você é o Assistente Virtual Oficial do curso de Jogos Digitais da UNICAP.
        Responda as dúvidas do usuário usando estritamente os dados do documento abaixo.
        Seja amigável, direto e use um tom tech/gamer.
        
        DOCUMENTO BASE (PCC DO CURSO):
        ${pccContent}
        `;

        const payload = {
            contents: [
                {
                    role: "user",
                    parts: [{ text: systemPrompt + "\n\n--- FIM DO CONTEXTO ---\n\nPergunta do usuário: " + message }]
                }
            ]
        };

        // 🟢 CORREÇÃO AQUI: Removido o "-latest", chamando o modelo oficial e estável gemini-1.5-flash
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const data = await response.json();
        
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