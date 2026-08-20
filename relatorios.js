//carrega os dados salvos
let alunos = JSON.parse(localStorage.getItem("alunos")) || [];

// Atualiza média e situação ao abrir a página
alunos.forEach(aluno => atualizar(aluno));

localStorage.setItem("alunos", JSON.stringify(alunos));
//converte a lista de alunos para texto e salva de volta no navegador

function visualizar_dados(){

    let turma = document.querySelector("#turmas").value;
    //teste se a turma foi selecionada
    if(turma === ""){
        alert("Selecione uma turma.");
        return;
    }

    document.querySelector("#filtroSituacao").style.display = "block";//exibe os elementos que ainda 
    //não apareciam

    let lista = alunos.filter(aluno => aluno.turma === turma);
    //Cria uma nova lista chamada lista contendo apenas os alunos cujo código da turma (aluno.turma) 
    // seja exatamente igual à variável turma buscada

    mostrarAlunos(lista);
    mostrarEstatisticas(turma);
    mostrarContadores(lista);
}

function filtrarSituacao(){

    let turma = document.querySelector("#turmas").value;
    let situacao = document.querySelector("#situacao").value;

    let lista = alunos.filter(aluno => aluno.turma === turma);

    if(situacao !== "Todos"){
        lista = lista.filter(aluno => aluno.situacao === situacao);
    }// filtra a lista de alunos pela situação deles (como "Aprovado" ou "Reprovado"),
     //mas pula o filtro se o usuário escolher ver "Todos".

    mostrarAlunos(lista);
    mostrarContadores(lista);

}

function mostrarAlunos(lista){

    let resultado = document.querySelector("#resultado");

    if(lista.length === 0){
        resultado.innerHTML = "<p>Nenhum aluno encontrado.</p>";
        return;
    }

    //encontra a maior e menor média 
    let maior = Math.max(...lista.map(aluno => aluno.media));
    let menor = Math.min(...lista.map(aluno => aluno.media));

    let html = "";

    lista.forEach(aluno=>{

        let classe = "";
        //Se a média do aluno for igual à maior nota (aluno.media === maior), a variável vira "maior".
        if(aluno.media === maior){
            classe = "maior";
        }
        //Se a média do aluno for igual à menor nota (aluno.media === menor), a variável vira "menor".
        if(aluno.media === menor){
            classe = "menor";
        }

        //recebe a classe e mostra os dados 
        html += `
        <div class="${classe} aluno">

            <p><strong>${aluno.nome}</strong></p>

            <p>Matrícula: ${aluno.matricula}</p>

            <p>Média: ${aluno.media.toFixed(2)}</p>

            <p>Situação: ${aluno.situacao}</p>

        </div>
        `;
    });

    resultado.innerHTML = html;

}

function mostrarEstatisticas(turma){

    console.log("Turma recebida:", turma);

    let dados = estatisticas(turma); //recebe os dados da turma recebida

    console.log(dados);

    if(!dados){
        return;
    }
    //exibe as médias e os alunos que possuem as maiores e menores médias da turma
    document.querySelector("#estatisticas").innerHTML = `
        <h2>Estatísticas da Turma</h2>

        <p><strong>Média da turma:</strong> ${dados.mediaTurma.toFixed(2)}</p>
        <p><strong>Maior média:</strong> ${dados.maiorMedia.toFixed(2)} - Aluno: ${dados.alunoMaior}</p>
        <p><strong>Menor média:</strong> ${dados.menorMedia.toFixed(2)} - Aluno: ${dados.alunoMenor}</p>
    `;
}
function mostrarContadores(lista){

    let aprovados = lista.filter(aluno => aluno.situacao === "Aprovado").length;

    let recuperacao = lista.filter(aluno => aluno.situacao === "Em Recuperação").length;

    let reprovados = lista.filter(aluno => aluno.situacao === "Reprovado").length;

    //cria 3 contadores para mostrar quantos alunos estão aprovados, reprovados ou em recuperação
    document.querySelector("#contadores").innerHTML = `

        <h2>Resumo da Turma</h2>

        <p><strong>Aprovados:</strong> ${aprovados}</p>

        <p><strong>Em Recuperação:</strong> ${recuperacao}</p>

        <p><strong>Reprovados:</strong> ${reprovados}</p>

    `;

}
function atualizar(aluno){

    // é a função de atualizar a situação do aluno
    aluno.media = (Number(aluno.nota1) + Number(aluno.nota2))/2;

    if(aluno.media >= 60){
        aluno.situacao = "Aprovado";
    }
    else if(aluno.media >= 50){
        aluno.situacao = "Em Recuperação";
    }
    else{
        aluno.situacao = "Reprovado";
    }

}
function estatisticas(turma){

    let alunosTurma = alunos.filter(aluno => aluno.turma === turma);

    console.log(alunos);
    // se não tiver alunos na turma, será exibido zero ou vazio
    if(alunosTurma.length === 0){
        return{
           mediaTurma: 0,
           maiorMedia: 0,
           menorMedia: 0,
           alunoMaior:  "-",
           alunoMenor: "-" 
        };
    }
    //cria uma lista somente com as médias
    let medias = alunosTurma.map(aluno => aluno.media);
    //soma todas essas médias que foram recebidas
    let soma = medias.reduce((total, media)=> total + media,0);

    let maiorMedia = Math.max(...medias);
    let menorMedia = Math.min(...medias);
    //descobre qual aluno possui a maior e menor média da turma
    let alunoMaior = alunosTurma.find(aluno => aluno.media === maiorMedia);
    let alunoMenor = alunosTurma.find(aluno => aluno.media === menorMedia);
    return{

        mediaTurma: soma / medias.length,

        maiorMedia: Math.max(...medias),

        menorMedia: Math.min(...medias),

        alunoMaior: alunoMaior.nome,
        alunoMenor: alunoMenor.nome
    };

}