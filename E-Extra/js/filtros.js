export function obterLivrosVisiveis(estado) {

    let livrosVisiveis =
        [...estado.livros];


    /* BUSCA PELO TÍTULO */

    if (estado.busca !== "") {

        livrosVisiveis =
            livrosVisiveis.filter(
                function (livro) {

                    return livro.titulo
                        .toLowerCase()
                        .includes(
                            estado.busca
                                .toLowerCase()
                        );

                }
            );

    }


    /* FILTRO DE STATUS */

    if (estado.status !== "todos") {

        livrosVisiveis =
            livrosVisiveis.filter(
                function (livro) {

                    return livro.status ===
                        estado.status;

                }
            );

    }


    /* FILTRO DE GÊNERO */

    if (estado.genero !== "todos") {

        livrosVisiveis =
            livrosVisiveis.filter(
                function (livro) {

                    return livro.genero ===
                        estado.genero;

                }
            );

    }


    /* MELHOR NOTA */

    if (
        estado.ordenacao ===
        "melhor-nota"
    ) {

        livrosVisiveis.sort(
            function (a, b) {

                return b.nota - a.nota;

            }
        );

    }


    /* MENOR NOTA */

    if (
        estado.ordenacao ===
        "menor-nota"
    ) {

        livrosVisiveis.sort(
            function (a, b) {

                return a.nota - b.nota;

            }
        );

    }


    /* ORDEM ALFABÉTICA */

    if (
        estado.ordenacao ===
        "titulo"
    ) {

        livrosVisiveis.sort(
            function (a, b) {

                return a.titulo.localeCompare(
                    b.titulo
                );

            }
        );

    }


    return livrosVisiveis;

}