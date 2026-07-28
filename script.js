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

    renderCurriculum("1º SEMESTRE");

    // ----------------------------------------------------
    // 3. PROJETOS ALUNOS (GAME BOY COLOR CARTRIDGES)
    // ----------------------------------------------------
    function converterParaEmbed(url) {
        if (!url || url.trim() === "") return "";
        let videoId = "";
        if (url.includes("youtube.com/watch?v=")) {
            videoId = url.split("v=")[1].split("&")[0];
        } else if (url.includes("youtu.be/")) {
            videoId = url.split("youtu.be/")[1].split("?")[0];
        } else if (url.includes("youtube.com/embed/")) {
            return url;
        }
        return videoId ? `https://www.youtube-nocookie.com/embed/${videoId}` : url;
    }

    window.mudarSlideModal = function(direcao) {
        const track = document.getElementById("modal-track");
        if (track) {
            const width = track.clientWidth;
            track.scrollBy({ left: direcao * width, behavior: 'smooth' });
        }
    };

    window.verificarSlidesModal = function() {
        const track = document.getElementById("modal-track");
        const btns = document.querySelectorAll(".modal-car-btn");
        if (!track) return;
        const slides = track.querySelectorAll(".modal-slide");
        if (slides.length <= 1) {
            btns.forEach(b => b.style.display = "none");
        } else {
            btns.forEach(b => b.style.display = "flex");
        }
        if (slides.length === 0) {
            track.innerHTML = `<div class="modal-slide"><img src="https://placehold.co/600x360/1e293b/00C2CB?text=Sem+Imagens+Disponiveis" alt="Sem imagem"></div>`;
            btns.forEach(b => b.style.display = "none");
        }
    };

    function gerarListaImagens(pasta) {
        const nomesPossiveis = ["1", "2", "3", "4", "5", "capa", "cover", "gameplay", "screenshot", "thumb", pasta.split("/").pop()];
        const extensoes = ["gif", "png", "jpg", "jpeg", "svg"];
        let lista = [];
        nomesPossiveis.forEach(nome => {
            extensoes.forEach(ext => {
                lista.push(`${pasta}/${nome}.${ext}`);
            });
        });
        return lista;
    }

    const gbcData = [
        {
            title: "Tap Slap Chicken",
            year: "2022",
            genre: "Clicker",
            platform: "Web",
            desc: "Um jogo clicker, onde seu objetivo é assar frangos na base do tapa! Construa uma fábrica de assar frango no tapa e obtenha sucesso nesse mundo capitalista!.",
            devs: "Mateus Assis, André Luna, George Muniz, Milena, Maria Eduarda",
            pasta: "assets/projetos/TapSlapChicken",
            video: "", 
            downloadLink: "https://mateuzoassis.itch.io/tap-slap-chicken"
        },
        {
            title: "Void Arena",
            year: "2026",
            genre: "Survivor",
            platform: "PC (Windows)",
            desc: "Void Arena é um roguelike no qual você controla o detetive Faraday, que domina as artes ocultas e invoca um buraco negro! Ajude-o a derrotar o maior número possível de inimigos aprimorando o buraco negro.",
            devs: "Luiz Antônio, Júlia Arruda",
            pasta: "assets/projetos/Void_Arena",
            video: "https://www.youtube.com/watch?v=ZPYkHOUSpZM",
            downloadLink: "https://jogos-digitais-unicap.itch.io/void-arena"
        },
        {
            title: "Repaint",
            year: "2025",
            genre: "Ação / Aventura",
            platform: "PC / WebGL",
            desc: "Uma aventura de plataforma criativa onde o jogador utiliza mecânicas de pintura e cores para alterar as propriedades físicas do cenário, revelando plataformas ocultas e resolvendo enigmas visuais.",
            devs: "Equipe UNICAP Jogos",
            pasta: "assets/projetos/Repaint",
            video: "https://www.youtube.com/watch?v=H6cWE63HZyk",
            downloadLink: ""
        },
        {
            title: "Protocolo 67: Antártica",
            year: "2026",
            genre: "Survival Horror",
            platform: "PC (Windows)",
            desc: "Século XXII, a humanidade deixou de temer a guerras entre si, pois algo muito pior surgiu... Portais de origem desconhecidos surgiram em diversos pontos do planeta, e deles, criaturas grotescas e jamais vistas começam a invadir a Terra. Como medida de defesa, foram criadas as Torres de Batalha, estruturas colossais equipadas com tecnologia militar de alto nível projetadas para conter o avanço das criaturas e selar os portais.",
            devs: "Oto Macabeu, Hugo Beltrão, Alexandro Cavalcanti, Yve Correia",
            pasta: "assets/projetos/Protocolo67",
            video: "",
            downloadLink: ""
        },
        {
            title: "Pollaka",
            year: "2022",
            genre: "Point'n Click",
            platform: "PC",
            desc: "Pollaka é um jogo focado na experiência emocional do jogador com elementos de quebra-cabeças e interativos, ele conta a história de Pollaka, uma garota fofa com cabelo castanho e seu avô, um homem doce com cabelo branco. No jogo você terá fotos que foram rasgadas e como Pollaka adulta, terá que colá-las de volta para entrar e lembrar das memórias que ela teve com seu avô, que pode ser interativo através de minijogos. O jogo é dividido em três capítulos: infância, adolescência e idade adulta.",
            devs: "Marcos Vinicius, Maria Fernanda, Vitoria Bertolini, Lêniton Carneiro, Artur Queiroz",
            pasta: "assets/projetos/Pollaka",
            video: "https://www.youtube.com/watch?v=T7f-aZXNjf4",
            downloadLink: ""
        },
        {
            title: "Pesadelo Macabro",
            year: "2023",
            genre: "Survival Horror / Puzzle",
            platform: "PC (Windows)",
            desc: "Pesadelo Macabro é um jogo de terror, em primeira pessoa, onde o jogador se vê preso dentro de um pesadelo em que precisa escapar do Papa figo,  uma figura lendária do folclore brasileiro, conhecida principalmente em Pernambuco, Bahia e na Paraíba. O jogador controla uma estudante universitária que, após passar várias horas fazendo uma pesquisa sobre o folclore Pernambucano, exausta,  cai num sono profundo e acaba vivendo uma experiência sobrenatural. Lá ela descobre o destino terrível de quem é pego pelo monstro e usa toda sua astúcia para salvar a si e a criança que também está presa na casa do Papa figo.",
            devs: "Carlos Roberto, Péricles Vinícius, Maria Luiza, Pedro Sousa",
            pasta: "assets/projetos/Pesadelo_Macabro",
            video: "https://www.youtube.com/watch?v=xrvIwRYhRRk",
            downloadLink: "https://pedrocs.itch.io/pesadelo-macabro"
        },
        {
            title: "Pedra do Rei",
            year: "2024",
            genre: "Ação / Aventura",
            platform: "PC (Windows)",
            desc: "A Pedra do Rei é um jogo de ação e aventura, com gráficos 2D e visão top-down, onde o jogador controla o personagem Cícero, que está em uma missão para recuperar o sol do reino roubado pelo Rei morto, enquanto luta com os aliados do rei durante sua missão. Totalmente falado em portugês, o jogo bebeu da fonte da música e literatura do movimento armorial pernambucano para o seu desenvolvimento. O jogo é uma história que se baseia em diversos elementos da cultura armorial e desafia seus jogadores a vencer os desafios da missão.",
            devs: "Marcelo Henrique, Gabriela Albququerque, Ademir Melo, Pedro Mafra",
            pasta: "assets/projetos/Pedra_do_Rei",
            video: "https://www.youtube.com/watch?v=Adg_yTkxX1I",
            downloadLink: "https://jogos-digitais-unicap.itch.io/pedra-do-rei"
        },
        {
            title: "One Bullet Man",
            year: "2022",
            genre: "Ação Tática / Puzzle",
            platform: "PC / WebGL",
            desc: "Você entra em salas repletas de inimigos, mas sua arma possui apenas uma única bala. Calcule trajetórias precisas, aproveite rebotes nas paredes e reações em cadeia para eliminar todos com um só disparo.",
            devs: "Equipe UNICAP Jogos",
            pasta: "assets/projetos/One_Bullet_Man",
            video: "https://www.youtube.com/watch?v=31FWtew4UAA",
            downloadLink: "https://davifox.itch.io/one-bullet-man"
        },
        {
            title: "Meowgic School",
            year: "2024",
            genre: "Aventura / Magia",
            platform: "VR - Meta Quest 2+",
            desc: "A Meowgic School é um jogo de exercícios de realidade virtual projetado para pessoas que podem estar procurando uma maneira divertida de combater estilos de vida sedentários. Combinamos os populares gêneros móveis Match 3 e Bubble Shooter com a Realidade Virtual para criar uma experiência de jogo ativa. Você é um aluno gato na Meowgic School, a escola mais prestigiada de magia elemental do mundo, onde vários magos com feitos incríveis já estiveram no passado.",
            devs: "Carolina Queiroz, Gleydson Tavares, Igor Gustavo Sampaio, Raquel Marreira",
            pasta: "assets/projetos/Meowgic School",
            video: "https://www.youtube.com/watch?v=Thzv0zgcXzc",
            downloadLink: "https://gameaxis.itch.io/meowgic-school"
        },
        {
            title: "Infernal Gate",
            year: "2021",
            genre: "Metroidvania",
            platform: "PC (Windows)",
            desc: "Este jogo é um Metroidvania no estilo de fantasia sombria. Com exploração de ruínas e castelos e além de demônios pra expurgar deste mundo.",
            devs: "Ricardo Vitor & Equipe",
            pasta: "assets/projetos/Infernal Gate",
            video: "https://www.youtube.com/watch?v=EizURHXf_w0",
            downloadLink: "https://ricardo-vitor.itch.io/infernal-gate"
        },
        {
            title: "Eiffel Clue Agency",
            year: "2024",
            genre: "Investigação / Plataformer",
            platform: "PC",
            desc: "Descubra os segredos escondidos nas ruas de Paris em 1924 com o lançamento do jogo Eiffel Clue Agency! Torne-se um detetive destemido, determinado a resolver um mistério envolvendo o roubo de artefatos olímpicos durante os Jogos Olímpicos daquele ano. Descubra pistas, aprofunde-se na história e explore uma narrativa imersiva enquanto enfrenta desafios de plataforma e furtividade!",
            devs: "Aryel Omenah Batista de Souza (sua memória está salva), João Vítor Cabral de Carvalho Gonçalves, Rodrigo Luiz de Souza Couto, Pedro Paz Alves Brito Monteiro, João Pedro  Rocha Gouveia",
            pasta: "assets/projetos/Eiffel_Clue",
            video: "https://www.youtube.com/watch?v=mXkOjC7fYUs",
            downloadLink: "https://jogos-digitais-unicap.itch.io/eiffel-clue-agency"
        },
        {
            title: "Cooking Guns",
            year: "2022",
            genre: "Ação Caótica / Co-op",
            platform: "PC (Windows)",
            desc: "A mistura mais insana da culinária com tiroteio! Prepare pedidos gastronômicos complexos em uma cozinha sob ataque constante, defendendo sua bancada a tiros enquanto tenta não queimar a comida.",
            devs: "Mateus Assis, André Luna, George Muniz, Milena, Maria Eduarda",
            pasta: "assets/projetos/Cooking_Guns",
            video: "https://www.youtube.com/watch?v=zGXoIGrE6eU",
            downloadLink: "https://mateuzoassis.itch.io/cooking-guns"
        },
        {
            title: "Bob Vive",
            year: "2026",
            genre: "Plataforma 2D / Humor",
            platform: "PC / WebGL",
            desc: "Dr.Bob é um cientista de uma instalação que estudava parasitas alienígenas, um acidente aconteceu e esses parasitas foram soltos pelo local. Bob, agora contaminado com um desses parasitas, precisa lutar para exterminar o resto dos parasitas, procurando por partes de uma cura, enquanto coleta mini curas durante o jogo, para impedir que o parasita tome conta do seu corpo.",
            devs: "Equipe UNICAP Jogos",
            pasta: "assets/projetos/Bob_Vive",
            video: "",
            downloadLink: "https://jogos-digitais-unicap.itch.io/bob-vive"
        },
        {
            title: "Arquivo Cronos",
            year: "2024",
            genre: "Puzzle",
            platform: "PC (Windows)",
            desc: "O jogador é um membro da iniciativa RecRunners que tem a missão de retornar ao passado, na década de 1980, para recuperar uma memória chave dentro do Arquivo Público de Olinda. Para garantir que a missão seja cumprida, o jogador precisa explorar o interior da casa e resolver diversos quebra-cabeças e mecanismos para descobrir e recuperar o objeto que armazena a memória chave.",
            devs: "Equipe UNICAP Jogos",
            pasta: "assets/projetos/Arquivo_Cronos",
            video: "",
            downloadLink: "https://jogos-digitais-unicap.itch.io/arquivo-cronos"
        },
        {
            title: "Monster Meal",
            year: "2022",
            genre: "Gerenciamento de Tempo",
            platform: "Android",
            desc: "Uma lanchonete monstruosa precisa dos seus serviços! Gerencie o tempo, misture ingredientes nojentos (mas deliciosos para eles) e sirva refeições exóticas antes que os monstros percam a paciência.",
            devs: "Kaio Carrenho, Lucas Angeiras, Erick Bruno, Pietro Nestor",
            pasta: "assets/projetos/Monster Meal",
            video: "",
            downloadLink: "https://kaio1995.itch.io/monster-meal"
        },
        {
            title: "Furry Fighters",
            year: "2026",
            genre: "Fighter / Shooter",
            platform: "PC (Windows)",
            desc: "Um jogo de luta e brawler 2D dinâmico e carismático estrelando lutadores antropomórficos! Escolha seu personagem peludo favorito, domine combos únicos, ataques especiais devastadores e enfrente seus amigos em arenas locais vibrantes e cheias de ação.",
            devs: "Lucca Braga, Esdras Rodrigues, Matheus Medeiros, Rayran Clementino",
            pasta: "assets/projetos/FurryFighters",
            video: "https://www.youtube.com/watch?v=rrLg7Zj2GQs", 
            downloadLink: "https://jogos-digitais-unicap.itch.io/furry-fighters"
        },
        {
            title: "Drawn To Wonder",
            year: "2021",
            genre: "Aventura / Puzzle",
            platform: "PC (Windows)",
            desc: "A personagem principal é um desenho que cria vida em um quarto de criança com um objetivo em mente. A medida que ela vai explorando a casa, ela vai entendendo mais sobre a família que mora lá e o que veio a acontecer no seu passado para entender o que a aflige no presente.",
            devs: "Rafa Lopes, Lucas Pinheiro, Paulo Victor, Diego Camilo",
            pasta: "assets/projetos/Drawn To Wonder",
            video: "https://www.youtube.com/watch?v=D3bE9RqADg0",
            downloadLink: "https://rafalopeslol.itch.io/drawn-to-wonder-demo"
        },
        {
            title: "Aralume",
            year: "2024",
            genre: "Aventura / Fantasia 2D",
            platform: "PC (Windows)",
            desc: "Aralume é um jogo ação-aventura 3D com foco nos bosses e puzzles. O objetivo do jogador é derrotar o boss de cada fase e resolver os puzzles para ir para a próxima fase. Aralume conta a história de Biu, um ser humano que é abençoado pela Nossa Senhora para derrotar a Bruxa, que despertou um grande mal e estava agindo de uma forma misteriosa. Contudo, ao decorrer da aventura, o héroi acaba descobrindo que existe um mal maior por traz de todo caos.",
            devs: "Equipe UNICAP Jogos",
            pasta: "assets/projetos/Aralume",
            video: "",
            downloadLink: "https://jogos-digitais-unicap.itch.io/aralume"
        },
        {
            title: "Bichos do Brasil",
            year: "2025",
            genre: "Aventura / Educacional",
            platform: "PC / WebGL",
            desc: "Uma bela jornada interativa valorizando a nossa fauna e flora do Brasil. Descubra biomas nacionais e proteja animais em extinção através de minigames criativos e envolventes.",
            devs: "Equipe UNICAP Jogos",
            pasta: "assets/projetos/Bichos _do_Brasil",
            video: "",
            downloadLink: "https://jogos-digitais-unicap.itch.io/bichos-do-brasil"
        },
        {
            title: "In My Room",
            year: "2021",
            genre: "Survivor Horror",
            platform: "PC",
            desc: "In My Room é um jogo de terror de sobrevivência sendo desenvolvido pelo grupo Nightmare Studios do curso tecnólogo de Jogos Digitais da Universidade Católica de Pernambuco. Focado no aspecto psicológico, a perspectiva do jogo é em primeira pessoa, com uma linha de arte estilizada semi-realista. Na experiência o jogador controla o personagem principal e tem como objetivo acordar do sonho em que ele se encontra preso.",
            devs: "Bianca Castor, Vinicius Montarroyos, Túlio Luiz, Matheus Silva",
            pasta: "assets/projetos/InMyRoom",
            video: "https://www.youtube.com/watch?v=oz_KWC1iNi4",
            downloadLink: "https://nightmarestudiosunicap.itch.io/in-my-room"
        }
    ];

    const gbcGrid = document.getElementById("gbc-grid");
    const modal = document.getElementById("game-modal");
    const modalBody = document.getElementById("modal-body");
    const modalClose = document.getElementById("modal-close");

    if (gbcGrid) {
        gbcGrid.innerHTML = "";
        gbcData.sort((a, b) => parseInt(b.year) - parseInt(a.year));
        
        gbcData.forEach((game) => {
            const imagensPossiveis = gerarListaImagens(game.pasta);
            const capaInicial = imagensPossiveis[0];

            const cart = document.createElement("div");
            cart.className = "gbc-cartridge";
            cart.innerHTML = `
                <div class="gbc-top-grip">
                    <span></span><span></span><span></span><span></span>
                </div>
                <div class="gbc-label">
                    <img src="${capaInicial}" alt="${game.title}" class="gbc-image" 
                         onerror="const next = this.getAttribute('data-idx') ? parseInt(this.getAttribute('data-idx')) + 1 : 1; if(next < ${imagensPossiveis.length}) { this.setAttribute('data-idx', next); this.src='${game.pasta}/' + ['1','2','3','4','5','capa','cover','gameplay','screenshot','thumb','${game.pasta.split('/').pop()}'][Math.floor(next/5)] + '.' + ['gif','png','jpg','jpeg','svg'][next%5]; } else { this.src='https://placehold.co/300x160/1e293b/00C2CB?text=${encodeURIComponent(game.title)}'; }">
                    <h4>${game.title}</h4>
                    <span class="year">${game.year}</span>
                </div>
                <div class="gbc-footer">UNICAP MEMORY CARD</div>
            `;
            
            cart.addEventListener("click", () => {
                if (modalBody) {
                    let carouselSection = `
                        <div class="modal-carousel-container">
                            <button class="modal-car-btn prev" onclick="mudarSlideModal(-1)" title="Anterior"><i data-lucide="chevron-left"></i></button>
                            <button class="modal-car-btn next" onclick="mudarSlideModal(1)" title="Próxima"><i data-lucide="chevron-right"></i></button>
                            <div class="modal-carousel-track" id="modal-track">
                    `;
                    
                    if (game.video && game.video.trim() !== "") {
                        const embedUrl = converterParaEmbed(game.video);
                        if (embedUrl) {
                            carouselSection += `
                                <div class="modal-slide">
                                    <iframe src="${embedUrl}" title="${game.title} Trailer" class="modal-video-iframe" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                                </div>
                            `;
                        }
                    }

                    imagensPossiveis.forEach((imgSrc) => {
                        carouselSection += `
                            <div class="modal-slide">
                                <img src="${imgSrc}" alt="${game.title}" onload="verificarSlidesModal()" onerror="this.parentElement.remove(); verificarSlidesModal();">
                            </div>
                        `;
                    });
                    
                    carouselSection += `
                            </div>
                        </div>
                    `;

                    let downloadBtn = "";
                    if (game.downloadLink && game.downloadLink.trim() !== "") {
                        downloadBtn = `<a href="${game.downloadLink}" target="_blank" class="btn-primary" style="margin-top:1.5rem; width:100%; justify-content:center;">BAIXAR / JOGAR AGORA <i data-lucide="download"></i></a>`;
                    } else {
                        downloadBtn = `<a href="#visita" class="btn-secondary" style="margin-top:1.5rem; text-align:center; display:block; width:100%;">EM BREVE PARA DOWNLOAD — AGENDE UMA VISITA PARA JOGAR NO LAB</a>`;
                    }

                    modalBody.innerHTML = `
                        <div class="modal-header-meta">
                            <span class="badge-genre">${game.genre}</span>
                            <span class="badge-platform"><i data-lucide="monitor"></i> ${game.platform}</span>
                        </div>
                        <h3>${game.title} <span class="modal-year">(${game.year})</span></h3>
                        
                        ${carouselSection}
                        
                        <div class="modal-desc">
                            <p>${game.desc}</p>
                        </div>
                        <div class="devs"><strong>Equipe de Desenvolvimento:</strong> ${game.devs}</div>
                        ${downloadBtn}
                    `;
                }
                lucide.createIcons();
                if (modal) {
                    modal.classList.remove("hidden");
                    setTimeout(window.verificarSlidesModal, 300);
                }
            });
            gbcGrid.appendChild(cart);
        });
    }

