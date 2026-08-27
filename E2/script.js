const busca = document.querySelector("#busca-tarefa");
const filtrosStatus = document.querySelectorAll('input[name="status"]');
const filtrosPrioridade = document.querySelectorAll('input[name="prioridade"]');
const artigos = document.querySelectorAll("article");

function normalizar(texto) {
    return texto
        .toLocaleLowerCase("pt-BR")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
}

function filtroSelecionado(filtros) {
    return Array.from(filtros).find((filtro) => filtro.checked).value;
}

function atualizarTarefas() {
    const termo = normalizar(busca.value.trim());
    const status = filtroSelecionado(filtrosStatus);
    const prioridade = filtroSelecionado(filtrosPrioridade);

    artigos.forEach((artigo) => {
        const secao = artigo.closest("section");
        const titulo = normalizar(artigo.querySelector("h3").textContent);
        const textoPrioridade = normalizar(artigo.querySelector("p:nth-of-type(4)").textContent);
        const statusDaSecao = secao.getAttribute("aria-labelledby")
            .replace("status-", "")
            .replace("-titulo", "");

        const correspondeBusca = titulo.includes(termo);
        const correspondeStatus = status === "todos" || status === statusDaSecao;
        const correspondePrioridade = prioridade === "todas" || textoPrioridade.includes(prioridade);

        artigo.closest("li").hidden = !(
            correspondeBusca && correspondeStatus && correspondePrioridade
        );
    });
}

busca.addEventListener("input", atualizarTarefas);
filtrosStatus.forEach((filtro) => filtro.addEventListener("change", atualizarTarefas));
filtrosPrioridade.forEach((filtro) => filtro.addEventListener("change", atualizarTarefas));
