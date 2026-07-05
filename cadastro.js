
let alunos =[]; //array de alunos
function cadastrar(){

    //recebe todos os dados informados
    let nome = document.querySelector("#nome").value;
    let turma = document.querySelector("#turmas").value;

    let opcaoNota = document.querySelector("#opcoes").value;
    let nota1 = Number(document.querySelector("#nota1").value);
    let nota2 = Number(document.querySelector("#nota2").value);
    let campos = document.querySelectorAll("input, select");

    let matricula = gerarMatricula(turma);
    let valido = true; // teste se o dado foi inserido

    //limpa as mensagens de erro 
    document.querySelector("#erroNome").textContent = "";;
    document.querySelector("#erroTurma").textContent = "";
    document.querySelector("#erroNota1").textContent = "";
    document.querySelector("#erroNota2").textContent = "";

    //teste para saber se o dado foi inserido
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
    
    //cria o objeto aluno
    let aluno = {
        matricula,
        nome,
        turma,
        opcaoNota,
        nota1,
        nota2
    };

    //adiciona o aluno e retorna a matrícula de acordo com a turma que foi inserido
    alunos.push(aluno);
    localStorage.setItem("alunos", JSON.stringify(alunos)); //dados do vetor são salvos na memória do navegador
    alert(`Aluno cadastrado com sucesso!
    Matrícula do aluno cadastrado: ${matricula}` );

    console.log(alunos);
    
    //limpa os campos para novo cadastro
    campos.forEach(campo => {
     campo.value = "";
    });
    
}
function gerarMatricula(turma){

    // filtra os alunos de acordo com suas turmas
    let alunosturma = alunos.filter(aluno =>  aluno.turma === turma);

    if(alunosturma.length === 0){
        //se a turma ainda não tiver alunos 
        const inicio = {
            "1M": 1000,
            "2M": 2000,
            "3M": 3000,
            "1V": 4000,
            "2V": 5000,
            "3V": 6000  
        };
        //retorna a turma + o incício da turma
        return turma + inicio[turma];
    }

    //Encontra o maior número sequencial de matrícula existente entre os alunos da turma selecionada. 
    let maior = Math.max(
        ...alunosturma.map(aluno =>
            Number(aluno.matricula.replace(turma,""))
        )
    );

    return turma + (maior + 1); // retorna a matrícula encontrada somando 1
    
}