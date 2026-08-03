import { pccContent } from '../RAG/contexto_pcc.js';

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Método não permitido' });

    const { message } = req.body;
    const apiKey = process.env.GEMINI_API_KEY; 

    if (!apiKey) return res.status(500).json({ error: 'A Vercel não carregou a Chave de API.' });

    try {
        const promptCompleto = `
        Você é o Assistente Virtual Oficial do curso de Jogos Digitais da UNICAP.
        Aja como um humano prestativo, caloroso e empático. Use um tom tech/gamer, mas seja natural.
        
        REGRAS RÍGIDAS DE COMPORTAMENTO:
        1. Seja conciso e direto. Responda como se fosse uma mensagem de WhatsApp.
        2. Use emojis para dar vida à conversa, mas sem exageros.
        3. NUNCA repita o mesmo link duas vezes. Se for indicar um link, use o formato Markdown apenas uma vez assim: [Nome do Link](URL).
        4. Agrupe as informações em listas usando hífens (-) para facilitar a leitura. Evite usar asteriscos duplos em excesso.
        5. Caso perceba que é um parente conversando e não um possivel estudante, seja mais formal.
        6. Quando comparado a outro curso, promova o curso de Jogos Digitais da UNICAP apontando pontos positivos que outros cursos não tem.
        
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

        const modelosParaTestar = [
            'gemini-3.5',
            'gemini-3.5-flash',
            'gemini-3.5-pro'
 
        ];

        let ultimoErro = null;

        for (const modelo of modelosParaTestar) {
            try {
                const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${modelo}:generateContent?key=${apiKey}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                const data = await response.json();
                
                if (data.error) {
                    ultimoErro = data.error.message;
                    continue; 
                }

                const botReply = data.candidates[0].content.parts[0].text;
                return res.status(200).json({ reply: botReply });
                
            } catch (fetchError) {
                ultimoErro = fetchError.message;
            }
        }

        return res.status(500).json({ error: 'Todos os modelos falharam. Último erro: ' + ultimoErro });
        
    } catch (error) {
        return res.status(500).json({ error: 'Erro interno no servidor (RAG/Vercel).' });
    }
}