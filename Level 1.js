                                                                            //PNJ Games present
                                                                            
//*******************************************************-------------------- BLOCK BREAKERS -----------------------******************************************************************
                                                                            // Level 1
																			
//*************************************---INITIALISATION---***********************************

if (confirm("Bienvenue, voulez-vous jouer ?")) {
	alert("Bienvenue dans Block Breaker. Pour une meilleure expérience de jeu, il est préférable d'utiliser le navigateur Mozilla Firefox. Nous vous souhaitons d'agréables parties !")
window.onload = function () {
var canvas = document.getElementById('canvas1'); 	// Récup de l’objet canvas
var context = canvas.getContext('2d'); 				// Récup du context graphique du canvas

var perso = {                           // Initialisation  des données de l'utilisateur et des données liées au niveau
    nom: prompt("Comment vous appellez-vous ? "),  // nom du joueur à saisir
    vies: 3,          				// le nombre d'essais du joueur pour finir le niveau 
    score:0,         				// score du joueur
    temps: 180,     				// temps en secondes pour finir le niveau
};

//**************************---DEFINITION DES VARIABLES---**********************************

// ----------Barre----------
var gradient; // gradient pour la barre
var barre = {
    nom: "barre",                      // nom de l'objet
    largeur: 100,                      // largeur de la barre
    hauteur: 10,                       // hauteur de la barre
    positionX: canvas.width/2-50,      // abscisse de la barre
    positionY:canvas.height-80,       // ordonée de la barre
    couleur: gradient,                // couleur de la barre
};
// ----------Balle----------
var gradient2;  // pour la couleur de la balle
var balle = {
    couleur:gradient2,                     // couleur de la balle
    rayon: 6,                                   // rayon de la balle
    x:barre.positionX+(barre.largeur/2),        // abscisse de la balle
    y:barre.positionY-6,                // ordonée de la balle
    m: barre.positionX+(barre.largeur/2),       // abscisse de la balle fictive (pour le départ)
    n: barre.positionY-6,               // ordonée de la balle fictive
    vitesseX:2,                 //valeur d'augmentation de l'abscisse de la balle
    vitesseY:-2,                //valeur d'augmentation de l'ordonnée de la balle
}
//------Raccourcissement des variables------
var rayon=balle.rayon;
var x= balle.x;       
var y= balle.y;        
var m= balle.m;
var n= balle.n;
var vitesseX=balle.vitesseX;                 
var vitesseY=balle.vitesseY;
var orientationX=1;
var orientationY=1;
    
//----------Blocks----------
var colonnes=12;        // nombre de blocks en abscisse
var lignes=6;           // nombre de blocks en ordonée
var blocLargeur = 50;  // largeur des blocks
var blocHauteur = 15;  // hauteur des blocks
var blocEspace = 12;   // espace entre chaque block
var blocHaut = 60;     // début de création des blocks en ordonée
var blocGauche = 32;   // début de création des blocks en abscisse
var blocs=[];          // création d'une liste pour tous les blocks

//--------Utilisateur--------
var nom=perso.nom;      // Intègrer les données rentrées  par l'utilisateur dans des variables qui seront affichées sur l'interface de jeu.
var vies=perso.vies;
var score=perso.score;
var duree=perso.temps;

//-------Chronomètres--------

var chr=0;           // création d'un chronomètre pour l'affichage d'un bonus
var chr2=0;         // création d'un deuxième chronomètre pour un deuxième bonus
var chr3=0;
var chrvies=0;
var chrvies2=0;
var contact=0;
//----------Intéractions avec le jeu----------
var depl=6;    // valeur de déplacement de la barre
var pause=0;   // valeur pour laquelle le menu pause n'est pas activé
var InfoEspace=canvas.width/2-160; // Afficher appuyer sur ESPACE

// *****--Paramétrage des évènements concernant la barre--*****

var droitePressée = false;      // Tout les variables correspondantes aux flèches sont dans un premier temps définies sur false puisque qu'aucun évènement à eu lieu.
var gauchePressée = false;
var basPressée = false;
var hautPressée = false;

// *****--Paramétrage des évènements concernant la manipulation du jeu--*****

var pausePressée = false;   // variable pour créer un menu pause
var espacePressée = false;  //variable pour un démarrage du jeu quand le joueur le désire


document.addEventListener("keydown", touchePress, false);       // Evènement : si l'utilisateur appuie sur une touche
document.addEventListener("keyup", toucheRelache, false);       // Evènement : si l'utilisateur relache une touche

function touchePress(event) {
    if(event.keyCode == 39 || event.keyCode == 68) {        // Si il appuie sur la flèche droite ou la touche "D", la variable droitePressée devient vraie (utilisée plus tard pour que l'évènement corresponde au déplacement)
        droitePressée = true;
    }
    else if(event.keyCode == 37 || event.keyCode == 81) {      // De même avec la flèche gauche et la touche "Q"
        gauchePressée = true;
    }
    else if(event.keyCode == 38 || event.keyCode == 90) {   // De même avec la flèche du haut et la touche "Z"
        hautPressée = true;
    }
    else if(event.keyCode == 40 || event.keyCode == 83) {   // De même avec la flèche du bas et la touche "S"
        basPressée = true;
    }
    else if(event.keyCode == 80) {      // De même avec la touche "P"
        pausePressée = true;
    }
    else if(event.keyCode == 32) {          // De même pour la touche "espace"
        espacePressée = true;
    }
}

function toucheRelache(event) {
    if(event.keyCode == 39 || event.keyCode == 68 ) {     // Si on relache la flèche droite ou la touche "D", la variable droitePressée redevient fause (utilisée plus tard pour que l'évènement corresponde au déplacement: dans ce cas, il n'y en aura pas donc la barre ne bougera plus)
        droitePressée = false;
    }
    else if(event.keyCode == 37 || event.keyCode == 81) {  // De même avec la flèche gauche et la touche "Q"
        gauchePressée = false;
    }
    else if(event.keyCode == 38 || event.keyCode == 90) {   // De même avec la flèche du haut et la touche "Z"
        hautPressée = false;
    }
    else if(event.keyCode == 40 || event.keyCode == 83) {   // De même avec la flèche du bas et la touche "S"
        basPressée = false;
    }
    else if(event.keyCode == 80) {      // De même avec la touche "P"
        pausePressée = false;
    }
}
//**********************************************--------CREATION DES PROPRIETES DES ELEMENTS-------************************************************
for(i=0; i<lignes; i++) {
  blocs[i] = [];
    for(j=0; j<colonnes; j++) {
           blocs[i][j] = { x: 0, y: 0, état: 1, couleur: "#6600FF",};  // Crée une "matrice" contenant les valeurs des indices i et j des blocks la constituant (9x6).
    }
}
    function DessinerBlocs() {         // Dessiner les blocks : chacun possède un indice le caractérisant --> va être indispendable pour les collisions

        for(i=0; i<lignes; i++) {
                for(j=0; j<colonnes; j++) { 
                    if (blocs[i][j].état == 1) {
                    var blocX = (j*(blocLargeur+blocEspace))+blocGauche;
                    var blocY = (i*(blocHauteur+blocEspace))+blocHaut;
                    blocs[i][j].x = blocX;
                    blocs[i][j].y = blocY;
                    context.beginPath();
                    context.rect(blocX, blocY, blocLargeur, blocHauteur);
                    context.fillStyle=blocs[i][j].couleur;
                    context.fill();
                    context.closePath();
                    blocs[3][2].couleur="yellow"; // le block abritant un bonus est d'une couleur différente (jaune)
                    blocs[3][9].couleur="yellow"; // de même
                    }
                }
        }
    }                                       
                    
function Collision() {
        for(i=0; i<lignes; i++) {
        for(j=0; j<colonnes; j++) {
            var b = blocs[i][j];                                       //Simplification d'écriture de la variable. b correspondant à un block spécfique d'indice i et j.
            if(b.état == 2 || b.état == 1) {                                           // Si ce block "existe" (est représenté, dessiné)
                if(x+rayon >= b.x && x-rayon <= b.x+blocLargeur && y-rayon <= b.y+blocHauteur && y>= b.y || y+rayon == b.y && x+rayon >= b.x && x-rayon <= b.x+blocLargeur) {            //Si la position de l'abscisse de la balle est supérieure à celle du block (tout juste inférieur pour qu'elle rebondisse) et si son ordonnée est supérieur à celle du block (tout juste inférieure pour qu'elle ne "s'enfonce pas dans le block"), alors : 
                    vitesseY = -vitesseY;                               //Sa trajectoire s'inverse (elle rebondit)
                    T2 *=-1; 
					orientationY *=-1;                                  // Valeur pour le menu pause
                    blocs[i][j].couleur="white";
                    b.état -=1;                                          // Le block pert une couche
                    var audio = document.createElement('audio');
                    audio.src = 'Mblock.wav';
                    audio.play(); 
                    if (b.état == 0) {                                       
                        score++;                                            // Le score augmente d'un point
                    }
                    if(score == 72) {                      // Si le score a atteint le nombre total de block, alors
                        alert("Bravo, Level 1 réussi !");               // Une popup alerte s'afiche pour annoncer que le niveau est réussi
                        location.href="Level 2.html";                   // Le joueur est dirigé vers une nouvelle page html contenant le niveau 2
                    }
                }
                                                           
             }
        }
            
   }         
 }
//******************************--------Début Création de la bordure-------**********************************
var bordure=5;

var colonnes2=16;
var lignes2=2;
var blocLargeur2 = 43;
var blocHauteur2 = 12;
var blocEspaceX2 = 4.75;
var blocEspaceY2 = 521;
var blocHaut2 = 2;
var blocGauche2 = 21;
var blocs2=[];    

var colonnes3=2;
var lignes3=15;
var blocLargeur3 = 15;
var blocHauteur3 = 41;
var blocEspaceX3 = 765;
var blocEspaceY3 = bordure;
var blocHaut3 = -42.5;
var blocGauche3 = 3;
var blocs3=[];

var CouleurBords= "white";
var CouleurRect= "grey";


for(i=0; i<lignes3; i++) {
  blocs3[i] = [];
    for(j=0; j<colonnes3; j++) {
           blocs3[i][j] = { x: 0, y: 0, état: 1, couleur: CouleurRect,};  // Crée une "matrice" contenant les valeurs des indices i et j des blocks la constituant (9x6).
    }
}
for(i=0; i<lignes2; i++) {
  blocs2[i] = [];
    for(j=0; j<colonnes2; j++) {
           blocs2[i][j] = { x: 0, y: 0, état: 1, couleur: CouleurRect,};  // Crée une "matrice" contenant les valeurs des indices i et j des blocks la constituant (9x6).
    }
}
    function DessinerBordure() {         // Dessiner les blocks : chacun possède un indice le caractérisant --> va être indispendable pour les collisions

        for(i=0; i<lignes3; i++) {
                for(j=0; j<colonnes3; j++) { 
                    if (blocs3[i][j].état == 1) {
                    var blocX3 = (j*(blocLargeur3+blocEspaceX3))+blocGauche3;
                    var blocY3 = (i*(blocHauteur3+blocEspaceY3))+blocHaut3;
                    blocs3[i][j].x = blocX3;
                    blocs3[i][j].y = blocY3;
                    context.beginPath();
                    context.lineWidth = bordure;
                    context.strokeRect(blocX3, blocY3, blocLargeur3, blocHauteur3);
                    context.strokeStyle =CouleurBords;
                    context.rect(blocX3, blocY3, blocLargeur3, blocHauteur3);
                    context.fillStyle=blocs3[i][j].couleur;
                    context.fill();
                    context.closePath();
                    }
                }
        }
        for(i=0; i<lignes2; i++) {
            for(j=0; j<colonnes2; j++) { 
                if (blocs2[i][j].état == 1) {
                    var blocX2 = (j*(blocLargeur2+blocEspaceX2))+blocGauche2;
                    var blocY2 = (i*(blocHauteur2+blocEspaceY2))+blocHaut2;
                    blocs2[i][j].x = blocX2;
                    blocs2[i][j].y = blocY2;
                    context.beginPath();
                    context.lineWidth = bordure;
                    context.strokeRect(blocX2, blocY2, blocLargeur2, blocHauteur2);
                    context.strokeStyle =CouleurBords;
                    context.rect(blocX2, blocY2, blocLargeur2, blocHauteur2);
                    context.fillStyle=blocs2[i][j].couleur;
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
            if(s<0) {                       // Si le temps est écoulé, le joueur perd et est dirigé vers la page de fin.
                 alert("GAME OVER");
                 location.href="Page GO.html";      
            }
            else {
                if(s>59) {
                    m=Math.floor(s/60);     // m est la partie entière (par 60) des secondes s écoulées. Elle repésente les minutes écoulées.
                    s=s-m*60;
                }               
                if(s<10){       //  pour qu'il ne reste plus que des secondes.
                    s="0"+s;
                }
                if(m<10) {
                    m="0"+m;
                }
                compteur.innerHTML="Temps: "+m+"m"+s+"s";
            }
            if (espacePressée) {
                if (pause>0 && pause<2) {
                    duree=duree;
                }
                else {
                    duree=duree-1;
                    blocHaut++;
                    if (blocs[3][2].état == 0) {				// Déclanchement des chronos lors de conditions bien précises (perte de vie ou collision)
                        chr=chr+1;
                    }
                    if (blocs[4][7].état == 0) {
                        chr2=chr2+1;
                    }
                    if (contact==1) {
                        chr3=chr3+1;
                    }
                    if (vies==2) {
                        chrvies +=1;
                    }
                    if (vies==1) {
                        chrvies2 +=1;
					}		
                }
            }
            window.setTimeout(temps,1000);  // Temps au bout duquel, la fonction temps est modifiée (toutes les secondes car définit en ms).
        }
        temps();
		
 		//***********************************************************----DESSINER LES ELEMENTS---**************************************
	
//*********---Dessiner les gradients---***********************************       
    var gradient;
    var gradient2;
    var gradient3;
    var gradient4;
    function DessinerGradient () {
        gradient = context.createLinearGradient(barre.positionX, barre.positionY, barre.positionX+barre.largeur,barre.positionY+barre.hauteur); // créer un gradient avec 4 valeurs: (position de départ en x, position de départ en y, position de fin en x , position de fin en y)
        //gradient.addColorStop("0", "purple");
        gradient.addColorStop("0", "#000099");
        gradient.addColorStop("0.1", "#0033CC");
        gradient.addColorStop("0.2", "#0066FF");
        gradient.addColorStop("0.3", "#00CCFF");
        gradient.addColorStop("0.4", "#CC00FF");
        gradient.addColorStop("0.5", "purple");
        //gradient.addColorStop("0.8", "orange");
        gradient.addColorStop("0.6", "#CC00FF");
        gradient.addColorStop("0.7", "#FF9900");
        gradient.addColorStop("0.8", "#FF6600");
        gradient.addColorStop("0.9", "#FF3300");
        gradient.addColorStop("1", "#FF0000");

        gradient2 = context.createLinearGradient(x-rayon,y-rayon,x+rayon,y+rayon);
        gradient2.addColorStop("0", "darkred");
        gradient2.addColorStop("0.2", "rgb(200,10,10)");
        gradient2.addColorStop("0.5","rgb(250,80,80)" );
        gradient2.addColorStop("0.6", "orange");
        gradient2.addColorStop("0.8", "gold");
        gradient2.addColorStop("1", "yellow");

        gradient3 = context.createLinearGradient(canvas.width/2-130,canvas.height-200,canvas.width/2+150,canvas.height-200);
        gradient3.addColorStop("0", "red");
        gradient3.addColorStop("0.2", "orange");
        gradient3.addColorStop("0.4", "yellow");
        gradient3.addColorStop("0.5", "red");
        gradient3.addColorStop("0.6", "red");
        gradient3.addColorStop("0.7", "yellow");
        gradient3.addColorStop("0.8", "orange");
        gradient3.addColorStop("1", "red");

        gradient4 = context.createLinearGradient((canvas.width/2)-50,canvas.height-150,(canvas.width/2)+80,canvas.height-150);
        gradient4.addColorStop("0", "white");
        gradient4.addColorStop("0.1", "gold");
        gradient4.addColorStop("0.2", "white");
        gradient4.addColorStop("0.4", "gold");
        gradient4.addColorStop("0.6", "white");
        gradient4.addColorStop("0.7", "gold");
        gradient4.addColorStop("0.8", "white");
        gradient4.addColorStop("0.9", "gold");
        gradient4.addColorStop("1", "white");
    }
	
//---------------------------------------------------------------------------------------------------------------

    function DessinerBalle() {
        context.fillStyle = "rgba(255,255,255,1)";
        context.lineWidth = 5;
        context.beginPath();
        context.arc(x,y,rayon,0, 2*Math.PI, true);    // Dessine la forme d'une balle (cercle rempli par .fillStyle)
        context.fill();
    }
    var T2=5;
    var T1=5;
    function DessinerTrainee() {
        for(i=1;i<5;i++){
            var opacité=1-(i/5);				//Créer plusieurs balles accollées dont l'opacité augmente progressivement (compteur i)
            context.beginPath();
            context.fillStyle = "rgba(255,255,255,"+opacité+")";
            context.lineWidth = 3;
            context.arc(x-T1*i,y+T2*i,rayon,0, 2*Math.PI, true);
            context.strokeStyle="rgba(0,0,0,0.3)";
            context.stroke();
            context.arc(x-T1*i,y+T2*i,rayon,0, 2*Math.PI, true);   // Dessine la forme d'une balle de rayon 5 (cercle rempli par .fillStyle)
            context.fill();
        }
    }
    function DessinerBarre () {     // Dessiner une barre remplie par gradient et gérées par des variables
        context.beginPath();
        context.fillStyle=gradient;
        context.fillRect(barre.positionX,barre.positionY,barre.largeur,barre.hauteur);
        context.closePath();
    }
    function DessinerLigne () {     // Création d'une ligne limitant le jeu en bas (design) 
        context.fillStyle="rgba(256,256,256,0.8)";
        context.fillRect(0,canvas.height-55,canvas.width,5);
    }
    function DessinerVies () {          // Dessiner le nombre de vie restantes
        context.font="22px Impact";
        context.fillStyle="orange";
        context.fillText("Vies: "+vies,30,canvas.height-25);
    }
    function DessinerScore () {         //Dessiner le nombre de block détruits
        context.font="22px Impact";
        context.fillStyle="orange";
        context.fillText("Score: "+score,canvas.width-110,canvas.height-25);
    }
    function DessinerTemps() {          //Dessiner le temps restant
        context.font="22px Impact";
        context.fillStyle="orange";
        context.fillText(compteur.innerHTML,canvas.width/2-80,canvas.height-25);
    }
    function DessinerInfo() {
        context.font="22px Impact";
        context.fillStyle="orange";
        context.font="40px Impact";
        context.fillStyle=gradient3;
        context.fillText("Appuyer sur ESPACE",InfoEspace,canvas.height-200); // Tant que l'utilisateur n'appuie pas sur espace, le temps ne démarre pas
    }
    function DessinerNom() {
        context.font="25px Impact";
        context.fillStyle="orange";
        context.fillText("Joueur: "+nom,30,45);
    }
    function DessinerLevel() {
        context.font="25px Impact";
        context.fillStyle="orange";
        context.fillText("Level: 1",canvas.width-100,45);
    }
    function DessinerPause(){
        context.fillStyle="rgba(0,0,0,0.5)";
        context.fillRect(0,0,canvas.width,canvas.height);
        context.font="100px Impact";
        context.fillStyle="orange";
        context.fillText("PAUSE",canvas.width/2-120,canvas.height/2+50);
    }

//------Contexte de lancement-------
var bx="none";
var by=blocs[3][2].y+150;
var cx="none";
var cy=blocs[3][9].y+150;
var vby=1;    // vitesse du bonus

function bonus() {
    context.fillStyle = "orange";
    context.lineWidth = 5;
    context.beginPath();
    context.arc(bx,by,7,0, 2*Math.PI, true);		// Créer des balles "bonus" que le joueur devra récuperer avec la barre 
    context.arc(cx,cy,7,0, 2*Math.PI, true);
    context.fill();
}    
//********************----Obstacles---**********************************

function DessinerObstacles() {			// Afficher le texte "bonus"
    if (blocs[3][2].état == 0) {		// Si le block est touché
        if(chr<=3) {					// Si le chronométre correspondant est inférieur à 3 secondes 
            context.font="15px verdana";
            context.fillStyle="orange";
            context.fillText("Bonus",blocs[3][2].x,blocs[3][2].y+15);
        }
        bx=blocs[3][2].x+20;		// Afficher le texte à la position du block touché mais un peu décalé par rapport à son abscisse
    }
    if (blocs[3][9].état == 0) {
        if(chr2<=3) {
            context.font="15px verdana";
            context.fillStyle="orange";
            context.fillText("Bonus",blocs[3][9].x,blocs[3][9].y+15);
        }
        cx=blocs[3][9].x+20;
    }
    var h=6;
        if(duree<150 && duree>140) {                                                        // abscisse de la ligne
        var p=(canvas.height/2);                                                // ordonnée de la ligne                                                          // espace entre chaque block
        if(y<=p+h && y+vitesseY>=p) {
            vitesseY *= -1;
            T2 *=-1;
        }
        barre.largeur=100;
        context.beginPath();
        context.fillStyle="orange";
        context.fillRect(0,p,canvas.width,h);
        context.closePath();
        context.font="35px Calibri";
        context.fillStyle=gradient4;
        context.fillText("Obstacle 3",(canvas.width/2)-50,canvas.height-150);
        context.fillText("Ligne indestructible !",(canvas.width/2)-150,canvas.height-120);
    }
    else if(duree<170 && duree>167) {		// Sinon, la "barre obstacle" redevient pleine et ses valeurs d'ordonées et d'ordonées prennent la valeur de celle de la barre controlée par le joueur : ce dernier ne voit donc plus la barre.
        context.beginPath();
        context.rect(0, barre.positionY, canvas.width, barre.hauteur);
        context.fillStyle="orange";
        context.fill();
        context.closePath();
        context.font="35px Calibri";
        context.fillStyle=gradient4;
        context.fillText("Obstacle 1",(canvas.width/2)-50,canvas.height-150);
        context.fillText("Et hop, on voit plus rien!",(canvas.width/2)-150,canvas.height-120);
    }
    else if (duree<160 && duree>155) {			// Sinon, si compris entre telle et telle durée, la largeur de la barre est raccourcie et prend la valeur 60.
        barre.largeur=60;
        context.font="35px Calibri";
        context.fillStyle=gradient4;
        context.fillText("Obstacle 2",(canvas.width/2)-50,canvas.height-150);
        context.fillText("Rétrécissement",(canvas.width/2)-80,canvas.height-120);
    }
   else if (duree<145 && duree>135){          // Ralenti le mouvement de la barre
        depl = 3;
        context.font="35px Calibri";
        context.fillStyle=gradient4;
        context.fillText("Obstacle 4",(canvas.width/2)-50,canvas.height-150);
        context.fillText("Ralentissement",(canvas.width/2)-80,canvas.height-120);
   }
   else if (duree<120 && duree>105){          // Ralenti le mouvement de la barre
        depl = 11;
        context.font="35px Calibri";
        context.fillStyle=gradient4;
        context.fillText("Obstacle 5",(canvas.width/2)-50,canvas.height-150);
        context.fillText("Accélération",(canvas.width/2)-80,canvas.height-120);
   }
    else if (duree<11 && duree>=0) {				// Créer un décompte pour les 10 dernière secondes en afficant "durée"
        context.font="50px Calibri";
        context.fillStyle="red";
        context.fillText(duree,(canvas.width/2),canvas.height-150);
    }
    else if (duree<0) {		// Afficher "Perdu !" si le temps est écoulé.
        context.font="50px Calibri";
        context.fillStyle="red";
        context.fillText("Perdu",(canvas.width/2)-30,canvas.height-150);
    }
    else {			// Pour tout autre instant, les variables p "n'existe" pas.
        p="none";
        depl=5;         // on remet le déplacement à 5
    }
}

//-----------------------------------------------------------
function Pause() {		// Dessiner le menu pause si le joueur appuie sur la touche P
    if(pausePressée){
        pause=pause+1;
    }
    if(pause==1){			// Si la touche est préssée; les vitesses, trainées, obstacle et déplacement de la barre s'arrête; Pause s'affiche
        vitesseX=0;
        vitesseY=0;
        T1=0;
        T2=0;
        vby=0;
        DessinerPause();
        depl=0;
    }
    if (pause==2){		//Si le joueur rappuie sur P, tout redevient normal et la valeur de pause est 0 pour ne pas qu'elle augmente à l'infini (et qu'elle reprenne la valeur 1 si le joueur appuie de nouveau)
        depl=3;
        pause=0;
        vby=1;
        if(orientationX>0 && orientationY>0){    // orientation balle nord-est
            T1=5;
            T2=5;
            vitesseX=orientationX*3;
            vitesseY=-orientationY*3;
        }
        if(orientationX<0 && orientationY<0){   // orientation balle sud-ouest
            T1=-5;
            T2=-5;
            vitesseX=orientationX*3;
            vitesseY=-orientationY*3;
        }
        if(orientationX<0 && orientationY>0){   // orientation balle nord-ouest
            T1=-5;
            T2=5;
            vitesseX=orientationX*3;
            vitesseY=-orientationY*3;
        }
        if(orientationX>0 && orientationY<0){   // orientation balle sud-est
            T1=5;
            T2=-5;
            vitesseX=orientationX*3;
            vitesseY=-orientationY*3;
        }

    }
}
setInterval(dessine, 10);

//****************--------Dessiner les éléments--------------***************************
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
    DessinerGradient();
    DessinerObstacles();
    bonus();
    Pause();
    DessinerBordure();
    DessinerTemps();
    DessinerBalle();
    DessinerInfo();

//********************************-----------------Conditions de réalisation des obstacles ------------------*************************************
	function SonVies() {
        var life = document.createElement('audio');
            life.src = 'MLife.wav';
            life.play();
    }
     
    if(blocs[3][2].état == 0) {		 // Si le block est touché par la balle
        if (by>500) {				// Si le bonus depasse la limite inférieure du canvas, il "n'existe plus".
            by="none";
        }
        if (by==barre.positionY && barre.positionX<=bx && barre.positionX+barre.largeur>=bx) {		// Si le bonus touche la barre, celle ci augment sa largeur de 20 et le bonus ne servant plus, cesse d'exister
            barre.largeur+=20;
            by="none";
        }
        else {
            by+=vby;		// Sinon, la valeur d'ordonée du bonus s'agrémente de sa vitesse
        }
    }
    if(blocs[3][9].état == 0) {		// Voir avant(même principe avec d'autres variables)
        if (cy>500) {
            cy="none";
        }
        if (cy==barre.positionY && barre.positionX<=cx && barre.positionX+barre.largeur>=cx) {
            vies +=1;
            cy="none";
            contact=1;
        }
        else {
            cy+=vby;
        }
        if(chr3<=3 && chr3 >= 1) {				// Chronomètre pour afficher +1 vie !
                context.font="30px Alien Encounters, verdana";
                context.fillStyle="green";
                context.fillText("+1 Vie !",canvas.width-150,canvas.height-100);
        }
    }
    
//******************--------Conditions de l'activation du menu pause-------**************************
    
    //*******************************--------Conditions de mise en mouvement des éléments-------************************************************
    if(x+vitesseX >= canvas.width-rayon-25 || x+ vitesseX <= rayon+25) {			// Si la balle touche les parois du canvas, elle part dans la direction opposée
        vitesseX *= -1;
        T1 *=-1;				//La trainée change de sens
        orientationX *=-1;
    }
    if(y+vitesseY <= rayon+25) {			//Pareil avec la compaosante y
        vitesseY *= -1;
        T2 *=-1;
        orientationY *=-1;
     }
    if(barre.positionY-5<=y+vitesseY && barre.positionY>=y+vitesseY && barre.positionX<=x+rayon) {			// Barre divisée en 3 secteurs avec différents angles de lancement
        if(barre.positionX+(barre.largeur/3)+1 <= x && barre.positionX+2*(barre.largeur/3)+1 >= x) {
            vitesseY *= -1;
            T2 *=-1;
            orientationY *=-1;
        }
        else if(barre.positionX+(barre.largeur/3)+1 >= x && barre.positionX<= x && vitesseX>0 ) {
            vitesseY *= -1;
            vitesseX *= -1;
            vitesseX += -0.1;
            T1 *=-1;
            T2 *=-1;
            orientationY *=-1;
            orientationX *=-1;
        }
        else if(barre.positionX+(barre.largeur/3)+1 >= x && barre.positionX<= x && vitesseX<0 ) {
            vitesseY *= -1;
            T2 *=-1;
            orientationY *=-1;
        }
        else if(barre.positionX+2*(barre.largeur/3)+1 <= x && barre.positionX+barre.largeur >= x && vitesseX<0) {
            vitesseY *= -1;
            vitesseX *= -1;
            vitesseX += 0.1;
            T1 *=-1;
            T2 *=-1;
            orientationY *=-1;
            orientationX *=-1;
        }
        else if(barre.positionX+2*(barre.largeur/3)+1 <= x && barre.positionX+barre.largeur >= x && vitesseX>0) {
            vitesseY *= -1;
            T2 *=-1;
            orientationY *=-1;
        }
    }
function AfficherVies() {
    context.font="23px Alien Encounters, verdana";
    context.fillStyle="green";
    context.fillText("- 1 Vie !",canvas.width-150,canvas.height-60);
}
//------A chaque perte de vie afficher -1 vie-------

    if (vies == 2 && chrvies<=3) {
            AfficherVies();
    }
    if (vies == 1 && chrvies2 <=3) {		// Affichage d'un avertissement annoncant la poerte de vie pendnat 3 secondes
            AfficherVies();
    }
    if (y>=canvas.height-50) {		// Si la position en ordonée de la balle dépasse la limite inférieure du canvas, le joueur perd une vie et on lance le bruitage
            vies=vies-1;
            SonVies();
            if (vies<=0) {
                location.href="Page GO.html";       // Si toutes les vies sont épuisées, le joueur perd et est dirigé vers la page "Game Over" (GO)
            }
            if (espacePressée) {		// On relance la balle
                x= barre.positionX+(barre.largeur/2);
                y=barre.positionY-10;
                T1 *=1;
                T2 *=1;
            }
    }
    if (espacePressée) {
        
        if(y<=canvas.height-50 ) {		// Si la position de l'ordonée de la balle est dans la zone de jeu, 
            DessinerTrainee();			// On dessine la balle la trainée et le temps
            m="none";		// La variable définissant la position m de la balle fictive avant le lancer ne servant plus, elle cesse d'exister
            InfoEspace="none";
  
            x += vitesseX;
            y += vitesseY;
            
        if(droitePressée && barre.positionX <= canvas.width-barre.largeur-22) {  // Appliquer le déplacement de la barre lors de l'appuie sur la touche droite ou gauche
        barre.positionX += depl;
        }
        if(gauchePressée && barre.positionX >= 22) {
        barre.positionX -= depl;
        }
        if(hautPressée && barre.positionY >= 40) {
        barre.positionY -=depl;
        }
        if(basPressée && barre.positionY+barre.hauteur  <= canvas.height-56) {
        barre.positionY +=depl;
        }
    }
}
   else {
    if(droitePressée && barre.positionX <= canvas.width-barre.largeur-22) {			// Sinon, si la flèche droite est préssée, la barre se déplace vers la droite de la valeur de depl (déplacement)
        barre.positionX += depl;
        x= barre.positionX+(barre.largeur/2);		// La balle partira de la position choisie par le joueur de la barre (en partant du milieu)
	// La "balle" fictive" au moment "post-lancer" suit la position de la barre (mais ne partira pas vraiment lors que l'on appuiera sur espace)
    }
    if(gauchePressée && barre.positionX >= 22) {			// Voir avant
        barre.positionX -= depl;
        x= barre.positionX+(barre.largeur/2);
    }
    if(hautPressée && barre.positionY >= canvas.height/2) {		// Ver antes
        barre.positionY -=depl;
        y= barre.positionY-rayon;
    }
    if(basPressée && barre.positionY+barre.hauteur <= canvas.height-56) {		// See above
        barre.positionY +=depl;
        y= barre.positionY-rayon;
    }
  }
} 
}
}
//*******************************************************************----FIN DU LEVEL 1----****************************************************************************************