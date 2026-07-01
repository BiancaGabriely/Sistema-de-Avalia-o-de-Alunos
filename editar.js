
let alunos = JSON.parse(localStorage.getItem("alunos")) || [];
alunos.forEach(aluno => atualizar(aluno));

localStorage.setItem("alunos", JSON.stringify(alunos));
document.querySelector("#exibir").addEventListener("click", exibir);


function exibir(){
    let matricula = document.querySelector("#matricula").value;

    let aluno = alunos.find(aluno => aluno.matricula == matricula);
    console.log(alunos);

    if(!aluno){
        alert("Aluno não encontrado.")
        return;
    }

    document.querySelector("#resultado").innerHTML = `
    Aluno:${aluno.nome}<br>
    Turma:${aluno.turma}<br>
    Média:${aluno.media.toFixed(2)}<br>
    Situação: ${aluno.situacao}
    `;

    mostrarEstatisticas(aluno.turma);

    document.querySelector("#botoes").innerHTML = `
        <button onclick="editar()">Editar</button>
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

    let novaTurma = document.querySelector("#novaTurma").value;

    if(novaTurma !== aluno.turma){
        let novamatricula = gerarMatricula(novaTurma);

        aluno.matricula = novamatricula;

       document.querySelector("#novaMatricula").textContent =
        `Nova matrícula: ${novamatricula}`; 
    }

    aluno.nome = document.querySelector("#novoNome").value;
    aluno.turma = novaTurma;
    aluno.nota1 = Number(document.querySelector("#novaNota1").value);
    aluno.nota2 = Number(document.querySelector("#novaNota2").value);

    atualizar(aluno);
    mostrarEstatisticas(aluno.turma);
    localStorage.setItem("alunos", JSON.stringify(alunos));

    exibir();
    alert("Dados salvos com sucesso!");

}
function gerarMatricula(turma){
   
  let alunosturma = alunos.filter(aluno =>  aluno.turma === turma);

    if(alunosturma.length === 0){

        const inicio = {
            "1M": 1000,
            "2M": 2000,
            "3M": 3000,
            "1V": 4000,
            "2V": 5000,
            "3V": 6000  
        };

        return turma + inicio[turma];
    }

    let maior = Math.max(
        ...alunosturma.map(aluno =>
            Number(aluno.matricula.replace(turma,""))
        )
    );

    return turma + (maior + 1);
    
}
function atualizar(aluno){
    aluno.media = (aluno.nota1 + aluno.nota2) / 2;
    
    //calcula a situação
    console.log(alunos);
    if(aluno.media >= 60 ){
        aluno.situacao = "Aprovado!";
    }else if(aluno.media >= 50){
        aluno.situacao = "Em Recuperação.";
    }else{
        aluno.situacao = "Reprovado.";
    }
}
function estatisticas(turma){
    let alunosturma = alunos.filter(aluno => aluno.turma === turma);

    if(alunosturma.length === 0){
        return null;
    }

    let medias = alunosturma.map(aluno => aluno.media);

    let soma = medias.reduce((total, media) => total + media, 0);

    return{
        mediaTurma: soma / medias.length,
        maiorMedia: Math.max(...medias),
        menorMedia: Math.min(...medias)
    };
}
function mostrarEstatisticas(turma){
    let dados = estatisticas(turma);

    if(!dados){
        return;
    }

    document.querySelector("#estatisticas").innerHTML = `
        <h3> Estatísticas da Turma </h3>

        Média da Turma: ${dados.mediaTurma.toFixed(2)} <br>
        Maior Média: ${dados.maiorMedia.toFixed(2)} <br>
        Menor Média: ${dados.menorMedia.toFixed(2)} 
    `;
}

