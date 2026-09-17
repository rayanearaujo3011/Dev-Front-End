import {
    carregarLivros
} from "./api.js";


import {
    estado
} from "./estado.js";


import {
    obterLivrosVisiveis
} from "./filtros.js";


import {
    renderizarLivros
} from "./renderizacao.js";


/* =========================================
   ELEMENTOS DA TELA
========================================= */

const campoBusca =
    document.getElementById(
        "busca"
    );


const campoStatus =
    document.getElementById(
        "status"
    );


const campoGenero =
    document.getElementById(
        "genero"
    );


const campoOrdenacao =
    document.getElementById(
        "ordenacao"
    );


const botaoLimpar =
    document.getElementById(
        "limpar"
    );


const mensagem =
    document.getElementById(
        "mensagem"
    );


/* =========================================
   INICIA A APLICAÇÃO
========================================= */

async function iniciarAplicacao() {

    estado.carregamento =
        true;


    estado.erro =
        null;


    atualizarTela();


    try {

        const livros =
            await carregarLivros();


        estado.livros =
            livros;


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


/* =========================================
   ATUALIZA A TELA
========================================= */

function atualizarTela() {

    /* CARREGANDO */

    if (estado.carregamento) {

        renderizarLivros([]);


        mensagem.textContent =
            "🔥 As portas do reino estão se abrindo...";


        return;

    }


    /* ERRO */

    if (estado.erro !== null) {

        renderizarLivros([]);


        if (
            estado.erro.name ===
            "TypeError"
        ) {

            mensagem.textContent =
                "⚔ Os mensageiros não conseguiram alcançar a biblioteca.";

        }

        else if (
            estado.erro.name ===
            "SyntaxError"
        ) {

            mensagem.textContent =
                "☠ Um dos pergaminhos possui uma inscrição inválida.";

        }

        else if (
            estado.erro.name ===
            "ProtocolError"
        ) {

            mensagem.textContent =
                "⚔ Os portões da biblioteca recusaram o acesso.";

        }

        else if (
            estado.erro.name ===
            "FormatError"
        ) {

            mensagem.textContent =
                "☠ Os registros da biblioteca estão em formato inválido.";

        }

        else {

            mensagem.textContent =
                "☠ Algo impediu o acesso aos arquivos da Coroa.";

        }


        return;

    }


    /* BIBLIOTECA VAZIA */

    if (estado.livros.length === 0) {

        renderizarLivros([]);


        mensagem.textContent =
            "♛ A biblioteca da Coroa ainda não possui tomos.";


        return;

    }


    /* FILTROS */

    const livrosVisiveis =
        obterLivrosVisiveis(
            estado
        );


    renderizarLivros(
        livrosVisiveis
    );


    /* NENHUM RESULTADO */

    if (
        livrosVisiveis.length === 0
    ) {

        mensagem.textContent =
            "☾ Nenhum tomo foi encontrado. Altere ou quebre os encantamentos.";


        return;

    }


    /* RESULTADO NORMAL */

    mensagem.textContent =
        "✦ " +
        livrosVisiveis.length +
        " de " +
        estado.livros.length +
        " tomos encontrados nos arquivos da Coroa ✦";

}


/* =========================================
   BUSCA
========================================= */

campoBusca.addEventListener(
    "input",
    function () {

        estado.busca =
            campoBusca.value;


        atualizarTela();

    }
);


/* =========================================
   STATUS
========================================= */

campoStatus.addEventListener(
    "change",
    function () {

        estado.status =
            campoStatus.value;


        atualizarTela();

    }
);


/* =========================================
   GÊNERO
========================================= */

campoGenero.addEventListener(
    "change",
    function () {

        estado.genero =
            campoGenero.value;


        atualizarTela();

    }
);


/* =========================================
   ORDENAÇÃO
========================================= */

campoOrdenacao.addEventListener(
    "change",
    function () {

        estado.ordenacao =
            campoOrdenacao.value;


        atualizarTela();

    }
);


/* =========================================
   LIMPAR FILTROS
========================================= */

botaoLimpar.addEventListener(
    "click",
    function () {

        /* LIMPA O ESTADO */

        estado.busca = "";

        estado.status =
            "todos";

        estado.genero =
            "todos";

        estado.ordenacao =
            "padrao";


        /* LIMPA OS CONTROLES */

        campoBusca.value =
            "";

        campoStatus.value =
            "todos";

        campoGenero.value =
            "todos";

        campoOrdenacao.value =
            "padrao";


        atualizarTela();

    }
);


/* =========================================
   INÍCIO
========================================= */

iniciarAplicacao();