export function renderizarLivros(livros) {

    const biblioteca =
        document.getElementById("biblioteca");


    biblioteca.textContent = "";


    livros.forEach(
        function (livro) {

            const artigo =
                document.createElement("article");


            artigo.classList.add("livro");


            artigo.dataset.id =
                livro.id;


            /* TÍTULO */

            const titulo =
                document.createElement("h2");


            titulo.textContent =
                livro.titulo;


            /* AUTOR */

            const autor =
                document.createElement("p");


            autor.classList.add("autor");


            autor.textContent =
                "por " + livro.autor;


            /* DETALHES */

            const detalhes =
                document.createElement("div");


            detalhes.classList.add("detalhes");


            /* GÊNERO */

            const genero =
                document.createElement("p");


            genero.classList.add("genero");


            genero.textContent =
                formatarGenero(
                    livro.genero
                );


            /* STATUS */

            const status =
                document.createElement("p");


            status.classList.add("status");


            status.classList.add(
                "status-" + livro.status
            );


            status.textContent =
                formatarStatus(
                    livro.status
                );


            /* ESTRELAS */

            const estrelas =
                document.createElement("p");


            estrelas.classList.add("estrelas");


            estrelas.textContent =
                criarEstrelas(
                    livro.nota
                );


            /* ÁREA DOS BOTÕES */

            const acoes =
                document.createElement("div");


            acoes.classList.add(
                "acoes-livro"
            );


            /* EDITAR */

            const botaoEditar =
                document.createElement("button");


            botaoEditar.type =
                "button";


            botaoEditar.classList.add(
                "botao-editar"
            );


            botaoEditar.dataset.id =
                livro.id;


            botaoEditar.textContent =
                "⚔ Editar";


            /* EXCLUIR */

            const botaoExcluir =
                document.createElement("button");


            botaoExcluir.type =
                "button";


            botaoExcluir.classList.add(
                "botao-excluir"
            );


            botaoExcluir.dataset.id =
                livro.id;


            botaoExcluir.textContent =
                "☠ Excluir";


            /* MONTA AS AÇÕES */

            acoes.appendChild(
                botaoEditar
            );


            acoes.appendChild(
                botaoExcluir
            );


            /* MONTA DETALHES */

            detalhes.appendChild(
                genero
            );


            detalhes.appendChild(
                status
            );


            detalhes.appendChild(
                estrelas
            );


            /* MONTA O LIVRO */

            artigo.appendChild(
                titulo
            );


            artigo.appendChild(
                autor
            );


            artigo.appendChild(
                detalhes
            );


            artigo.appendChild(
                acoes
            );


            biblioteca.appendChild(
                artigo
            );

        }
    );

}


/* =========================================
   STATUS
========================================= */

function formatarStatus(status) {

    if (status === "quero-ler") {
        return "♛ Convocado";
    }


    if (status === "lendo") {
        return "🔥 Em batalha";
    }


    if (status === "lido") {
        return "⚔ Missão cumprida";
    }


    if (status === "abandonado") {
        return "☠ Banido do reino";
    }


    return status;

}


/* =========================================
   GÊNERO
========================================= */

function formatarGenero(genero) {

    if (genero === "fantasia") {
        return "✦ Fantasia";
    }


    if (genero === "romance") {
        return "♥ Romance";
    }


    if (genero === "suspense") {
        return "☾ Suspense";
    }


    if (genero === "ficcao") {
        return "◆ Ficção";
    }


    return genero;

}


/* =========================================
   ESTRELAS
========================================= */

function criarEstrelas(nota) {

    if (nota === 0) {
        return "Ainda não julgado pela Coroa";
    }


    let estrelas = "";


    for (
        let i = 1;
        i <= 5;
        i++
    ) {

        if (i <= nota) {
            estrelas += "★";
        }

        else {
            estrelas += "☆";
        }

    }


    return estrelas;

}