// ====================================================
    // FECHAMENTO INTELIGENTE DO MODAL (PARA O VÍDEO E SOM NA HORA)
    // ====================================================
    function fecharCartuchoModal() {
        if (modal) {
            modal.classList.add("hidden"); // Oculta o pop-up visualmente
            if (modalBody) {
                // LIMPA O HTML INTERNO: Destrói o iframe imediatamente, parando qualquer áudio ou vídeo!
                modalBody.innerHTML = ""; 
            }
        }
    }

    if (modalClose && modal) {
        // Fechar ao clicar no botão "X"
        modalClose.addEventListener("click", fecharCartuchoModal);
        
        // Fechar ao clicar fora da caixinha (no fundo escuro)
        modal.addEventListener("click", (e) => { 
            if (e.target === modal) fecharCartuchoModal(); 
        });

        // BÔNUS GAMER: Fechar ao pressionar a tecla "ESC" no teclado
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && !modal.classList.contains("hidden")) {
                fecharCartuchoModal();
            }
        });
    }
    
    // ----------------------------------------------------
    // 4. DOCENTES & EGRESSOS (GRIDS INTEGRADOS NAS ABAS E SEÇÃO)
    // ----------------------------------------------------
    const docentes = [
        { name: "Prof. Dr. Anthony Lins", tag: "Programação para Jogos", desc: "", img: "assets/docentes/anthony.jpg", lattes: "http://lattes.cnpq.br/0000000000000001" },
        { name: "Prof. Msc. Alan Campos", tag: "Tópicos Avançados em Jogos", desc: "", img: "assets/docentes/alan.jpg", lattes: "http://lattes.cnpq.br/0000000000000002" },
        { name: "Prof. Dr. Breno Carvalho", tag: "Design", desc:"", img: "assets/docentes/breno.jpg", lattes: "http://lattes.cnpq.br/0000000000000003" },    
        { name: "Profa. Msc. Cecilia da Fonte", tag: "Processos de Design", desc: "", img: "assets/docentes/cecilia.jpg", lattes: "http://lattes.cnpq.br/0000000000000004" },
        { name: "Prof. Dr. Christiane Quaresma", tag: "Modelagem 3D, Animação 2D", desc: "", img: "assets/docentes/christiane.jpg", lattes: "http://lattes.cnpq.br/0000000000000005" },
        { name: "Prof. Msc. Danilo Lúcio", tag: "Roteiro & Som Digital", desc: "", img: "assets/docentes/danilo.jpg", lattes: "http://lattes.cnpq.br/0000000000000006" },
        { name: "Prof. Msc. Flávio Dias", tag: "Programação para Jogos", desc: "", img: "assets/docentes/flavio.jpg", lattes: "http://lattes.cnpq.br/0000000000000007" },
        { name: "Prof. Msc. Luca Pacheco", tag: "Edição de Video, Desenho & Pintura Digital", desc: "", img: "assets/docentes/luca.jpg", lattes: "http://lattes.cnpq.br/0000000000000008" },
        { name: "Prof. Dr. Rennan Raffaele", tag: "Game Design & Gestão de Projetos", desc: "", img: "assets/docentes/rennan.jpeg", lattes: "http://lattes.cnpq.br/1916664448861686" },
        { name: "Prof. Msc. Rodrigo Duguay", tag: "Teoria dos Jogos", desc: "", img: "assets/docentes/rodrigo.jpg", lattes: "http://lattes.cnpq.br/0000000000000010" },
        { name: "Profa. Msc. Graziella", tag: "Teoria dos Jogos", desc: "", img: "assets/docentes/graziella.jpg", lattes: "http://lattes.cnpq.br/0000000000000011" }
    ];

    const docentesGrid = document.getElementById("docentes-grid");
    if (docentesGrid) {
        docentesGrid.innerHTML = "";
        docentes.forEach(d => {
            const card = document.createElement("div");
            card.className = "card-generic";
            card.innerHTML = `
                <img src="${d.img}" alt="${d.name}" class="card-img" onerror="this.src='https://placehold.co/150x150/1e293b/00C2CB?text=UNICAP'">
                <h4>${d.name}</h4>
                <span class="sub">[${d.tag}]</span>
                <p>${d.desc}</p>
                <a href="${d.lattes || 'http://lattes.cnpq.br'}" target="_blank" rel="noopener noreferrer" class="btn-link"><i data-lucide="award"></i> Currículo Lattes</a>
            `;
            docentesGrid.appendChild(card);
        });
    }

    const egressos = [
{ 
            name: "Igor Fialho", 
            tag: "3D Character Artist / 3D Creature Artist", 
            desc: "Formado em 2019. Trabalhou em empresas como a Kokku Games e Globant com modelagem de personagens 3D.", 
            img: "assets/egressos/igorfialho.jpg",
            linkedin: "https://www.linkedin.com/in/igor-fialho-380b1613a/?skipRedirect=true"         
            },
 { 
            name: "Pedro Arthur", 
            tag: "Programador | Desenvolvimento XR | Desenvolvimento de Games | LiveOps", 
            desc: "Formado em 2020. Trabalhou em empresas como Sinapsis Inovação, Sense+, Playfox Games, PUGA Studios.", 
            img: "assets/egressos/matheus.png",
            linkedin: "https://www.linkedin.com/in/pedro-santos-bitencourt/"
        },
        { 
            name: "Eudes Tenório", 
            tag: "Desenvolvedor de Jogos", 
            desc: "Formado em 2021. Trabalhou em empresas como Kokku Games, Manifesto Games e Happen.", 
            img: "assets/egressos/eudes.png",
            linkedin: "https://www.linkedin.com/in/eudestenorio/" 
        },
           { 
            name: "Ezio Filho", 
            tag: "Engineering Manager", 
            desc: "Formado em 2016. Trabalhou em empresas como Daisu Games e Kokku Games.", 
            img: "assets/egressos/ezio.jpeg",
            linkedin: "https://www.linkedin.com/in/ezio-filho-793b75b5/" 
        },
           { 
            name: "Rafael Miranda", 
            tag: "QA Intern", 
            desc: "Formado em 2024. Trabalhou em empresas como CESAR.", 
            img: "assets/egressos/rafaelmiranda.png",
            linkedin: "https://www.linkedin.com/in/rapheto/" 
        },
          { 
            name: "Maria Fernanda Poletine", 
            tag: "Game Producer", 
            desc: "Formada em 2022. Trabalhou em empresas como Kokku Games, DX Gameworks e Osten Games.", 
            img: "assets/egressos/mariafernanda.png",
            linkedin: "https://www.linkedin.com/in/maria-fernanda-poletine-8303121b2/"  
        },
          { 
            name: "Matheus Campelo", 
            tag: "QA Tester", 
            desc: "Formada em 2022. Trabalhou em empresas como Kokku Games, FAST Soluções Tecnológicas, Pulsatrix Studios.", 
            img: "assets/egressos/matheus.png",
            linkedin: "https://www.linkedin.com/in/matheus-campelo-9381271a8/"
        },
         { 
            name: "Davi Fox", 
            tag: "Game Designer", 
            desc: "Formado em 2022. Trabalhou em empresas como Puga Studios, Manifesto Games, OPA Games, e Afterverse.", 
            img: "assets/egressos/davi.jpeg",
            linkedin: "https://www.linkedin.com/in/davi-fox" 
        },
         { 
            name: "André Luna", 
            tag: "Game Designer / Level Designer", 
            desc: "Formado em 2021. Trabalhou em empresas como BBTV, Point'N Sheep, e Afil Games.", 
            img: "assets/egressos/andre.jpeg",
            linkedin: "https://www.linkedin.com/in/andreggluna/" 
        },
        { 
            name: "Rodrigo Lemos", 
            tag: "Software Tester", 
            desc: "Formado em 2021. Trabalhou no Projeto CIn/Motorola.", 
            img: "assets/egressos/Rodrigo.jpeg ",
            linkedin: "https://www.linkedin.com/in/rodrigo-a-lemos/" 
        },     
          { 
            name: "Milena Ferreira", 
            tag: "Design Gráfico e Visual | UI/UX Designer | Ilustradora", 
            desc: "Formado em 2021. Trabalhou na empresa Manifesto Games.", 
            img: "assets/egressos/milena.jpeg ",
            linkedin: "https://www.linkedin.com/in/milenarferreira/" 
        },      
        { 
            name: "Eduarda Paixão", 
            tag: "Designer | Social Media", 
            desc: "Formado em 2021. Trabalhou na empresa Raid Hut.", 
            img: "assets/egressos/eduarda.jpeg ",
            linkedin: "https://www.linkedin.com/in/eduarda-paixão-7246421b6/" 
        },     
          { 
            name: "Icaro Correia", 
            tag: "Lead Character Artist", 
            desc: "Formado em 2017. Trabalhou em empresas como Roarty Digital, Diorama Digital, BlackZebra studio.", 
            img: "assets/egressos/icaro.jpeg",
            linkedin: "https://www.linkedin.com/in/icaro-correia/" 
        },
         { 
            name: "Carolina Queiroz", 
            tag: "Game Designer", 
            desc: "Formada em 2024. Trabalhou em empresas como Raid Hut, Obitus Games e Manifesto Games.", 
            img: "assets/egressos/carol.jpeg",
            linkedin: "https://www.linkedin.com/in/carolqueiroz-gd" 
        },
          { 
            name: "João Victor Batista", 
            tag: "Artista e Animador 2D e 3D", 
            desc: "Formado em 2025. Trabalhou em empresas como SENAI PE.", 
            img: "assets/egressos/joao.png",
            linkedin: "https://www.linkedin.com/in/joão-victor-batista-de-serqueira-87671b2ab/" 
        },
         { 
            name: "Laura Santos Veloso", 
            tag: "Game Developer", 
            desc: "Formado em 2025. Trabalhou em empresas como SENAI PE.", 
            img: "assets/egressos/laura.png",
            linkedin: "https://www.linkedin.com/in/laura-santos-veloso-99415536b//" 
        },
          { 
            name: "Henrique Gonçalves", 
            tag: "Software Enginner", 
            desc: "Formado em 2017. Trabalhou em empresas como Rumpi, CESAR e Thorpe System", 
            img: "assets/egressos/henrique.jpeg",
            linkedin: "https://www.linkedin.com/in/henrique-gonçalves-71a0044b/" 
        },
         { 
            name: "Matheus C. Germoglio", 
            tag: "Team Lead/Consultant em Design de Produto", 
            desc: "Formado em 2019. Trabalhou em empresas como Accenture Brasil", 
            img: "assets/egressos/mateusg.png",
            linkedin: "https://www.linkedin.com/in/henrique-gonçalves-71a0044b/" 
        },
         { 
            name: "Valmir Neto", 
            tag: "Game Designer & QA", 
            desc: "Formado em 2019. Trabalhou em empresas como Nukearts, Manifesto Games & CodeBuddy.", 
            img: "assets/egressos/valmir.png",
            linkedin: "https://www.linkedin.com/in/valmirurbanneto/" 
        },
         { 
            name: "Arthur Santos", 
            tag: "Stylized 3D Characters Artist", 
            desc: "Formado em 2019. Trabalhou em empresas como Companion Group, Room 8 Studio, PUGA Studios.", 
            img: "assets/egressos/arthur.jpg",
            linkedin: "https://www.linkedin.com/in/arthur-santos-66452a119/" 
        },       
         { 
            name: "Victor Andrade", 
            tag: "Game Designer / Level Designer", 
            desc: "Formado em 2016. Trabalhou em empresas como Baião Studio, OPA Games, Lumo Entertainment e Inside Tecnologia", 
            img: "assets/egressos/victor.jpg",
            linkedin: "https://www.linkedin.com/in/victoraes/" 
        },   
          { 
            name: "Rafael Lopes", 
            tag: "Software Engineer", 
            desc: "Formado em 2021. Trabalhou em empresas como tatoDesk", 
            img: "assets/egressos/rafael.jpeg",
            linkedin: "https://www.linkedin.com/in/rafael-lopes-8b571a1b0/" 
        },   
          { 
            name: "Hyago Carvalho", 
            tag: "Game Designer", 
            desc: "Formado em 2021. Trabalhou em empresas como Manifesto Games", 
            img: "assets/egressos/hyago.jpeg",
            linkedin: "https://www.linkedin.com/in/hyago-carvalho-38568817a/" 
        },
        { 
            name: "Lêniton Carneiro", 
            tag: "Game Developer", 
            desc: "Formado em 2022. Trabalhou em empresas como OPA Games e GDS TEC", 
            img: "assets/egressos/leniton.jpeg",
            linkedin: "https://www.linkedin.com/in/lêniton-da-silva-carneiro-b77b0a195/" 
        },
            { 
            name: "Marcos Vinicius Silva", 
            tag: "Game Designer", 
            desc: "Formado em 2022. Trabalhou em empresas como LUMA Gameworks", 
            img: "assets/egressos/marcos.jpeg",
            linkedin: "https://www.linkedin.com/in/marcos-vinicius-de-farias-silva-86ba481b2/marc" 
        },
            { 
            name: "Jonny Willian", 
            tag: "3D Character Artist", 
            desc: "Formado em 2020. Trabalhou em empresas como Advancement Design e Flux Games.", 
            img: "assets/egressos/jonny.jpeg",
            linkedin: "https://www.linkedin.com/in/jonnywillianlima/" 
        },
         { 
            name: "Rennan Raffaele", 
            tag: "Professor e Game Designer", 
            desc: "Formado em 2015. Trabalhou em empresas como UNICAP, Happen, IFPE e ESM FAMA", 
            img: "assets/egressos/rennan.jpeg",
            linkedin: "https://www.linkedin.com/in/rennan-raffaele/" 
        },
          { 
            name: "Perseu Bastos", 
            tag: "Estratégia e Modelagem de Negócios", 
            desc: "Formado em 2012. Trabalhou em empresas como Sebrae PR, Porto Digital, Sebrae PE, Playful", 
            img: "assets/egressos/perseu.jpeg",
            linkedin: "https://www.linkedin.com/in/perseubastos/" 
        }
        
    ];

