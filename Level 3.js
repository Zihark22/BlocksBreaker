                                               //PNJ Games present
                                                                            
//*******************************************************-------------------- BLOCK BREAKERS -----------------------******************************************************************
                                                                            // Ultimate Level
//****************************INITIALISATION******************************

if (confirm("Bienvenue, voulez-vous jouer ?")) {
    alert(" Attention ! Vous vous apprêtez à défier le boss ultime, Ultron ! Si la peur vous tord le ventre mieux vaut quitter le jeu maintenant... Mais si vous êtes valeureux, sachez qu' Ultron est coriace et que ses blocks nécéssitent 2 coups afin d'être détruits ! Et gare aux mauvaises surprises qu'il pourrait vous lancer avec ses yeux...");
window.onload = function () {
var canvas = document.getElementById('canvas1'); // Récup de l’objet canvas
var context = canvas.getContext('2d'); // Récup du context graphique du canvas
var audio = document.createElement('audio');
    audio.src = 'MBOSS.mp3';
    audio.play();
var perso = {                           // Initialisation  des données de l'utilisateur et des données liées au niveau
    nom: prompt("Comment vous appellez-vous ?"),
    vies: 5,
    score:0,
    temps: 180,
};
//**************************---DEFINITION DES VARIABLES---**********************************

// ----------Barre----------
var barre = {
    nom: "barre",
    largeur: 100,
    hauteur: 10,
    positionX: canvas.width/2-50,
    positionY:canvas.height-70,
    couleur: gradient,

};
// ----------Balle----------
var couleurb="rgba(10,200,10,1)"; // pour la couleur de la balle
var balle = {
    couleur:couleurb,                     // couleur de la balle
    rayon: 7,                                   // rayon de la balle
    x:barre.positionX+(barre.largeur/2),        // abscisse de la balle
    y:barre.positionY-6,                // ordonée de la balle
    m: barre.positionX+(barre.largeur/2),       // abscisse de la balle fictive
    n: barre.positionY-6,               // ordonée de la balle fictive
}
var rayon=balle.rayon;
var x= balle.x;       
var y= balle.y;        
var m= balle.m;
var n= balle.n;
var vitesseXT=new Array();
    vitesseXT[0]=1;
    vitesseXT[1]=2;
    vitesseXT[2]=3;
    vitesseXT[3]=-1.5;
    vitesseXT[4]=-2.5;
var vitesseX= vitesseXT[Math.floor(Math.random() * (4 - 0 +1))];          
var vitesseYT=new Array();
    vitesseYT[0]=-1;
    vitesseYT[1]=-2;
    vitesseYT[2]=-3;
    vitesseYT[3]=-1.5;
    vitesseYT[4]=-2.5;
var vitesseY= vitesseYT[Math.floor(Math.random() * (4 - 0 +1))];
var orientationX=1;
var orientationY=1;
    
//----------Blocks----------
var colonnes=9;
var lignes=11;
var blocLargeur = 40;
var blocHauteur = 20;
var blocEspace = 13;
var blocHaut = 40;
var blocGauche = canvas.width/2-((colonnes/2)*(blocLargeur+blocEspace));
var blocs=[];
//--------Utilisateur--------
var nom=perso.nom;      // Intègrer les données rentrées  par l'utilisateur dans des variables qui seront affichées sur l'interface de jeu.
var vies=perso.vies;
var score=perso.score;
var duree=perso.temps;

// Chronomètres
var chr=0; // Pour la durée d'affichage du bonus
var chr2=0;// du malus
var chr3=0;// du malus perte de vie ("bonus mortel")
var chr4=0;
var chr5=0;
var chrvies=0; // de l'affichage du texte lors d'une perte de vie
var chrvies2=0;
var chrvies3=0;
var chrvies4=0;
var chrHack=0;      // malus affiche hackage
//----------Intéractions avec le jeu----------
var depl=5;
var pause=0;
var tempsC="orange";
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
//**********************************************--------Création des propritétés des éléments-------************************************************
for(i=0; i<lignes; i++) {
  blocs[i] = [];
    for(j=0; j<colonnes; j++) {
           blocs[i][j] = { x: 0, y: 0, état: 2, couleur: "#DC143C",};  // Crée une "matrice" contenant les valeurs des indices i et j des blocks la constituant (9x6).
    }
}
function DessinerBlocs() {         // Dessiner les blocks : chacun possède un indice le caractérisant --> va être indispendable pour les collisions

        for(i=0; i<lignes; i++) {
                for(j=0; j<colonnes; j++) { 
                    if (blocs[i][j].état == 2|| blocs[i][j].état ==1) {
                    var blocX = (j*(blocLargeur+blocEspace))+blocGauche;
                    var blocY = (i*(blocHauteur+blocEspace))+blocHaut;
                    blocs[i][j].x = blocX;
                    blocs[i][j].y = blocY;
                    context.beginPath();
                    context.rect(blocX, blocY, blocLargeur, blocHauteur);
                    context.fillStyle=blocs[i][j].couleur;
                    context.fill();
                    context.closePath();

                    blocs[3][2].couleur="yellow";
                    blocs[3][6].couleur="yellow";
                    blocs[5][4].couleur="purple";
                    blocs[6][3].couleur="purple";
                    blocs[6][5].couleur="purple";
             
//-----------Design Level---------------
             
//ligne 0
                    blocs[0][0]=0
                    blocs[0][1]=0
                    blocs[0][7]=0
                    blocs[0][8]=0
//ligne 1
                    blocs[1][0]=0
                    blocs[1][8]=0
//ligne 2
//ligne 3
//ligne 4
//ligne 5
//ligne 6                  
//ligne 6
//ligne 7
                    blocs[7][0]=0
                    blocs[7][8]=0
//ligne 8
                    blocs[8][0]=0
                    blocs[8][8]=0
//ligne 9
                    blocs[9][0]=0
                    blocs[9][1]=0
                    blocs[9][7]=0
                    blocs[9][8]=0
//ligne 10
                    blocs[10][0]=0
                    blocs[10][1]=0
                    blocs[10][3]=0
                    blocs[10][5]=0
                    blocs[10][7]=0
                    blocs[10][8]=0
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
                    orientationY *=-1;                                  // Valeur pour le menu pause
                    blocs[i][j].couleur="white";
                    b.état -=1;                                          // Le block pert une couche
                    var audio = document.createElement('audio');
                    audio.src = 'Mblock.wav';
                    audio.play(); 
                    if (b.état == 0) {                                       
                        score++;                                            // Le score augmente d'un point
                    }
                    if(score == 79) {                      // Si le score a atteint le nombre total de block, alors
                        alert("Bravo, Level 3 réussi !");               // Une popup alerte s'afiche pour annoncer que le niveau est réussi
                        location.href="Page Fin.html";                   // Le joueur est dirigé vers une nouvelle page html contenant le niveau 2
                    }
                }
                                                           
             }
        }
            
   }         
 }
//******************************--------Début Création de la bordure-------**********************************
var bordure=5;

var colonnes2=15;
var lignes2=2;
var blocLargeur2 = 38.6;
var blocHauteur2 = 12;
var blocEspaceX2 = 4.75;
var blocEspaceY2 = canvas.height-bordure-(blocHauteur2*2);
var blocHaut2 = 2;
var blocGauche2 = 2;
var blocs2=[];    

var colonnes3=2;
var lignes3=16;
var blocLargeur3 = 12;
var blocHauteur3 = 31.6;
var blocEspaceX3 = canvas.width-bordure-(blocLargeur3*2);
var blocEspaceY3 = bordure;
var blocHaut3 = 17;
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
                    duree=duree-1;                  // le temps diminue de 1
                    blocHaut +=1;                  // les blocs descendent  
                    if (blocs[3][2].état == 0) {
                        chr=chr+1;
                    }
                    if (blocs[3][6].état == 0) {
                        chr2=chr2+1;
                    }
                    if (blocs[5][4].état == 0) {
                        chr3=chr3+1;
                    }
                    if (blocs[6][3].état == 0) {
                        chr4=chr4+1;
                        chrHack++;
                    }
                    if (blocs[6][5].état == 0) {
                        chr5=chr5+1;
                    }
                    if (vies==4) {
                        chrvies +=1;
                    }
                    if (vies==3) {
                        chrvies2 +=1;
                    }
                    if (vies==2) {
                        chrvies3 +=1;
                    }
                    if (vies==1) {
                        chrvies4 +=1;
                    }
                }
            }
            window.setTimeout(temps,1000);  // Temps au bout duquel, la fonction temps est modifiée (toutes les secondes car définit en ms).
        }
        temps();

        var gradient;
        var gradient3;
        var gradient4;
    function DessinerGradient () {
        gradient = context.createLinearGradient(barre.positionX, barre.positionY, barre.positionX+barre.largeur,barre.positionY+barre.hauteur); // créer un gradient avec 4 valeurs: (position de départ en x, position de départ en y, position de fin en x , position de fin en y)
        gradient.addColorStop("0", "#000099");
        gradient.addColorStop("0.1", "#0033CC");
        gradient.addColorStop("0.2", "#0066FF");
        gradient.addColorStop("0.3", "#00CCFF");
        gradient.addColorStop("0.4", "#CC00FF");
        gradient.addColorStop("0.5", "purple");
        gradient.addColorStop("0.6", "#CC00FF");
        gradient.addColorStop("0.7", "#FF9900");
        gradient.addColorStop("0.8", "#FF6600");
        gradient.addColorStop("0.9", "#FF3300");
        gradient.addColorStop("1", "#FF0000");

        gradient3 = context.createLinearGradient(canvas.width/2-130,canvas.height-150,canvas.width/2+100,canvas.height);
        gradient3.addColorStop("0", "red");
        gradient3.addColorStop("0.1", "orange");
        gradient3.addColorStop("0.2", "yellow");
        gradient3.addColorStop("0.4", "lime");
        gradient3.addColorStop("0.6", "green");
        gradient3.addColorStop("0.7", "cyan");
        gradient3.addColorStop("0.8", "blue");
        gradient3.addColorStop("1", "purple");

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
    function DessinerBalle() {
        context.fillStyle = couleurb;
        context.lineWidth = 5;
        context.beginPath();
        context.arc(x,y-2,rayon,0, 2*Math.PI, true);    // Dessine la forme d'une balle (cercle rempli par .fillStyle)
        context.fill();
    }
    function lancer () {           // balle fictive du début
        context.fillStyle = "rgba(10,200,10,1)";
        context.lineWidth = 5;
        context.beginPath();
        context.arc(m,n,rayon,0, 2*Math.PI, true);    // Dessine la forme d'une balle (cercle rempli par .fillStyle)
        context.fill();
}
    function DessinerBarre () {     // Dessiner une barre rempplie par gradient et gérées par des variables
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
        context.fillStyle="orange";
        context.fillText("Vies: "+vies,30,canvas.height-22);
    }
    function DessinerScore () {         //Dessiner le nombre block détruits
        context.font="22px Impact";
        context.fillStyle="orange";
        context.fillText("Score: "+score,canvas.width-110,canvas.height-22);
    }
    function DessinerTemps() {          //Dessiner le temps restants
        context.font="22px Impact";
        context.fillStyle=tempsC;
        context.fillText(compteur.innerHTML,canvas.width/2-80,canvas.height-22);
    }
    var D= canvas.width/2-80;  // Création d'une variable qui pourra ensuite être enlevée
    function DessinerTempsDépart() {
        context.font="22px Impact";
        context.fillStyle="orange";
        context.fillText("Temps: 03m00s",D,canvas.height-22);
        context.font="40px Impact";
        context.fillStyle=gradient3;
        context.fillText("Appuyer sur ESPACE",D-80,canvas.height-100); // Tant que l'utilisateur n'appuie pas sur espace, le temps ne démarre pas
    }
    function DessinerNom() {
        context.font="25px Impact";
        context.fillStyle="orange";
        context.fillText("Joueur: "+nom,30,45);
    }
    function DessinerLevel() {
        context.font="25px Impact";
        context.fillStyle="orange";
        context.fillText("Level: 3",canvas.width-100,45);
    }
    function DessinerPause(){
        context.fillStyle="rgba(0,0,0,0.5)";
        context.fillRect(0,0,canvas.width,canvas.height);
        context.font="100px Impact";
        context.fillStyle="orange";
        context.fillText("PAUSE",canvas.width/2-120,canvas.height/2+50);
    }
    function Hacker() {     // malus
        context.fillStyle="black";
        context.fillRect(0,0,canvas.width,canvas.height);
        context.font="80px Impact";
        context.fillStyle="#00CC33";
        context.fillText("You have been",100,canvas.height/2-50);
        context.fillText("Hacked...",canvas.width/2-100,canvas.height/2+50);
        context.fillText(";)",canvas.width/2,canvas.height/2+150);
    }
///////////////////////////////////

var bx="none";
var by="none";
var cx="none";
var cy="none";
var dx="none";
var dy="none";
var ex="none";
var ey="none";
var fx="none";
var fy="none";

function bonus() {
    context.fillStyle = "orange";
    context.beginPath();
    context.arc(bx,by,7,0, 2*Math.PI, true);
    context.arc(cx,cy,7,0, 2*Math.PI, true);
    context.fill();
    context.closePath();
    
    context.beginPath();
    context.fillStyle = "red";
    context.arc(dx,dy,7,0, 2*Math.PI, true);
    context.arc(ex,ey,7,0, 2*Math.PI, true);
    context.arc(fx,fy,7,0, 2*Math.PI, true);
    context.fill();
    context.closePath();
}
function DessinerObstacles() {
    if (blocs[3][2].état == 0) {
        if(chr<=1) {
            context.font="15px verdana";
            context.fillStyle="orange";
            context.fillText("Bonus",blocs[3][2].x,blocs[3][2].y+25);
            bx=blocs[3][2].x+20;
            by=blocs[3][2].y+5;
        }
    }
    if (blocs[3][6].état == 0) {
        if(chr2<=1) {
            context.font="15px verdana";
            context.fillStyle="orange";
            context.fillText("Bonus",blocs[3][6].x,blocs[3][6].y+25);
            cx=blocs[3][6].x+20;
            cy=blocs[3][6].y+5;
        }
    }
    
    if (blocs[5][4].état == 0) {
        if(chr3<=2) {
            context.font="15px Arial";
            context.fillStyle="pink";
            context.fillText("Bonus mortel",blocs[5][4].x-20,blocs[5][4].y+25);
            dx=blocs[5][4].x+20;
            dy=blocs[5][4].y+5;
        }
    }
    
    if (blocs[6][3].état == 0) {
        if(chr4<=2) {
            context.font="15px Arial";
            context.fillStyle="pink";
            context.fillText("Bonus mortel",blocs[6][3].x-20,blocs[6][3].y+25);
            ex=blocs[6][3].x+20;
            ey=blocs[6][3].y+5;
        }
    }
    
    if (blocs[6][5].état == 0) {
        if(chr5<=2) {
            context.font="15px Arial";
            context.fillStyle="pink";
            context.fillText("Bonus mortel",blocs[6][5].x-20,blocs[6][5].y+25);
            fx=blocs[6][5].x+20;
            fy=blocs[6][5].y+5;
        }
    }
    if (duree<11 && duree>=0) {                // Créer un décompte pour les 10 dernière secondes en afficant "durée"
        context.font="50px Calibri";
        context.fillStyle="orange";
        context.fillText(duree,(canvas.width/2),canvas.height-100);
    }
}
function Pause() {
    if(pausePressée){
        pause=pause+1;
    }
    if(pause==1){
        vitesseX=0;
        vitesseY=0;
        DessinerPause();
        depl=0;
    }
    if (pause==2){
        depl=3;
        vitesseX=orientationX;
        vitesseY=orientationY;
        pause=0;
    }
}
setInterval(dessine, 10);

//*********************--------Dessiner les éléments--------------***************************
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
    DessinerObstacles();
    bonus();
    Pause();
    DessinerBordure();
     
    //***************************************-------------------------CONDITIONS REGISSANT LE JEU---------------------------------*************************************
    function SonVies() {
        var life = document.createElement('audio');
            life.src = 'MLife.wav';
            life.play();
    }
    //********************************-----------------Conditions de réalisation des obstacles ------------------*************************************
     
    if(blocs[3][2].état == 0) {
        if (by>canvas.height-50) {
            by="none";
        }
        if (by==barre.positionY && barre.positionX<=bx && barre.positionX+barre.largeur>=bx) {
            barre.largeur+=30;
            by="none";
        }
        else {
            by+=1;
        }
    }
    if(blocs[3][6].état == 0) {
        if (cy>canvas.height-50) {
            cy="none";
        }
        if (cy==barre.positionY && barre.positionX<=cx && barre.positionX+barre.largeur>=cx) {
            vies +=1;
            cy="none";
        }
        else {
            cy+=1;
        }
    }
    
    if(blocs[5][4].état == 0) {
         if (dy>canvas.height-50) {
            dy="none";
        }
        if (dy==barre.positionY && barre.positionX<=dx && barre.positionX+barre.largeur>=dx) {
            vies=vies - 1;
            SonVies();
            dy ="none";
        }
        else {
            dy += 1;
        }
    }
    
    if(blocs[6][3].état == 0) {
         if (ey>canvas.height-50) {
            ey="none";
        }
        if (ey==barre.positionY && barre.positionX<=ex && barre.positionX+barre.largeur>=ex) {
            if (chrHack <=6 && duree >= 30) {
                Hacker();
                tempsC="black";
                couleurb="black";
            }
            else {
                SonVies();
                ey ="none";
                tempsC="orange";
                couleurb="rgba(10,200,10,1)";
            }
        }
        else {
            ey += 1;
        }
    }
    
    if(blocs[6][5].état == 0) {
        if (fy>canvas.height-50) {
            fy="none";
        }
        if (fy==barre.positionY && barre.positionX<=fx && barre.positionX+barre.largeur>=fx) {
            vies -=1;
            SonVies();
            fy ="none";
        }
        else {
            fy += 1;
        }
    }
    //*******************************--------Conditions de mise en mouvement des éléments-------************************************************
    
	if(x+vitesseX >= canvas.width-rayon-25 || x+ vitesseX <= rayon+25) {			// Si la balle touche les parois du canvas, elle part dans la direction opposée
        vitesseX *= -1;
        orientationX *=-1;
    }
    if(y+vitesseY <= rayon+25) {
        vitesseY *= -1;
        orientationY *=-1;
     }
    if(barre.positionY-5<=y+vitesseY && barre.positionY+5>=y+vitesseY && barre.positionX<=x+rayon) {			// Barre divisée en 3 secteurs avec différents angles de lancement
        if(barre.positionX+(barre.largeur/3)+1 <= x && barre.positionX+2*(barre.largeur/3)+1 >= x) {
            vitesseY *= -1;
            orientationY *=-1;
        }
        else if(barre.positionX+(barre.largeur/3)+1 >= x && barre.positionX<= x && vitesseX>0 ) {
            vitesseY *= -1;
            vitesseX *= -1;
            vitesseX += -0.1;
            orientationY *=-1;
            orientationX *=-1;
        }
        else if(barre.positionX+(barre.largeur/3)+1 >= x && barre.positionX<= x && vitesseX<0 ) {
            vitesseY *= -1;
            orientationY *=-1;
        }
        else if(barre.positionX+2*(barre.largeur/3)+1 <= x && barre.positionX+barre.largeur >= x && vitesseX<0) {
            vitesseY *= -1;
            vitesseX *= -1;
            vitesseX += 0.1;
            orientationY *=-1;
            orientationX *=-1;
        }
        else if(barre.positionX+2*(barre.largeur/3)+1 <= x && barre.positionX+barre.largeur >= x && vitesseX>0) {
            vitesseY *= -1;
            orientationY *=-1;
        }
    }
function AfficherVies() {
    context.font="23px Alien Encounters, verdana";
    context.fillStyle="green";
    context.fillText("- 1 Vie !",canvas.width-150,canvas.height-60);
}
//------A chaque perte de vie afficher -1 vie-------
    if (vies ==4 && chrvies <=3) {
            AfficherVies();
    }
    if (vies == 3 && chrvies2 <=3) {		// Affichage d'un avertissement annoncant la poerte de vie pendnat 3 secondes
            AfficherVies();
    }
    if (vies == 2 && chrvies3 <=3) {
            AfficherVies();
    }
    if (vies == 1 && chrvies4 <=3) {
            AfficherVies();
    }

    if (vies==0) {
        alert("GAME OVER :(");
        location.href="Page GO.html";
    }
    if (y>=canvas.height-50) {		// Si la position en ordonée de la balle dépasse la limite inférieure du canvas, le joueur perd une vie et on lance le bruitage
            vies=vies-1;
            SonVies();
            vitesseX= vitesseXT[Math.floor(Math.random() * (4 - 0 +1))]; // Nouvelles vitesses aléatiores générées pour x et y
            vitesseY= vitesseYT[Math.floor(Math.random() * (4 - 0 +1))];
          
		  if (espacePressée) {			// On relance la balle du départ
                x= barre.positionX+(barre.largeur/2);
                y=barre.positionY-10;
            }
            console.log("Vous n'avez plus que "+vies+" vies.");
    }
    if (espacePressée) {
        
        if(y<=canvas.height-50 ) {		// Si la position de l'ordonée de la balle est dans la zone de jeu, 
            DessinerBalle();		// On dessine la balle la trainée et le temps
            DessinerTemps();
            m="none";		// La variable définissant la position m de la balle fictive avant le lancer ne servant plus, elle cesse d'exister
            D="none";
  
            x += vitesseX;
            y += vitesseY;
            
        if(droitePressée && barre.positionX <= canvas.width-barre.largeur-20) {		// Appliquer le déplacement de la barre lors de l'appuie sur la touche droite ou gauche
            barre.positionX += depl;
        }
        else if(gauchePressée && barre.positionX >= 20) {
            barre.positionX -= depl;
        }
        else if(hautPressée && barre.positionY >= 20+3*rayon) {
            barre.positionY -=depl;
        }
        else if(basPressée && barre.positionY+barre.hauteur <= canvas.height-55) {
            barre.positionY +=depl;
        }
    }
}
else {
    if(droitePressée && barre.positionX <= canvas.width-barre.largeur-20) {		// Sinon, si la flèche droite est préssée, la barre se déplace vers la droite de la valeur de depl (déplacement)
        barre.positionX += depl;
        x= barre.positionX+(barre.largeur/2);		// La balle partira de la position choisie par le joueur de la barre (en partant du milieu)
        m= barre.positionX+(barre.largeur/2);		// La "balle" fictive" au moment "post-lancer" suit la position de la barre (mais ne partira pas vraiment lors que l'on appuiera sur espace)
    }
    if(gauchePressée && barre.positionX >= 20) {		// Voir avant
        barre.positionX -= depl;
        x= barre.positionX+(barre.largeur/2);
        m= barre.positionX+(barre.largeur/2);
    }
    if(hautPressée && barre.positionY >=(canvas.height/2)+120) {		// Ver antes
        barre.positionY -=depl;
        y= barre.positionY-rayon;
        n= barre.positionY-rayon;
    }
    if(basPressée && barre.positionY+barre.hauteur <= canvas.height-55) {		// See above
        barre.positionY +=depl;
        y= barre.positionY-rayon;
        n= barre.positionY-rayon;
    }
}
} 
}
}

//*******************************************************************----FIN DU JEU----****************************************************************************************