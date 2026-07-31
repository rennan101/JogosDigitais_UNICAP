document.addEventListener("DOMContentLoaded", () => {
    lucide.createIcons();

    // ====================================================
    // MENU E NAVEGAÇÃO
    // ====================================================
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
    // ==========================================================
    const dadosDeFallback = {
        config: { 
            ocultarInvestimento: false,
            agenda: {
                diasSemana: [1, 2, 3, 4, 5],
                horarios: ["14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30"],
                diasBloqueados: []
            }
        },
        matriz: [], projetos: [], egressos: [], docentes: [], pesquisas: [], parceiros: []
    };

    let siteData = {};

    async function inicializarSite() {
        try {
            const response = await fetch('data.json');
            if (!response.ok) throw new Error("Arquivo data.json não encontrado.");
            siteData = await response.json();
        } catch (error) {
            console.log(error.message);
            siteData = JSON.parse(JSON.stringify(dadosDeFallback));
        }

        aplicarConfiguracoes(siteData.config);
        renderizarMatriz(siteData.matriz);
        renderizarProjetos(siteData.projetos);
        renderizarEgressos(siteData.egressos);
        renderizarDocentes(siteData.docentes);
        renderizarPesquisas(siteData.pesquisas);
        renderizarParceiros(siteData.parceiros);
        
        window.siteDataGlobal = siteData; 
    }

    // ====================================================
    // FUNÇÕES DE RENDERIZAÇÃO
    // ====================================================
    function aplicarConfiguracoes(config) {
        if (config && config.ocultarInvestimento) {
            const investSection = document.getElementById("investimento");
            if (investSection) investSection.style.display = "none";
        }
    }

    function renderizarParceiros(lista) {
        const grid = document.getElementById("partners-grid");
        if (!grid || !lista) return;
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
        if(!matrizData) return;

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
                            ${item.tech ? item.tech.map(t => `<span class="tech-tag">${t}</span>`).join("") : ''}
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

    function gerarListaImagens(pasta) {
        const nomesPossiveis = ["1", "2", "3", "4", "5", "capa", "cover", "gameplay", "screenshot", "thumb", pasta.split("/").pop()];
        const extensoes = ["gif", "png", "jpg", "jpeg", "svg"];
        let lista = [];
        nomesPossiveis.forEach(nome => { extensoes.forEach(ext => { lista.push(`${pasta}/${nome}.${ext}`); }); });
        return lista;
    }

    function converterParaEmbed(url) {
        if (!url || url.trim() === "") return "";
        let videoId = "";
        if (url.includes("youtube.com/watch?v=")) videoId = url.split("v=")[1].split("&")[0];
        else if (url.includes("youtu.be/")) videoId = url.split("youtu.be/")[1].split("?")[0];
        else if (url.includes("youtube.com/embed/")) return url;
        return videoId ? `https://www.youtube-nocookie.com/embed/${videoId}` : url;
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

        if(!projetosData) return;

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
        if (!egressosGrid || !egressosData) return;
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
        if (!docentesGrid || !docentesData) return;
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
        if(!pesqList || !pesqSelect || !pesquisasData) return;

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

        const novoSelect = pesqSelect.cloneNode(true);
        pesqSelect.parentNode.replaceChild(novoSelect, pesqSelect);
        novoSelect.addEventListener("change", (e) => drawFiltered(e.target.value));

        drawFiltered("Todos");
    }

    // ====================================================
    // GAME BOY EXPANDIDO MODAL (CORRIGIDO)
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

    function abrirGameboyModal() { if (gameboyModal && gameboyModalScreen) { gameboyModalScreen.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/tpFPva4w9Sg?autoplay=1&rel=0" title="Showreel Jogos UNICAP" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`; gameboyModal.classList.remove("hidden"); lucide.createIcons(); } }
    function fecharGameboyModal() { if (gameboyModal) { gameboyModal.classList.add("hidden"); if (gameboyModalScreen) gameboyModalScreen.innerHTML = ""; } }
    
    if (gameboyWrapper) gameboyWrapper.addEventListener("click", abrirGameboyModal);
    if (gameboyClose && gameboyModal) { 
        gameboyClose.addEventListener("click", fecharGameboyModal); 
        gameboyModal.addEventListener("click", (e) => { if (e.target === gameboyModal) fecharGameboyModal(); }); 
        document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !gameboyModal.classList.contains("hidden")) fecharGameboyModal(); }); 
    }

    // ====================================================
    // INFRAESTRUTURA CARROSSEL E AGENDA
    // ====================================================
    const track = document.getElementById("carousel-track");
    const prevBtn = document.getElementById("carousel-prev");
    const nextBtn = document.getElementById("carousel-next");
    const slides = document.querySelectorAll(".carousel-slide");
    let currentIndex = 0;

    function updateCarousel() { if (track) track.style.transform = `translateX(-${currentIndex * 100}%)`; }
    if (nextBtn && slides.length > 0) nextBtn.addEventListener("click", () => { currentIndex = (currentIndex + 1) % slides.length; updateCarousel(); });
    if (prevBtn && slides.length > 0) prevBtn.addEventListener("click", () => { currentIndex = (currentIndex - 1 + slides.length) % slides.length; updateCarousel(); });

    let agendaConfig = { diasSemana: [1,2,3,4,5], horarios: ["14:00", "15:00", "16:00"], diasBloqueados: [] };
    
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

    let currentDate = new Date(); 
    let dataSelecionadaStr = null; 
    const mesesNomes = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

    function renderizarCalendario() {
        if (!calDaysGrid) return;
        calDaysGrid.innerHTML = "";
        
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        
        if(calMonthYear) calMonthYear.textContent = `${mesesNomes[month]} ${year}`;
        
        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        
        const dataMinima = new Date();
        dataMinima.setDate(dataMinima.getDate() + 3);
        dataMinima.setHours(0,0,0,0);

        for (let i = 0; i < firstDayOfMonth; i++) {
            const emptyDiv = document.createElement("div");
            emptyDiv.className = "cal-day-btn empty";
            calDaysGrid.appendChild(emptyDiv);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const dayBtn = document.createElement("button");
            dayBtn.type = "button";
            dayBtn.className = "cal-day-btn";
            dayBtn.textContent = day;
            
            const dateAtual = new Date(year, month, day);
            dateAtual.setHours(0,0,0,0);
            
            const dataStrBR = `${String(day).padStart(2,'0')}/${String(month+1).padStart(2,'0')}/${year}`;
            const dataStrISO = `${year}-${String(month+1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
            
            const isBeforeMinDate = dateAtual < dataMinima;
            const isDiaInativo = !agendaConfig.diasSemana.includes(dateAtual.getDay());
            const isBloqueadoAdmin = agendaConfig.diasBloqueados.includes(dataStrBR);

            if (isBeforeMinDate || isDiaInativo || isBloqueadoAdmin) {
                dayBtn.classList.add("disabled");
                dayBtn.title = isBeforeMinDate ? "Agendamento apenas com 3 dias de antecedência." : "Dia indisponível.";
            } else {
                if (dataSelecionadaStr === dataStrISO) {
                    dayBtn.classList.add("selected");
                }
                dayBtn.addEventListener("click", () => {
                    document.querySelectorAll(".cal-day-btn.selected").forEach(el => el.classList.remove("selected"));
                    dayBtn.classList.add("selected");
                    dataSelecionadaStr = dataStrISO;
                    if(inputDataVisita) inputDataVisita.value = dataStrISO;
                    if(inputHoraVisita) inputHoraVisita.value = ""; 
                    
                    const diaSemanaNome = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"][dateAtual.getDay()];
                    if(selectedDateLabel) selectedDateLabel.textContent = `${diaSemanaNome}, ${day} de ${mesesNomes[month]}`;
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
                if(inputHoraVisita) inputHoraVisita.value = hora;
            });
            timesGrid.appendChild(btnTime);
        });
    }

    const calPrev = document.getElementById("cal-prev");
    const calNext = document.getElementById("cal-next");

    if (calPrev && calNext) {
        calPrev.addEventListener("click", () => { currentDate.setMonth(currentDate.getMonth() - 1); renderizarCalendario(); });
        calNext.addEventListener("click", () => { currentDate.setMonth(currentDate.getMonth() + 1); renderizarCalendario(); });
    }

    const scheduleForm = document.getElementById("schedule-form");
    if (scheduleForm) {
        scheduleForm.addEventListener("submit", async (e) => {
            e.preventDefault(); 
            const btnSubmit = document.getElementById("btn-submit-agenda") || scheduleForm.querySelector('button[type="submit"]');
            const nome = document.getElementById("nome").value;
            const data = inputDataVisita ? inputDataVisita.value : "";
            const hora = inputHoraVisita ? inputHoraVisita.value : "";
            
            if (!data) { alert("⚠️ Selecione um DIA disponível no calendário."); return; }
            if (!hora) { alert("⚠️ Selecione um HORÁRIO na lista à direita."); return; }

            const textoOriginal = btnSubmit.innerHTML;
            btnSubmit.innerHTML = '⏳ ENVIANDO... <i data-lucide="loader" class="animate-spin"></i>';
            btnSubmit.style.pointerEvents = "none";
            btnSubmit.disabled = true;
            if (typeof lucide !== 'undefined') lucide.createIcons();

            try {
                const formData = new FormData(scheduleForm);
                const dataObj = Object.fromEntries(formData.entries());
                const ajaxUrl = "https://formsubmit.co/ajax/2dcd9e67b56e01b83ef051fa88e1520e";
                const response = await fetch(ajaxUrl, {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                    body: JSON.stringify(dataObj)
                });
                if (response.ok) {
                    alert(`✅ Solicitação enviada com sucesso, ${nome}!\n\nA coordenação do curso entrará em contato em breve para confirmar seu agendamento.`);
                    scheduleForm.reset();
                    dataSelecionadaStr = null;
                    if (inputDataVisita) inputDataVisita.value = "";
                    if (inputHoraVisita) inputHoraVisita.value = "";
                    if (selectedDateLabel) selectedDateLabel.textContent = "Selecione uma data";
                    if (timesGrid) timesGrid.innerHTML = `<p class="time-placeholder">Os horários disponíveis aparecerão aqui após escolher um dia no calendário.</p>`;
                    renderizarCalendario();
                } else {
                    throw new Error("Erro na comunicação com o servidor de email.");
                }
            } catch (error) {
                alert("❌ Ocorreu um erro ao enviar seu agendamento. Verifique sua conexão ou contate a coordenação.");
            } finally {
                btnSubmit.innerHTML = textoOriginal;
                btnSubmit.style.pointerEvents = "auto";
                btnSubmit.disabled = false;
                if (typeof lucide !== 'undefined') lucide.createIcons();
            }
        });
    }

    setTimeout(() => { renderizarCalendario(); }, 100);

    // ====================================================
    // INSTAGRAM API (RESTAURADO E CORRIGIDO)
    // ====================================================
    const INSTA_API_URL = "https://feeds.behold.so/w9jDypvR0WWCc6Gzvdtc";
    const instaGrid = document.getElementById("insta-grid");
    const instaModal = document.getElementById("insta-modal");
    const instaModalBody = document.getElementById("insta-modal-body");
    const instaClose = document.getElementById("insta-close");

    function formatarDataInsta(dataIso) { 
        if (!dataIso) return "Data recente"; 
        try { return new Date(dataIso).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' }); } 
        catch (e) { return "Recente"; } 
    }

    async function carregarInstagramDinamico() {
        if (!instaGrid) return;
        if (!INSTA_API_URL || INSTA_API_URL.trim() === "") { 
            renderizarFeedInsta([{ id: "demo1", mediaUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=600", timestamp: "2026-03-15T14:30:00+0000", caption: "🚀 Demonstração", permalink: "https://www.instagram.com/jogosdigitais_unicap/" }]); 
            return; 
        }
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
    if (instaClose && instaModal) { 
        instaClose.addEventListener("click", () => instaModal.classList.add("hidden")); 
        instaModal.addEventListener("click", (e) => { if (e.target === instaModal) instaModal.classList.add("hidden"); }); 
        document.addEventListener("keydown", (e) => { if (e.key === "Escape") instaModal.classList.add("hidden"); }); 
    }

    // ====================================================
    // CHATBOT: COMPORTAMENTO, UI E FORMATAÇÃO DE MENSAGENS
    // ====================================================
    const chatbotToggle = document.getElementById('chatbot-toggle');
    const chatbotWindow = document.getElementById('chatbot-window');
    const chatbotClose = document.getElementById('chatbot-close');
    const chatbotExpand = document.getElementById('chatbot-expand');
    const chatInput = document.getElementById('chatbot-input');
    const chatSendBtn = document.getElementById('chatbot-send');
    const chatMessages = document.getElementById('chatbot-messages');

    if (chatbotToggle && chatbotWindow && chatbotClose) {
        chatbotToggle.addEventListener('click', () => {
            chatbotWindow.classList.toggle('hidden');
            lucide.createIcons();
        });
        chatbotClose.addEventListener('click', () => {
            chatbotWindow.classList.add('hidden');
        });
    }

    if (chatbotExpand && chatbotWindow) {
        chatbotExpand.addEventListener('click', () => {
            chatbotWindow.classList.toggle('expanded');
            const icon = chatbotExpand.querySelector('i');
            if (chatbotWindow.classList.contains('expanded')) {
                icon.setAttribute('data-lucide', 'minimize');
            } else {
                icon.setAttribute('data-lucide', 'maximize');
            }
            lucide.createIcons();
        });
    }

    function formatMessageText(text) {
        let html = text;
        
        // 1. Quebra de linha para <br>
        html = html.replace(/\n/g, '<br>');
        
        // 2. Limpeza de asteriscos duplos (negrito)
        html = html.replace(/\*\*(.*?)\*\*/g, '<strong style="color: #fff;">$1</strong>');
        
        // 3. Listas com asterisco ou traço
        html = html.replace(/(?:^|<br>)\s*[\*\-]\s+(.*?)(?=<br>|$)/g, '<br>• $1');
        
        // 4. Links no formato [texto](url) viram tags <a> clicáveis
        html = html.replace(/\[([^\]]+)\]\((https?:\/\/[^\s\)]+)\)/g, '<a href="$2" target="_blank">$1</a>');
        
        // 5. Remove excessos de <br> vazios no começo ou final
        html = html.replace(/^(<br>)+|(<br>)+$/g, '');

        return html;
    }

    function addMessage(text, sender) {
        if(!chatMessages) return;
        const msgDiv = document.createElement('div');
        msgDiv.classList.add('chat-msg', sender === 'user' ? 'user-msg' : 'bot-msg');
        
        msgDiv.innerHTML = formatMessageText(text); 
        
        chatMessages.appendChild(msgDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight; 
    }

    async function sendMessage() {
        if(!chatInput || !chatMessages) return;
        const text = chatInput.value.trim();
        if (!text) return;

        addMessage(text, 'user');
        chatInput.value = '';

        const loadingId = 'loading-' + Date.now();
        const loadingDiv = document.createElement('div');
        loadingDiv.classList.add('chat-msg', 'bot-msg');
        loadingDiv.id = loadingId;
        loadingDiv.innerHTML = 'Processando... <i data-lucide="loader" class="animate-spin" style="width: 14px; height: 14px; display: inline-block; vertical-align: middle;"></i>';
        chatMessages.appendChild(loadingDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        lucide.createIcons();

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: text })
            });
            const data = await response.json();
            
            const lDiv = document.getElementById(loadingId);
            if(lDiv) lDiv.remove();

            if (data.reply) {
                addMessage(data.reply, 'bot');
            } else if (data.error) {
                addMessage("❌ Erro: " + data.error, 'bot'); 
            } else {
                addMessage("Sistema offline. Tente novamente mais tarde.", 'bot');
            }
        } catch (error) {
            const lDiv = document.getElementById(loadingId);
            if(lDiv) lDiv.remove();
            addMessage("Erro de conexão com o servidor.", 'bot');
        }
    }

    if (chatSendBtn && chatInput) {
        chatSendBtn.addEventListener('click', sendMessage);
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendMessage();
        });
    }

    const quickBtns = document.querySelectorAll('.quick-btn');
    quickBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if(chatInput) chatInput.value = btn.innerText;
            sendMessage();
            const optionsContainer = document.getElementById('quick-options');
            if(optionsContainer) optionsContainer.style.display = 'none';
        });
    });

    // ====================================================
    // INICIALIZA A CARGA DE TODOS OS DADOS DA PÁGINA
    // ====================================================
    inicializarSite();
});