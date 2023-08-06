																			//PNJ Games present
                                                                            
//*******************************************************-------------------- BLOCK BREAKERS -----------------------******************************************************************
                                                                            // Level 2
//****************************INITIALISATION******************************

window.onload = function () {
var canvas = document.getElementById('canvas1'); // Récup de l’objet canvas
var context = canvas.getContext('2d'); // Récup du context graphique du canvas

//**************************---DEFINITION DES VARIABLES---**********************************
var perso = {
    nom: "Vous",//nom.location.href="Projet.html",
    vies: 5,          // le nombre d'essais du joueur pour finir le niveau 
    score:0,         // score du joueur
    temps: 300,     // temps en secondes pour finir le niveau
};

var gradient;
	
var barre = {
    nom: "barre",                      // nom de l'objet
    largeur: 100,                      // largeur de la barre
    hauteur: 10,                       // hauteur de la barre
    positionX: canvas.width/2-50,      // abscisse de la barre
    positionY:canvas.height-80,       // ordonée de la barre
    couleur: gradient,                // couleur de la barre

};
	
var balle = {
    nom: "balle",                           // nom de l'objet
    couleur:gradient2,						// couleur de la balle
	rayon: 6,									// rayon de la balle
	x:barre.positionX+(barre.largeur/2),		// abscisse de la balle
	y:barre.positionY-6,				// ordonée de la balle
	m: barre.positionX+(barre.largeur/2),		// abscisse de la balle fictive
	n: barre.positionY-6,				// ordonée de la balle fictive
	vitesseX:2,                 //valeur d'augmentation de l'abscisse de la balle
	vitesseY:-2,				//valeur d'augmentation de l'ordonnée de la balle
}
var rayon=balle.rayon;
var x= balle.x;       
var y= balle.y;        
var m= balle.m;
var n= balle.n;
var vitesseX=balle.vitesseX;                 
var vitesseY=balle.vitesseY; 

var depl=5;

var nom=perso.nom;
var vies=perso.vies;
var score=perso.score;
var duree=perso.temps;

//-----------Chronmètres-----------
var chrvies=0; // de l'affichage du texte lors d'une perte de vie
var chrvies2=0;
var chrvies3=0;
var chrvies4=0;

var colonnes=16;
var lignes=3;
var blockLargeur = 30;
var blockHauteur = 10;
var blockEspace = 17;
var blockHaut = 60;
var blockGauche = 30;
var blocks=[];
var blocks2=[];

///////////////////////////////////
var droitePressée = false;
var gauchePressée = false;
var basPressée = false;
var hautPressée = false;

document.addEventListener("keydown", touchePress, false);
document.addEventListener("keyup", toucheRelache, false);

function touchePress(event) {
    if(event.keyCode == 39 || event.keyCode == 68) {
        droitePressée = true;
    }
    else if(event.keyCode == 37 || event.keyCode == 81) {
        gauchePressée = true;
    }
    else if(event.keyCode == 38 || event.keyCode == 90) {
        hautPressée = true;
    }
    else if(event.keyCode == 40 || event.keyCode == 83) {
        basPressée = true;
    }
}
function toucheRelache(event) {
    if(event.keyCode == 39 || event.keyCode == 68 ) {
        droitePressée = false;
    }
    else if(event.keyCode == 37 || event.keyCode == 81) {
        gauchePressée = false;
    }
    else if(event.keyCode == 38 || event.keyCode == 90) {
        hautPressée = false;
    }
    else if(event.keyCode == 40 || event.keyCode == 83) {
        basPressée = false;
    }
}
var espacePressée = false;
document.addEventListener("keydown", touchePressée, false);
function touchePressée(event) {
    if(event.keyCode == 32) {
        espacePressée = true;
    }
}
/////////////////////////   Création des propritétés des éléments    //////////////////////////////
for(i=0; i<lignes; i++) {
    blocks[i] = [];
    for(j=0; j<colonnes; j++) {
        blocks[i][j] = { x: 0, y: 0, état: 1,};
    }
}
for(k=0; k<lignes; k++) {
    blocks2[k] = [];
    for(l=0; l<colonnes; l++) {
        blocks2[k][l] = { x: 0, y: 0, état: 1,};
    }
}
    
function DessinerBlocs() {   
        
        for(i=0; i<lignes; i++) {
                for(j=0; j<colonnes; j++) { 
                    if (blocks[i][j].état == 1) {
                    var blockX = (j*(blockLargeur+blockEspace))+blockGauche;
                    var blockY = (i*(blockHauteur+blockEspace))+blockHaut;
                    blocks[i][j].x = blockX;
                    blocks[i][j].y = blockY;
                    context.beginPath();
                    context.rect(blockX, blockY, blockLargeur, blockHauteur);
                    context.fillStyle="rgb(0,200,0)";
                    context.fill();
                    context.closePath();
                    }
                }
        }
        for(k=0; k<lignes; k++) {
                for(l=0; l<colonnes; l++) { 
                    if (blocks2[k][l].état == 1) {
                    var blockX2 = (l*(blockLargeur+blockEspace))+blockGauche;
                    var blockY2 = (k*(blockHauteur+blockEspace))+blockHaut+200;
                    blocks2[k][l].x = blockX2;
                    blocks2[k][l].y = blockY2;
                    context.beginPath();
                    context.rect(blockX2, blockY2, blockLargeur, blockHauteur);
                    context.fillStyle="rgb(0,200,0)";
                    context.fill();
                    context.closePath();
                    }
                }
        }
    }
function Collision() {
        for(i=0; i<lignes; i++) {
        for(j=0; j<colonnes; j++) {
            var b = blocks[i][j];
            if(b.état == 1) {
                if(x+rayon >= b.x && x-rayon <= b.x+blockLargeur && y-rayon <= b.y+blockHauteur && y>= b.y || y+rayon == b.y && x+rayon >= b.x && x-rayon <= b.x+blockLargeur) {
                    vitesseY = -vitesseY;
                    b.état = 0;
                    var audio = document.createElement('audio');
                    audio.src = 'Mblock.wav';
                    audio.play();
                    score++;
                }
            }
        }
        }
        for(k=0; k<lignes; k++) {
        for(l=0; l<colonnes; l++) {
            var c = blocks2[k][l];
            if(c.état == 1) {
                if(x+rayon >= c.x && x-rayon <= c.x+blockLargeur && y-rayon <= c.y+blockHauteur && y>= c.y || y+rayon == c.y && x+rayon >= c.x && x-rayon <= c.x+blockLargeur) {
                    vitesseY = -vitesseY;
                    c.état = 0;
                    var audio = document.createElement('audio');
                    audio.src = 'Mblock.wav';
                    audio.play();
                    score++;
                }
            }
        }
        }
        if(score == 2*colonnes*lignes) {
            alert("Bravo, Level 2 réussi !");
            location.href="Level 3.html"; 
        }
    }
//******************************--------Début Création de la bordure-------**********************************   
var bordure=5;
    
var colonnes3=2;
var lignes3=15;
var blockLargeur3 = 15;
var blockHauteur3 = 41;
var blockEspaceX3 = 765;
var blockEspaceY3 = bordure;
var blockHaut3 = -43.5;
var blockGauche3 = 3;
var blocks3=[];

var colonnes4=16;
var lignes4=2;
var blockLargeur4 = 43;
var blockHauteur4 = 12;
var blockEspaceX4 = 4.75;
var blockEspaceY4 = 521;
var blockHaut4 = 2;
var blockGauche4 = 21;
var blocks4=[];

var CouleurBords= "white";
var CouleurRect= "grey";

for(i=0; i<lignes3; i++) {
    blocks3[i] = [];
    for(j=0; j<colonnes3; j++) {
           blocks3[i][j] = { x: 0, y: 0, état: 1, couleur: CouleurRect,};  // Crée une "matrice" contenant les valeurs des indices i et j des blocks la constituant (9x6).
    }
}
for(i=0; i<lignes4; i++) {
    blocks4[i] = [];
    for(j=0; j<colonnes4; j++) {
        blocks4[i][j] = { x: 0, y: 0, état: 1, couleur: CouleurRect,};  // Crée une "matrice" contenant les valeurs des indices i et j des blocks la constituant (9x6).
    }
}
function DessinerBordure() {         // Dessiner les blocks : chacun possède un indice le caractérisant --> va être indispendable pour les collisions

    for(i=0; i<lignes3; i++) {
        for(j=0; j<colonnes3; j++) { 
            if (blocks3[i][j].état == 1) {
            var blockX3 = (j*(blockLargeur3+blockEspaceX3))+blockGauche3;
            var blockY3 = (i*(blockHauteur3+blockEspaceY3))+blockHaut3;
            blocks3[i][j].x = blockX3;
            blocks3[i][j].y = blockY3;
            context.beginPath();
            context.lineWidth = bordure;
            context.strokeRect(blockX3, blockY3, blockLargeur3, blockHauteur3);
            context.strokeStyle =CouleurBords;
            context.rect(blockX3, blockY3, blockLargeur3, blockHauteur3);
            context.fillStyle=blocks3[i][j].couleur;
            context.fill();
            context.closePath();
            }
        }
    }
    for(i=0; i<lignes4; i++) {
        for(j=0; j<colonnes4; j++) { 
            if (blocks4[i][j].état == 1) {
            var blockX4 = (j*(blockLargeur4+blockEspaceX4))+blockGauche4;
            var blockY4 = (i*(blockHauteur4+blockEspaceY4))+blockHaut4;
            blocks4[i][j].x = blockX4;
            blocks4[i][j].y = blockY4;
            context.beginPath();
            context.lineWidth = bordure;
            context.strokeRect(blockX4, blockY4, blockLargeur4, blockHauteur4);
            context.strokeStyle =CouleurBords;
            context.rect(blockX4, blockY4, blockLargeur4, blockHauteur4);
            context.fillStyle=blocks2[i][j].couleur;
            context.fill();
            context.closePath();
            }
        }
    }
}
//***************************************--------Fin Création de la bordure-------*********************************
function temps() {
            var compteur=document.getElementById('compteur');
            var s=duree;
            var m=0;
            if(s<0) {
                 alert("GAME OVER");
                 location.href="Page GO.html";      
            }
            else {
                if(s>59) {
                    m=Math.floor(s/60);
                    s=s-m*60;
                }               
                else if(s<10){
                    s="0"+s;
                }
                else if(m<10) {
                    m="0"+m;
                }
                compteur.innerHTML="Temps: "+m+"m"+s+"s";
            }
            if (espacePressée) { 
                duree=duree-1;
				if (vies==4) {
                    chrvies +=1;
                }
                else if (vies==3) {
                    chrvies2 +=1;
                }
                else if (vies==2) {
                    chrvies3 +=1;
                }
                else if (vies==1) {
                    chrvies4 +=1;
                }
            }
            window.setTimeout(temps,1000);
        }
        temps();
    var gradient2;
    function DessinerGradient () {
        gradient = context.createLinearGradient(barre.positionX, barre.positionY, barre.positionX+barre.largeur,barre.positionY+barre.hauteur); // créer un gradient avec 4 valeurs: (position de départ en x, position de départ en y, position de fin en x , position de fin en y)
        gradient.addColorStop("0", "blue");
        gradient.addColorStop("0.1", "blue");
        gradient.addColorStop("0.2", "blue");
        gradient.addColorStop("0.5", "white");
        gradient.addColorStop("0.7", "red");
        gradient.addColorStop("0.8", "red");
        gradient.addColorStop("1", "red");

        gradient2 = context.createLinearGradient(x-rayon, y-rayon, x+rayon,y+rayon);
        gradient2.addColorStop("0", "rgb(0,10,50)");
        gradient2.addColorStop("0.5","blue" );
        gradient2.addColorStop("1", "cyan");
    }
    function DessinerBalle() {

        context.beginPath();
        context.lineWidth = 3;
        context.strokeStyle="red";
        context.arc(x,y,rayon,0, 2*Math.PI, true);
        context.stroke();
        context.closePath();
        context.beginPath();
        context.fillStyle = gradient2;
        context.arc(x,y,rayon,0, 2*Math.PI, true);    // Dessine la forme d'une balle (cercle rempli par .fillStyle)
        context.fill();
        context.closePath();
    }
    function lancer () {
        context.beginPath();
        context.lineWidth = 3;
        context.strokeStyle="red";
        context.arc(m,n,rayon,0, 2*Math.PI, true);
        context.stroke();
        context.closePath();
        context.beginPath();
        context.fillStyle = gradient2;
        context.arc(m,n,rayon,0, 2*Math.PI, true);    // Dessine la forme d'une balle (cercle rempli par .fillStyle)
        context.fill();
        context.closePath();
    }
    function DessinerBarre () {
        context.beginPath();
        context.fillStyle=gradient;
        context.fillRect(barre.positionX,barre.positionY,barre.largeur,barre.hauteur);
        context.closePath();
    }
    function DessinerLigne () {     // Création d'une ligne limitant le jeu en bas (design) 
        context.fillStyle="rgba(256,256,256,0.8)";
        context.fillRect(0,canvas.height-50,canvas.width,5);
    }
    function DessinerVies () {          // Dessiner le nombre de vie restantes
        context.font="22px Impact";
        context.fillStyle="cyan";
        context.fillText("Vies: "+vies,30,canvas.height-22);
    }
    function DessinerScore () {         //Dessiner le nombre block détruits
        context.font="22px Impact";
        context.fillStyle="cyan";
        context.fillText("Score: "+score,canvas.width-110,canvas.height-22);
    }
    function DessinerTemps() {          //Dessiner le temps restants
        context.font="22px Impact";
        context.fillStyle="cyan";
        context.fillText(compteur.innerHTML,canvas.width/2-80,canvas.height-22);
    }
    var D= canvas.width/2-80;  // Création d'une variable qui pourra ensuite être enlevée
    function DessinerTempsDépart() {
        context.font="22px Impact";
        context.fillStyle="cyan";
        context.fillText("Temps: 05m00s",D,canvas.height-22);
        context.font="40px Impact";
        context.fillStyle="gold";
        context.fillText("Appuyer sur ESPACE",D-80,canvas.height-150); // Tant que l'utilisateur n'appuie pas sur espace, le temps ne démarre pas
    }
    function DessinerNom() {
        context.font="25px Impact";
        context.fillStyle="cyan";
        context.fillText("Joueur: "+nom,30,45);
    }
    function DessinerLevel() {
        context.font="25px Impact";
        context.fillStyle="cyan";
        context.fillText("Level: 2",700,45);
    }
setInterval(dessine, 10);

//**********************--------Dessiner les éléments--------------***************************
function dessine() {
   
    context.clearRect(0, 0, canvas.width, canvas.height);
    DessinerBlocs();
    Collision();
    DessinerLigne();
    DessinerBarre();
    DessinerVies();
    DessinerScore();
    DessinerNom();
    DessinerLevel();
    lancer();
    DessinerTempsDépart();
    DessinerGradient();
    DessinerBordure();

//------------------------------------------------------------------------------------------------------------
     
    
//***************************************-------------------------CONDITIONS REGISSANT LE JEU---------------------------------*************************************
    
   
	   //*******************************--------Conditions de mise en mouvement des éléments-------************************************************

    if(x+vitesseX >= canvas.width-rayon-25 || x+ vitesseX <= rayon+25) {			// Si la balle touche les parois du canvas, elle part dans la direction opposée
        vitesseX *= -1;
    }
    if(y+vitesseY <= rayon+25) {
        vitesseY *= -1;
     }
    if(barre.positionY-5<=y+vitesseY && barre.positionY+5>=y+vitesseY && barre.positionX<=x+rayon) {		// Barre divisée en 3 secteurs avec différents angles de lancement
        if(barre.positionX+(barre.largeur/3)+1 <= x && barre.positionX+2*(barre.largeur/3)+1 >= x) {
            vitesseY *= -1;
        }
        else if(barre.positionX+(barre.largeur/3)+1 >= x && barre.positionX<= x && vitesseX>0 ) {
            vitesseY *= -1;
            vitesseX *= -1;
        }
        else if(barre.positionX+(barre.largeur/3)+1 >= x && barre.positionX<= x && vitesseX<0 ) {
            vitesseY *= -1;
        }
        else if(barre.positionX+2*(barre.largeur/3)+1 <= x && barre.positionX+barre.largeur >= x && vitesseX<0) {
            vitesseY *= -1;
            vitesseX *= -1;
        }
        else if(barre.positionX+2*(barre.largeur/3)+1 <= x && barre.positionX+barre.largeur >= x && vitesseX>0) {
            vitesseY *= -1;
        }
    }
	
	
	function AfficherVies() {
    context.font="23px Alien Encounters, verdana";
    context.fillStyle="green";
    context.fillText("- 1 Vie !",canvas.width-150,canvas.height-60);
}
//------A chaque perte de vie afficher -1 vie-------
    if (vies ==4 && chrvies <=3) {		// Affichage d'un avertissement annoncant la poerte de vie pendnat 3 secondes
            AfficherVies();
    }
    else if (vies == 3 && chrvies2 <=3) {
            AfficherVies();
    }
    else if (vies == 2 && chrvies3 <=3) {
            AfficherVies();
    }
    else if (vies == 1 && chrvies4 <=3) {
            AfficherVies();
    }
    else if (vies==0) {
        alert("GAME OVER :(");
        location.href="Page GO.html";
    }
    if (y>=canvas.height-50) { 		// Si la position en ordonée de la balle dépasse la limite inférieure du canvas, le joueur perd une vie et on lance le bruitage
            vies=vies-1;
            var life = document.createElement('audio');
                    life.src = 'MLife.wav';
                    life.play();
            if (espacePressée) {  		// On relance la balle
                x= barre.positionX+(barre.largeur/2);
                y=barre.positionY-10;
            }
    }
    if (espacePressée) {
        
        if(y<=canvas.height-50 ) {		// Si la position de l'ordonée de la balle est dans la zone de jeu, 
            DessinerBalle();		// On dessine la balle la trainée et le temps
            DessinerTemps();
            m="none";		// La variable définissant la position m de la balle fictive avant le lancer ne servant plus, elle cesse d'exister
            D="none";

            x += vitesseX;
            y += vitesseY;
            
            if(droitePressée && barre.positionX < canvas.width-barre.largeur-21) {		// Appliquer le déplacement de la barre lors de l'appuie sur la touche droite ou gauche
                barre.positionX += depl;
            }
            else if(gauchePressée && barre.positionX > 21) {
                barre.positionX -= depl;
            }
            else if(hautPressée && barre.positionY > 20+3*rayon) {
                barre.positionY -=depl;
            }
            else if(basPressée && barre.positionY+barre.hauteur  < canvas.height-52) {
                barre.positionY +=depl;
            }
        }
    }
    else {
        if(droitePressée && barre.positionX < canvas.width-barre.largeur-21) {		// Sinon, si la flèche droite est préssée, la barre se déplace vers la droite de la valeur de depl (déplacement)
            barre.positionX += depl;
            x= barre.positionX+(barre.largeur/2);		// La balle partira de la position choisie par le joueur de la barre (en partant du milieu)
            m= barre.positionX+(barre.largeur/2);		// La "balle" fictive" au moment "post-lancer" suit la position de la barre (mais ne partira pas vraiment lors que l'on appuiera sur espace)
        }
        else if(gauchePressée && barre.positionX > 21) {		// Voir avant
            barre.positionX -= depl;
            x= barre.positionX+(barre.largeur/2);
            m= barre.positionX+(barre.largeur/2);
        }
        else if(hautPressée && barre.positionY > canvas.height-200) {		// Ver antes
            barre.positionY -=depl;
            y= barre.positionY-rayon;
            n= barre.positionY-rayon;
        }
        else if(basPressée && barre.positionY+barre.hauteur <= canvas.height-55) {		// See above
            barre.positionY +=depl;
            y= barre.positionY-rayon;
            n= barre.positionY-rayon;
        }
  }
} 
}

//*******************************************************************----FIN DU LEVEL 2----****************************************************************************************