import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Método não permitido' });
    }

    const { message } = req.body;
    const apiKey = process.env.GEMINI_API_KEY; 

    if (!apiKey) {
        return res.status(500).json({ error: 'Chave de API não configurada.' });
    }

    try {
        // =================================================================
        // LENDO A PASTA RAG
        // =================================================================
        // 1. Descobre o caminho exato da pasta RAG no servidor da Vercel
        const filePath = path.join(process.cwd(), 'RAG', 'contexto_pcc.txt');
        
        // 2. Lê o conteúdo do arquivo de texto
        const pccContent = fs.readFileSync(filePath, 'utf8');

        // 3. Monta as instruções juntando a personalidade + o texto do RAG
        const systemPrompt = `
        Você é o Assistente Virtual Oficial do curso de Jogos Digitais da UNICAP.
        Responda as dúvidas do usuário usando estritamente os dados do documento abaixo.
        Seja amigável e use um tom tech/gamer.
        
        DOCUMENTO BASE (PCC DO CURSO):
        ${pccContent}
        `;

        // =================================================================
        // ENVIANDO PARA A IA (GEMINI)
        // =================================================================
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                system_instruction: { parts: { text: systemPrompt } },
                contents: [{ parts: [{ text: message }] }]
            })
        });

        const data = await response.json();
        
        // Retorna o texto da IA
        const botReply = data.candidates[0].content.parts[0].text;
        return res.status(200).json({ reply: botReply });
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erro ao processar os arquivos do RAG ou conectar com a IA.' });
    }
}