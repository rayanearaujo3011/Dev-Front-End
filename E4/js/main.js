import {
    carregarTarefas
} from "./api.js";

import {
    estado
} from "./estado.js";

import {
    obterTarefasVisiveis
} from "./filtros.js";

import {
    renderizarTarefas
} from "./renderizacao.js";

import {
    mostrarMensagem
} from "./estados.js";


const campoBusca =
    document.getElementById("busca");


const radiosStatus =
    document.querySelectorAll(
        'input[name="status"]'
    );


const radiosPrioridade =
    document.querySelectorAll(
        'input[name="prioridade"]'
    );


const campoOrdenacao =
    document.getElementById(
        "ordenacao"
    );


const botaoLimpar =
    document.getElementById(
        "limpar-filtros"
    );


async function iniciarAplicacao() {

    estado.carregamento = true;

    estado.erro = null;


    atualizarTela();


    try {

        const tarefas =
            await carregarTarefas();


        estado.tarefas =
            tarefas;


        estado.carregamento =
            false;


        atualizarTela();

    }

    catch (erro) {

        estado.carregamento =
            false;


        estado.erro =
            erro;


        atualizarTela();

    }
}


function atualizarTela() {

    if (estado.carregamento) {

        renderizarTarefas([]);

        mostrarMensagem(
            estado,
            0
        );

        return;
    }


    if (estado.erro !== null) {

        renderizarTarefas([]);

        mostrarMensagem(
            estado,
            0
        );

        return;
    }


    const tarefasVisiveis =
        obterTarefasVisiveis(
            estado
        );


    renderizarTarefas(
        tarefasVisiveis
    );


    mostrarMensagem(
        estado,
        tarefasVisiveis.length
    );
}


/* =========================
   BUSCA
========================= */

campoBusca.addEventListener(
    "input",
    function () {

        estado.busca =
            campoBusca.value;


        atualizarTela();
    }
);


/* =========================
   STATUS
========================= */

radiosStatus.forEach(
    function (radio) {

        radio.addEventListener(
            "change",
            function () {

                estado.status =
                    radio.value;


                atualizarTela();
            }
        );

    }
);


/* =========================
   PRIORIDADE
========================= */

radiosPrioridade.forEach(
    function (radio) {

        radio.addEventListener(
            "change",
            function () {

                estado.prioridade =
                    radio.value;


                atualizarTela();
            }
        );

    }
);


/* =========================
   ORDENAÇÃO
========================= */

campoOrdenacao.addEventListener(
    "change",
    function () {

        estado.ordenacao =
            campoOrdenacao.value;


        atualizarTela();
    }
);


/* =========================
   LIMPAR FILTROS
========================= */

botaoLimpar.addEventListener(
    "click",
    function () {

        // Restaura o estado

        estado.busca = "";

        estado.status = "todos";

        estado.prioridade = "todas";

        estado.ordenacao = "padrao";


        // Restaura os controles

        campoBusca.value = "";


        document.getElementById(
            "status-todos"
        ).checked = true;


        document.getElementById(
            "prioridade-todas"
        ).checked = true;


        campoOrdenacao.value =
            "padrao";


        atualizarTela();
    }
);


iniciarAplicacao();