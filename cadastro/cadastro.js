const API_URL = "http://localhost:3000/alunos";

async function cadastrar() {

    // Recebe todos os dados informados
    let nome = document.querySelector("#nome").value;
    let turma = document.querySelector("#turmas").value;

    let opcaoNota = document.querySelector("#opcoes").value;
    let nota1 = Number(document.querySelector("#nota1").value);
    let nota2 = Number(document.querySelector("#nota2").value);

    let campos = document.querySelectorAll("input, select");

    let valido = true;

    // Limpa as mensagens de erro
    document.querySelector("#erroNome").textContent = "";
    document.querySelector("#erroTurma").textContent = "";
    document.querySelector("#erroNota1").textContent = "";
    document.querySelector("#erroNota2").textContent = "";

    // Validação do nome
    if (nome.trim() === "") {
        document.querySelector("#erroNome").textContent = "*Insira o nome.";
        valido = false;
    }

    // Validação da turma
    if (turma === "") {
        document.querySelector("#erroTurma").textContent = "*Selecione uma turma.";
        valido = false;
    }

    // Validação da nota 1
    if (document.querySelector("#nota1").value === "") {
        document.querySelector("#erroNota1").textContent = "*Informe a nota 1.";
        valido = false;
    }

    // Validação da nota 2
    if (document.querySelector("#nota2").value === "") {
        document.querySelector("#erroNota2").textContent = "*Informe a nota 2.";
        valido = false;
    }

    // Se houver algum erro, para a função
    if (!valido) {
        return;
    }

    try {

        // Busca os alunos já cadastrados
        const respostaAlunos = await fetch(API_URL);

        if (!respostaAlunos.ok) {
            throw new Error("Erro ao buscar os alunos.");
        }

        const alunos = await respostaAlunos.json();

        // Encontra a maior matrícula existente
        let maiorMatricula = 0;

        alunos.forEach(aluno => {

            let matriculaAtual = Number(aluno.matricula);

            if (matriculaAtual > maiorMatricula) {
                maiorMatricula = matriculaAtual;
            }

        });

        // Cria a próxima matrícula
        let matricula = maiorMatricula + 1;

        // Cria o objeto aluno
        let aluno = {
            nome,
            turma,
            opcaoNota,
            nota1,
            nota2,
            matricula: String(matricula)
        };

        // Cadastra o aluno na MockAPI
        const resposta = await fetch(API_URL, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(aluno)

        });

        if (!resposta.ok) {
            throw new Error("Erro ao cadastrar o aluno.");
        }

        const alunoCadastrado = await resposta.json();

        console.log("Aluno cadastrado no MockAPI:", alunoCadastrado);

        alert(
            `Aluno cadastrado com sucesso! Matrícula do aluno cadastrado: ${alunoCadastrado.novoAluno.matricula}`
        );

        // Limpa os campos
        campos.forEach(campo => {
            campo.value = "";
        });

    } catch (erro) {

        console.error("Erro:", erro);

        alert("Não foi possível cadastrar o aluno.");
    }
}