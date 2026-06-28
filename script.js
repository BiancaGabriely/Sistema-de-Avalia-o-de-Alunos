
let alunos =[];
function cadastrar(){
    let nome = document.querySelector("#nome").value;
    let turma = document.querySelector("#turmas").value;

    let opcaoNota = document.querySelector("#opcoes").value;
    let nota1 = Number(document.querySelector("#nota1").value);
    let nota2 = Number(document.querySelector("#nota2").value);
    let frequencia = Number(document.querySelector("#porcentagem").value);
    let campos = document.querySelectorAll("input, select");

    let matricula = gerarMatricula(turma);

    if(nome.trim() === ""){
        alert("O campo está vazio. Insira um Nome!");
        return;
    }; 

    let aluno = {
        matricula,
        nome,
        turma,
        opcaoNota,
        nota1,
        nota2,
        frequencia
    };

    alunos.push(aluno);
    alert(`Aluno cadastrado com sucesso!
    Matrícula do aluno cadastrado: ${matricula}` );

    console.log(alunos);

    campos.forEach(campo => {
     campo.value = "";
    });
    
}

let contadores = {
    "1M": 1000,
    "2M": 2000,
    "3M": 3000,
    "1V": 4000,
    "2V": 5000,
    "3V": 6000
};

function gerarMatricula(turma){
   
    let matricula = turma + contadores[turma];
    contadores[turma]++;

    return turma + contadores[turma];
    
}