const form = document.getElementById("form-tarefa");
const busca = document.getElementById("busca-tarefa");

const titulo = document.getElementById("titulo-tarefa");
const projeto = document.getElementById("projeto-tarefa");
const responsavel = document.getElementById("responsavel-tarefa");
const prazo = document.getElementById("prazo-tarefa");
const status = document.getElementById("status-tarefa");
const prioridade = document.getElementById("prioridade-tarefa");


form.addEventListener("submit", function (event) {
    event.preventDefault();

    if (
        titulo.value === "" ||
        projeto.value === "" ||
        responsavel.value === "" ||
        prazo.value === ""
    ) {
        alert("Preencha todos os campos.");
        return;
    }

    const novaTarefa = document.createElement("li");

    const data = prazo.value.split("-");

    const dataFormatada =
        data[2] + "/" + data[1] + "/" + data[0];

    novaTarefa.innerHTML = `
        <article>
            <h3>${titulo.value}</h3>

            <p>
                <strong>Projeto:</strong>
                ${projeto.value}
            </p>

            <p>
                <strong>Responsável:</strong>
                ${responsavel.value}
            </p>

            <p>
                <strong>Prazo:</strong>
                ${dataFormatada}
            </p>

            <p class="prioridade">
                <strong>Prioridade:</strong>
                ${prioridade.value}
            </p>

            <button
                type="button"
                class="excluir-tarefa"
            >
                Excluir
            </button>
        </article>
    `;

    const coluna = document.querySelector(
        `.coluna[data-status="${status.value}"]`
    );

    const lista = coluna.querySelector("ul");

    lista.appendChild(novaTarefa);

    form.reset();

    filtrarTarefas();
});


document.addEventListener("click", function (event) {

    if (event.target.classList.contains("excluir-tarefa")) {

        const tarefa = event.target.closest("li");

        tarefa.remove();
    }

});


busca.addEventListener("input", filtrarTarefas);


const filtrosStatus =
    document.querySelectorAll('input[name="status"]');

const filtrosPrioridade =
    document.querySelectorAll('input[name="prioridade"]');


filtrosStatus.forEach(function (radio) {

    radio.addEventListener(
        "change",
        filtrarTarefas
    );

});


filtrosPrioridade.forEach(function (radio) {

    radio.addEventListener(
        "change",
        filtrarTarefas
    );

});


function filtrarTarefas() {

    const textoBusca =
        busca.value.toLowerCase();

    const statusSelecionado =
        document.querySelector(
            'input[name="status"]:checked'
        ).value;

    const prioridadeSelecionada =
        document.querySelector(
            'input[name="prioridade"]:checked'
        ).value;

    const tarefas =
        document.querySelectorAll(".coluna li");


    tarefas.forEach(function (tarefa) {

        const tituloTarefa =
            tarefa
                .querySelector("h3")
                .textContent
                .toLowerCase();

        const prioridadeTarefa =
            tarefa
                .querySelector(".prioridade")
                .textContent
                .toLowerCase();

        const coluna =
            tarefa.closest(".coluna");

        const statusTarefa =
            coluna.getAttribute("data-status");


        const buscaCorresponde =
            tituloTarefa.includes(textoBusca);

        const statusCorresponde =
            statusSelecionado === "todos" ||
            statusTarefa === statusSelecionado;

        const prioridadeCorresponde =
            prioridadeSelecionada === "todas" ||
            prioridadeTarefa.includes(
                prioridadeSelecionada
            );


        if (
            buscaCorresponde &&
            statusCorresponde &&
            prioridadeCorresponde
        ) {
            tarefa.style.display = "block";
        } else {
            tarefa.style.display = "none";
        }

    });

}