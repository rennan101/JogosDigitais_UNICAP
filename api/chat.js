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
        
        REGRAS DE COMPORTAMENTO:
        1. Seja conciso e direto. Responda como se fosse uma mensagem de WhatsApp. Evite blocos gigantes de texto.
        2. Use emojis para dar vida à conversa, mas sem exageros.
        3. Nunca repita o mesmo link duas vezes seguidas. 
        4. Formate as informações de forma limpa.
        
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

        // =================================================================
        // O CÓDIGO CAÇADOR: Lista de modelos para testar em ordem de prioridade
        // =================================================================
        const modelosParaTestar = [
            
            'gemini-3.5-flash',
            'gemini-3.5-flash-lite',
            'gemini-1.5-flash',
            'gemini-1.5-pro',
            'gemini-1.0-pro',
            'gemini-pro'
            
        ];

        let ultimoErro = null;

        // O Loop tenta cada modelo da lista. Se falhar, passa para o próximo.
        for (const modelo of modelosParaTestar) {
            try {
                const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${modelo}:generateContent?key=${apiKey}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                const data = await response.json();
                
                // Se o Google reclamar do modelo, guardamos o erro e vamos para o próximo do loop
                if (data.error) {
                    ultimoErro = data.error.message;
                    console.warn(`[Aviso] Modelo ${modelo} recusado: ${ultimoErro}. Tentando o próximo...`);
                    continue; 
                }

                // Se passou sem erros, extrai a resposta, devolve para o site e encerra a função na hora!
                const botReply = data.candidates[0].content.parts[0].text;
                return res.status(200).json({ reply: botReply });
                
            } catch (fetchError) {
                // Erros de conexão (timeout, rede) também fazem pular para o próximo
                ultimoErro = fetchError.message;
                console.error(`[Erro] Falha de conexão no ${modelo}:`, fetchError);
            }
        }

        // Se o loop terminar e NENHUM modelo da lista funcionar, aí sim devolvemos o erro final
        return res.status(500).json({ error: 'Todos os modelos falharam. Último erro: ' + ultimoErro });
        
    } catch (error) {
        console.error("Erro interno:", error);
        return res.status(500).json({ error: 'Erro interno no servidor (RAG/Vercel).' });
    }
}