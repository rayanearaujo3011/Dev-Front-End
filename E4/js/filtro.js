export function obterTarefasVisiveis(estado) {

    let tarefasVisiveis = [
        ...estado.tarefas
    ];


    // Busca pelo título

    if (estado.busca !== "") {

        tarefasVisiveis =
            tarefasVisiveis.filter(
                function (tarefa) {

                    return tarefa.titulo
                        .toLowerCase()
                        .includes(
                            estado.busca.toLowerCase()
                        );
                }
            );
    }


    // Filtro por status

    if (estado.status !== "todos") {

        tarefasVisiveis =
            tarefasVisiveis.filter(
                function (tarefa) {

                    return tarefa.status ===
                        estado.status;
                }
            );
    }


    // Filtro por prioridade

    if (estado.prioridade !== "todas") {

        tarefasVisiveis =
            tarefasVisiveis.filter(
                function (tarefa) {

                    return tarefa.prioridade ===
                        estado.prioridade;
                }
            );
    }


    // Ordenação por prazo

    if (estado.ordenacao === "crescente") {

        tarefasVisiveis.sort(
            function (a, b) {

                return new Date(a.prazo) -
                    new Date(b.prazo);
            }
        );
    }


    if (estado.ordenacao === "decrescente") {

        tarefasVisiveis.sort(
            function (a, b) {

                return new Date(b.prazo) -
                    new Date(a.prazo);
            }
        );
    }


    return tarefasVisiveis;
}