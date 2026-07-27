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
        {
            title: "Tap Slap Chicken",
            year: "2022",
            genre: "Arcade / Ritmo",
            platform: "PC (Windows) / WebGL",
            desc: "Um jogo de ação e ritmo caótico e divertidíssimo onde você controla uma galinha marcial que precisa distribuir tapas nos inimigos exatamente no compasso da música para sobreviver.",
            devs: "Mateus Assis & Equipe",
            capa: "assets/projetos/TapSlapChicken/1.png",
            imagens: [
                "assets/projetos/TapSlapChicken/1.png",
                "assets/projetos/TapSlapChicken/2.png",
                "assets/projetos/TapSlapChicken/3.png"
            ],
            video: "", // Coloque o link de incorporação (embed) do YouTube/Vimeo aqui
            downloadLink: "" // Coloque o link de download ou do Itch.io aqui
        },
        {
            title: "Void Arena",
            year: "2026",
            genre: "Ação / Arena Sci-Fi",
            platform: "PC (Windows)",
            desc: "Batalha espacial de alta velocidade em uma arena cibernética zero-G. Combates multiplayer locais e intensos focados em reflexos rápidos, movimentação tática e controle de território.",
            devs: "Equipe UNICAP Jogos",
            capa: "assets/projetos/Void_Arena/1.png",
            imagens: [
                "assets/projetos/Void_Arena/1.png",
                "assets/projetos/Void_Arena/2.png"
            ],
            video: "",
            downloadLink: ""
        },
        {
            title: "Repaint",
            year: "2025",
            genre: "Plataforma / Puzzle",
            platform: "PC / WebGL",
            desc: "Uma aventura de plataforma criativa onde o jogador utiliza mecânicas de pintura e cores para alterar as propriedades físicas do cenário, revelando plataformas ocultas e resolvendo enigmas visuais.",
            devs: "Equipe UNICAP Jogos",
            capa: "assets/projetos/Repaint/1.png",
            imagens: [
                "assets/projetos/Repaint/1.png",
                "assets/projetos/Repaint/2.png"
            ],
            video: "",
            downloadLink: ""
        },
        {
            title: "Protocolo 67: Antártica",
            year: "2026",
            genre: "Survival Horror",
            platform: "PC (Windows)",
            desc: "Jogo de terror psicológico e sobrevivência ambientado em uma estação de pesquisa isolada e congelada no polo sul. Gerencie recursos escassos enquanto descobre os segredos de uma anomalia biológica.",
            devs: "Equipe UNICAP Jogos",
            capa: "assets/projetos/Protocolo67/1.png",
            imagens: [
                "assets/projetos/Protocolo67/1.png",
                "assets/projetos/Protocolo67/2.png"
            ],
            video: "",
            downloadLink: ""
        },
        {
            title: "Pollaka",
            year: "2022",
            genre: "Aventura / Plataforma",
            platform: "PC / WebGL",
            desc: "Explore um mundo místico e estilizado repleto de desafios de agilidade. Com uma arte visual encantadora, o jogador atravessa biomas perigosos desvendando segredos antigos.",
            devs: "Lil Shopa & Equipe",
            capa: "assets/projetos/Pollaka/1.png",
            imagens: [
                "assets/projetos/Pollaka/1.png",
                "assets/projetos/Pollaka/2.png"
            ],
            video: "",
            downloadLink: ""
        },
        {
            title: "Pesadelo Macabro",
            year: "2023",
            genre: "Terror em 1ª Pessoa",
            platform: "PC (Windows)",
            desc: "Uma experiência imersiva de terror e suspense em primeira pessoa. Explore ambientes sombrios, resolva enigmas complexos e escape de entidades assustadoras em uma atmosfera altamente tensa.",
            devs: "Pedro CS & Equipe",
            capa: "assets/projetos/Pesadelo_Macabro/1.png",
            imagens: [
                "assets/projetos/Pesadelo_Macabro/1.png",
                "assets/projetos/Pesadelo_Macabro/2.png"
            ],
            video: "",
            downloadLink: ""
        },
        {
            title: "Pedra do Rei",
            year: "2024",
            genre: "RPG / Aventura",
            platform: "PC (Windows)",
            desc: "Inspirado na cultura e folclore regional, este RPG de ação leva o jogador a explorar ruínas esquecidas e enfrentar criaturas lendárias em busca da mítica relíquias que dá nome ao jogo.",
            devs: "Equipe UNICAP Jogos",
            capa: "assets/projetos/Pedra_do_Rei/1.png",
            imagens: [
                "assets/projetos/Pedra_do_Rei/1.png",
                "assets/projetos/Pedra_do_Rei/2.png"
            ],
            video: "",
            downloadLink: ""
        },
        {
            title: "One Bullet Man",
            year: "2022",
            genre: "Ação Tática / Puzzle",
            platform: "PC / WebGL",
            desc: "Você entra em salas repletas de inimigos, mas sua arma possui apenas uma única bala. Calcule trajetórias precisas, aproveite rebotes nas paredes e reações em cadeia para eliminar todos com um só disparo.",
            devs: "Equipe UNICAP Jogos",
            capa: "assets/projetos/One_Bullet_Man/1.png",
            imagens: [
                "assets/projetos/One_Bullet_Man/1.png",
                "assets/projetos/One_Bullet_Man/2.png"
            ],
            video: "",
            downloadLink: ""
        },
        {
            title: "Meowgic School",
            year: "2024",
            genre: "Aventura / Magia",
            platform: "PC / WebGL",
            desc: "Assuma o papel de um adorável gato feiticeiro em uma academia de magia! Combine feitiços elementais, resolva quebra-cabeças mágicos e proteja os corredores da escola contra criaturas travessas.",
            devs: "GameAxis & Equipe",
            capa: "assets/projetos/Meowgic School/1.png",
            imagens: [
                "assets/projetos/Meowgic School/1.png",
                "assets/projetos/Meowgic School/2.png"
            ],
            video: "",
            downloadLink: ""
        },
        {
            title: "Infernal Gate",
            year: "2021",
            genre: "Hack and Slash / Roguelike",
            platform: "PC (Windows)",
            desc: "Ação frenética e combate intenso contra hordas demoníacas. Escolha melhorias estratégicas a cada rodada, domine combos de armas e lute para selar os portões do submundo antes que seja tarde.",
            devs: "Ricardo Vitor & Equipe",
            capa: "assets/projetos/Infernal Gate/1.png",
            imagens: [
                "assets/projetos/Infernal Gate/1.png",
                "assets/projetos/Infernal Gate/2.png"
            ],
            video: "",
            downloadLink: ""
        },
        {
            title: "Eiffel Clue Agency",
            year: "2024",
            genre: "Investigação / Mistério",
            platform: "PC / WebGL",
            desc: "Um jogo de detetive focado em narrativa e dedução lógica. Conduza investigações na França, interrogue suspeitos excêntricos, cruze depoimentos e analise cenas de crime para desmascarar os culpados.",
            devs: "Equipe UNICAP Jogos",
            capa: "assets/projetos/Eiffel_Clue/1.png",
            imagens: [
                "assets/projetos/Eiffel_Clue/1.png",
                "assets/projetos/Eiffel_Clue/2.png"
            ],
            video: "",
            downloadLink: ""
        },
        {
            title: "Cooking Guns",
            year: "2022",
            genre: "Ação Caótica / Co-op",
            platform: "PC (Windows)",
            desc: "A mistura mais insana da culinária com tiroteio! Prepare pedidos gastronômicos complexos em uma cozinha sob ataque constante, defendendo sua bancada a tiros enquanto tenta não queimar a comida.",
            devs: "Mateus Assis & Equipe",
            capa: "assets/projetos/Cooking_Guns/1.png",
            imagens: [
                "assets/projetos/Cooking_Guns/1.png",
                "assets/projetos/Cooking_Guns/2.png"
            ],
            video: "",
            downloadLink: ""
        },
        {
            title: "Bob Vive",
            year: "2026",
            genre: "Plataforma 2D / Humor",
            platform: "PC / WebGL",
            desc: "Uma jornada divertida e cheia de personalidade onde você guia o carismático Bob através de níveis criativos, repletos de obstáculos inusitados, referências à cultura pop e desafios de precisão.",
            devs: "Equipe UNICAP Jogos",
            capa: "assets/projetos/Bob_Vive/1.png",
            imagens: [
                "assets/projetos/Bob_Vive/1.png",
                "assets/projetos/Bob_Vive/2.png"
            ],
            video: "",
            downloadLink: ""
        },
        {
            title: "Arquivo Cronos",
            year: "2024",
            genre: "Sci-Fi / Puzzle Temporal",
            platform: "PC (Windows)",
            desc: "Um jogo de quebra-cabeça de ficção científica onde você manipula a linha do tempo. Grave ações no passado, gere clones temporais de si mesmo e trabalhe em cooperação com o seu 'eu' do futuro.",
            devs: "Equipe UNICAP Jogos",
            capa: "assets/projetos/Arquivo_Cronos/1.png",
            imagens: [
                "assets/projetos/Arquivo_Cronos/1.png",
                "assets/projetos/Arquivo_Cronos/2.png"
            ],
            video: "",
            downloadLink: ""
        },
        {
            title: "Monster Meal",
            year: "2020",
            genre: "Gerenciamento de Tempo",
            platform: "PC / WebGL",
            desc: "Uma lanchonete monstruosa precisa dos seus serviços! Gerencie o tempo, misture ingredientes nojentos (mas deliciosos para eles) e sirva refeições exóticas antes que os monstros percam a paciência.",
            devs: "Kaio & Equipe",
            capa: "assets/projetos/Monster Meal/1.png",
            imagens: [
                "assets/projetos/Monster Meal/1.png",
                "assets/projetos/Monster Meal/2.png"
            ],
            video: "",
            downloadLink: ""
        },
        {
            title: "Furry Fighters",
            year: "2026",
            genre: "Luta / Brawler 2D",
            platform: "PC (Windows)",
            desc: "Um jogo de luta e brawler 2D dinâmico e carismático estrelando lutadores antropomórficos! Escolha seu personagem peludo favorito, domine combos únicos, ataques especiais devastadores e enfrente seus amigos em arenas locais vibrantes e cheias de ação.",
            devs: "Equipe UNICAP Jogos",
            capa: "assets/projetos/FurryFighters/1.png",
            imagens: [
                "assets/projetos/FurryFighters/1.png",
                "assets/projetos/FurryFighters/2.png",
                "assets/projetos/FurryFighters/3.png"
            ],
            video: "", // Cole o link de Embed do YouTube/Vimeo aqui
            downloadLink: "" // Cole o link de download ou do Itch.io aqui
        },
        {
            title: "Drawn To Wonder",
            year: "2021",
            genre: "Plataforma / Aventura Artística",
            platform: "PC (Windows)",
            desc: "Uma aventura mágica de plataforma onde a arte ganha vida! Controle uma jovem artista dentro de um caderno de rascunhos, utilizando o poder do desenho e da imaginação para criar plataformas, superar obstáculos e pintar o seu próprio destino.",
            devs: "Rafa Lopes & Equipe",
            capa: "assets/projetos/Drawn To Wonder/1.png",
            imagens: [
                "assets/projetos/Drawn To Wonder/1.png",
                "assets/projetos/Drawn To Wonder/2.png",
                "assets/projetos/Drawn To Wonder/3.png"
            ],
            video: "",
            downloadLink: ""
        },
        {
            title: "Infernal Gate",
            year: "2021",
            genre: "Hack and Slash / Roguelike",
            platform: "PC (Windows)",
            desc: "Ação frenética e combate sombrio contra hordas demoníacas implacáveis. Domine um arsenal de armas devastadoras, escolha melhorias estratégicas a cada rodada e lute para selar os portões do submundo antes de ser consumido.",
            devs: "Ricardo Vitor & Equipe",
            capa: "assets/projetos/Infernal Gate/1.png",
            imagens: [
                "assets/projetos/Infernal Gate/1.png",
                "assets/projetos/Infernal Gate/2.png"
            ],
            video: "",
            downloadLink: ""
        },
        {
            title: "Aralume",
            year: "2024",
            genre: "Aventura / Fantasia 2D",
            platform: "PC (Windows)",
            desc: "Explore um mundo de fantasia atmosférico e misterioso repleto de magia antiga e criaturas místicas. Com uma arte 2D encantadora e mecânicas imersivas de exploração, desbrave cenários interconectados e traga a luz de volta ao reino de Aralume.",
            devs: "Equipe UNICAP Jogos",
            capa: "assets/projetos/Aralume/1.png",
            imagens: [
                "assets/projetos/Aralume/1.png",
                "assets/projetos/Aralume/2.png",
                "assets/projetos/Aralume/3.png"
            ],
            video: "",
            downloadLink: ""
        }
    ];

    const gbcGrid = document.getElementById("gbc-grid");
    const modal = document.getElementById("game-modal");
    const modalBody = document.getElementById("modal-body");
    const modalClose = document.getElementById("modal-close");

    if (gbcGrid) {
        gbcGrid.innerHTML = ""; // Limpa a grid antes de renderizar os novos
        gbcData.sort((a, b) => parseInt(b.year) - parseInt(a.year));
        gbcData.forEach((game, index) => {
            const cart = document.createElement("div");
            cart.className = "gbc-cartridge";
            cart.innerHTML = `
                <div class="gbc-top-grip">
                    <span></span><span></span><span></span><span></span>
                </div>
                <div class="gbc-label">
                    <img src="${game.capa}" alt="${game.title}" class="gbc-image" onerror="this.src='https://placehold.co/300x160/1e293b/00C2CB?text=${encodeURIComponent(game.title)}'">
                    <h4>${game.title}</h4>
                    <span class="year">GBC • ${game.year}</span>
                </div>
                <div class="gbc-footer">UNICAP MEMORY CARD</div>
            `;
            
            cart.addEventListener("click", () => {
                if (modalBody) {
                    // Monta o player de vídeo (se o link existir)
                    let mediaSection = "";
                    if (game.video && game.video.trim() !== "") {
                        mediaSection += `
                            <div class="modal-video-container">
                                <iframe src="${game.video}" title="${game.title} Trailer" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                            </div>
                        `;
                    }

                    // Monta a galeria de imagens
                    let gallerySection = `<div class="modal-gallery">`;
                    game.imagens.forEach((imgSrc, i) => {
                        gallerySection += `<img src="${imgSrc}" class="gallery-thumb ${i === 0 && !game.video ? 'active-main' : ''}" alt="${game.title}" onclick="document.getElementById('main-modal-img').src='${imgSrc}'" onerror="this.style.display='none'">`;
                    });
                    gallerySection += `</div>`;

                    // Se não tiver vídeo, coloca uma imagem grande principal que muda ao clicar nas miniaturas
                    let mainImageDisplay = "";
                    if (!game.video || game.video.trim() === "") {
                        mainImageDisplay = `<img src="${game.capa}" id="main-modal-img" class="modal-img-main" alt="${game.title}" onerror="this.src='https://placehold.co/600x350/1e293b/00C2CB?text=${encodeURIComponent(game.title)}'">`;
                    }

                    // Botão de Download ou Aviso
                    let downloadBtn = "";
                    if (game.downloadLink && game.downloadLink.trim() !== "") {
                        downloadBtn = `<a href="${game.downloadLink}" target="_blank" class="btn-primary w-full style="margin-top:1.5rem;">BAIXAR / JOGAR AGORA <i data-lucide="download"></i></a>`;
                    } else {
                        downloadBtn = `<a href="#visita" class="btn-secondary w-full" style="margin-top:1.5rem; text-align:center; display:block;">EM BREVE PARA DOWNLOAD — AGENDE UMA VISITA PARA JOGAR NO LAB</a>`;
                    }

                    modalBody.innerHTML = `
                        <div class="modal-header-meta">
                            <span class="badge-genre">${game.genre}</span>
                            <span class="badge-platform"><i data-lucide="monitor"></i> ${game.platform}</span>
                        </div>
                        <h3>${game.title} <span class="modal-year">(${game.year})</span></h3>
                        
                        ${mediaSection}
                        ${mainImageDisplay}
                        ${game.imagens.length > 1 ? gallerySection : ''}
                        
                        <div class="modal-desc">
                            <p>${game.desc}</p>
                        </div>
                        <div class="devs"><strong>Equipe de Desenvolvimento:</strong> ${game.devs}</div>
                        ${downloadBtn}
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
        { name: "Prof. Dr. Anthony Lins", tag: "Programação para Jogos", desc: "", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150" },
        { name: "Prof. Msc. Alan Campos", tag: "Tópicos Avançados em Jogos", desc: "", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150" },
        { name: "Prof. Dr. Breno Carvalho", tag: "Design", desc:"", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150" },    
        { name: "Profa. Msc. Cecilia da Fonte ", tag: "Processos de Design", desc: "", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150" },
        { name: "Prof. Dr. Christiane Quaresma", tag: "Modelagem 3D, Animação 2D", desc: "", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150" },
        { name: "Prof. Msc. Danilo Lúcio", tag: "Roteiro & Som Digital", desc: "", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150" },
        { name: "Prof. Msc. Flávio Dias", tag: "Programação para Jogos", desc: "", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150" },
        { name: "Prof. Msc. Luca Pacheco", tag: "Edição de Video, Desenho & Pintura Digital", desc: "", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150" },
        { name: "Prof. Dr. Rennan Raffaele", tag: "Game Design & Gestão de Projetos", desc: "", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150"},
        { name: "Prof. Msc. Rodrigo Duguay", tag: "Teoria dos Jogos", desc: "", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150" }
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
    // ----------------------------------------------------
    // 7. FORMULÁRIO DE AGENDAMENTO E VALIDAÇÃO DE HORÁRIO
    // ----------------------------------------------------
    const scheduleForm = document.getElementById("schedule-form");
    const horaInput = document.getElementById("hora-visita");
    const dataInput = document.getElementById("data-visita");

    // Impede selecionar datas passadas no calendário
    if (dataInput) {
        const hoje = new Date().toISOString().split("T")[0];
        dataInput.setAttribute("min", hoje);
    }

    // Validação estrita para o intervalo das 14h às 18h
    if (horaInput) {
        horaInput.addEventListener("change", () => {
            const hora = horaInput.value;
            if (hora < "14:00" || hora > "18:00") {
                alert("⚠️ Por favor, selecione um horário de atendimento válido: entre 14:00 e 18:00.");
                horaInput.value = ""; // Limpa o campo se estiver fora do horário
            }
        });
    }

    if (scheduleForm) {
        scheduleForm.addEventListener("submit", (e) => {
            e.preventDefault();
            
            const nome = document.getElementById("nome").value;
            const zap = document.getElementById("whatsapp").value;
            const data = document.getElementById("data-visita").value;
            const hora = document.getElementById("hora-visita").value;
            
            // Verificação de segurança adicional do horário
            if (hora < "14:00" || hora > "18:00") {
                alert("⚠️ O horário da visita deve ser exclusivamente entre 14:00 e 18:00.");
                return;
            }

            // Exemplo de alerta de sucesso (Você pode integrar com WhatsApp ou Email depois!)
            alert(`✅ Solicitação enviada com sucesso, ${nome}!\n\n📅 Visita agendada para: ${data.split('-').reverse().join('/')} às ${hora}\n📱 Entraremos em contato no WhatsApp (${zap}) para confirmar.`);
            
            scheduleForm.reset();
        });
    }

    // Reinicializa ícones Lucide adicionados nos novos botões e formulário
    lucide.createIcons();
});