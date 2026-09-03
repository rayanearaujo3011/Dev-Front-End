import {
    renderizarTarefas
} from "./renderizacao.js";


export function renderizarEstado(
    estado,
    dados
) {

    const statusInterface =
        document.getElementById(
            "status-interface"
        );


    const colunas =
        document.querySelectorAll(
            ".coluna"
        );


    statusInterface.dataset.estado =
        estado;


    if (estado === "carregando") {

        statusInterface.textContent =
            "Carregando tarefas...";

        esconderColunas(colunas);

    }


    else if (estado === "sucesso") {

        statusInterface.textContent =
            dados.length +
            " tarefas carregadas com sucesso.";

        mostrarColunas(colunas);

        renderizarTarefas(dados);

    }


    else if (estado === "vazio") {

        statusInterface.textContent =
            "Nenhuma tarefa acadêmica encontrada.";

        esconderColunas(colunas);

    }


    else if (estado === "erro") {

        esconderColunas(colunas);


        if (dados.name === "TypeError") {

            statusInterface.textContent =
                "Erro de rede. Não foi possível carregar as tarefas.";

        }


        else if (
            dados.name === "SyntaxError"
        ) {

            statusInterface.textContent =
                "Erro de formato. O arquivo JSON está inválido.";

        }


        else if (
            dados.name === "ProtocolError"
        ) {

            statusInterface.textContent =
                "Erro de protocolo. Código HTTP: " +
                dados.status +
                ".";

        }


        else if (
            dados.name === "FormatError"
        ) {

            statusInterface.textContent =
                "Erro de formato. A estrutura dos dados é inválida.";

        }


        else {

            statusInterface.textContent =
                "Ocorreu um erro ao carregar as tarefas.";

        }

    }

}


function esconderColunas(colunas) {

    colunas.forEach(
        function (coluna) {

            coluna.style.display =
                "none";

        }
    );

}


function mostrarColunas(colunas) {

    colunas.forEach(
        function (coluna) {

            coluna.style.display =
                "";

        }
    );

}