const busca = document.getElementById("busca-tarefa");

const filtrosStatus = document.querySelectorAll('input[name="status"]');
const filtrosPrioridade = document.querySelectorAll('input[name="prioridade"]');

const tarefas = document.querySelectorAll("article");


function filtrarTarefas() {

    const textoBusca = busca.value.toLowerCase();

    const statusSelecionado = document.querySelector(
        'input[name="status"]:checked'
    ).value;

    const prioridadeSelecionada = document.querySelector(
        'input[name="prioridade"]:checked'
    ).value;


    tarefas.forEach(function (tarefa) {

        const titulo = tarefa.querySelector("h3").textContent.toLowerCase();

        const prioridade = tarefa
            .querySelector("p:nth-of-type(4)")
            .textContent
            .toLowerCase();


        const secao = tarefa.closest("section");

        const status = secao.getAttribute("aria-labelledby");


        const correspondeBusca = titulo.includes(textoBusca);

        const correspondeStatus =
            statusSelecionado === "todos" ||
            status.includes(statusSelecionado);

        const correspondePrioridade =
            prioridadeSelecionada === "todas" ||
            prioridade.includes(prioridadeSelecionada);


        if (
            correspondeBusca &&
            correspondeStatus &&
            correspondePrioridade
        ) {
            tarefa.parentElement.style.display = "block";
        } else {
            tarefa.parentElement.style.display = "none";
        }

    });

}


busca.addEventListener("input", filtrarTarefas);


filtrosStatus.forEach(function (radio) {

    radio.addEventListener("change", filtrarTarefas);

});


filtrosPrioridade.forEach(function (radio) {

    radio.addEventListener("change", filtrarTarefas);

});