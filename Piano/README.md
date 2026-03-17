<<<<<<< HEAD
# Situação de Aprendizagem 1 - FrontEnd
### Grupo: Ana Sofhia Leonardi de Morais, Gabriela Machado, Guilherme Prestes Bosco Biondo e Kaio Martinez Jorge

## Atividades Realizadas:
- Piano Simples(Fácil);
- Cronômetro(Médio);
- Jogo da Velha(Difícil).
=======
# Documentação do Desafio Fácil: Piano Simples

### Visão Geral

 O projeto consiste em um piano virtual interativo desenvolvido para navegador, utilizando HTML, CSS e JavaScript. A aplicação permite que o usuário toque notas musicais diretamente na interface do piano ou utilizando o teclado físico do computador.
 O som é gerado em tempo real por meio da Web Audio API, sem a necessidade de arquivos de áudio externos.

### Principais Funcionalidades

1. Reprodução de Notas Musicais

Cada tecla do piano está associada a uma frequência específica.
Quando uma tecla é pressionada, o sistema gera uma onda sonora correspondente à frequência da nota musical.

As notas implementadas atualmente incluem uma oitava completa, indo de C4 até C5.

2. Geração de Som Dinâmica

O som é produzido utilizando um OscillatorNode da Web Audio API. Cada vez que uma nota é tocada:
 um oscilador é criado;
a frequência da nota é configurada;
o volume é controlado através de um GainNode;
o som é reproduzido e finalizado automaticamente após um curto intervalo.
  
3. Layout Responsivo:

A interface se adapta a várias larguras de tela, tornando utilizável em desktops e tablets. CSS flexbox e media queries foram adicionados.

### Desafio Enfrentado
1. Implementação da Web Audio API

A principal dificuldade foi entender como gerar som diretamente no navegador utilizando a Web Audio API.

Foi necessário aprender como funcionam os componentes principais, como AudioContext, OscillatorNode e GainNode.

>>>>>>> c7aa220 (Piano)
