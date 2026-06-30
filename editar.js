
let alunos = JSON.parse(localStorage.getItem("alunos")) || [];
document.querySelector("#exibir").addEventListener("click", exibir);

function exibir(){
    let matricula = document.querySelector("#matricula").value;

    let aluno = alunos.find(aluno => aluno.matricula == matricula);
    console.log(alunos);

    if(!aluno){
        alert("Aluno não encontrado.")
        return;
    }

    document.querySelector("#resultado").textContent = `Aluno: ${aluno.nome}`;

    document.querySelector("#botoes").innerHTML = `
        <button onclick="editar()">Editar</button>
        <button onclick="calcular()">Calcular Média</button>
    `;
    console.log(aluno);

}
function editar(){

    let matricula = document.querySelector("#matricula").value;

    let aluno = alunos.find(aluno => aluno.matricula == matricula);

    if (!aluno) {
        alert("Aluno não encontrado!");
        return;
    }

    document.querySelector("#formEditar").style.display = "block";
    document.querySelector("#novoNome").value = aluno.nome;
    document.querySelector("#novaTurma").value = aluno.turma;
    document.querySelector("#novaNota1").value = aluno.nota1;
    document.querySelector("#novaNota2").value = aluno.nota2;

}
function salvar(){
    
    let matricula = document.querySelector("#matricula").value;

    let aluno = alunos.find(aluno => aluno.matricula == matricula);

    if (!aluno) {
        alert("Aluno não encontrado!");
        return;
    }

      
    aluno.nome = document.querySelector("#novoNome").value;
    aluno.turma = document.querySelector("#novaTurma").value;
    aluno.nota1 = Number(document.querySelector("#novaNota1").value);
    aluno.nota2 = Number(document.querySelector("#novaNota2").value);

    localStorage.setItem("alunos", JSON.stringify(alunos));

    alert("Dados salvos com sucesso!");

}

