document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Cria Botão Discreto no Footer (ao lado do copyright)
    const footerBottom = document.querySelector("#copyright-text");
    
    if (footerBottom) {
        const adminTrigger = document.createElement("span");
        adminTrigger.innerHTML = '<i data-lucide="lock" style="width: 14px; height: 14px; cursor: pointer; opacity: 0.15; transition: opacity 0.3s; margin-left: 10px;"></i>';
        adminTrigger.addEventListener("mouseenter", () => adminTrigger.querySelector("i").style.opacity = "0.9");
        adminTrigger.addEventListener("mouseleave", () => adminTrigger.querySelector("i").style.opacity = "0.15");
        footerBottom.appendChild(adminTrigger);
        if (typeof lucide !== 'undefined') lucide.createIcons();

        adminTrigger.addEventListener("click", () => {
            const senha = prompt("🔒 Acesso Reservado - Gestão UNICAP\nDigite a senha:");
            if (senha === "ComboJogos") abrirPainelAdmin();
            else if (senha !== null) alert("❌ Senha incorreta.");
        });
    }

    // =========================================================
    // MOTOR DO PAINEL NO-CODE
    // =========================================================
    let localData = {};
    let currentTab = 'config';
    let temAlteracoesNaoSalvas = false; // Controle de segurança

    // Esquema de campos para cada categoria (para gerar os formulários automaticamente)
    const schemas = {
        projetos: [
            { key: 'title', label: 'Título do Jogo', type: 'text', placeholder: 'Ex: Void Arena' },
            { key: 'year', label: 'Ano de Lançamento', type: 'number', placeholder: 'Ex: 2026' },
            { key: 'genre', label: 'Gênero', type: 'text', placeholder: 'Ex: Survivor Horror' },
            { key: 'platform', label: 'Plataforma', type: 'text', placeholder: 'Ex: PC (Windows)' },
            { key: 'devs', label: 'Desenvolvedores', type: 'text', placeholder: 'Ex: João, Maria, Pedro' },
            { key: 'pasta', label: 'Caminho da Imagem (Pasta)', type: 'text', placeholder: 'Ex: assets/projetos/NomeDoJogo' },
            { key: 'video', label: 'Link do YouTube (Opcional)', type: 'text', placeholder: 'Ex: https://youtube.com/...' },
            { key: 'downloadLink', label: 'Link Itch.io (Opcional)', type: 'text', placeholder: 'Ex: https://aluno.itch.io/jogo' },
            { key: 'desc', label: 'Descrição / Sinopse', type: 'textarea', placeholder: 'Resumo do jogo...' }
        ],
        egressos: [
            { key: 'name', label: 'Nome do Egresso', type: 'text', placeholder: 'Ex: João Victor' },
            { key: 'tag', label: 'Cargo / Atuação', type: 'text', placeholder: 'Ex: 3D Character Artist' },
            { key: 'img', label: 'Caminho da Foto', type: 'text', placeholder: 'Ex: assets/egressos/foto.jpg' },
            { key: 'linkedin', label: 'Link do LinkedIn', type: 'text', placeholder: 'Ex: https://linkedin.com/in/...' },
            { key: 'desc', label: 'Breve História', type: 'textarea', placeholder: 'Formado em 2025. Trabalhou em...' }
        ],
        docentes: [
            { key: 'name', label: 'Nome com Titulação', type: 'text', placeholder: 'Ex: Prof. Dr. Fulano' },
            { key: 'tag', label: 'Área de Ensino', type: 'text', placeholder: 'Ex: Game Design' },
            { key: 'img', label: 'Caminho da Foto', type: 'text', placeholder: 'Ex: assets/docentes/foto.jpg' },
            { key: 'linkedin', label: 'Link do LinkedIn (Opcional)', type: 'text', placeholder: 'Ex: https://linkedin.com/in/...' },
            { key: 'lattes', label: 'Link do Lattes', type: 'text', placeholder: 'Ex: http://lattes.cnpq.br/...' },
            { key: 'desc', label: 'Descrição Extra (Opcional)', type: 'textarea', placeholder: '' }
        ],
        pesquisas: [
            { key: 'title', label: 'Título da Pesquisa', type: 'textarea', placeholder: 'Ex: Novos Processos em...' },
            { key: 'leader', label: 'Professor Orientador', type: 'text', placeholder: 'Ex: Dr. Rennan Raffaele' },
            { key: 'orientando', label: 'Nome do Aluno', type: 'text', placeholder: 'Ex: Raquel Ferreira' },
            { key: 'year', label: 'Ano', type: 'number', placeholder: 'Ex: 2024' },
            { key: 'badge', label: 'Selo / Tipo', type: 'text', placeholder: 'Ex: PIBIC / UNICAP' }
        ],
        parceiros: [
            { key: 'name', label: 'Nome da Empresa', type: 'text', placeholder: 'Ex: KOKKU GAMES' },
            { key: 'url', label: 'Link do Site', type: 'text', placeholder: 'Ex: https://kokkugames.com' }
        ],
        matriz: [
            { key: 'sem', label: 'Semestre / Período', type: 'select', options: ['1º SEMESTRE', '2º SEMESTRE', '3º SEMESTRE', '4º SEMESTRE', '5º SEMESTRE'] },
            { key: 'title', label: 'Nome da Disciplina', type: 'text', placeholder: 'Ex: Programação 3D' },
            { key: 'tech', label: 'Tecnologias (Separadas por vírgula)', type: 'text', placeholder: 'Ex: Unreal Engine, C++, Unity' },
            { key: 'desc', label: 'Ementa / Resumo', type: 'textarea', placeholder: 'O que se estuda nesta cadeira...' }
        ]
    };

    function abrirPainelAdmin() {
        if (document.getElementById("painel-admin-unicap")) return;

        // Copia os dados atuais carregados no site para a memória do painel
        localData = window.siteDataGlobal ? JSON.parse(JSON.stringify(window.siteDataGlobal)) : { config: { ocultarInvestimento: false }, projetos: [], egressos: [], docentes: [], pesquisas: [], parceiros: [], matriz: [] };
        currentTab = 'config';
        temAlteracoesNaoSalvas = false; // Reseta a bandeira ao abrir

        // Injeta estilos CSS específicos para o painel não conflitar com o site
        const style = document.createElement('style');
        style.id = "admin-styles";
        style.innerHTML = `
            #painel-admin-unicap { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(15, 23, 42, 0.98); z-index: 9999; display: flex; flex-direction: column; color: #fff; font-family: 'Poppins', sans-serif; backdrop-filter: blur(15px); }
            .adm-header { display: flex; justify-content: space-between; align-items: center; padding: 1.5rem 2rem; border-bottom: 1px solid rgba(255,255,255,0.1); background: rgba(0,0,0,0.2); }
            .adm-body { display: flex; flex: 1; overflow: hidden; }
            .adm-sidebar { width: 260px; background: rgba(0,0,0,0.3); border-right: 1px solid rgba(255,255,255,0.05); display: flex; flex-direction: column; padding: 1rem 0; }
            .adm-tab { padding: 1rem 1.5rem; color: #94a3b8; cursor: pointer; display: flex; align-items: center; gap: 10px; transition: all 0.2s; border-left: 3px solid transparent; font-weight: 500; font-size: 0.95rem; }
            .adm-tab:hover { background: rgba(255,255,255,0.05); color: #fff; }
            .adm-tab.active { background: rgba(0, 194, 203, 0.1); color: #00C2CB; border-left-color: #00C2CB; }
            .adm-content { flex: 1; padding: 2rem; overflow-y: auto; position: relative; }
            
            /* Cards de Listagem */
            .adm-list { display: flex; flex-direction: column; gap: 1rem; }
            .adm-card { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); padding: 1.2rem; border-radius: 8px; display: flex; justify-content: space-between; align-items: center; transition: background 0.2s; }
            .adm-card:hover { background: rgba(255,255,255,0.06); border-color: rgba(0, 194, 203, 0.3); }
            .adm-card-info h4 { margin: 0 0 0.3rem 0; color: #fff; font-size: 1.05rem; }
            .adm-card-info p { margin: 0; color: #94a3b8; font-size: 0.85rem; }
            .adm-card-actions { display: flex; gap: 0.5rem; }
            .adm-btn-icon { background: rgba(15, 23, 42, 0.8); border: 1px solid #334155; color: #fff; width: 36px; height: 36px; border-radius: 6px; cursor: pointer; display: flex; justify-content: center; align-items: center; transition: all 0.2s; }
            .adm-btn-icon:hover { background: #00C2CB; color: #000; border-color: #00C2CB; }
            .adm-btn-icon.danger:hover { background: #ef4444; border-color: #ef4444; color: #fff; }
            
            /* Botões Gerais */
            .adm-btn { background: #00C2CB; color: #000; border: none; padding: 0.8rem 1.5rem; border-radius: 6px; font-weight: bold; cursor: pointer; display: inline-flex; align-items: center; gap: 8px; transition: all 0.2s; }
            .adm-btn:hover { filter: brightness(1.1); transform: translateY(-2px); box-shadow: 0 5px 15px rgba(0, 194, 203, 0.3); }
            .adm-btn-outline { background: transparent; border: 1px solid #334155; color: #fff; }
            .adm-btn-outline:hover { border-color: #00C2CB; color: #00C2CB; transform: none; box-shadow: none; }
            
            /* Modal Form */
            .adm-modal { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: rgba(15, 23, 42, 0.95); z-index: 10; display: flex; flex-direction: column; padding: 2rem; overflow-y: auto; backdrop-filter: blur(10px); }
            .adm-form-group { margin-bottom: 1.2rem; display: flex; flex-direction: column; gap: 0.5rem; }
            .adm-form-group label { font-size: 0.85rem; color: #cbd5e1; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; }
            .adm-form-control { background: rgba(0,0,0,0.5); border: 1px solid #334155; padding: 0.8rem 1rem; border-radius: 6px; color: #fff; font-family: inherit; font-size: 0.95rem; width: 100%; max-width: 600px; transition: border-color 0.3s; }
            .adm-form-control:focus { outline: none; border-color: #00C2CB; }
            textarea.adm-form-control { resize: vertical; min-height: 100px; }
        `;
        document.head.appendChild(style);

        const painel = document.createElement("div");
        painel.id = "painel-admin-unicap";
        painel.innerHTML = `
            <div class="adm-header">
                <h2 style="margin:0; font-size: 1.4rem; display:flex; align-items:center; gap: 10px;">
                    <img src="assets/logos/Jogos_mec.svg" style="height: 35px;" onerror="this.style.display='none'"> 
                    Gestor de Conteúdo (No-Code)
                </h2>
                <div style="display: flex; gap: 1rem; align-items: center;">
                    <span id="save-status" style="color: #eab308; font-size: 0.85rem; display: none;"><i data-lucide="info" style="width:14px; height:14px; display:inline-block; vertical-align:middle;"></i> Alterações não salvas</span>
                    <button class="adm-btn" id="btn-baixar-json"><i data-lucide="download"></i> Salvar e Baixar data.json</button>
                    <button class="adm-btn-icon" id="fechar-admin" style="background: transparent; border: none; margin-left: 1rem;"><i data-lucide="x"></i></button>
                </div>
            </div>
            <div class="adm-body">
                <div class="adm-sidebar">
                    <div class="adm-tab active" data-tab="config"><i data-lucide="settings"></i> Configurações & Agenda</div>
                    <div class="adm-tab" data-tab="matriz"><i data-lucide="book-open"></i> Matriz Curricular</div>
                    <div class="adm-tab" data-tab="projetos"><i data-lucide="gamepad-2"></i> Vitrine de Jogos</div>
                    <div class="adm-tab" data-tab="egressos"><i data-lucide="graduation-cap"></i> Egressos</div>
                    <div class="adm-tab" data-tab="docentes"><i data-lucide="users"></i> Corpo Docente</div>
                    <div class="adm-tab" data-tab="pesquisas"><i data-lucide="microscope"></i> Pesquisas (PIBIC)</div>
                    <div class="adm-tab" data-tab="parceiros"><i data-lucide="building-2"></i> Empresas Locais</div>
                </div>
                <div class="adm-content" id="adm-main-content">
                    <!-- O conteúdo muda dinamicamente aqui -->
                </div>
            </div>
        `;
        document.body.appendChild(painel);
        if (typeof lucide !== 'undefined') lucide.createIcons();

        // Bind Navegação Lateral
        document.querySelectorAll('.adm-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                document.querySelectorAll('.adm-tab').forEach(t => t.classList.remove('active'));
                e.currentTarget.classList.add('active');
                currentTab = e.currentTarget.getAttribute('data-tab');
                renderContent();
            });
        });

        // Função segura para fechar o painel com verificação de alterações não salvas
        const tentarFecharAdmin = () => {
            if (temAlteracoesNaoSalvas) {
                const confirmar = confirm("⚠️ ATENÇÃO: Você possui alterações que não foram salvas!\n\nSe fechar agora, nada foi salvo e os dados modificados serão perdidos. Deseja realmente continuar e sair?");
                if (!confirmar) return; // Cancela o fechamento se o usuário escolher "Não"
            }
            document.getElementById("admin-styles").remove();
            painel.remove();
        };

        // Fechar pelo botão X
        document.getElementById("fechar-admin").addEventListener("click", tentarFecharAdmin);

        // Botão Final de Download (Marca como salvo ao baixar)
        document.getElementById("btn-baixar-json").addEventListener("click", () => {
            const jsonString = JSON.stringify(localData, null, 4);
            const blob = new Blob([jsonString], { type: "application/json" });
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = "data.json";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
            
            temAlteracoesNaoSalvas = false; // Limpa o alerta pois foi salvo/baixado
            document.getElementById("save-status").style.display = "none";
            alert("✅ Arquivo data.json gerado!\n\nAgora vá até o seu repositório no GitHub, clique em 'Add File > Upload Files', selecione este arquivo baixado e clique em 'Commit changes'. O Vercel atualizará o site em alguns segundos.");
        });

        // Inicia a primeira tela
        renderContent();
    }

    // =========================================================
    // RENDERIZADOR DE TELAS (LISTAS E CONFIGS)
    // =========================================================
    function renderContent() {
        const main = document.getElementById("adm-main-content");
        main.innerHTML = "";

        // TELA DE CONFIGURAÇÕES ESPECIAIS (INCLUI AGENDA)
        if (currentTab === 'config') {
            const cfg = localData.config || {};
            const isOculto = cfg.ocultarInvestimento;
            const agenda = cfg.agenda || { diasSemana: [1,2,3,4,5], horarios: ["14:00", "15:00"], diasBloqueados: [] };

            main.innerHTML = `
                <div style="max-width: 800px;">
                    <h3 style="margin-top: 0; color: #fff; font-size: 1.5rem; margin-bottom: 1.5rem;">Configurações Gerais</h3>
                    
                    <!-- VISIBILIDADE -->
                    <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); padding: 1.5rem; border-radius: 8px; margin-bottom: 2rem;">
                        <h4 style="margin: 0 0 1rem 0; color: var(--accent-teal);">Seção de Investimento</h4>
                        <label style="display: flex; align-items: center; gap: 0.8rem; cursor: pointer; font-size: 0.95rem; font-weight: bold; color: #fff;">
                            <input type="checkbox" id="cfg-invest" ${isOculto ? "checked" : ""} style="width: 18px; height: 18px; accent-color: var(--accent-teal);">
                            Ocultar painel de valores financeiros do site
                        </label>
                    </div>

                    <!-- GESTÃO DA AGENDA DE VISITAS -->
                    <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); padding: 1.5rem; border-radius: 8px;">
                        <h4 style="margin: 0 0 1rem 0; color: var(--accent-teal);"><i data-lucide="calendar"></i> Gestão da Agenda de Visitas</h4>
                        <p style="font-size: 0.85rem; color: #94a3b8; margin-bottom: 1.5rem;">Defina os dias de atendimento. O sistema bloqueará automaticamente agendamentos com menos de 3 dias de antecedência.</p>
                        
                        <div style="margin-bottom: 1.5rem;">
                            <label style="display:block; font-size: 0.85rem; color: #cbd5e1; font-weight: 600; text-transform: uppercase; margin-bottom: 0.8rem;">Dias da Semana Ativos</label>
                            <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
                                ${ [
                                    {val: 1, label: 'Seg'}, {val: 2, label: 'Ter'}, {val: 3, label: 'Qua'}, 
                                    {val: 4, label: 'Qui'}, {val: 5, label: 'Sex'}, {val: 6, label: 'Sáb'}, {val: 0, label: 'Dom'}
                                ].map(d => `
                                    <label style="display: flex; align-items: center; gap: 0.4rem; color: #fff; font-size: 0.9rem; cursor:pointer;">
                                        <input type="checkbox" class="cfg-dias-semana" value="${d.val}" ${agenda.diasSemana.includes(d.val) ? "checked" : ""} style="accent-color: var(--accent-teal);"> ${d.label}
                                    </label>
                                `).join('') }
                            </div>
                        </div>

                        <div style="margin-bottom: 1.5rem;">
                            <label style="display:block; font-size: 0.85rem; color: #cbd5e1; font-weight: 600; text-transform: uppercase; margin-bottom: 0.5rem;">Horários Disponíveis (Separados por vírgula)</label>
                            <input type="text" id="cfg-horarios" class="adm-form-control" value="${agenda.horarios.join(', ')}" placeholder="Ex: 14:00, 14:30, 15:00">
                        </div>

                        <div>
                            <label style="display:block; font-size: 0.85rem; color: #cbd5e1; font-weight: 600; text-transform: uppercase; margin-bottom: 0.5rem;">Dias Bloqueados Específicos (Feriados)</label>
                            <p style="font-size: 0.75rem; color: #94a3b8; margin: 0 0 0.5rem 0;">Formato obrigatório: DD/MM/YYYY separados por vírgula.</p>
                            <input type="text" id="cfg-bloqueados" class="adm-form-control" value="${agenda.diasBloqueados.join(', ')}" placeholder="Ex: 07/09/2026, 12/10/2026">
                        </div>
                    </div>
                </div>
            `;
            if (typeof lucide !== 'undefined') lucide.createIcons();

            // Salva as alterações da aba de configurações no objeto localData
            setTimeout(() => {
                const saveConfig = () => {
                    if(!localData.config) localData.config = {};
                    if(!localData.config.agenda) localData.config.agenda = { diasSemana: [], horarios: [], diasBloqueados: [] };
                    
                    localData.config.ocultarInvestimento = document.getElementById('cfg-invest').checked;
                    
                    const checkedDays = Array.from(document.querySelectorAll('.cfg-dias-semana:checked')).map(cb => parseInt(cb.value));
                    localData.config.agenda.diasSemana = checkedDays;
                    
                    const horariosRaw = document.getElementById('cfg-horarios').value;
                    localData.config.agenda.horarios = horariosRaw.split(',').map(s => s.trim()).filter(s => s !== "");

                    const bloqueadosRaw = document.getElementById('cfg-bloqueados').value;
                    localData.config.agenda.diasBloqueados = bloqueadosRaw.split(',').map(s => s.trim()).filter(s => s !== "");

                    marcarAlteracao();
                };

                document.getElementById('cfg-invest').addEventListener('change', saveConfig);
                document.querySelectorAll('.cfg-dias-semana').forEach(cb => cb.addEventListener('change', saveConfig));
                document.getElementById('cfg-horarios').addEventListener('input', saveConfig);
                document.getElementById('cfg-bloqueados').addEventListener('input', saveConfig);
            }, 50);
            return;
        }

        // TELA DAS LISTAS COMUNS (Projetos, Egressos, etc)
        const tituloAba = document.querySelector(`.adm-tab[data-tab="${currentTab}"]`).innerText;
        const lista = localData[currentTab] || [];

        let html = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
                <h3 style="margin: 0; color: #fff; font-size: 1.5rem;">Gestão: ${tituloAba}</h3>
                <button class="adm-btn" id="btn-add-new"><i data-lucide="plus"></i> Adicionar Novo</button>
            </div>
        `;

        // Adiciona o filtro interativo caso a aba ativa seja a da Matriz Curricular
        if (currentTab === 'matriz' && lista.length > 0) {
            const periodosUnicos = [...new Set(lista.map(i => i.sem))].filter(Boolean).sort();
            html += `
                <div style="margin-bottom: 1.5rem; display: flex; align-items: center; gap: 1rem; background: rgba(255,255,255,0.03); padding: 1rem 1.5rem; border-radius: 8px; border: 1px solid rgba(255,255,255,0.05);">
                    <label style="color: #cbd5e1; font-size: 0.9rem; font-weight: 600; display:flex; align-items:center; gap:0.5rem;">
                        <i data-lucide="filter" style="width: 16px; height: 16px;"></i> Filtrar por Período:
                    </label>
                    <select id="admin-matriz-filter" class="adm-form-control" style="max-width: 250px; padding: 0.5rem; font-size:0.9rem;">
                        <option value="Todos">Todos os Períodos</option>
                        ${periodosUnicos.map(p => `<option value="${p}">${p}</option>`).join('')}
                    </select>
                </div>
            `;
        }

        html += `<div class="adm-list" id="items-list">`;

        if (lista.length === 0) {
            html += `<div style="padding: 2rem; text-align: center; color: #94a3b8; border: 1px dashed #334155; border-radius: 8px;">Nenhum item cadastrado nesta categoria.</div>`;
        } else {
            lista.forEach((item, index) => {
                let tituloCard = item.title || item.name || `Item ${index + 1}`;
                let subCard = item.year ? `Ano: ${item.year}` : (item.tag || item.sem || item.leader || item.url || '');
                let dataFilter = currentTab === 'matriz' ? `data-sem="${item.sem || ''}"` : '';

                html += `
                    <div class="adm-card" ${dataFilter}>
                        <div class="adm-card-info">
                            <h4>${tituloCard}</h4>
                            <p>${subCard}</p>
                        </div>
                        <div class="adm-card-actions">
                            <button class="adm-btn-icon btn-edit" data-index="${index}" title="Editar"><i data-lucide="pencil" style="pointer-events:none;"></i></button>
                            <button class="adm-btn-icon danger btn-delete" data-index="${index}" title="Excluir"><i data-lucide="trash-2" style="pointer-events:none;"></i></button>
                        </div>
                    </div>
                `;
            });
        }
        html += `</div>`;
        main.innerHTML = html;
        if (typeof lucide !== 'undefined') lucide.createIcons();

        if (currentTab === 'matriz') {
            const filterSelect = document.getElementById('admin-matriz-filter');
            if (filterSelect) {
                filterSelect.addEventListener('change', (e) => {
                    const selectedSem = e.target.value;
                    const cards = document.querySelectorAll('#items-list .adm-card');
                    cards.forEach(card => {
                        if (selectedSem === 'Todos' || card.getAttribute('data-sem') === selectedSem) {
                            card.style.display = 'flex';
                        } else {
                            card.style.display = 'none';
                        }
                    });
                });
            }
        }

        // Binds de botões da lista
        document.getElementById('btn-add-new').addEventListener('click', () => abrirFormulario(-1));
        
        document.querySelectorAll('.btn-edit').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const idx = parseInt(e.target.getAttribute('data-index'));
                abrirFormulario(idx);
            });
        });

        document.querySelectorAll('.btn-delete').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const idx = parseInt(e.target.getAttribute('data-index'));
                if (confirm(`Tem certeza que deseja excluir este item permanentemente?`)) {
                    localData[currentTab].splice(idx, 1);
                    marcarAlteracao();
                    renderContent();
                }
            });
        });
    }

    // =========================================================
    // RENDERIZADOR DO FORMULÁRIO (ADD / EDIT)
    // =========================================================
    function abrirFormulario(index) {
        const isEdit = index >= 0;
        const main = document.getElementById("adm-main-content");
        const schema = schemas[currentTab];
        const itemAtual = isEdit ? localData[currentTab][index] : {};

        let formHtml = `
            <div class="adm-modal" id="form-modal">
                <div style="max-width: 700px; width: 100%;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
                        <h3 style="margin: 0; font-size: 1.5rem;">${isEdit ? 'Editar Item' : 'Criar Novo Item'}</h3>
                        <button class="adm-btn-icon btn-close-form" style="background:transparent; border:none;"><i data-lucide="x"></i></button>
                    </div>
                    <form id="adm-form">
        `;

        schema.forEach(field => {
            let val = itemAtual[field.key] !== undefined ? itemAtual[field.key] : '';
            if (field.key === 'tech' && Array.isArray(val)) {
                val = val.join(', ');
            }

            formHtml += `<div class="adm-form-group"><label>${field.label}</label>`;
            
            if (field.type === 'textarea') {
                formHtml += `<textarea class="adm-form-control" name="${field.key}" placeholder="${field.placeholder || ''}" required>${val}</textarea>`;
            } else if (field.type === 'select') {
                formHtml += `<select class="adm-form-control" name="${field.key}">`;
                field.options.forEach(opt => {
                    formHtml += `<option value="${opt}" ${val === opt ? 'selected' : ''}>${opt}</option>`;
                });
                formHtml += `</select>`;
            } else {
                formHtml += `<input type="${field.type}" class="adm-form-control" name="${field.key}" value="${val}" placeholder="${field.placeholder || ''}" ${!['video', 'downloadLink', 'linkedin', 'desc'].includes(field.key) ? 'required':''}>`;
            }
            formHtml += `</div>`;
        });

        formHtml += `
                        <div style="margin-top: 2rem; display: flex; gap: 1rem;">
                            <button type="submit" class="adm-btn"><i data-lucide="save"></i> Salvar na Memória</button>
                            <button type="button" class="adm-btn adm-btn-outline btn-close-form">Cancelar</button>
                        </div>
                    </form>
                </div>
            </div>
        `;

        main.insertAdjacentHTML('beforeend', formHtml);
        if (typeof lucide !== 'undefined') lucide.createIcons();

        document.querySelectorAll('.btn-close-form').forEach(b => b.addEventListener('click', () => {
            document.getElementById('form-modal').remove();
        }));

        document.getElementById('adm-form').addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const novoItem = {};

            schema.forEach(field => {
                let valor = formData.get(field.key);
                if (field.type === 'number') valor = parseInt(valor) || 0;
                if (field.key === 'tech') {
                    valor = valor.split(',').map(s => s.trim()).filter(s => s !== "");
                }
                novoItem[field.key] = valor;
            });

            if (isEdit) {
                localData[currentTab][index] = novoItem;
            } else {
                if(!localData[currentTab]) localData[currentTab] = [];
                localData[currentTab].unshift(novoItem);
            }

            marcarAlteracao();
            document.getElementById('form-modal').remove();
            renderContent();
        });
    }

    function marcarAlteracao() {
        temAlteracoesNaoSalvas = true; // Ativa a bandeira de alteração pendente
        document.getElementById("save-status").style.display = "block";
    }

});