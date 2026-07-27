document.addEventListener("DOMContentLoaded", () => {
    // Inicializar ícones Lucide
    lucide.createIcons();

    // Menu Mobile Toggle
    const menuToggle = document.getElementById("menu-toggle");
    const navMenu = document.getElementById("nav-menu");
    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", () => {
            navMenu.classList.toggle("show");
        });
    }

    // ----------------------------------------------------
    // 1. TABS: SOBRE O CURSO
    // ----------------------------------------------------
    const tabBtns = document.querySelectorAll(".tab-btn");
    const tabPanes = document.querySelectorAll(".tab-pane");

    tabBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            tabBtns.forEach(b => b.classList.remove("active"));
            tabPanes.forEach(p => p.classList.remove("active"));

            btn.classList.add("active");
            const target = document.getElementById(btn.getAttribute("data-tab"));
            if (target) target.classList.add("active");
        });
    });

    // ----------------------------------------------------
    // 2. MATRIZ CURRICULAR (FILTRO POR PERÍODOS / SEMESTRES)
    // ----------------------------------------------------
    const currData = [
        // 1º Período
        { sem: "1º SEMESTRE", title: "Lógica de Programação para Jogos", desc: "Algoritmos, estruturas de controle e variáveis focadas na lógica de mecânicas de jogos e resolução de problemas.", tech: ["C#", "Lógica", "GitHub"] },
        { sem: "1º SEMESTRE", title: "Expressão Visual e Gráfica", desc: "Fundamentos do desenho, teoria das cores, composição visual e perspectiva aplicada ao design de games.", tech: ["Photoshop", "Sketching", "Figma"] },
        { sem: "1º SEMESTRE", title: "Character Design", desc: "Criação de heróis, inimigos e NPCs com forte apelo narrativo e silhueta marcante para mídias digitais.", tech: ["Photoshop", "Procreate", "Concept Art"] },
        { sem: "1º SEMESTRE", title: "Processos de Design", desc: "Metodologias criativas, Design Thinking e ideação de conceitos para prototipação rápida em estúdio.", tech: ["Figma", "Miro", "Notion"] },
        { sem: "1º SEMESTRE", title: "Teorias dos Jogos (EAD)", desc: "Estudo formal do círculo mágico, taxonomia de jogadores e ludologia na cultura digital moderna.", tech: ["Teoria Lúdica", "Análise Crítica"] },
        { sem: "1º SEMESTRE", title: "Narrativa para Jogos (EAD)", desc: "Jornada do herói, worldbuilding, diálogos ramificados e construção de narrativa emergente em jogos.", tech: ["Twine", "Articy:Draft", "Notion"] },
        { sem: "1º SEMESTRE", title: "Expressão Oral e Escrita", desc: "Comunicação assertiva, redação técnica de documentos e técnicas de apresentação de ideias e Pitching.", tech: ["Pitching", "Oratória", "Docs"] },

        // 2º Período
        { sem: "2º SEMESTRE", title: "Programação 2D para Jogos", desc: "Desenvolvimento de jogos 2D, física computacional, colisões e controle de animações dinâmicas via código.", tech: ["Unity", "C#", "VS Code"] },
        { sem: "2º SEMESTRE", title: "Arquitetura Web para Jogos", desc: "Fundamentos de redes, APIs e requisições HTTP para criação de placares e jogos em navegadores web.", tech: ["HTML5", "JavaScript", "WebSockets"] },
        { sem: "2º SEMESTRE", title: "Animação 2D", desc: "Os 12 princípios da animação, rigging 2D e animação frame a frame para spritesheets em jogos digitais.", tech: ["Spine 2D", "Toon Boom", "Photoshop"] },
        { sem: "2º SEMESTRE", title: "Pintura Digital", desc: "Técnicas de texturização, luz, sombra e renderização digital para elaboração de concept art e cenários.", tech: ["Photoshop", "Tablet Gráfica"] },
        { sem: "2º SEMESTRE", title: "Introdução a Game Design", desc: "Core loops, elaboração de GDD (Game Design Document), balanço de regras e mecânicas centrais do jogo.", tech: ["Notion", "Figma", "Google Docs"] },
        { sem: "2º SEMESTRE", title: "Metodologia Projetual", desc: "Gestão ágil de projetos de software, Kanban, Scrum e controle de versionamento colaborativo em equipe.", tech: ["Trello", "Jira", "GitHub"] },
        { sem: "2º SEMESTRE", title: "Neurociência e Processos Tecnológicos (EAD)", desc: "Como o cérebro processa recompensas, engajamento e estímulos sensoriais em ambientes interativos.", tech: ["UX", "Neurociência", "Behavior"] },
        { sem: "2º SEMESTRE", title: "Análise de Interface e Design (EAD) [Eletiva I]", desc: "Estudo de usabilidade, heurísticas e clareza visual em telas interativas e menus de jogos.", tech: ["UI Design", "Heurísticas"] },

        // 3º Período
        { sem: "3º SEMESTRE", title: "Programação de Jogos Mobile", desc: "Otimização de memória, controles touch e deploy de projetos para sistemas Android e iOS.", tech: ["Unity", "Android SDK", "iOS"] },
        { sem: "3º SEMESTRE", title: "Arquitetura do Desenho 3D", desc: "Introdução à geometria 3D, malhas poligonais, topologia limpa e fluxo de bordas voltado para tempo real.", tech: ["Blender", "3ds Max"] },
        { sem: "3º SEMESTRE", title: "Som Digital", desc: "Captação, mixagem, sound effects (SFX) e integração de áudio dinâmico e trilha sonora em motores gráficos.", tech: ["FMOD", "Wwise", "Reaper", "Audacity"] },
        { sem: "3º SEMESTRE", title: "Projeto Integrador I", desc: "Desenvolvimento prático em equipe de um jogo 2D completo para resolver um desafio do ecossistema.", tech: ["Scrum", "Unity", "Git"] },
        { sem: "3º SEMESTRE", title: "Marketing Digital (EAD)", desc: "Estratégias de lançamento de jogos, publicidade em lojas de apps (ASO) e marketing de comunidade/indie.", tech: ["Google Analytics", "ASO", "Steam"] },
        { sem: "3º SEMESTRE", title: "Gestão Projetual (EAD) [Eletiva II]", desc: "Planejamento financeiro, estimativa de custos e cronograma em produções de jogos independentes.", tech: ["Gestão", "Agile", "Excel"] },
        { sem: "3º SEMESTRE", title: "Introdução a Inteligência Artificial (EAD)", desc: "Máquinas de estados finitos (FSM), pathfinding (A*) e algoritmos de comportamentos autônomos para NPCs.", tech: ["C#", "AI Behavior Trees"] },
        { sem: "3º SEMESTRE", title: "Edição Digital & Visual Effect", desc: "Criação de sistemas de partículas (VFX), shaders visuais e montagem de trailers promocionais.", tech: ["Unity VFX Graph", "After Effects", "Premiere"] },

        // 4º Período
        { sem: "4º SEMESTRE", title: "Programação 3D para Jogos", desc: "Álgebra linear aplicada, vetores, quatérnios, câmeras e física em motores gráficos de 3ª e 4ª dimensão.", tech: ["Unreal Engine", "C++", "Unity"] },
        { sem: "4º SEMESTRE", title: "Modelagem e Animação 3D para Jogos", desc: "Modelagem orgânica e hard-surface, abertura de malha UV, texturização PBR e animação de personagens.", tech: ["Blender", "Substance Painter", "Maya"] },
        { sem: "4º SEMESTRE", title: "Level Design e Game Balance", desc: "Arquitetura de fases, pacing, progressão de dificuldade e balanceamento da economia interna do jogo.", tech: ["Unreal Editor", "Unity ProBuilder"] },
        { sem: "4º SEMESTRE", title: "Projeto Integrador II", desc: "Desenvolvimento em equipe de um jogo 3D ou VR com foco em inovação tecnológica e apresentação de pitch.", tech: ["Agile", "Unreal Engine", "Blender"] },
        { sem: "4º SEMESTRE", title: "Empreendedorismo Social e Impacto para Negócios (EAD)", desc: "Criação de startups de games, captação de editais e impacto socioambiental no ecossistema criativo.", tech: ["Business Model Canvas", "Startups"] },
        { sem: "4º SEMESTRE", title: "Experiência do Usuário (UX) & IA Avançada", desc: "Testes de usabilidade com jogadores e implementação de inteligência artificial de aprendizado por reforço.", tech: ["Figma", "Machine Learning", "Playtesting"] },

        // 5º Período
        { sem: "5º SEMESTRE", title: "Projeto de Artefatos Lúdicos", desc: "Desenvolvimento de boardgames, jogos híbridos e experiências interativas físicas com prototipação rápida.", tech: ["Prototipação de Papel", "Impressão 3D"] },
        { sem: "5º SEMESTRE", title: "Midiatização dos Jogos", desc: "E-sports, streaming, impacto cultural dos videogames e engajamento em comunidades em plataformas digitais.", tech: ["Twitch", "OBS", "Social Media"] },
        { sem: "5º SEMESTRE", title: "Tópicos Avançados em Jogos Digitais", desc: "Exploração de tecnologias emergentes como Realidade Virtual (VR), Realidade Aumentada e Cloud Gaming.", tech: ["VR/AR", "Meta Quest", "Next-Gen Engine"] },
        { sem: "5º SEMESTRE", title: "Gamificação & Branding", desc: "Uso de mecânicas de jogos em saúde e corporativo, atreladas a estratégias de posicionamento de marca.", tech: ["Gamification Frameworks", "Brand Design"] },
        { sem: "5º SEMESTRE", title: "Propriedade Intelectual (EAD)", desc: "Direitos autorais de software, registro de marcas, contratos de publicação (Publishers) e licenciamento.", tech: ["Direito Digital", "Licenciamento", "Contratos"] }
    ];

    const currGrid = document.getElementById("curriculum-grid");
    const periodPills = document.querySelectorAll(".period-tabs .pill");

    function renderCurriculum(filter = "1º SEMESTRE") {
        if (!currGrid) return;
        currGrid.innerHTML = "";
        const filtered = filter === "all" ? currData : currData.filter(d => d.sem === filter);

        filtered.forEach(item => {
            const div = document.createElement("div");
            div.className = "curriculum-item";
            div.innerHTML = `
                <div class="curriculum-header">
                    <h4>${item.title}</h4>
                    <span class="sem-tag">${item.sem}</span>
                </div>
                <div class="curriculum-body">
                    <p>${item.desc}</p>
                    <div class="tech-tags">
                        ${item.tech.map(t => `<span class="tech-tag">${t}</span>`).join("")}
                    </div>
                </div>
            `;
            // Efeito Accordion
            div.querySelector(".curriculum-header").addEventListener("click", () => {
                div.classList.toggle("open");
            });
            currGrid.appendChild(div);
        });
    }

    periodPills.forEach(pill => {
        pill.addEventListener("click", () => {
            periodPills.forEach(p => p.classList.remove("active"));
            pill.classList.add("active");
            renderCurriculum(pill.getAttribute("data-period"));
        });
    });

    renderCurriculum("1º SEMESTRE"); // Inicializa mostrando o 1º Período por padrão

    // ----------------------------------------------------
    // 3. PROJETOS ALUNOS (GAME BOY COLOR CARTRIDGES)
    // ----------------------------------------------------
    const gbcData = [
        { title: "Cyber Sertão 2099", year: "2025", genre: "Action RPG 2D", desc: "Um RPG cibernético ambientado no sertão nordestino com estética pixel art de 16-bits e trilha sonora de baião sintético.", img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=400", devs: "Equipe Mangangá (Lucas, Beatriz & João)" },
        { title: "EcoGuardians VR", year: "2026", genre: "Simulação VR", desc: "Jogo de Realidade Virtual onde o jogador assume o papel de um cientista recuperando recifes de corais em Fernando de Noronha.", img: "https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?auto=format&fit=crop&q=80&w=400", devs: "VR Lab Recife (Carla & Pedro)" },
        { title: "MangueBeat Rhythm", year: "2024", genre: "Jogo de Ritmo", desc: "Pule e lute no ritmo dos tambores maracatu e guitarras distorcidas do movimento manguebeat pelas pontes de Recife.", img: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=400", devs: "Estúdio Capibaribe (Mariana & Tiago)" },
        { title: "Batalha dos Guararapes", year: "2025", genre: "Estratégia (RTS)", desc: "Comande tropas históricas e defenda o território pernambucano num jogo de estratégia em tempo real tático.", img: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=400", devs: "História & Luta Studio (Gabriel & Ana)" }
    ];

    const gbcGrid = document.getElementById("gbc-grid");
    const modal = document.getElementById("game-modal");
    const modalBody = document.getElementById("modal-body");
    const modalClose = document.getElementById("modal-close");

    if (gbcGrid) {
        gbcData.forEach(game => {
            const cart = document.createElement("div");
            cart.className = "gbc-cartridge";
            cart.innerHTML = `
                <div class="gbc-top-grip">
                    <span></span><span></span><span></span><span></span>
                </div>
                <div class="gbc-label">
                    <img src="${game.img}" alt="${game.title}" class="gbc-image">
                    <h4>${game.title}</h4>
                    <span class="year">GAME BOY COLOR • ${game.year}</span>
                </div>
                <div class="gbc-footer">UNICAP MEMORY CARD</div>
            `;
            cart.addEventListener("click", () => {
                if (modalBody) {
                    modalBody.innerHTML = `
                        <span class="badge-genre">${game.genre}</span>
                        <h3>${game.title} (${game.year})</h3>
                        <img src="${game.img}" class="modal-img" alt="${game.title}">
                        <p>${game.desc}</p>
                        <div class="devs"><strong>Desenvolvido por:</strong> ${game.devs}</div>
                        <a href="https://itch.io" target="_blank" class="btn-primary w-full">JOGAR AGORA NO ITCH.IO <i data-lucide="external-link"></i></a>
                    `;
                }
                lucide.createIcons();
                if (modal) modal.classList.remove("hidden");
            });
            gbcGrid.appendChild(cart);
        });
    }

    if (modalClose && modal) {
        modalClose.addEventListener("click", () => modal.classList.add("hidden"));
        modal.addEventListener("click", (e) => { if (e.target === modal) modal.classList.add("hidden"); });
    }

    // ----------------------------------------------------
    // 4. DOCENTES & EGRESSOS (GRIDS INTEGRADOS NAS ABAS E SEÇÃO)
    // ----------------------------------------------------
    const docentes = [
        { name: "Prof. Dr. Anthony Albuquerque", tag: "Inteligência Artificial & Level Design", desc: "Doutor em Ciência da Computação (UFPE). Pesquisa IA adaptativa para NPCs e geração procedural de conteúdo.", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150" },
        { name: "Profa. Ma. Camila Lins", tag: "Modelagem 3D & Animação", desc: "Mestre em Design. Ex-artista 3D em estúdios internacionais com foco em modelagem de personagens de games.", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150" },
        { name: "Prof. Me. Rodrigo Holanda", tag: "Trilha Sonora & Áudio Digital", desc: "Mestre em Áudio Digital. Compositor e sound designer premiado no SBGames e atua com áudio dinâmico no FMOD.", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150" }
    ];

    const docentesGrid = document.getElementById("docentes-grid");
    if (docentesGrid) {
        docentes.forEach(d => {
            const card = document.createElement("div");
            card.className = "card-generic";
            card.innerHTML = `
                <img src="${d.img}" alt="${d.name}" class="card-img">
                <h4>${d.name}</h4>
                <span class="sub">[${d.tag}]</span>
                <p>${d.desc}</p>
                <a href="http://lattes.cnpq.br" target="_blank" class="btn-link"><i data-lucide="award"></i> Currículo Lattes</a>
            `;
            docentesGrid.appendChild(card);
        });
    }

    const egressos = [
        { name: "Henrique Cavalcanti", tag: "Senior Gameplay Programmer no Canada", desc: "Formado em 2021 na UNICAP. Atualmente desenvolve mecânicas AAA na Ubisoft Montreal.", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150" },
        { name: "Laura Vasconcelos", tag: "Co-fundadora do Estúdio Maracatu Games", desc: "Formada em 2022. Criou seu próprio estúdio indie incubado pelo Porto Digital, com 2 jogos na Steam.", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=150" }
    ];

    const egressosGrid = document.getElementById("egressos-grid");
    if (egressosGrid) {
        egressos.forEach(e => {
            const card = document.createElement("div");
            card.className = "card-generic";
            card.innerHTML = `
                <img src="${e.img}" alt="${e.name}" class="card-img">
                <h4>${e.name}</h4>
                <span class="sub">${e.tag}</span>
                <p>${e.desc}</p>
                <a href="https://linkedin.com" target="_blank" class="btn-link"><i data-lucide="linkedin"></i> LinkedIn</a>
            `;
            egressosGrid.appendChild(card);
        });
    }

    // ----------------------------------------------------
    // 5. PESQUISAS (INTEGRADAS NA ABA)
    // ----------------------------------------------------
    const pesquisas = [
        { title: "PIBIC: Uso de Realidade Virtual na Reabilitação de Pacientes Pós-AVC", leader: "Profa. Ma. Camila Lins & Alunos 4º Semestre" },
        { title: "Gamificação Aplicada ao Ensino da Matemática no Ensino Público de PE", leader: "Prof. Dr. Anthony Albuquerque" },
        { title: "Geração Procedural de Cidades Históricas Brasileiras em Motores Gráficos", leader: "Prof. Me. Rodrigo Holanda" }
    ];

    const pesqList = document.getElementById("pesquisas-list");
    if (pesqList) {
        pesquisas.forEach(p => {
            const div = document.createElement("div");
            div.className = "pesquisa-item";
            div.innerHTML = `
                <div>
                    <h4>${p.title}</h4>
                    <p><strong>Liderança:</strong> ${p.leader}</p>
                </div>
                <span class="badge-retro" style="margin:0;">PIBIC / CNPq</span>
            `;
            pesqList.appendChild(div);
        });
    }

    // ----------------------------------------------------
    // 6. CARROSSEL INFRAESTRUTURA
    // ----------------------------------------------------
    const track = document.getElementById("carousel-track");
    const prevBtn = document.getElementById("carousel-prev");
    const nextBtn = document.getElementById("carousel-next");
    const slides = document.querySelectorAll(".carousel-slide");
    let currentIndex = 0;

    function updateCarousel() {
        if (track) track.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    if (nextBtn && slides.length > 0) {
        nextBtn.addEventListener("click", () => {
            currentIndex = (currentIndex + 1) % slides.length;
            updateCarousel();
        });
    }

    if (prevBtn && slides.length > 0) {
        prevBtn.addEventListener("click", () => {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            updateCarousel();
        });
    }

    // Reinicializar ícones que foram criados dinamicamente
    lucide.createIcons();
});