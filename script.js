document.addEventListener("DOMContentLoaded", () => {
    lucide.createIcons();

    const menuToggle = document.getElementById("menu-toggle");
    const navMenu = document.getElementById("nav-menu");
    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", () => navMenu.classList.toggle("show"));
    }

    const navInfraLink = document.querySelector('.nav a[href="#infra"]');
    if (navInfraLink) {
        navInfraLink.addEventListener("click", (e) => {
            e.preventDefault();
            document.getElementById("sobre").scrollIntoView({ behavior: "smooth" });
            const infraTabBtn = document.querySelector('.tab-btn[data-tab="tab-infra"]');
            if (infraTabBtn) infraTabBtn.click();
            if (navMenu.classList.contains("show")) navMenu.classList.remove("show");
        });
    }

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

    // ==========================================================
    // SISTEMA DE DADOS CENTRALIZADO (FALLBACK)
    // Se o data.json não for encontrado, estes dados são usados.
    // ==========================================================
const dadosDeFallback = {
        config: { 
            ocultarInvestimento: false,
            agenda: {
                diasSemana: [1, 2, 3, 4, 5], // 0=Dom, 1=Seg... 5=Sex
                horarios: ["14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30"],
                diasBloqueados: [] // Formato "DD/MM/YYYY" para feriados
            }
        },
        matriz: [
            { sem: "1º SEMESTRE", title: "Lógica de Programação para Jogos", desc: "Algoritmos, estruturas de controle e variáveis focadas na lógica de mecânicas de jogos e resolução de problemas.", tech: ["C#","Typescript", "Godot", "GitHub"] },
            { sem: "1º SEMESTRE", title: "Expressão Visual e Gráfica", desc: "Fundamentos do desenho, teoria das cores, composição visual e perspectiva aplicada ao design de games.", tech: ["Photoshop", "Figma"] },
            { sem: "1º SEMESTRE", title: "Character Design", desc: "Criação de heróis, inimigos e NPCs com forte apelo narrativo e silhueta marcante para mídias digitais.", tech: ["Papel e lápis", "Concept Art"] },
            { sem: "1º SEMESTRE", title: "Processos de Design", desc: "Metodologias criativas, Design Thinking e ideação de conceitos para prototipação rápida em estúdio.", tech: ["Design Thinking", "Miro", "Notion"] },
            { sem: "1º SEMESTRE", title: "Teorias dos Jogos (EAD)", desc: "Estudo formal do círculo mágico, taxonomia de jogadores e ludologia na cultura digital moderna.", tech: [] },
            { sem: "1º SEMESTRE", title: "Narrativa para Jogos (EAD)", desc: "Jornada do herói, worldbuilding, diálogos ramificados e construção de narrativa emergente em jogos.", tech: ["Twine", "Final Draft", "Notion"] },
            { sem: "1º SEMESTRE", title: "Expressão Oral e Escrita", desc: "Comunicação assertiva, redação técnica de documentos e técnicas de apresentação de ideias e Pitching.", tech: ["Pitching", "Oratória"] },
            { sem: "2º SEMESTRE", title: "Programação 2D para Jogos", desc: "Desenvolvimento de jogos 2D, física computacional, colisões e controle de animações dinâmicas via código.", tech: ["Unity", "C#", "VS Code"] },
            { sem: "2º SEMESTRE", title: "Arquitetura Web para Jogos", desc: "Fundamentos de redes, APIs e requisições HTTP para criação de placares e jogos em navegadores web.", tech: ["HTML5", "JavaScript", "WebSockets"] },
            { sem: "2º SEMESTRE", title: "Animação 2D", desc: "Os 12 princípios da animação, rigging 2D e animação frame a frame para spritesheets em jogos digitais.", tech: ["Frame a Frame", "Unity Bones", "Photoshop"] },
            { sem: "2º SEMESTRE", title: "Pintura Digital", desc: "Técnicas de texturização, luz, sombra e renderização digital para elaboração de concept art e cenários.", tech: ["Photoshop", "Tablet Gráfica"] },
            { sem: "2º SEMESTRE", title: "Introdução a Game Design", desc: "Core loops, elaboração de GDD (Game Design Document), balanço de regras e mecânicas centrais do jogo.", tech: ["Notion", "Figma", "Google Docs"] },
            { sem: "2º SEMESTRE", title: "Metodologia Projetual", desc: "Gestão ágil de projetos de software, Kanban, Scrum e controle de versionamento colaborativo em equipe.", tech: ["Trello", "Jira", "GitHub"] },
            { sem: "2º SEMESTRE", title: "Neurociência e Processos Tecnológicos (EAD)", desc: "Como o cérebro processa recompensas, engajamento e estímulos sensoriais em ambientes interativos.", tech: ["UX", "Neurociência", "Behavior"] },
            { sem: "2º SEMESTRE", title: "Análise de Interface e Design (EAD) [Eletiva I]", desc: "Estudo de usabilidade, heurísticas e clareza visual em telas interativas e menus de jogos.", tech: ["UI Design", "Heurísticas"] },
            { sem: "3º SEMESTRE", title: "Programação de Jogos Mobile", desc: "Otimização de memória, controles touch e deploy de projetos para sistemas Android e iOS.", tech: ["Unity", "Android SDK", "iOS"] },
            { sem: "3º SEMESTRE", title: "Arquitetura do Desenho 3D", desc: "Introdução à geometria 3D, malhas poligonais, topologia limpa e fluxo de bordas voltado para tempo real.", tech: ["Blender", "3ds Max"] },
            { sem: "3º SEMESTRE", title: "Som Digital", desc: "Captação, mixagem, sound effects (SFX) e integração de áudio dinâmico e trilha sonora em motores gráficos.", tech: ["FMOD", "Wwise", "Reaper", "Audacity"] },
            { sem: "3º SEMESTRE", title: "Projeto Integrador I", desc: "Desenvolvimento prático em equipe de um jogo 2D completo para resolver um desafio do ecossistema.", tech: ["Scrum", "Unity", "Git"] },
            { sem: "3º SEMESTRE", title: "Marketing Digital (EAD)", desc: "Estratégias de lançamento de jogos, publicidade em lojas de apps (ASO) e marketing de comunidade/indie.", tech: ["Google Analytics", "ASO", "Steam"] },
            { sem: "3º SEMESTRE", title: "Gestão Projetual (EAD) [Eletiva II]", desc: "Planejamento financeiro, estimativa de custos e cronograma em produções de jogos independentes.", tech: ["Gestão", "Agile", "Excel"] },
            { sem: "3º SEMESTRE", title: "Introdução a Inteligência Artificial (EAD)", desc: "Máquinas de estados finitos (FSM), pathfinding (A*) e algoritmos de comportamentos autônomos para NPCs.", tech: ["C#", "AI Behavior Trees"] },
            { sem: "3º SEMESTRE", title: "Edição Digital & Visual Effect", desc: "Criação de sistemas de partículas (VFX), shaders visuais e montagem de trailers promocionais.", tech: ["Unity VFX Graph", "After Effects", "Premiere"] },
            { sem: "4º SEMESTRE", title: "Programação 3D para Jogos", desc: "Álgebra linear aplicada, vetores, quatérnios, câmeras e física em motores gráficos de 3ª e 4ª dimensão.", tech: ["Unreal Engine", "C++", "Unity"] },
            { sem: "4º SEMESTRE", title: "Modelagem e Animação 3D para Jogos", desc: "Modelagem orgânica e hard-surface, abertura de malha UV, texturização PBR e animação de personagens.", tech: ["Blender", "Substance Painter", "Maya"] },
            { sem: "4º SEMESTRE", title: "Level Design e Game Balance", desc: "Arquitetura de fases, pacing, progressão de dificuldade e balanceamento da economia interna do jogo.", tech: ["Unreal Editor", "Unity ProBuilder"] },
            { sem: "4º SEMESTRE", title: "Projeto Integrador II", desc: "Desenvolvimento em equipe de um jogo 3D ou VR com foco em inovação tecnológica e apresentação de pitch.", tech: ["Agile", "Unreal Engine", "Blender"] },
            { sem: "4º SEMESTRE", title: "Empreendedorismo Social e Impacto para Negócios (EAD)", desc: "Criação de startups de games, captação de editais e impacto socioambiental no ecossistema criativo.", tech: ["Business Model Canvas", "Startups"] },
            { sem: "4º SEMESTRE", title: "Experiência do Usuário (UX) & IA Avançada", desc: "Testes de usabilidade com jogadores e implementação de inteligência artificial de aprendizado por reforço.", tech: ["Figma", "Machine Learning", "Playtesting"] },
            { sem: "5º SEMESTRE", title: "Projeto de Artefatos Lúdicos", desc: "Desenvolvimento de boardgames, jogos híbridos e experiências interativas físicas com prototipação rápida.", tech: ["Prototipação de Papel", "Impressão 3D"] },
            { sem: "5º SEMESTRE", title: "Midiatização dos Jogos", desc: "E-sports, streaming, impacto cultural dos videogames e engajamento em comunidades em plataformas digitais.", tech: ["Twitch", "OBS", "Social Media"] },
            { sem: "5º SEMESTRE", title: "Tópicos Avançados em Jogos Digitais", desc: "Exploração de tecnologias emergentes como Realidade Virtual (VR), Realidade Aumentada e Cloud Gaming.", tech: ["VR/AR", "Meta Quest", "Next-Gen Engine"] },
            { sem: "5º SEMESTRE", title: "Gamificação & Branding", desc: "Uso de mecânicas de jogos em saúde e corporativo, atreladas a estratégias de posicionamento de marca.", tech: ["Gamification Frameworks", "Brand Design"] },
            { sem: "5º SEMESTRE", title: "Propriedade Intelectual (EAD)", desc: "Direitos autorais de software, registro de marcas, contratos de publicação (Publishers) e licenciamento.", tech: ["Direito Digital", "Licenciamento", "Contratos"] }
        ],
        projetos: [
      {
            title: "Tap Slap Chicken", year: "2022", genre: "Clicker", platform: "Web", desc: "Um jogo clicker, onde seu objetivo é assar frangos na base do tapa! Construa uma fábrica de assar frango no tapa e obtenha sucesso nesse mundo capitalista!.", devs: "Mateus Assis, André Luna, George Muniz, Milena, Maria Eduarda", pasta: "assets/projetos/TapSlapChicken", video: "", downloadLink: "https://mateuzoassis.itch.io/tap-slap-chicken"
        },
        {
            title: "Void Arena", year: "2026", genre: "Survivor", platform: "PC (Windows)", desc: "Void Arena é um roguelike no qual você controla o detetive Faraday, que domina as artes ocultas e invoca um buraco negro! Ajude-o a derrotar o maior número possível de inimigos aprimorando o buraco negro.", devs: "Luiz Antônio, Júlia Leandro", pasta: "assets/projetos/Void_Arena", video: "https://www.youtube.com/watch?v=ZPYkHOUSpZM", downloadLink: "https://jogos-digitais-unicap.itch.io/void-arena"
        },
        {
            title: "Repaint", year: "2025", genre: "Ação / Aventura", platform: "PC (Windows)", desc: "Uma aventura de plataforma criativa onde o jogador utiliza mecânicas de pintura e cores para alterar as propriedades físicas do cenário, revelando plataformas ocultas e resolvendo enigmas visuais.", devs: "João Victor Batista, Maria Laura Floresta, Laura Veloso, Felipe Freire, Caio Regueira, Thony Barreto, Marcelo Sampaio, Guilherme Fernandes", pasta: "assets/projetos/Repaint", video: "https://www.youtube.com/watch?v=H6cWE63HZyk", downloadLink: ""
        },
        {
            title: "Protocolo 67: Antártica", year: "2026", genre: "Survival Horror", platform: "PC (Windows)", desc: "Século XXII, a humanidade deixou de temer a guerras entre si, pois algo muito pior surgiu... Portais de origem desconhecidos surgiram em diversos pontos do planeta, e deles, criaturas grotescas e jamais vistas começam a invadir a Terra.", devs: "Oto Macabeu, Hugo Beltrão, Alexandro Cavalcanti, Yve Correia", pasta: "assets/projetos/Protocolo67", video: "", downloadLink: ""
        },
        {
            title: "Pollaka", year: "2022", genre: "Point'n Click", platform: "PC (Windows)", desc: "Pollaka é um jogo focado na experiência emocional do jogador com elementos de quebra-cabeças e interativos, ele conta a história de Pollaka, uma garota fofa com cabelo castanho e seu avô.", devs: "Marcos Vinicius, Maria Fernanda, Vitoria Bertolini, Lêniton Carneiro, Artur Queiroz", pasta: "assets/projetos/Pollaka", video: "https://www.youtube.com/watch?v=T7f-aZXNjf4", downloadLink: ""
        },
        {
            title: "Pesadelo Macabro", year: "2023", genre: "Survival Horror / Puzzle", platform: "PC (Windows)", desc: "Pesadelo Macabro é um jogo de terror, em primeira pessoa, onde o jogador se vê preso dentro de um pesadelo em que precisa escapar do Papa figo.", devs: "Carlos Roberto, Péricles Vinícius, Maria Luiza, Pedro Sousa", pasta: "assets/projetos/Pesadelo_Macabro", video: "https://www.youtube.com/watch?v=xrvIwRYhRRk", downloadLink: "https://pedrocs.itch.io/pesadelo-macabro"
        },
        {
            title: "Pedra do Rei", year: "2024", genre: "Ação / Aventura", platform: "PC (Windows)", desc: "A Pedra do Rei é um jogo de ação e aventura, com gráficos 2D e visão top-down, onde o jogador controla o personagem Cícero, que está em uma missão para recuperar o sol do reino.", devs: "Marcelo Henrique, Gabriela Albququerque, Ademir Melo, Pedro Mafra", pasta: "assets/projetos/Pedra_do_Rei", video: "https://www.youtube.com/watch?v=Adg_yTkxX1I", downloadLink: "https://jogos-digitais-unicap.itch.io/pedra-do-rei"
        },
        {
            title: "One Bullet Man", year: "2022", genre: "Ação Tática / Puzzle", platform: "PC (Windows)", desc: "Você entra em salas repletas de inimigos, mas sua arma possui apenas uma única bala. Calcule trajetórias precisas, aproveite rebotes nas paredes e reações em cadeia para eliminar todos com um só disparo.", devs: "Davi Fox", pasta: "assets/projetos/One_Bullet_Man", video: "https://www.youtube.com/watch?v=31FWtew4UAA", downloadLink: "https://davifox.itch.io/one-bullet-man"
        },
        {
            title: "Meowgic School", year: "2024", genre: "Aventura / Magia", platform: "VR - Meta Quest 2+", desc: "Combinamos os populares gêneros móveis Match 3 e Bubble Shooter com a Realidade Virtual para criar uma experiência de jogo ativa.", devs: "Carolina Queiroz, Gleydson Tavares, Igor Gustavo Sampaio, Raquel Marreira", pasta: "assets/projetos/Meowgic School", video: "https://www.youtube.com/watch?v=Thzv0zgcXzc", downloadLink: "https://gameaxis.itch.io/meowgic-school"
        },
        {
            title: "Infernal Gate", year: "2021", genre: "Metroidvania", platform: "PC (Windows)", desc: "Este jogo é um Metroidvania no estilo de fantasia sombria. Com exploração de ruínas e castelos e além de demônios pra expurgar deste mundo.", devs: "Ricardo Vitor  Guilherme Afonso, Thiago Fraportti, Guilherme Medeiros, Guilherme Souto", pasta: "assets/projetos/Infernal Gate", video: "https://www.youtube.com/watch?v=EizURHXf_w0", downloadLink: "https://ricardo-vitor.itch.io/infernal-gate"
        },
        {
            title: "Eiffel Clue Agency", year: "2024", genre: "Investigação / Plataformer", platform: "PC (Windows)", desc: "Descubra os segredos escondidos nas ruas de Paris em 1924 com o lançamento do jogo Eiffel Clue Agency! Torne-se um detetive destemido.", devs: "Aryel Omenah Batista de Souza, João Vítor Cabral, Rodrigo Luiz, Pedro Paz, João Pedro", pasta: "assets/projetos/Eiffel_Clue", video: "https://www.youtube.com/watch?v=mXkOjC7fYUs", downloadLink: "https://jogos-digitais-unicap.itch.io/eiffel-clue-agency"
        },
        {
            title: "Cooking Guns", year: "2022", genre: "Ação Caótica / Co-op", platform: "PC (Windows)", desc: "A mistura mais insana da culinária com tiroteio! Prepare pedidos gastronômicos complexos em uma cozinha sob ataque constante.", devs: "Mateus Assis, André Luna, George Muniz, Milena, Maria Eduarda", pasta: "assets/projetos/Cooking_Guns", video: "https://www.youtube.com/watch?v=zGXoIGrE6eU", downloadLink: "https://mateuzoassis.itch.io/cooking-guns"
        },
        {
            title: "Bob Vive", year: "2026", genre: "Topdown Survivor", platform: "PC (Windows)", desc: "Dr.Bob é um cientista de uma instalação que estudava parasitas alienígenas. Contaminado com um desses parasitas, ele precisa lutar para exterminar o resto.", devs: "João Victor Batista, Esdras Rodrigues, Dave, Gabriel", pasta: "assets/projetos/Bob_Vive", video: "", downloadLink: "https://jogos-digitais-unicap.itch.io/bob-vive"
        },
        {
            title: "Arquivo Cronos", year: "2024", genre: "Puzzle", platform: "PC (Windows)", desc: "O jogador é um membro da iniciativa RecRunners que tem a missão de retornar ao passado, na década de 1980, para recuperar uma memória chave.", devs: "João Victor Batista, Maria Laura Floresta, Laura Veloso, Felipe Freire", pasta: "assets/projetos/Arquivo_Cronos", video: "", downloadLink: "https://jogos-digitais-unicap.itch.io/arquivo-cronos"
        },
        {
            title: "Monster Meal", year: "2022", genre: "Gerenciamento de Tempo", platform: "Android", desc: "Uma lanchonete monstruosa precisa dos seus serviços! Gerencie o tempo, misture ingredientes nojentos e sirva refeições exóticas.", devs: "Kaio Carrenho, Lucas Angeiras, Erick Bruno, Pietro Nestor", pasta: "assets/projetos/Monster Meal", video: "", downloadLink: "https://kaio1995.itch.io/monster-meal"
        },
        {
            title: "Furry Fighters", year: "2026", genre: "Fighter / Shooter", platform: "PC (Windows)", desc: "Um jogo de luta e brawler 2D dinâmico e carismático estrelando lutadores antropomórficos! Escolha seu personagem peludo favorito e domine combos.", devs: "Lucca Braga, Esdras Rodrigues, Matheus Medeiros, Rayran Clementino", pasta: "assets/projetos/FurryFighters", video: "https://www.youtube.com/watch?v=rrLg7Zj2GQs", downloadLink: "https://jogos-digitais-unicap.itch.io/furry-fighters"
        },
        {
            title: "Drawn To Wonder", year: "2021", genre: "Aventura / Puzzle", platform: "PC (Windows)", desc: "A personagem principal é um desenho que cria vida em um quarto de criança com um objetivo em mente.", devs: "Rafa Lopes, Lucas Pinheiro, Paulo Victor, Diego Camilo", pasta: "assets/projetos/Drawn To Wonder", video: "https://www.youtube.com/watch?v=D3bE9RqADg0", downloadLink: "https://rafalopeslol.itch.io/drawn-to-wonder-demo"
        },
        {
            title: "Aralume", year: "2024", genre: "Aventura / Fantasia 2D", platform: "PC (Windows)", desc: "Aralume é um jogo ação-aventura 3D com foco nos bosses e puzzles. O objetivo do jogador é derrotar o boss de cada fase.", devs: "Daniel Alburquerque, Jorge Gabriel, Stephanie Tavares, Ygor Salsa", pasta: "assets/projetos/Aralume", video: "", downloadLink: "https://jogos-digitais-unicap.itch.io/aralume"
        },
        {
            title: "Bichos do Brasil", year: "2025", genre: "Aventura / Educacional", platform: "PC (Windows)", desc: "Uma bela jornada interativa valorizando a nossa fauna e flora do Brasil. Descubra biomas nacionais e proteja animais em extinção.", devs: "Thomáz", pasta: "assets/projetos/Bichos _do_Brasil", video: "", downloadLink: "https://jogos-digitais-unicap.itch.io/bichos-do-brasil"
        },
        {
            title: "In My Room", year: "2021", genre: "Survivor Horror", platform: "PC (Windows)", desc: "In My Room é um jogo de terror de sobrevivência focado no aspecto psicológico. O objetivo é acordar do sonho em que se encontra preso.", devs: "Bianca Castor, Vinicius Montarroyos, Túlio Luiz, Matheus Silva", pasta: "assets/projetos/InMyRoom", video: "https://www.youtube.com/watch?v=oz_KWC1iNi4", downloadLink: "https://nightmarestudiosunicap.itch.io/in-my-room"
        }

        ],
        egressos: [
{ name: "Igor Fialho", tag: "3D Character Artist / 3D Creature Artist", desc: "Formado em 2019. Trabalhou em empresas como a Kokku Games e Globant com modelagem de personagens 3D.", img: "assets/egressos/igorfialho.jpg", linkedin: "https://www.linkedin.com/in/igor-fialho-380b1613a/?skipRedirect=true" },
        { name: "Pedro Arthur", tag: "Programador | Desenvolvimento XR", desc: "Formado em 2020. Trabalhou em empresas como Sinapsis Inovação, Sense+, Playfox Games, PUGA Studios.", img: "assets/egressos/pedro.jpeg", linkedin: "https://www.linkedin.com/in/pedro-santos-bitencourt/" },
        { name: "Eudes Tenório", tag: "Desenvolvedor de Jogos", desc: "Formado em 2021. Trabalhou em empresas como Kokku Games, Manifesto Games e Happen.", img: "assets/egressos/eudes.png", linkedin: "https://www.linkedin.com/in/eudestenorio/" },
        { name: "Ezio Filho", tag: "Engineering Manager", desc: "Formado em 2016. Trabalhou em empresas como Daisu Games e Kokku Games.", img: "assets/egressos/ezio.jpeg", linkedin: "https://www.linkedin.com/in/ezio-filho-793b75b5/" },
        { name: "Rafael Miranda", tag: "QA Intern", desc: "Formado em 2024. Trabalhou em empresas como CESAR.", img: "assets/egressos/rafaelmiranda.png", linkedin: "https://www.linkedin.com/in/rapheto/" },
        { name: "Maria Fernanda Poletine", tag: "Game Producer", desc: "Formada em 2022. Trabalhou em empresas como Kokku Games, DX Gameworks e Osten Games.", img: "assets/egressos/mariafernanda.png", linkedin: "https://www.linkedin.com/in/maria-fernanda-poletine-8303121b2/" },
        { name: "Matheus Campelo", tag: "QA Tester", desc: "Formado em 2022. Trabalhou em empresas como Kokku Games, FAST Soluções Tecnológicas, Pulsatrix Studios.", img: "assets/egressos/matheus.png", linkedin: "https://www.linkedin.com/in/matheus-campelo-9381271a8/" },
        { name: "Davi Fox", tag: "Game Designer", desc: "Formado em 2022. Trabalhou em empresas como Puga Studios, Manifesto Games, OPA Games, e Afterverse.", img: "assets/egressos/davi.jpeg", linkedin: "https://www.linkedin.com/in/davi-fox" },
        { name: "André Luna", tag: "Game Designer / Level Designer", desc: "Formado em 2021. Trabalhou em empresas como BBTV, Point'N Sheep, e Afil Games.", img: "assets/egressos/andre.jpeg", linkedin: "https://www.linkedin.com/in/andreggluna/" },
        { name: "Rodrigo Lemos", tag: "Software Tester", desc: "Formado em 2021. Trabalhou no Projeto CIn/Motorola.", img: "assets/egressos/Rodrigo.jpeg ", linkedin: "https://www.linkedin.com/in/rodrigo-a-lemos/" },     
        { name: "Milena Ferreira", tag: "UI/UX Designer | Ilustradora", desc: "Formado em 2021. Trabalhou na empresa Manifesto Games.", img: "assets/egressos/milena.jpeg ", linkedin: "https://www.linkedin.com/in/milenarferreira/" },      
        { name: "Eduarda Paixão", tag: "Designer | Social Media", desc: "Formada em 2021. Trabalhou na empresa Raid Hut.", img: "assets/egressos/eduarda.jpeg ", linkedin: "https://www.linkedin.com/in/eduarda-paixão-7246421b6/" },     
        { name: "Icaro Correia", tag: "Lead Character Artist", desc: "Formado em 2017. Trabalhou em empresas como Roarty Digital, Diorama Digital, BlackZebra studio.", img: "assets/egressos/icaro.jpeg", linkedin: "https://www.linkedin.com/in/icaro-correia/" },
        { name: "Carolina Queiroz", tag: "Game Designer", desc: "Formada em 2024. Trabalhou em empresas como Raid Hut, Obitus Games e Manifesto Games.", img: "assets/egressos/carol.jpeg", linkedin: "https://www.linkedin.com/in/carolqueiroz-gd" },
        { name: "João Victor Batista", tag: "Artista e Animador 2D e 3D", desc: "Formado em 2025. Trabalhou em empresas como SENAI PE.", img: "assets/egressos/joao.jpeg", linkedin: "https://www.linkedin.com/in/joão-victor-batista-de-serqueira-87671b2ab/" },
        { name: "Laura Santos Veloso", tag: "Game Developer", desc: "Formada em 2025. Trabalhou em empresas como SENAI PE.", img: "assets/egressos/laura.png", linkedin: "https://www.linkedin.com/in/laura-santos-veloso-99415536b//" },
        { name: "Henrique Gonçalves", tag: "Software Enginner", desc: "Formado em 2017. Trabalhou em empresas como Rumpi, CESAR e Thorpe System", img: "assets/egressos/henrique.jpeg", linkedin: "https://www.linkedin.com/in/henrique-gonçalves-71a0044b/" },
        { name: "Matheus C. Germoglio", tag: "Design de Produto", desc: "Formado em 2019. Trabalhou em empresas como Accenture Brasil", img: "assets/egressos/mateusg.png", linkedin: "https://www.linkedin.com/in/henrique-gonçalves-71a0044b/" },
        { name: "Valmir Neto", tag: "Game Designer & QA", desc: "Formado em 2019. Trabalhou em empresas como Nukearts, Manifesto Games & CodeBuddy.", img: "assets/egressos/valmir.png", linkedin: "https://www.linkedin.com/in/valmirurbanneto/" },
        { name: "Arthur Santos", tag: "Stylized 3D Characters Artist", desc: "Formado em 2019. Trabalhou em empresas como Companion Group, Room 8 Studio, PUGA Studios.", img: "assets/egressos/arthur.jpg", linkedin: "https://www.linkedin.com/in/arthur-santos-66452a119/" },       
        { name: "Victor Andrade", tag: "Game Designer / Level Designer", desc: "Formado em 2016. Trabalhou em empresas como Baião Studio, OPA Games, Lumo Entertainment", img: "assets/egressos/victor.jpg", linkedin: "https://www.linkedin.com/in/victoraes/" },   
        { name: "Rafael Lopes", tag: "Software Engineer", desc: "Formado em 2021. Trabalhou em empresas como tatoDesk", img: "assets/egressos/rafael.jpeg", linkedin: "https://www.linkedin.com/in/rafael-lopes-8b571a1b0/" },   
        { name: "Hyago Carvalho", tag: "Game Designer", desc: "Formado em 2021. Trabalhou em empresas como Manifesto Games", img: "assets/egressos/hyago.jpeg", linkedin: "https://www.linkedin.com/in/hyago-carvalho-38568817a/" },
        { name: "Lêniton Carneiro", tag: "Game Developer", desc: "Formado em 2022. Trabalhou em empresas como OPA Games e GDS TEC", img: "assets/egressos/leniton.jpeg", linkedin: "https://www.linkedin.com/in/lêniton-da-silva-carneiro-b77b0a195/" },
        { name: "Marcos Vinicius Silva", tag: "Game Designer", desc: "Formado em 2022. Trabalhou em empresas como LUMA Gameworks", img: "assets/egressos/marcos.jpeg", linkedin: "https://www.linkedin.com/in/marcos-vinicius-de-farias-silva-86ba481b2/marc" },
        { name: "Jonny Willian", tag: "3D Character Artist", desc: "Formado em 2020. Trabalhou em empresas como Advancement Design e Flux Games.", img: "assets/egressos/jonny.jpeg", linkedin: "https://www.linkedin.com/in/jonnywillianlima/" },
        { name: "Rennan Raffaele", tag: "Professor e Game Designer", desc: "Formado em 2015. Trabalhou em empresas como UNICAP, Happen, IFPE e ESM FAMA", img: "assets/egressos/rennan.jpeg", linkedin: "https://www.linkedin.com/in/rennan-raffaele/" },
        { name: "Perseu Bastos", tag: "Estratégia e Modelagem de Negócios", desc: "Formado em 2012. Trabalhou em empresas como Sebrae PR, Porto Digital, Sebrae PE, Playful", img: "assets/egressos/perseu.jpeg", linkedin: "https://www.linkedin.com/in/perseubastos/" }

        ],
        docentes: [
            { name: "Prof. Msc. Alan Campos", tag: "Game Design", desc: "", img: "assets/docentes/alan.png", lattes: "http://lattes.cnpq.br/1618069081375414" },
            { name: "Prof. Dr. Anthony Lins", tag: "Programação para Jogos", desc: "", img: "assets/docentes/anthony.jpeg", lattes: "http://lattes.cnpq.br/8374444110347392" },
            { name: "Prof. Dr. Breno Carvalho", tag: "Design & Gestão", desc:"", img: "assets/docentes/breno.png", lattes: "http://lattes.cnpq.br/2713900493883337" },    
            { name: "Profa. Msc. Cecília da Fonte", tag: "Design / UI/UX", desc: "", img: "assets/docentes/cecilia.jpeg", lattes: "http://lattes.cnpq.br/9540347266924524" },
            { name: "Prof. Dr. Christiane Quaresma", tag: "Design e Animação", desc: "", img: "assets/docentes/christiane.jpeg", lattes: "http://lattes.cnpq.br/3409334786766460" },
            { name: "Prof. Msc. Danilo Lúcio", tag: "Roteiro & Som Digital", desc: "", img: "assets/docentes/danilo.jpeg", lattes: "http://lattes.cnpq.br/1075233329679850" },
            { name: "Prof. Msc. Flávio Dias", tag: "Programação para Jogos", desc: "", img: "assets/docentes/flavio.jpeg", lattes: "http://lattes.cnpq.br/0161156565171546" },
            { name: "Profa. Msc. Graziela Almeida", tag: "Neurociência", desc: "", img: "assets/docentes/graziela.jpg", lattes: "http://lattes.cnpq.br/4099261279192519" },
            { name: "Prof. Dr. Luca Pacheco", tag: "Edição de Video, Desenho & Pintura Digital", desc: "", img: "assets/docentes/luca.jpeg", lattes: "http://lattes.cnpq.br/4236853025292841" },
            { name: "Prof. Dr. Rennan Raffaele", tag: "Game Design & Level Design", desc: "", img: "assets/docentes/rennan.jpeg", lattes: "http://lattes.cnpq.br/1916664448861686" },
            { name: "Prof. Msc. Rodrigo Duguay", tag: "Teoria dos Jogos", desc: "", img: "assets/docentes/rodrigo.jpeg", lattes: "http://lattes.cnpq.br/9996687767861757" }
        ],
        pesquisas: [
            { title: "Novos Processos nas Indústrias Criativas: Mapeando Ações de Prototipagem, Testes e Validação de Funcionalidades Gamificadas.", leader: "Dr. Rennan Raffaele", orientando: "Raquel Ferreira Marreira", year: "2024", badge: "PIBIC / UNICAP" },
            { title: "Novos Processos nas Indústrias Criativas: Mapeando Ferramentas Gamificadas de Aprendizagem.", leader: "Dr. Rennan Raffaele", orientando: "Laura Helena Amorim Rocha Cavendish", year: "2023", badge: "PIBIC / UNICAP" },
            { title: "Novos Processos nas Indústrias Criativas: Construindo uma Plataforma Web de Comunicação em Libras", leader: "Dr. Rennan Raffaele", orientando: "Ingrid Beatriz da Silva", year: "2026", badge: "PIBIC / UNICAP" },
            { title: "Desenvolvimento de Jogo em Realidade Virtual para Suporte a Pacientes Oncológicos.", leader: "Dr. Rennan Raffaele", orientando: "Gabriel Bezerra Pereira", year: "2027", badge: "PIBIC / UNICAP" }
        ],
        parceiros: [
            { name: "PLAYNAMBUCO", url: "https://playnambuco.com.br/" },
            { name: "KOKKU GAMES", url: "https://kokkugames.com" },
            { name: "ROOM 8", url: "https://room8studio.com/" },
            { name: "DIORAMA DIGITAL", url: "https://dioramadigital.com/" },
            { name: "CYAN HEART STUDIO", url: "https://www.cyanheartstudio.com" },
            { name: "MANIFESTO GAMES", url: "https://www.manifestogames.com.br/" },
            { name: "POINT N' SHEEP", url: "https://pointnsheep.com" },
            { name: "QUILOMBOZ / ALPAK'", url: "https://www.instagram.com/play.quilomboz/" },
            { name: "MANGROVE STUDIO", url: "https://mangrovestudio.ueniweb.com" },
            { name: "LEVEL100", url: "https://www.instagram.com/lvl100.studio/" },
            { name: "TAQUARA DESIGN", url: "https://www.instagram.com/taquara.design/" },
            { name: "KUNJEE STUDIO", url: "https://rvbnes.wixsite.com/kunjee-studio" },
            { name: "PIXEL HOUND", url: "https://www.instagram.com/pixelhoundstudios/" },
            { name: "BAIÃO STUDIO", url: "https://www.instagram.com/baiaoestudio/" },
            { name: "SEBRAE", url: "https://sebrae.com.br/pe/empreendedores" }
        ]
    };

    let siteData = {};

    // ==========================================================
    // INICIALIZAÇÃO - BUSCA OS DADOS VIA JSON
    // ==========================================================
    async function inicializarSite() {
        try {
            // Tenta buscar o arquivo gerado pelo painel
            const response = await fetch('data.json');
            if (!response.ok) throw new Error("Arquivo data.json não encontrado. Usando fallback.");
            siteData = await response.json();
        } catch (error) {
            console.log(error.message);
            // Se falhar (ex: primeiro acesso sem criar o arquivo), injeta os dados estáticos salvos acima
            siteData = JSON.parse(JSON.stringify(dadosDeFallback));
        }

        aplicarConfiguracoes(siteData.config);
        renderizarMatriz(siteData.matriz);
        renderizarProjetos(siteData.projetos);
        renderizarEgressos(siteData.egressos);
        renderizarDocentes(siteData.docentes);
        renderizarPesquisas(siteData.pesquisas);
        renderizarParceiros(siteData.parceiros);
        
        // Torna a variavel visível para o admin.js poder acessá-la
        window.siteDataGlobal = siteData; 
    }

    // --- FUNÇÕES DE RENDERIZAÇÃO ---
    function aplicarConfiguracoes(config) {
        if (config && config.ocultarInvestimento) {
            const investSection = document.getElementById("investimento");
            if (investSection) investSection.style.display = "none";
        }
    }

    function renderizarParceiros(lista) {
        const grid = document.getElementById("partners-grid");
        if (!grid) return;
        grid.innerHTML = "";
        lista.forEach(p => {
            const a = document.createElement("a");
            a.href = p.url;
            a.target = "_blank";
            a.rel = "noopener noreferrer";
            a.className = "partner-logo partner-btn";
            a.textContent = p.name;
            grid.appendChild(a);
        });
    }

    function renderizarMatriz(matrizData) {
        const currGrid = document.getElementById("curriculum-grid");
        const periodPills = document.querySelectorAll(".period-tabs .pill");

        function filterCurriculum(filter = "1º SEMESTRE") {
            if (!currGrid) return;
            currGrid.innerHTML = "";
            const filtered = filter === "all" ? matrizData : matrizData.filter(d => d.sem === filter);

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
                div.querySelector(".curriculum-header").addEventListener("click", () => div.classList.toggle("open"));
                currGrid.appendChild(div);
            });
        }

        periodPills.forEach(pill => {
            pill.addEventListener("click", () => {
                periodPills.forEach(p => p.classList.remove("active"));
                pill.classList.add("active");
                filterCurriculum(pill.getAttribute("data-period"));
            });
        });

        filterCurriculum("1º SEMESTRE");
    }

    function converterParaEmbed(url) {
        if (!url || url.trim() === "") return "";
        let videoId = "";
        if (url.includes("youtube.com/watch?v=")) videoId = url.split("v=")[1].split("&")[0];
        else if (url.includes("youtu.be/")) videoId = url.split("youtu.be/")[1].split("?")[0];
        else if (url.includes("youtube.com/embed/")) return url;
        return videoId ? `https://www.youtube-nocookie.com/embed/${videoId}` : url;
    }

    function gerarListaImagens(pasta) {
        const nomesPossiveis = ["1", "2", "3", "4", "5", "capa", "cover", "gameplay", "screenshot", "thumb", pasta.split("/").pop()];
        const extensoes = ["gif", "png", "jpg", "jpeg", "svg"];
        let lista = [];
        nomesPossiveis.forEach(nome => { extensoes.forEach(ext => { lista.push(`${pasta}/${nome}.${ext}`); }); });
        return lista;
    }

    window.mudarSlideModal = function(direcao) {
        const track = document.getElementById("modal-track");
        if (track) track.scrollBy({ left: direcao * track.clientWidth, behavior: 'smooth' });
    };

    window.verificarSlidesModal = function() {
        const track = document.getElementById("modal-track");
        const btns = document.querySelectorAll(".modal-car-btn");
        if (!track) return;
        const slides = track.querySelectorAll(".modal-slide");
        if (slides.length <= 1) btns.forEach(b => b.style.display = "none");
        else btns.forEach(b => b.style.display = "flex");
        if (slides.length === 0) {
            track.innerHTML = `<div class="modal-slide"><img src="https://placehold.co/600x360/1e293b/00C2CB?text=Sem+Imagens+Disponiveis" alt="Sem imagem"></div>`;
            btns.forEach(b => b.style.display = "none");
        }
    };

    function renderizarProjetos(projetosData) {
        let visibleGamesCount = 4;
        const gbcGrid = document.getElementById("gbc-grid");
        const loadMoreBtn = document.getElementById("load-more-games");
        const loadMoreContainer = document.getElementById("load-more-games-container");
        const modalBody = document.getElementById("modal-body");
        const modal = document.getElementById("game-modal");

        function drawGames() {
            if (!gbcGrid) return;
            gbcGrid.innerHTML = "";
            projetosData.sort((a, b) => parseInt(b.year) - parseInt(a.year));
            const gamesToShow = projetosData.slice(0, visibleGamesCount);
            
            gamesToShow.forEach((game) => {
                const imagensPossiveis = gerarListaImagens(game.pasta);
                const capaInicial = imagensPossiveis[0];

                const cart = document.createElement("div");
                cart.className = "gbc-cartridge";
                cart.innerHTML = `
                    <div class="gbc-top-grip"><span></span><span></span><span></span><span></span></div>
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
                        let carouselSection = `<div class="modal-carousel-container"><button class="modal-car-btn prev" onclick="mudarSlideModal(-1)"><i data-lucide="chevron-left"></i></button><button class="modal-car-btn next" onclick="mudarSlideModal(1)"><i data-lucide="chevron-right"></i></button><div class="modal-carousel-track" id="modal-track">`;
                        if (game.video && game.video.trim() !== "") {
                            const embedUrl = converterParaEmbed(game.video);
                            if (embedUrl) carouselSection += `<div class="modal-slide"><iframe src="${embedUrl}" class="modal-video-iframe" frameborder="0" allowfullscreen></iframe></div>`;
                        }
                        imagensPossiveis.forEach((imgSrc) => { carouselSection += `<div class="modal-slide"><img src="${imgSrc}" alt="${game.title}" onload="verificarSlidesModal()" onerror="this.parentElement.remove(); verificarSlidesModal();"></div>`; });
                        carouselSection += `</div></div>`;

                        let downloadBtn = game.downloadLink && game.downloadLink.trim() !== "" ? `<a href="${game.downloadLink}" target="_blank" class="btn-primary" style="margin-top:1.5rem; width:100%; justify-content:center;">BAIXAR / JOGAR AGORA <i data-lucide="download"></i></a>` : `<a href="#visita" class="btn-secondary" style="margin-top:1.5rem; text-align:center; display:block; width:100%;">EM BREVE PARA DOWNLOAD — AGENDE UMA VISITA</a>`;

                        modalBody.innerHTML = `
                            <div class="modal-header-meta"><span class="badge-genre">${game.genre}</span><span class="badge-platform"><i data-lucide="monitor"></i> ${game.platform}</span></div>
                            <h3>${game.title} <span class="modal-year">(${game.year})</span></h3>
                            ${carouselSection}
                            <div class="modal-desc"><p>${game.desc}</p></div>
                            <div class="devs"><strong>Equipe:</strong> ${game.devs}</div>
                            ${downloadBtn}
                        `;
                    }
                    lucide.createIcons();
                    if (modal) { modal.classList.remove("hidden"); setTimeout(window.verificarSlidesModal, 300); }
                });
                gbcGrid.appendChild(cart);
            });
            lucide.createIcons();

            if (visibleGamesCount >= projetosData.length) {
                if (loadMoreContainer) loadMoreContainer.style.display = "none";
            } else {
                if (loadMoreContainer) loadMoreContainer.style.display = "block";
            }
        }

        if (loadMoreBtn) {
            // Remove antigos listeners para evitar bug em recarregamentos dinâmicos
            const novoBtn = loadMoreBtn.cloneNode(true);
            loadMoreBtn.parentNode.replaceChild(novoBtn, loadMoreBtn);
            novoBtn.addEventListener("click", () => {
                visibleGamesCount += 4;
                drawGames();
            });
        }
        drawGames();
    }

    function renderizarEgressos(egressosData) {
        const egressosGrid = document.getElementById("egressos-grid");
        if (!egressosGrid) return;
        egressosGrid.innerHTML = ""; 

        egressosData.sort((a, b) => {
            const anoA = parseInt((a.desc.match(/\d{4}/) || [0])[0]);
            const anoB = parseInt((b.desc.match(/\d{4}/) || [0])[0]);
            return anoB - anoA; 
        });
        
        egressosData.forEach(e => {
            const card = document.createElement("div");
            card.className = "card-generic";
            card.innerHTML = `
                <div>
                    <img src="${e.img}" alt="${e.name}" class="card-img" onerror="this.src='https://placehold.co/150x150/1e293b/00C2CB?text=UNICAP'">
                    <h4>${e.name}</h4>
                    <span class="sub">[${e.tag}]</span>
                    <p>${e.desc}</p>
                </div>
                <a href="${e.linkedin || 'https://www.linkedin.com'}" target="_blank" rel="noopener noreferrer" class="btn-link"><i data-lucide="linkedin"></i> LinkedIn</a>
            `;
            egressosGrid.appendChild(card);
        });

        const egressosPrev = document.getElementById("egressos-prev");
        const egressosNext = document.getElementById("egressos-next");
        if (egressosPrev && egressosNext) {
            const novoPrev = egressosPrev.cloneNode(true);
            const novoNext = egressosNext.cloneNode(true);
            egressosPrev.parentNode.replaceChild(novoPrev, egressosPrev);
            egressosNext.parentNode.replaceChild(novoNext, egressosNext);

            novoPrev.addEventListener("click", () => egressosGrid.scrollBy({ left: -335, behavior: "smooth" }));
            novoNext.addEventListener("click", () => egressosGrid.scrollBy({ left: 335, behavior: "smooth" }));
        }
    }

    function renderizarDocentes(docentesData) {
        const docentesGrid = document.getElementById("docentes-grid");
        if (!docentesGrid) return;
        docentesGrid.innerHTML = "";
        docentesData.forEach(d => {
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

    function renderizarPesquisas(pesquisasData) {
        const pesqList = document.getElementById("pesquisas-list");
        const pesqSelect = document.getElementById("pesq-filter-select");
        if(!pesqList || !pesqSelect) return;

        function drawFiltered(filtroDocente = "Todos") {
            pesqList.innerHTML = "";
            let dadosOrdenados = [...pesquisasData].sort((a, b) => parseInt(b.year) - parseInt(a.year));
            let dadosFiltrados = filtroDocente === "Todos" ? dadosOrdenados : dadosOrdenados.filter(p => p.leader === filtroDocente);

            dadosFiltrados.forEach(p => {
                const div = document.createElement("div");
                div.className = "pesquisa-item";
                div.innerHTML = `
                    <div class="pesquisa-info">
                        <h4>${p.title}</h4>
                        <p><strong>Prof:</strong> ${p.leader}</p>
                        <p><strong>Aluno(a):</strong> ${p.orientando}</p>
                        <p><strong>Ano:</strong> ${p.year}</p>
                    </div>
                    <div class="pesquisa-badge-wrapper"><span class="badge-retro" style="margin:0;">${p.badge}</span></div>
                `;
                pesqList.appendChild(div);
            });
        }

        pesqSelect.innerHTML = `<option value="Todos">Exibir todos os docentes</option>`;
        const docentesUnicos = [...new Set(pesquisasData.map(p => p.leader))].sort();
        docentesUnicos.forEach(docente => {
            const opt = document.createElement("option");
            opt.value = docente;
            opt.textContent = `Prof. ${docente.replace('Dr. ', '').replace('Profa. ', '')}`;
            pesqSelect.appendChild(opt);
        });

        // Limpa listener antigo copiando o select
        const novoSelect = pesqSelect.cloneNode(true);
        pesqSelect.parentNode.replaceChild(novoSelect, pesqSelect);
        novoSelect.addEventListener("change", (e) => drawFiltered(e.target.value));

        drawFiltered("Todos");
    }

    // ====================================================
    // INFRAESTRUTURA CARROSSEL
    // ====================================================
    const track = document.getElementById("carousel-track");
    const prevBtn = document.getElementById("carousel-prev");
    const nextBtn = document.getElementById("carousel-next");
    const slides = document.querySelectorAll(".carousel-slide");
    let currentIndex = 0;

    function updateCarousel() { if (track) track.style.transform = `translateX(-${currentIndex * 100}%)`; }
    if (nextBtn && slides.length > 0) nextBtn.addEventListener("click", () => { currentIndex = (currentIndex + 1) % slides.length; updateCarousel(); });
    if (prevBtn && slides.length > 0) prevBtn.addEventListener("click", () => { currentIndex = (currentIndex - 1 + slides.length) % slides.length; updateCarousel(); });

    // ====================================================
    // AGENDA INTERATIVA E VALIDAÇÃO DE HORÁRIOS
    // ====================================================
    let agendaConfig = { diasSemana: [1,2,3,4,5], horarios: ["14:00", "15:00", "16:00"], diasBloqueados: [] };
    
    // Atualiza a config com os dados do JSON assim que o site carrega
    if (window.siteDataGlobal && window.siteDataGlobal.config && window.siteDataGlobal.config.agenda) {
        agendaConfig = window.siteDataGlobal.config.agenda;
    } else if (siteData && siteData.config && siteData.config.agenda) {
        agendaConfig = siteData.config.agenda;
    }

    const calMonthYear = document.getElementById("cal-month-year");
    const calDaysGrid = document.getElementById("cal-days-grid");
    const timesGrid = document.getElementById("times-grid");
    const selectedDateLabel = document.getElementById("selected-date-label");
    const inputDataVisita = document.getElementById("data-visita");
    const inputHoraVisita = document.getElementById("hora-visita");

    let currentDate = new Date(); // Usado para navegação dos meses
    let dataSelecionadaStr = null; // Formato YYYY-MM-DD
    
    const mesesNomes = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

    function renderizarCalendario() {
        if (!calDaysGrid) return;
        calDaysGrid.innerHTML = "";
        
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        
        calMonthYear.textContent = `${mesesNomes[month]} ${year}`;
        
        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        
        // Regra Especial: Data Mínima = Hoje + 3 dias
        const dataMinima = new Date();
        dataMinima.setDate(dataMinima.getDate() + 3);
        dataMinima.setHours(0,0,0,0);

        // Preenche espaços vazios do início do mês
        for (let i = 0; i < firstDayOfMonth; i++) {
            const emptyDiv = document.createElement("div");
            emptyDiv.className = "cal-day-btn empty";
            calDaysGrid.appendChild(emptyDiv);
        }

        // Preenche os dias do mês
        for (let day = 1; day <= daysInMonth; day++) {
            const dayBtn = document.createElement("button");
            dayBtn.type = "button";
            dayBtn.className = "cal-day-btn";
            dayBtn.textContent = day;
            
            const dateAtual = new Date(year, month, day);
            dateAtual.setHours(0,0,0,0);
            
            const dataStrBR = `${String(day).padStart(2,'0')}/${String(month+1).padStart(2,'0')}/${year}`;
            const dataStrISO = `${year}-${String(month+1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
            
            // VERIFICAÇÕES DE BLOQUEIO
            const isBeforeMinDate = dateAtual < dataMinima;
            const isDiaInativo = !agendaConfig.diasSemana.includes(dateAtual.getDay());
            const isBloqueadoAdmin = agendaConfig.diasBloqueados.includes(dataStrBR);

            if (isBeforeMinDate || isDiaInativo || isBloqueadoAdmin) {
                dayBtn.classList.add("disabled");
                dayBtn.title = isBeforeMinDate ? "Agendamento apenas com 3 dias de antecedência." : "Dia indisponível.";
            } else {
                // Dia válido para agendamento!
                if (dataSelecionadaStr === dataStrISO) {
                    dayBtn.classList.add("selected");
                }
                
                dayBtn.addEventListener("click", () => {
                    document.querySelectorAll(".cal-day-btn.selected").forEach(el => el.classList.remove("selected"));
                    dayBtn.classList.add("selected");
                    dataSelecionadaStr = dataStrISO;
                    inputDataVisita.value = dataStrISO;
                    inputHoraVisita.value = ""; // Reseta a hora
                    
                    const diaSemanaNome = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"][dateAtual.getDay()];
                    selectedDateLabel.textContent = `${diaSemanaNome}, ${day} de ${mesesNomes[month]}`;
                    
                    renderizarHorarios();
                });
            }
            
            calDaysGrid.appendChild(dayBtn);
        }
    }

    function renderizarHorarios() {
        if (!timesGrid) return;
        timesGrid.innerHTML = "";
        
        if (!agendaConfig.horarios || agendaConfig.horarios.length === 0) {
            timesGrid.innerHTML = `<p class="time-placeholder" style="color:#ef4444;">Nenhum horário configurado.</p>`;
            return;
        }

        agendaConfig.horarios.forEach(hora => {
            const btnTime = document.createElement("button");
            btnTime.type = "button";
            btnTime.className = "time-slot-btn";
            btnTime.textContent = hora;
            
            btnTime.addEventListener("click", () => {
                document.querySelectorAll(".time-slot-btn.selected").forEach(el => el.classList.remove("selected"));
                btnTime.classList.add("selected");
                inputHoraVisita.value = hora;
            });
            
            timesGrid.appendChild(btnTime);
        });
    }

    // Controles do Mês
    const calPrev = document.getElementById("cal-prev");
    const calNext = document.getElementById("cal-next");

    if (calPrev && calNext) {
        calPrev.addEventListener("click", () => {
            currentDate.setMonth(currentDate.getMonth() - 1);
            renderizarCalendario();
        });
        calNext.addEventListener("click", () => {
            currentDate.setMonth(currentDate.getMonth() + 1);
            renderizarCalendario();
        });
    }

    // ====================================================
    // SUBMISSÃO DO FORMULÁRIO (INTEGRADO COM FORMSUBMIT AJAX)
    // ====================================================
    const scheduleForm = document.getElementById("schedule-form");
    if (scheduleForm) {
        scheduleForm.addEventListener("submit", async (e) => {
            e.preventDefault(); // Impede o recarregamento padrão da página
            
            const btnSubmit = document.getElementById("btn-submit-agenda") || scheduleForm.querySelector('button[type="submit"]');
            const nome = document.getElementById("nome").value;
            const data = inputDataVisita.value;
            const hora = inputHoraVisita.value;
            
            // Validações da interface de calendário e relógio
            if (!data) {
                alert("⚠️ Selecione um DIA disponível no calendário.");
                return;
            }
            if (!hora) {
                alert("⚠️ Selecione um HORÁRIO na lista à direita.");
                return;
            }

            // Efeito visual de carregamento no botão
            const textoOriginal = btnSubmit.innerHTML;
            btnSubmit.innerHTML = '⏳ ENVIANDO... <i data-lucide="loader" class="animate-spin"></i>';
            btnSubmit.style.pointerEvents = "none";
            btnSubmit.disabled = true;
            if (typeof lucide !== 'undefined') lucide.createIcons();

            try {
                // O FormData coleta magicamente TODOS os inputs ocultos (incluindo o seu name="_cc")
                const formData = new FormData(scheduleForm);
                
                // Endpoint direto com a sua chave segura (hash)
                const ajaxUrl = "https://formsubmit.co/ajax/2dcd9e67b56e01b83ef051fa88e1520e";

                // Dispara a requisição real para o servidor do FormSubmit sem sair da página
                const response = await fetch(ajaxUrl, {
                    method: "POST",
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    alert(`✅ Solicitação enviada com sucesso, ${nome}!\n\nA coordenação do curso entrará em contato em breve para confirmar seu agendamento.`);
                    
                    // Limpa o formulário textualmente
                    scheduleForm.reset();
                    
                    // Reseta o estado interativo do calendário
                    dataSelecionadaStr = null;
                    if (typeof inputDataVisita !== 'undefined') inputDataVisita.value = "";
                    if (typeof inputHoraVisita !== 'undefined') inputHoraVisita.value = "";
                    
                    if (selectedDateLabel) selectedDateLabel.textContent = "Selecione uma data";
                    
                    if (timesGrid) timesGrid.innerHTML = `<p class="time-placeholder">Os horários disponíveis aparecerão aqui após escolher um dia no calendário.</p>`;
                    
                    // Redesenha o calendário visualmente para desmarcar o dia escolhido
                    renderizarCalendario();
                } else {
                    throw new Error("Erro na comunicação com o servidor de email.");
                }

            } catch (error) {
                alert("❌ Ocorreu um erro ao enviar seu agendamento. Tente novamente mais tarde ou contate a coordenação.");
                console.error(error);
            } finally {
                // Devolve o botão ao estado normal e clicável
                btnSubmit.innerHTML = textoOriginal;
                btnSubmit.style.pointerEvents = "auto";
                btnSubmit.disabled = false;
                if (typeof lucide !== 'undefined') lucide.createIcons();
            }
        });
    }

    // Renderiza inicialmente
    setTimeout(() => { renderizarCalendario(); }, 100);

    // ====================================================
    // GAME BOY EXPANDIDO MODAL
    // ====================================================
    const gameboyWrapper = document.querySelector(".gameboy-wrapper");
    const gameboyModal = document.getElementById("gameboy-modal");
    const gameboyModalScreen = document.getElementById("gameboy-modal-screen");
    const gameboyClose = document.getElementById("gameboy-close");
    const modalClose = document.getElementById("modal-close");
    const modal = document.getElementById("game-modal");
    const modalBody = document.getElementById("modal-body");

    function fecharCartuchoModal() { if (modal) { modal.classList.add("hidden"); if (modalBody) modalBody.innerHTML = ""; } }
    if (modalClose && modal) { modalClose.addEventListener("click", fecharCartuchoModal); modal.addEventListener("click", (e) => { if (e.target === modal) fecharCartuchoModal(); }); document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !modal.classList.contains("hidden")) fecharCartuchoModal(); }); }

    function abrirGameboyModal() { if (gameboyModal && gameboyModalScreen) { gameboyModalScreen.innerHTML = `<iframe src="https://www.youtube.com/embed/tpFPva4w9Sg?autoplay=1&rel=0" title="Showreel Jogos UNICAP" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`; gameboyModal.classList.remove("hidden"); lucide.createIcons(); } }
    function fecharGameboyModal() { if (gameboyModal) { gameboyModal.classList.add("hidden"); if (gameboyModalScreen) gameboyModalScreen.innerHTML = ""; } }
    if (gameboyWrapper) gameboyWrapper.addEventListener("click", abrirGameboyModal);
    if (gameboyClose && gameboyModal) { gameboyClose.addEventListener("click", fecharGameboyModal); gameboyModal.addEventListener("click", (e) => { if (e.target === gameboyModal) fecharGameboyModal(); }); document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !gameboyModal.classList.contains("hidden")) fecharGameboyModal(); }); }

    // ====================================================
    // INSTAGRAM API
    // ====================================================
    const INSTA_API_URL = "https://feeds.behold.so/w9jDypvR0WWCc6Gzvdtc";
    const instaGrid = document.getElementById("insta-grid");
    const instaModal = document.getElementById("insta-modal");
    const instaModalBody = document.getElementById("insta-modal-body");
    const instaClose = document.getElementById("insta-close");

    function formatarDataInsta(dataIso) { if (!dataIso) return "Data recente"; try { return new Date(dataIso).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' }); } catch (e) { return "Recente"; } }

    async function carregarInstagramDinamico() {
        if (!instaGrid) return;
        if (!INSTA_API_URL || INSTA_API_URL.trim() === "") { renderizarFeedInsta([{ id: "demo1", mediaUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=600", timestamp: "2026-03-15T14:30:00+0000", caption: "🚀 Demonstração", permalink: "https://www.instagram.com/jogosdigitais_unicap/" }]); return; }
        try {
            instaGrid.innerHTML = `<div class="text-center w-full" style="grid-column: 1/-1; padding: 2rem; color: var(--accent-teal);">Conectando aos servidores do Instagram... <i data-lucide="loader" class="animate-spin"></i></div>`;
            lucide.createIcons();
            const resposta = await fetch(INSTA_API_URL);
            if (!resposta.ok) throw new Error("Falha Instagram");
            const dados = await resposta.json();
            const listaPosts = Array.isArray(dados) ? dados : (dados.posts || dados.data || []);
            const postsFiltrados = listaPosts.filter(post => post.mediaUrl || post.thumbnailUrl || post.media_url || post.thumbnail_url).slice(0, 8);
            if (postsFiltrados.length === 0) throw new Error("Lista vazia");
            renderizarFeedInsta(postsFiltrados);
        } catch (erro) {
            instaGrid.innerHTML = `<div class="text-center w-full" style="padding: 2rem;"><p style="color: #f87171;">Não foi possível sincronizar.</p><a href="https://www.instagram.com/jogosdigitais_unicap/" target="_blank" class="btn-link">Acessar Instagram <i data-lucide="external-link"></i></a></div>`;
            lucide.createIcons();
        }
    }

    function renderizarFeedInsta(posts) {
        instaGrid.innerHTML = "";
        posts.forEach(post => {
            const imagemReal = post.thumbnailUrl || post.thumbnail_url || post.mediaUrl || post.media_url;
            const legendaReal = post.caption || "Sem descrição disponível.";
            const dataReal = formatarDataInsta(post.timestamp || post.date);
            const linkReal = post.permalink || post.url || "https://www.instagram.com/jogosdigitais_unicap/";
            const card = document.createElement("div");
            card.className = "insta-card";
            card.innerHTML = `<img src="${imagemReal}" alt="Post Instagram" loading="lazy"><div class="insta-overlay"><i data-lucide="instagram"></i><span>${legendaReal.split('\n')[0]}...</span></div>`;
            card.addEventListener("click", () => {
                if (instaModalBody) {
                    instaModalBody.innerHTML = `<div class="insta-modal-img-container"><img src="${imagemReal}" alt="Instagram"></div><div class="insta-modal-text-container"><div><div class="insta-header-profile"><img src="assets/logos/Jogos_mec.svg" alt="Logo"><br><h4>jogosdigitais_unicap</h4></div><span class="insta-date">${dataReal}</span><div class="insta-caption">${legendaReal}</div></div><a href="${linkReal}" target="_blank" class="btn-primary" style="width:100%; justify-content:center;">VER NO INSTAGRAM</a></div>`;
                }
                lucide.createIcons();
                if (instaModal) instaModal.classList.remove("hidden");
            });
            instaGrid.appendChild(card);
        });
        const moreCard = document.createElement("a");
        moreCard.href = "https://www.instagram.com/jogosdigitais_unicap/";
        moreCard.target = "_blank";
        moreCard.className = "insta-card insta-card-more";
        moreCard.innerHTML = `<i data-lucide="instagram" class="icon-main"></i><h4>Deseja ver mais?</h4><p>Acesse nosso feed!</p><span class="btn-primary" style="padding: 0.6rem 1.2rem; font-size: 0.8rem;">Ir para o Insta</span>`;
        instaGrid.appendChild(moreCard);
        lucide.createIcons();
    }

    const instaPrev = document.getElementById("insta-prev");
    const instaNext = document.getElementById("insta-next");
    if (instaPrev && instaNext && instaGrid) {
        instaPrev.addEventListener("click", () => instaGrid.scrollBy({ left: -(instaGrid.clientWidth * 0.85), behavior: "smooth" }));
        instaNext.addEventListener("click", () => instaGrid.scrollBy({ left: (instaGrid.clientWidth * 0.85), behavior: "smooth" }));
    }

    carregarInstagramDinamico();
    if (instaClose && instaModal) { instaClose.addEventListener("click", () => instaModal.classList.add("hidden")); instaModal.addEventListener("click", (e) => { if (e.target === instaModal) instaModal.classList.add("hidden"); }); document.addEventListener("keydown", (e) => { if (e.key === "Escape") instaModal.classList.add("hidden"); }); }

    // CHAMA A INICIALIZAÇÃO NO FINAL!
    inicializarSite();
});