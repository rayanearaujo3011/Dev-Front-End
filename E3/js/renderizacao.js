export function renderizarTarefas(
    tarefas
) {

    limparListas();


    tarefas.forEach(
        function (tarefa) {

            const coluna =
                document.querySelector(
                    '.coluna[data-status="' +
                    tarefa.status +
                    '"]'
                );


            if (!coluna) {
                return;
            }


            const lista =
                coluna.querySelector("ul");


            const item =
                document.createElement("li");


            const artigo =
                document.createElement(
                    "article"
                );


            const titulo =
                document.createElement(
                    "h3"
                );

            titulo.textContent =
                tarefa.titulo;


            const projeto =
                document.createElement(
                    "p"
                );

            projeto.textContent =
                "Projeto: " +
                tarefa.projeto;


            const responsavel =
                document.createElement(
                    "p"
                );

            responsavel.textContent =
                "Responsável: " +
                tarefa.responsavel;


            const prazo =
                document.createElement(
                    "p"
                );

            prazo.textContent =
                "Prazo: " +
                formatarData(
                    tarefa.prazo
                );


            const prioridade =
                document.createElement(
                    "p"
                );

            prioridade.classList.add(
                "prioridade"
            );

            prioridade.textContent =
                "Prioridade: " +
                formatarPrioridade(
                    tarefa.prioridade
                );


            artigo.appendChild(
                titulo
            );

            artigo.appendChild(
                projeto
            );

            artigo.appendChild(
                responsavel
            );

            artigo.appendChild(
                prazo
            );

            artigo.appendChild(
                prioridade
            );


            item.appendChild(
                artigo
            );


            lista.appendChild(
                item
            );

        }
    );

}


function limparListas() {

    const listas =
        document.querySelectorAll(
            ".coluna ul"
        );


    listas.forEach(
        function (lista) {

            lista.textContent = "";

        }
    );

}


function formatarPrioridade(
    prioridade
) {

    if (prioridade === "alta") {
        return "Alta";
    }


    if (prioridade === "media") {
        return "Média";
    }


    if (prioridade === "baixa") {
        return "Baixa";
    }


    return prioridade;
}


function formatarData(data) {

    const partes =
        data.split("-");


    if (partes.length !== 3) {
        return data;
    }


    return (
        partes[2] +
        "/" +
        partes[1] +
        "/" +
        partes[0]
    );
}