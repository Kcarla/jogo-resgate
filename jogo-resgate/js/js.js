function start() { // Inicio da função start()

	$("#inicio").hide();
	
	$("#fundoGame").append("<div id='jogador' class='anima1'></div>");
	$("#fundoGame").append("<div id='inimigo1' class='anima2'></div>");
	$("#fundoGame").append("<div id='inimigo2'></div>");
	$("#fundoGame").append("<div id='amigo' class='anima3'></div>");
	$("#fundoGame").append("<div id='placar'></div>");
	$("#fundoGame").append("<div id='energia'></div>");
 
	//Principais variáveis do jogo
	var energiaAtual=3;
	var pontos=0;
    var salvos=0;
    var perdidos=0;
	var podeAtirar=true; // indica pode atirar
	var jogo = {}
	var fimdejogo=false;
	var velocidade=5; // velocidade do inimigo uma variavel.
	var posicaoY = parseInt(Math.random() * 334); // função que vai encontrar 
	//de 0  a 334 posissionamento do inimigo cada hora em posição diferente.
	//match.random * 0 e entre 334
	var TECLA = {
		W: 87, // indicando o valor decinal (movimenta a nave pra cima)
		S: 83, // movinha para baixo
		D: 68 // realiza os disparo
		
		}
	
		jogo.pressionou = []; //definir se o jogador precionou a tecla
		//Verifica se o usuário pressionou alguma tecla	
		var somDisparo=document.getElementById("somDisparo");
       var somExplosao=document.getElementById("somExplosao");
   var musica=document.getElementById("musica");
 var somGameover=document.getElementById("somGameover");
var somPerdido=document.getElementById("somPerdido");
var somResgate=document.getElementById("somResgate");
//Música em loop
musica.addEventListener("ended", function(){ musica.currentTime = 0; musica.play(); }, false);
musica.play(); //evento na musica
	
	$(document).keydown(function(e){ //keldown (pressionou uma tecla)
		jogo.pressionou[e.which] = true; //variavel jogo.pressionou
		});
	
	
		$(document).keyup(function(e){ //não existe tecla precionada
		   jogo.pressionou[e.which] = false;
		}); // variavel jogo.pressionou
	
	
	//Game Loop

	jogo.timer = setInterval(loop,30); //setIntervalo(temporizador loop de execução 3o milesegundos)
	
	function loop() {
	
	movefundo();//movimento do fundo
	moveinimigo1(); //função
	movejogador(); //movimento jogador
	moveinimigo2();
	moveamigo();
	colisao();
	placar();
	energia();
	
	
	} // Fim da função loop()
	//Função que movimenta o fundo do jogo
	
	function movefundo() {
	
		esquerda = parseInt($("#fundoGame").css ("background-position"));
		$("#fundoGame").css("background-position",esquerda-3);  //parseInt converte uma string para um inteiro pq pega a #fundoGame + css background valor atual do fundo da "div" (esquerda vai ter 0 - 1)
		
		
		} // fim da função movefundo()
	
	function movejogador() {
	
	if (jogo.pressionou[TECLA.W]) {
	var topo = parseInt($("#jogador").css("top"));
	$("#jogador").css("top",topo-10); //andar 10 unidades para cima, tecla w para cima //pegando o valor do jogador
	if (topo<=0) { // vai somar topo+10 pra o jogador não ultrapassar o limite subindo. tpo for menor ou igual a "0"
		
		$("#jogador").css("top",topo+10);
	} 
			
	}
			
	if (jogo.pressionou[TECLA.S]) { // para baixo ,com a div top para descer 10 unidades.
		//vid jogador descer 10
				
		var topo = parseInt($("#jogador").css("top"));
	$("#jogador").css("top",topo+10);	
	if (topo>=434) {  // 434  a posição q esta a nave, invesde somar vai subtrair e vai deixar preso no limite de baixo topo-10	. div maoir ou igual a 434 vai subtrair
		$("#jogador").css("top",topo-10);
			
	}
	
			}
			
	if (jogo.pressionou[TECLA.D]) {
				
				//Chama função Disparo	
				disparo();
			}
		
			} // fim da função movejogador()
		
	
		function moveinimigo1() {

		posicaoX = parseInt($("#inimigo1").css ("left"));//posição inimigo 1 posição left subtrair esse posição menos velocidade-5 
		$("#inimigo1").css("left",posicaoX-velocidade); //caminhar pela esquerda
		$("#inimigo1").css("top",posicaoY); //top posição
					
			if (posicaoX<=0) {
			posicaoY = parseInt(Math.random() * 334);
			$("#inimigo1").css("left",694);
			$("#inimigo1").css("top",posicaoY);
						
					}
			} //Fim da função moveinimigo1()
			
			

	function moveinimigo2() {
	posicaoX = parseInt($("#inimigo2").css("left"));
	$("#inimigo2").css("left",posicaoX-3);
	//inimigo2 subtrair posição "x q é variavel-3 caminhar 3 unidades para esquerda "
						
	if (posicaoX<=0) { //menor igual a 0, 
					
	$("#inimigo2").css("left",775); //reposicinoar o iminigo do lado diretio da div
							
				}
		} // Fim da função moveinimigo2()

	function moveamigo() {
	
		posicaoX = parseInt($("#amigo").css("left"));
		$("#amigo").css("left",posicaoX+1); 
						
		if (posicaoX>906) {
					
		$("#amigo").css("left",0);
							
		}
		
		} // fim da função moveamigo()

	
	function disparo() {
		somDisparo.play();
	
		if (podeAtirar==true) {
			
		podeAtirar=false;
		
		topo = parseInt($("#jogador").css("top"))
		posicaoX= parseInt($("#jogador").css("left"))
		tiroX = posicaoX + 190;
		topoTiro=topo+38;
		$("#fundoGame").append("<div id='disparo'></div");
		$("#disparo").css("top",topoTiro);
		$("#disparo").css("left",tiroX);
		
var tempoDisparo=window.setInterval(executaDisparo, 30);
		
} //Fecha podeAtirar
	 
 function executaDisparo() {
posicaoX = parseInt($("#disparo").css("left"));
$("#disparo").css("left",posicaoX+15); 
	
if (posicaoX>900) {
							
 window.clearInterval(tempoDisparo);
 tempoDisparo=null;
 $("#disparo").remove();
 podeAtirar=true;
						
 }
	} // Fecha executaDisparo()
	} // Fecha disparo()



	function colisao() {
	var colisao1 = ($("#jogador").collision($("#inimigo1")));
	var colisao2 = ($("#jogador").collision($("#inimigo2")));
	var colisao3 = ($("#disparo").collision($("#inimigo1")));
	var colisao4 = ($("#disparo").collision($("#inimigo2")));
	var colisao5 = ($("#jogador").collision($("#amigo")));
	var colisao6 = ($("#inimigo2").collision($("#amigo")));
	// jogador com o inimigo1
			
	if (colisao1.length>0) { //maior q 0 houve a colisão
		energiaAtual--;
		inimigo1X = parseInt($("#inimigo1").css("left"));
	inimigo1Y = parseInt($("#inimigo1").css("top"));
	explosao1(inimigo1X,inimigo1Y);


	posicaoY = parseInt(Math.random() * 334);
	$("#inimigo1").css("left",694);
	$("#inimigo1").css("top",posicaoY);
	}
		
    // jogador com o inimigo2 
    if (colisao2.length>0) { //houve a colisão
		energiaAtual--;
	inimigo2X = parseInt($("#inimigo2").css("left"));
	inimigo2Y = parseInt($("#inimigo2").css("top"));
	explosao2(inimigo2X,inimigo2Y); //enviado as duas variaveis
				
	$("#inimigo2").remove(); //apare depois de 2segundos
			
	reposicionaInimigo2();
			
		}	
 // Disparo com o inimigo1
		
 if (colisao3.length>0) {
	pontos=pontos+100; //numero de pontos no jogo na colisão	
	velocidade=velocidade+0.3; // o inimigo fica mas rapido no jogo quando dispara no inimigo
	inimigo1X = parseInt($("#inimigo1").css("left"));
	inimigo1Y = parseInt($("#inimigo1").css("top"));
		
	explosao1(inimigo1X,inimigo1Y);
	$("#disparo").css("left",950);
		
	posicaoY = parseInt(Math.random() * 334);
	$("#inimigo1").css("left",694); //reponsiciomando o disparo
	$("#inimigo1").css("top",posicaoY);
		
	}

// Disparo com o inimigo2
		
if (colisao4.length>0) {
	pontos=pontos+50; //colisão com inimigo	
	inimigo2X = parseInt($("#inimigo2").css("left"));
	inimigo2Y = parseInt($("#inimigo2").css("top"));
	$("#inimigo2").remove();

	explosao2(inimigo2X,inimigo2Y);
	$("#disparo").css("left",950);
	
	reposicionaInimigo2();
		
	}

	// jogador com o amigo
		
	if (colisao5.length>0) { //chamar a função reposção amigo
		salvos++; //
		somResgate.play();
		reposicionaAmigo(); //remover amigo da tela
		$("#amigo").remove();
		}
	//Inimigo2 com o amigo
		
if (colisao6.length>0) {
	  perdidos++;   //perdi vida 
	amigoX = parseInt($("#amigo").css("left")); //posição atual da div amigo
	amigoY = parseInt($("#amigo").css("top"));
	explosao3(amigoX,amigoY);
	$("#amigo").remove(); //remove quando esplodir
			
	reposicionaAmigo(); //reposiciona a amigo no jogo
			
	}
	



		} //Fim da função colisao()


//Explosão 1
function explosao1(inimigo1X,inimigo1Y) {
	somExplosao.play();
	$("#fundoGame").append("<div id='explosao1'></div");
	$("#explosao1").css("background-image", "url(img/explosao.png)");
	var div=$("#explosao1");                             //criau  a variavel para não ficar colando o  $ sempre
	div.css("top", inimigo1Y);                        //posição da explosão
	div.css("left", inimigo1X);                      //posição da explosão
	div.animate({width:200, opacity:0}, "slow");
	//tamanho da div , começa com 100 ate p 0 
	var tempoExplosao=window.setInterval(removeExplosao, 1000); // vai ser executa a explosão
	
		function removeExplosao() {
			
			div.remove(); //removendo a explosão
			window.clearInterval(tempoExplosao);
			tempoExplosao=null; // zerenado a explosão
			
		}
		
	} // Fim da função explosao1()


//Reposiciona Inimigo2
	
function reposicionaInimigo2() {
	
	var tempoColisao4=window.setInterval(reposiciona4, 5000); //tempo de colisão
	//reposiciona 4 (5segundo)
		
		function reposiciona4() { //vai ser executado apos 5 segundo
		window.clearInterval(tempoColisao4);
		tempoColisao4=null;
			
			if (fimdejogo==false) { // fim do jogo igual a falso
			
			$("#fundoGame").append("<div id=inimigo2></div"); //mensagem final do jogo
		
		}
		
		}	
	}	
//Explosão2
	
function explosao2(inimigo2X,inimigo2Y) {
	somExplosao.play();
	$("#fundoGame").append("<div id='explosao2'></div");
	$("#explosao2").css("background-image", "url(img/explosao.png)");
	var div2=$("#explosao2");
	div2.css("top", inimigo2Y);
	div2.css("left", inimigo2X);
	div2.animate({width:200, opacity:0}, "slow");
	
	var tempoExplosao2=window.setInterval(removeExplosao2, 1000);
	
		function removeExplosao2() {
			
			div2.remove();
			window.clearInterval(tempoExplosao2);
			tempoExplosao2=null;
			
		}
		
		
	} // Fim da função explosao2()
    

//Reposiciona Amigo
	
function reposicionaAmigo() {
	
	var tempoAmigo=window.setInterval(reposiciona6, 6000); //6s
	
		function reposiciona6() {
		window.clearInterval(tempoAmigo);
		tempoAmigo=null; //reposicionar o amigo
		
		if (fimdejogo==false) { //se o jogo n chegou ao fim
		
		$("#fundoGame").append("<div id='amigo' class='anima3'></div>");//recreiar o amigo de novo tela
		
		}
		
	}
	
} // Fim da função reposicionaAmigo()
	

//Explosão3
	
function explosao3(amigoX,amigoY) {
	somPerdido.play();//quadno o amigo expode
	$("#fundoGame").append("<div id='explosao3' class='anima4'></div");
	$("#explosao3").css("top",amigoY);
	$("#explosao3").css("left",amigoX);
	var tempoExplosao3=window.setInterval(resetaExplosao3, 1000);
	function resetaExplosao3() {
	$("#explosao3").remove();
	window.clearInterval(tempoExplosao3);
	tempoExplosao3=null;
			
	}
	
	} // Fim da função explosao3


	function placar() {
	
		$("#placar").html("<h2> Pontos: " + pontos + " Salvos: " + salvos + " Perdidos: " + perdidos + "</h2>");
		
	} //fim da função placar()



	function energia() {
	
		if (energiaAtual==3) { //sera exibito essa imagem 
			
			$("#energia").css("background-image", "url(img/energia3.png)");
		}
	
		if (energiaAtual==2) { //essa imagem
			
			$("#energia").css("background-image", "url(img/energia2.png)");
		}
	
		if (energiaAtual==1) {
			
			$("#energia").css("background-image", "url(img/energia1.png)");
		}
	
		if (energiaAtual==0) {
			
			$("#energia").css("background-image", "url(img/energia0.png)");
			
			//Game Over
			gameOver();
		}
	
	} // Fim da função energia()
	

//Função GAME OVER
function gameOver() {
	fimdejogo=true; 
	musica.pause();
	somGameover.play(); //pausar
	
	window.clearInterval(jogo.timer);
	jogo.timer=null;
	
	$("#jogador").remove();
	$("#inimigo1").remove();
	$("#inimigo2").remove();
	$("#amigo").remove();
	
	$("#fundoGame").append("<div id='fim'></div>");
	
	$("#fim").html("<h1> Game Over </h1><p>Sua pontuação foi: " + pontos + "</p>" + "<div id='reinicia' onClick=reiniciaJogo()><h3>Jogar Novamente</h3></div>");
	 // Fim da função gameOver();
 //fim do jogo
	} // Fim da função gameOver();


}// Fim da função start

	//Reinicia o Jogo
		
function reiniciaJogo() {
	somGameover.pause();
	$("#fim").remove();
	start();
	
} //Fim da função reiniciaJogo

		



	