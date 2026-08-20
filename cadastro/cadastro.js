const API_URL = "https://6a86e15170fbbd308f986db1.mockapi.io/Alunos";

async function cadastrar() {

    // Recebe todos os dados informados
    let nome = document.querySelector("#nome").value;
    let turma = document.querySelector("#turmas").value;

    let opcaoNota = document.querySelector("#opcoes").value;
    let nota1 = Number(document.querySelector("#nota1").value);
    let nota2 = Number(document.querySelector("#nota2").value);

    let campos = document.querySelectorAll("input, select");

    // Busca os alunos cadastrados na MockAPI
    const respostaAlunos = await fetch(API_URL);

    if (!respostaAlunos.ok) {
        throw new Error("Erro ao buscar os alunos.");
    }

    const alunos = await respostaAlunos.json();

    // Gera a matrícula
    let matricula = gerarMatricula(turma, alunos);

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

    // Cria o objeto aluno
    let aluno = {
        matricula,
        nome,
        turma,
        opcaoNota,
        nota1,
        nota2
    };

    try {

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
            `Aluno cadastrado com sucesso! Matrícula do aluno cadastrado: ${matricula}`
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


// Função responsável por gerar a matrícula
function gerarMatricula(turma, alunos) {

    // Filtra os alunos de acordo com a turma
    let alunosTurma = alunos.filter(
        aluno => aluno.turma === turma
    );

    // Se a turma ainda não tiver alunos
    if (alunosTurma.length === 0) {

        const inicio = {
            "1M": 1000,
            "2M": 2000,
            "3M": 3000,
            "1V": 4000,
            "2V": 5000,
            "3V": 6000
        };

        // Retorna a turma + início da sequência
        return turma + inicio[turma];
    }

    // Encontra a maior matrícula existente na turma
    let maior = Math.max(
        ...alunosTurma.map(aluno =>
            Number(
                aluno.matricula.replace(turma, "")
            )
        )
    );

    // Retorna a próxima matrícula
    return turma + (maior + 1);
}