
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
    localStorage.setItem("alunos", JSON.stringify(alunos));
    alert(`Aluno cadastrado com sucesso!
    Matrícula do aluno cadastrado: ${matricula}` );

    console.log(alunos);

    campos.forEach(campo => {
     campo.value = "";
    });
    
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