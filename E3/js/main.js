import {
    carregarTarefas
} from "./api.js";


import {
    renderizarEstado
} from "./estados.js";


async function iniciarAplicacao() {

    renderizarEstado(
        "carregando"
    );


    try {

        const tarefas =
            await carregarTarefas();


        if (tarefas.length === 0) {

            renderizarEstado(
                "vazio",
                tarefas
            );

        }


        else {

            renderizarEstado(
                "sucesso",
                tarefas
            );

        }

    }


    catch (erro) {

        renderizarEstado(
            "erro",
            erro
        );

    }

}


iniciarAplicacao();