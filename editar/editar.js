const API_URL = "http://localhost:3000/alunos";

let alunos = [];

async function carregarAlunos() {
    try{
        const resposta = await fetch(API_URL,{
            method: "GET"
        });

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

async function salvar() {

    let matricula = document.querySelector("#matricula").value;

    // Encontra o aluno pela matrícula
    let aluno = alunos.find(aluno => aluno.matricula == matricula);

    if (!aluno) {
        alert("Aluno não encontrado!");
        return;
    }

    console.log("Aluno encontrado:", aluno);

    // ID REAL do registro na MockAPI
    const id = aluno.matricula;
    console.log("ID da MockAPI:", id);

    if (!id) {
        alert("Erro: o ID do aluno não foi encontrado.");
        return;
    }

    // Pega os dados que foram editados
    const dadosAtualizados = {
        nome: document.querySelector("#novoNome").value,
        turma: document.querySelector("#novaTurma").value,
        nota1: Number(document.querySelector("#novaNota1").value),
        nota2: Number(document.querySelector("#novaNota2").value),
        opcaoNota: aluno.opcaoNota,
        matricula: aluno.matricula
    };

    try {

        const resposta = await fetch(`${API_URL}/${id}`, {
            method: "PUT",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(dadosAtualizados)
        });

        if (!resposta.ok) {
            throw new Error("Erro ao atualizar o aluno.");
        }

        const alunoAtualizado = await resposta.json();

        console.log("Aluno atualizado:", alunoAtualizado);

        // Recalcula média e situação
        atualizar(alunoAtualizado);

        // Atualiza o aluno no array
        const indice = alunos.findIndex(a => a.id == id);

        if (indice !== -1) {
            alunos[indice] = alunoAtualizado;
        }

        // Atualiza estatísticas
        mostrarEstatisticas(alunoAtualizado.turma);

        // Atualiza a tela
        exibir();

        // Esconde formulário
        document.querySelector("#formEditar").style.display = "none";

        alert("Dados salvos com sucesso!");

    } catch (erro) {

        console.error("Erro:", erro);

        alert("Não foi possível salvar os dados.");
    }
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
carregarAlunos();