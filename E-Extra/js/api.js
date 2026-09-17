export async function carregarLivros() {

    const resposta =
        await fetch("./dados.json");


    if (!resposta.ok) {

        const erro =
            new Error(
                "Não foi possível carregar os livros."
            );

        erro.name =
            "ProtocolError";

        erro.status =
            resposta.status;

        throw erro;

    }


    const dados =
        await resposta.json();


    if (
        typeof dados !== "object" ||
        dados === null ||
        !Array.isArray(dados.livros)
    ) {

        const erro =
            new Error(
                "Formato de dados inválido."
            );

        erro.name =
            "FormatError";

        throw erro;

    }


    return dados.livros;

}