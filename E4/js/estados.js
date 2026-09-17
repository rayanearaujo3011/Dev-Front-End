export function mostrarMensagem(
    estado,
    quantidadeVisivel
) {

    const statusInterface =
        document.getElementById(
            "status-interface"
        );


    // Carregando

    if (estado.carregamento) {

        statusInterface.textContent =
            "Carregando tarefas...";

        return;
    }


    // Erro

    if (estado.erro !== null) {

        if (estado.erro.name === "TypeError") {

            statusInterface.textContent =
                "Erro de rede. Não foi possível carregar as tarefas.";
        }

        else if (
            estado.erro.name === "SyntaxError"
        ) {

            statusInterface.textContent =
                "Erro de formato. O arquivo JSON está inválido.";
        }

        else if (
            estado.erro.name === "ProtocolError"
        ) {

            statusInterface.textContent =
                "Erro de protocolo. Código HTTP: " +
                estado.erro.status +
                ".";
        }

        else if (
            estado.erro.name === "FormatError"
        ) {

            statusInterface.textContent =
                "Erro de formato. A estrutura dos dados é inválida.";
        }

        else {

            statusInterface.textContent =
                "Ocorreu um erro ao carregar as tarefas.";
        }

        return;
    }


    // Origem vazia

    if (estado.tarefas.length === 0) {

        statusInterface.textContent =
            "Nenhuma tarefa acadêmica cadastrada.";

        return;
    }


    // Resultado vazio dos filtros

    if (quantidadeVisivel === 0) {

        statusInterface.textContent =
            "0 de " +
            estado.tarefas.length +
            " tarefas. Nenhum resultado encontrado. Altere ou limpe os filtros.";

        return;
    }


    // Resultado normal

    statusInterface.textContent =
        quantidadeVisivel +
        " de " +
        estado.tarefas.length +
        " tarefas.";
}