const egressosGrid = document.getElementById("egressos-grid");
    if (egressosGrid) {
        egressosGrid.innerHTML = ""; // Limpa a grade antes de gerar
        
        egressos.forEach(e => {
            const card = document.createElement("div");
            card.className = "card-generic";
            card.innerHTML = `
                <div>
                    <img src="${e.img}" alt="${e.name}" class="card-img" onerror="this.src='https://placehold.co/150x150/1e293b/00C2CB?text=UNICAP'">
                    <h4>${e.name}</h4>
                    <span class="sub">[${e.tag}]</span>
                    <p>${e.desc}</p>
                </div>
                <!-- AGORA PUXANDO O LINK DE CADA ALUNO DA SUA LISTA -->
                <a href="${e.linkedin || 'https://www.linkedin.com'}" target="_blank" rel="noopener noreferrer" class="btn-link"><i data-lucide="linkedin"></i> LinkedIn</a>
            `;
            egressosGrid.appendChild(card);
        });
        lucide.createIcons(); // Recarrega os ícones do LinkedIn para garantir a exibição
    }
const egressosPrev = document.getElementById("egressos-prev");
    const egressosNext = document.getElementById("egressos-next");

    if (egressosPrev && egressosNext && egressosGrid) {
        // Cada card tem 310px + 24px de gap = 334px por clique
        const passoRolagem = 335; 

        egressosPrev.addEventListener("click", () => {
            egressosGrid.scrollBy({ left: -passoRolagem, behavior: "smooth" });
        });

        egressosNext.addEventListener("click", () => {
            egressosGrid.scrollBy({ left: passoRolagem, behavior: "smooth" });
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

    lucide.createIcons();

    // ----------------------------------------------------
    // 7. FORMULÁRIO DE AGENDAMENTO E VALIDAÇÃO DE HORÁRIO
    // ----------------------------------------------------
    const scheduleForm = document.getElementById("schedule-form");
    const horaInput = document.getElementById("hora-visita");
    const dataInput = document.getElementById("data-visita");

    if (dataInput) {
        const hoje = new Date().toISOString().split("T")[0];
        dataInput.setAttribute("min", hoje);
    }

    if (horaInput) {
        horaInput.addEventListener("change", () => {
            const hora = horaInput.value;
            if (hora < "14:00" || hora > "18:00") {
                alert("⚠️ Por favor, selecione um horário de atendimento válido: entre 14:00 e 18:00.");
                horaInput.value = "";
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
            
            if (hora < "14:00" || hora > "18:00") {
                alert("⚠️ O horário da visita deve ser exclusivamente entre 14:00 e 18:00.");
                return;
            }

            alert(`✅ Solicitação enviada com sucesso, ${nome}!\n\n📅 Visita agendada para: ${data.split('-').reverse().join('/')} às ${hora}\n📱 Entraremos em contato no WhatsApp (${zap}) para confirmar.`);
            scheduleForm.reset();
        });
    }

    lucide.createIcons();
    // ====================================================
    // EXPANSÃO INTERATIVA DO GAME BOY (HERO SECTION)
    // ====================================================
    const gameboyWrapper = document.querySelector(".gameboy-wrapper");
    const gameboyModal = document.getElementById("gameboy-modal");
    const gameboyModalScreen = document.getElementById("gameboy-modal-screen");
    const gameboyClose = document.getElementById("gameboy-close");

    function abrirGameboyModal() {
        if (gameboyModal && gameboyModalScreen) {
            // Injeta o vídeo com URL limpa e segura contra o "Erro 153" do YouTube
            gameboyModalScreen.innerHTML = `
                <iframe 
                    src="https://www.youtube.com/embed/tpFPva4w9Sg?autoplay=1&rel=0" 
                    title="Showreel Jogos UNICAP Expandido" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen>
                </iframe>
            `;
            gameboyModal.classList.remove("hidden");
            lucide.createIcons();
        }
    }

    function fecharGameboyModal() {
        if (gameboyModal) {
            gameboyModal.classList.add("hidden");
            if (gameboyModalScreen) {
                gameboyModalScreen.innerHTML = ""; // Destrói o iframe e corta o som na hora!
            }
        }
    }

    // Clique no Game Boy da página inicial
    if (gameboyWrapper) {
        gameboyWrapper.addEventListener("click", abrirGameboyModal);
    }

    // Fechamento no "X", clique no fundo escuro ou tecla ESC
    if (gameboyClose && gameboyModal) {
        gameboyClose.addEventListener("click", fecharGameboyModal);
        
        gameboyModal.addEventListener("click", (e) => {
            if (e.target === gameboyModal) fecharGameboyModal();
        });

        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && !gameboyModal.classList.contains("hidden")) {
                fecharGameboyModal();
            }
        });
    }
});