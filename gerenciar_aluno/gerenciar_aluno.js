const API_URL = "https://6a86e15170fbbd308f986db1.mockapi.io/Alunos";

async function carregarDados(matricula) {
    try {
        const resposta = await fetch(API_URL);

        if (!resposta.ok) {
            throw new Error("Erro ao buscar alunos.");
        }

        const alunos = await resposta.json();

        const alunoEncontrado = alunos.find(
            aluno => aluno.matricula == matricula
        );

        if (!alunoEncontrado) {
            throw new Error("Aluno não encontrado.");
        }

        document.querySelector("#resultado").innerHTML = `
            <h2>Dados do Aluno</h2>

            <p><strong>Nome:</strong> ${alunoEncontrado.nome}</p>
            <p><strong>Matrícula:</strong> ${alunoEncontrado.matricula}</p>
            <p><strong>Turma:</strong> ${alunoEncontrado.turma}</p>
            <p><strong>Nota 1:</strong> ${alunoEncontrado.nota1}</p>
            <p><strong>Nota 2:</strong> ${alunoEncontrado.nota2}</p>
        `;

    } catch (erro) {
        console.log("Erro:", erro);

        document.querySelector("#resultado").innerHTML = `
            <p>Aluno não encontrado.</p>
        `;
    }
}
async function deletarAluno() {

    const matricula = document.querySelector("#matricula").value;

    if (matricula === "") {
        document.querySelector("#resultado").innerHTML = `
            <p>Informe a matrícula do aluno.</p>
        `;
        return;
    }

    try {

        const url = `${API_URL}/${matricula}`;

        console.log("Deletando:", url);

        const resposta = await fetch(url, {
            method: "DELETE"
        });

        console.log("Status:", resposta.status);

        if (!resposta.ok) {
            throw new Error("Erro ao deletar o aluno.");
        }

        document.querySelector("#resultado").innerHTML = `
            <p>Aluno deletado com sucesso!</p>
        `;

        document.querySelector("#matricula").value = "";

    } catch (erro) {

        console.log("Erro:", erro);

        document.querySelector("#resultado").innerHTML = `
            <p>Não foi possível deletar o aluno.</p>
        `;
    }
}
document.querySelector("#pesquisar").addEventListener("click", () => {

    const matricula = document.querySelector("#matricula").value;

    if (matricula === "") {
        alert("Informe a matrícula do aluno.");
        return;
    }

    carregarDados(matricula);
});

document.querySelector("#deletar").addEventListener("click", deletarAluno);