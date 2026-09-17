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
    document.getElementById("busca");


const campoStatus =
    document.getElementById("status");


const campoGenero =
    document.getElementById("genero");


const campoOrdenacao =
    document.getElementById("ordenacao");


const botaoLimpar =
    document.getElementById("limpar");


const botaoAdicionar =
    document.getElementById("adicionar");


const mensagem =
    document.getElementById("mensagem");


const biblioteca =
    document.getElementById("biblioteca");


/* FORMULÁRIO */

const areaFormulario =
    document.getElementById(
        "area-formulario"
    );


const formulario =
    document.getElementById(
        "formulario-livro"
    );


const tituloFormulario =
    document.getElementById(
        "titulo-formulario"
    );


const campoId =
    document.getElementById(
        "livro-id"
    );


const campoTitulo =
    document.getElementById(
        "titulo-livro"
    );


const campoAutor =
    document.getElementById(
        "autor-livro"
    );


const campoGeneroLivro =
    document.getElementById(
        "genero-livro"
    );


const campoStatusLivro =
    document.getElementById(
        "status-livro"
    );


const campoNota =
    document.getElementById(
        "nota-livro"
    );


const botaoCancelar =
    document.getElementById(
        "cancelar"
    );


/* =========================================
   LOCAL STORAGE
========================================= */

function salvarLocalStorage() {

    localStorage.setItem(
        "livros",
        JSON.stringify(
            estado.livros
        )
    );

}


/* =========================================
   INICIA APLICAÇÃO
========================================= */

async function iniciarAplicacao() {

    estado.carregamento = true;

    estado.erro = null;

    atualizarTela();


    try {

        const livrosSalvos =
            localStorage.getItem(
                "livros"
            );


        if (livrosSalvos !== null) {

            estado.livros =
                JSON.parse(
                    livrosSalvos
                );

        }

        else {

            const livros =
                await carregarLivros();


            estado.livros =
                livros;


            salvarLocalStorage();

        }


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
   ATUALIZA TELA
========================================= */

function atualizarTela() {

    if (estado.carregamento) {

        renderizarLivros([]);


        mensagem.textContent =
            "🔥 As portas do reino estão se abrindo...";


        return;

    }


    if (estado.erro !== null) {

        renderizarLivros([]);


        mensagem.textContent =
            "☠ Algo impediu o acesso aos arquivos da Coroa.";


        return;

    }


    if (estado.livros.length === 0) {

        renderizarLivros([]);


        mensagem.textContent =
            "♛ A biblioteca da Coroa ainda não possui tomos.";


        return;

    }


    const livrosVisiveis =
        obterLivrosVisiveis(
            estado
        );


    renderizarLivros(
        livrosVisiveis
    );


    if (livrosVisiveis.length === 0) {

        mensagem.textContent =
            "☾ Nenhum tomo foi encontrado. Altere ou quebre os encantamentos.";


        return;

    }


    mensagem.textContent =
        "✦ " +
        livrosVisiveis.length +
        " de " +
        estado.livros.length +
        " tomos encontrados nos arquivos da Coroa ✦";

}


/* =========================================
   ABRIR FORMULÁRIO PARA ADICIONAR
========================================= */

botaoAdicionar.addEventListener(
    "click",
    function () {

        formulario.reset();


        campoId.value =
            "";


        tituloFormulario.textContent =
            "Registrar Novo Tomo";


        areaFormulario.classList.remove(
            "escondido"
        );


        campoTitulo.focus();

    }
);


/* =========================================
   CANCELAR
========================================= */

botaoCancelar.addEventListener(
    "click",
    function () {

        formulario.reset();


        campoId.value =
            "";


        areaFormulario.classList.add(
            "escondido"
        );

    }
);


/* =========================================
   SALVAR / ADICIONAR / EDITAR
========================================= */

formulario.addEventListener(
    "submit",
    function (evento) {

        evento.preventDefault();


        const id =
            campoId.value;


        /* =================================
           NOVO LIVRO
        ================================= */

        if (id === "") {

            const novoLivro = {

                id: Date.now(),

                titulo:
                    campoTitulo.value,

                autor:
                    campoAutor.value,

                genero:
                    campoGeneroLivro.value,

                status:
                    campoStatusLivro.value,

                nota:
                    Number(
                        campoNota.value
                    )

            };


            estado.livros.push(
                novoLivro
            );


            mensagem.textContent =
                "🔥 Novo tomo registrado nos arquivos da Coroa!";

        }


        /* =================================
           EDITAR LIVRO
        ================================= */

        else {

            const livro =
                estado.livros.find(
                    function (livro) {

                        return livro.id ===
                            Number(id);

                    }
                );


            if (livro !== undefined) {

                livro.titulo =
                    campoTitulo.value;


                livro.autor =
                    campoAutor.value;


                livro.genero =
                    campoGeneroLivro.value;


                livro.status =
                    campoStatusLivro.value;


                livro.nota =
                    Number(
                        campoNota.value
                    );

            }

        }


        salvarLocalStorage();


        formulario.reset();


        campoId.value =
            "";


        areaFormulario.classList.add(
            "escondido"
        );


        atualizarTela();

    }
);


/* =========================================
   EDITAR E EXCLUIR
   DELEGAÇÃO DE EVENTOS
========================================= */

biblioteca.addEventListener(
    "click",
    function (evento) {

        const elemento =
            evento.target;


        /* =================================
           EDITAR
        ================================= */

        if (
            elemento.classList.contains(
                "botao-editar"
            )
        ) {

            const id =
                Number(
                    elemento.dataset.id
                );


            const livro =
                estado.livros.find(
                    function (livro) {

                        return livro.id === id;

                    }
                );


            if (livro === undefined) {
                return;
            }


            campoId.value =
                livro.id;


            campoTitulo.value =
                livro.titulo;


            campoAutor.value =
                livro.autor;


            campoGeneroLivro.value =
                livro.genero;


            campoStatusLivro.value =
                livro.status;


            campoNota.value =
                livro.nota;


            tituloFormulario.textContent =
                "Editar Registro do Tomo";


            areaFormulario.classList.remove(
                "escondido"
            );


            areaFormulario.scrollIntoView({
                behavior: "smooth"
            });

        }


        /* =================================
           EXCLUIR
        ================================= */

        if (
            elemento.classList.contains(
                "botao-excluir"
            )
        ) {

            const id =
                Number(
                    elemento.dataset.id
                );


            const livro =
                estado.livros.find(
                    function (livro) {

                        return livro.id === id;

                    }
                );


            if (livro === undefined) {
                return;
            }


            const confirmar =
                confirm(
                    'Deseja realmente banir "' +
                    livro.titulo +
                    '" dos arquivos da Coroa?'
                );


            if (confirmar) {

                estado.livros =
                    estado.livros.filter(
                        function (livro) {

                            return livro.id !== id;

                        }
                    );


                salvarLocalStorage();


                atualizarTela();

            }

        }

    }
);


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

        estado.busca =
            "";


        estado.status =
            "todos";


        estado.genero =
            "todos";


        estado.ordenacao =
            "padrao";


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