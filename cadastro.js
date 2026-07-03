
let alunos =[];
function cadastrar(){
    let nome = document.querySelector("#nome").value;
    let turma = document.querySelector("#turmas").value;

    let opcaoNota = document.querySelector("#opcoes").value;
    let nota1 = Number(document.querySelector("#nota1").value);
    let nota2 = Number(document.querySelector("#nota2").value);
    let campos = document.querySelectorAll("input, select");

    let matricula = gerarMatricula(turma);
    let valido = true;

    document.querySelector("#erroNome").textContent = "";;
    document.querySelector("#erroTurma").textContent = "";
    document.querySelector("#erroNota1").textContent = "";
    document.querySelector("#erroNota2").textContent = "";

    if(nome.trim() === ""){
        document.querySelector("#erroNome").textContent = "*Insira o nome.";
        valido = false;
    }
    
    if(turma === ""){
        document.querySelector("#erroTurma").textContent = "*Selecione uma turma.";
        valido = false;
    }

    if(document.querySelector("#nota1").value === ""){
        document.querySelector("#erroNota1").textContent = "*Informe a nota 1.";
        valido = false;
    }

    if(document.querySelector("#nota2").value === ""){
        document.querySelector("#erroNota2").textContent = "*Informe a nota 2.";
        valido = false;
    }

    if(!valido){
        return;
    }
    
    let aluno = {
        matricula,
        nome,
        turma,
        opcaoNota,
        nota1,
        nota2
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