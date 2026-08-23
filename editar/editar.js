const API_URL = "https://6a86e15170fbbd308f986db1.mockapi.io/Alunos";

let alunos = [];

async function carregarAlunos() {
    try{
        const resposta = await fetch(API_URL);

        if(!resposta.ok){
            throw new Error("Erro ao buscar os alunos.");
        }
        
        alunos = await resposta.json();

        alunos.forEach(aluno => atualizar(aluno));

        console.log("Alunos carregados:", alunos);
    } catch (erro){
        console.log("Erro:", erro);

        document.querySelector("#resultado").innerHTML = "<p>Não foi possível carregar os alunos.</p>";
    }
    
}

document.querySelector("#exibir").addEventListener("click", exibir);
/*Encontra um elemento com o ID exibir*/

function exibir(){
    let matricula = document.querySelector("#matricula").value;

    let aluno = alunos.find(aluno => aluno.matricula == matricula);
    //retorna o primeiro elemento do array que for igual a matrícula informada
    console.log(alunos);

    if(!aluno){
        alert("Aluno não encontrado.")
        return;
    }

    //exibe o resultado do aluno que foi informado
    document.querySelector("#resultado").innerHTML = `
    <div class="resultado">
        <p id="titulo"><strong>Situação do aluno</strong></p><br>
        <strong>Aluno:</strong>${aluno.nome}<br>
        <strong>Turma:</strong>${aluno.turma}<br>
        <strong>Média:</strong>${aluno.media.toFixed(2)}<br>
        <strong>Situação:</strong> ${aluno.situacao}
    </div>

    `;

    mostrarEstatisticas(aluno.turma); // chama a função mostrar estatísticas

    document.querySelector("#botoes").innerHTML = `
        <button onclick="editar()">Editar</button> 
    `;

}

function editar(){

    let matricula = document.querySelector("#matricula").value;

    let aluno = alunos.find(aluno => aluno.matricula == matricula);

    if (!aluno) {
        alert("Aluno não encontrado!");
        return;
    } // testa se o aluno está na lista

    //Exibe o formulário de edição na tela e preenche automaticamente 
    //seus campos com os dados atuais do aluno selecionado.
    document.querySelector("#formEditar").style.display = "block";
    document.querySelector("#novoNome").value = aluno.nome;
    document.querySelector("#novaTurma").value = aluno.turma;
    document.querySelector("#novaNota1").value = aluno.nota1;
    document.querySelector("#novaNota2").value = aluno.nota2;

}
async function salvar(){
    
    let matricula = document.querySelector("#matricula").value;

    let aluno = alunos.find(aluno => aluno.matricula == matricula);

    if (!aluno) {
        alert("Aluno não encontrado!");
        return;
    }

    let novaTurma = document.querySelector("#novaTurma").value; // recebe a nova turma 

    if(novaTurma !== aluno.turma){
        // se a nova forma for diferente da turma que o aluno estava ele gera uma nova matrícula
        let novamatricula = gerarMatricula(novaTurma);
        //o objeto aluno recebe a nova matrícula
        aluno.matricula = novamatricula;

       document.querySelector("#novaMatricula").textContent =
        `Nova matrícula: ${novamatricula}`; 
        //é exibido a nova matrícula
    }

    aluno.nome = document.querySelector("#novoNome").value;
    aluno.turma = novaTurma;
    aluno.nota1 = Number(document.querySelector("#novaNota1").value);
    aluno.nota2 = Number(document.querySelector("#novaNota2").value);
    //são salvos os novos dados do alunos, os dados que foram editados.

    atualizar(aluno);
    try{
        const resposta = await fetch(`${API_URL}/${aluno.id}`,{
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify(aluno)
        });

        if(!resposta.ok){
            throw new Error("Erro ao atualizar o aluno.");
        }

        const alunoAtualizado = await resposta.json();
        console.log("Aluno atualizado:", alunoAtualizado);

        let indice = alunos.findIndex(a=> a.id === aluno.id);
        alunos[indice] = alunoAtualizado;
        mostrarEstatisticas(aluno.turma);
        exibir();
        alert("Dados salvos com sucesso!");
    } catch(erro){
        console.error("Erro:", erro);
        alert("Não foi possível salvar os dados.");
    }

}
function gerarMatricula(turma){
   
  let alunosturma = alunos.filter(aluno =>  aluno.turma === turma);
    // filtra os alunos de acordo com suas turmas
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

        return turma + inicio[turma];
    }
     //Encontra o maior número sequencial de matrícula existente entre os 
     // alunos da turma selecionada. 
    let maior = Math.max(
        ...alunosturma.map(aluno =>
            Number(aluno.matricula.replace(turma,""))
        )
    );

    return turma + (maior + 1);
    
}
function atualizar(aluno){
    //faz a media do aluno e informa se ele está aprovado, reprovado ou de recuperação
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

    //testa se tem alunos na turma
    if(alunosturma.length === 0){
        return null;
    }

    //cria uma lista contendo apenas as medias dos alunos
    let medias = alunosturma.map(aluno => aluno.media);
    //Passa por essa lista de notas e vai somando uma por uma dentro 
    // da variável total (que começa em 0), acumulando o valor final.
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
    //retorna as médias da turma
    document.querySelector("#estatisticas").innerHTML = `
        
        <h3> Estatísticas da Turma </h3>

        <strong>Média da Turma:</strong> ${dados.mediaTurma.toFixed(2)} <br>
        <strong>Maior Média:</strong> ${dados.maiorMedia.toFixed(2)} <br>
        <strong>Menor Média:</strong> ${dados.menorMedia.toFixed(2)} 
    `;
}

