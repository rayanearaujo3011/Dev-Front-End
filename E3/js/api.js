export async function carregarTarefas() {

    const resposta =
        await fetch("./dados.json");


    if (!resposta.ok) {

        const erro =
            new Error(
                "Erro HTTP " +
                resposta.status
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
        !Array.isArray(dados.tarefas)
    ) {

        const erro =
            new Error(
                "Formato de dados inválido"
            );

        erro.name =
            "FormatError";

        throw erro;
    }


    return dados.tarefas;
}