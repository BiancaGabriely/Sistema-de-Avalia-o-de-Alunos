# 📚 Sistema de Avaliação de Alunos

Sistema web desenvolvido para gerenciar o cadastro de alunos, cálculo automático de médias, edição de informações e geração de relatórios acadêmicos.

## 📖 Sobre o projeto

O Sistema de Avaliação de Alunos foi desenvolvido como projeto da disciplina de Programação para Internet.

A aplicação permite cadastrar alunos, calcular automaticamente a média final, definir sua situação acadêmica e gerar relatórios estatísticos por turma.

Todas as informações são armazenadas no navegador utilizando LocalStorage, dispensando o uso de banco de dados.

---

## 🚀 Funcionalidades

### Cadastro de alunos

- Cadastro do nome do aluno
- Seleção da turma
- Cadastro de duas notas
- Geração automática da matrícula
- Armazenamento dos dados no LocalStorage

### Cálculos automáticos

Após o cadastro ou edição, o sistema calcula automaticamente:

- Média final
- Situação do aluno
  - Aprovado
  - Em Recuperação
  - Reprovado

---

### Consulta e edição

É possível localizar um aluno pela matrícula para:

- visualizar seus dados;
- editar nome;
- alterar turma;
- alterar notas;
- recalcular automaticamente média e situação;
- gerar uma nova matrícula quando houver troca de turma.

---

### Relatórios

O sistema possui uma página de relatórios contendo:

- Estatísticas por turma
- Média geral da turma
- Maior média
- Menor média
- Nome do aluno com maior média
- Nome do aluno com menor média
- Filtro por situação
- Contador de:
  - aprovados;
  - recuperação;
  - reprovados.
- Destaque visual para o aluno com maior média e menor média.

---

## 💻 Tecnologias utilizadas

- HTML5
- CSS3
- JavaScript
- LocalStorage

---

## 📂 Estrutura do projeto

```
📁 Sistema-de-Avaliacao-de-Alunos
│
├── cadastro.html
├── cadastro.js
├── editarAlunos.html
├── editar.js
├── relatorios.html
├── relatorios.js
├── style.css
├── editar.css
├── relatorios.css
└── README.md
```

---

## 👩‍💻 Autora

**Bianca Gabriely Gomes dos Santos**

GitHub:
https://github.com/BiancaGabriely
