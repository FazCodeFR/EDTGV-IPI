//Ne jugez pas le code, il est dégueu mais écoutez j'avais la flemme

//*SELECTEURS
const form = document.querySelector("form");
const formButton = document.querySelector("button");
const nom = document.querySelector("#nom");
const prenom = document.querySelector("#prenom");
const userDate = document.querySelector("#date");
//pour la partie localstorage
const sectionFast = document.querySelector(".section-fast");
const sectionFastButton = document.querySelector(".section-fast button");
const sectionFastReset = document.querySelector(".section-fast aside");

const iFrame = document.querySelector("iframe");
const edtPage = document.querySelector(".edt-page");
const overlay = document.querySelector(".overlay");
const navButton = document.querySelector("nav");
const navButtonReload = document.querySelectorAll("nav")[1];
const tip = document.querySelector(".tip");

let valeurNom;
let valeurPrenom;
let valeurDate;

navButtonReload.classList.add("hide");

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const checkLocalStorage = () => {
  //Detecte si l'utilisateur avait déjà rentré une un nom et un prénom auparavent, si ce n'est pas le cas bah cheh
  if (
    localStorage.getItem("nom") == "" ||
    localStorage.getItem("nom") == undefined ||
    localStorage.getItem("prenom") == "" ||
    localStorage.getItem("prenom") == undefined
  ) {
    sectionFast.classList.add("section-hide");
  } else {
    //Lancement du site
    valeurNom = localStorage.getItem("nom");
    valeurPrenom = localStorage.getItem("prenom");
    sectionFastButton.innerHTML = `Accès rapide - en tant que ${capitalizeFirstLetter(
      valeurPrenom
    )} ${capitalizeFirstLetter(valeurNom)}`;
    sectionFast.classList.remove("section-hide");
  }
};

const fullReset = () => {
  sectionFast.classList.add("section-hide");
  localStorage.clear();
};

checkLocalStorage();

//*VARIABLES DE BASE
let date = new Date();
let heure = date.getHours();

//Pour le lol
const hoursMsg = (heure) => {
  let msg = "";
  if (heure < 7) {
    msg = "Il se fait tard non ?";
  } else if (heure < 8) {
    msg = "Le réveil était pas trop dur ? Courage pour cette journée";
  } else if (heure < 10) {
    msg = "J'espère que le cours est pas trop chiant";
  } else if (heure < 12) {
    msg = "Courage, c'est bientôt l'heure du repas";
  } else if (heure < 13) {
    msg = "Bon 'app !";
  } else if (heure < 16) {
    msg = "Courage pour cet aprem";
  } else if (heure < 18) {
    msg = "Courage, la journée est bientôt finie";
  } else if (heure < 22) {
    msg = "Reposez-vous au lieu de regarder l'edt";
  } else {
    msg = "Bonne soirée ~";
  }

  return msg;
};

//petit tableau de texte de chargement parce que why not
const tipTab = [
  "Désolé si ça met du temps, c'est la faute de l'edt.",
  "Grosse ambiance non ?",
  "C'est long non ?",
  "Vous avez bien dormi ?",
  "Ceci n'est pas un message de chargement",
  "Fact : Les gnocchi c'est bon",
  "J'espère que vous n'avez pas trop de cours aujourd'hui.",
  "Il fait beau dehors, non ?",
  "Urgh pourquoi ça met toujours aussi longtemps",
  "Je décline toute responsabilité de code moche",
  "Je sais plus quoi écrire comme message de chargement",
  "Sur Vénus, les jours sont plus long que les années.",
  'Les différents types de couches présentes dans une étoile à neutron sont appelées "Pâtes nucléaires"',
  `${hoursMsg(heure)}`,
  "Aled aled aled aled aled aled",
  "J'ai plus d'idées aled",
  "Le saviez-vous ? J'en ai marre du Java",
  "Le SOAP n'est efficace que pour se laver.",
  "Dev = Réseau",
  "Le sel est le seul aliment qui n'est pas périsable, car il n'évolue pas dans le temps.",
  "En 2014, Tinder a eu son premier match en Antarctique",
  "Une combinaison pour aller dans l’espace coûte 12 millions de dollars",
  "Il faudra environ 25 Million d'années pour que l'emprunte de Neil Armstrong sur la lune disparaisse",
  'Des pièces présentes dans le rover "Perseverance" sont Grenobloises',
  "Les bananes sont plus radioactives que le Bismuth",
  "La demie vie du Bismuth est plus d'un milliard de fois celle de l'âge de l'univers",
  "Un coq, un mouton, et un canard étaient les premier passager de la montgolfière",
  "Le logo de ChupaChups à été designé par Salvator Dali",
  "Le premier cadis a été fait avec une chaise pliante avec un panier dessus, et avec des roulettes à ses pieds",
];

//permet de pas déclancher la fonction de tip quand l'iframe à fini de charger
let timerOut = false;
let firstTime = true;

//*FONCTIONS

//*Vérifications et random
const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
};

const isCharacterALetter = (char) => {
  return /[a-zA-Z]/.test(char); //REGEX OUAIS OUAIS OUAIS
};

const isDateFormat = (date) => {
  return /(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d/.test(date); // aled
}

const formatDate = (userDate) => {
  // Fun fact : Je déteste travailler avec les dates et je pense avoir fait ça de la pire manière possible
  console.log(userDate)
  var finalDate = (date.getMonth() > 8 ? date.getMonth() + 1 : "0" + (date.getMonth() + 1)) +
  "/" +
  (date.getDate() > 9 ? date.getDate() : "0" + date.getDate()) +
  "/" +
  date.getFullYear()

  console.log(isDateFormat(userDate))
  // 14/06/2021
  if(isDateFormat(userDate)){
    let temp = [userDate[3], userDate[4], '/', userDate[0], userDate[1], '/' , userDate[6], userDate[7], userDate[8], userDate[9]].join('') 
    console.log(temp)
    finalDate = temp
    console.log(finalDate)
    console.log("aaaaa")
  }
  else if(!isNaN(userDate) && (userDate.includes("+") || userDate.includes("-"))){
    let now = new Date();
    let numberOfWeek = +userDate.substring(1); // on converti en int grace à +
    userDate.includes("+") ? now.setDate(now.getDate() + numberOfWeek * 7) : now.setDate(now.getDate() - numberOfWeek * 7);

    finalDate = (now.getMonth() > 8 ? now.getMonth() + 1 : "0" + (now.getMonth() + 1)) +
    "/" +
    (now.getDate() > 9 ? now.getDate() : "0" + now.getDate()) +
    "/" +
    now.getFullYear()

    console.log("bbbbb")
  }

  return finalDate
}


//Ouais j'aurais pu les regrouper en une seule fonction mais flemme de me battre contre les EventListener et il est 1h là
const verifNom = () => {
  if (!isCharacterALetter(nom.value[nom.value.length - 1])) {
    nom.value = nom.value.slice(0, -1);
  }
};

const verifPrenom = () => {
  if (!isCharacterALetter(prenom.value[prenom.value.length - 1])) {
    prenom.value = prenom.value.slice(0, -1);
  }
};


/*
Coeur du progamme, on vérifie si les valeurs des inputs ne sont pas nulles ////comme moi 
puis on change la source de l'iframe par celle de l'edt de l'utilisateur, puis on affiche la page de l'edt, et on lance la fonction poptip()
*/
const fastSubmit = () => {
  edtPage.classList.remove("hide");
  iFrame.classList.add("hide");
  overlay.classList.remove("hide");

  if (firstTime) {
    timerOut = false;
  }
  firstTime = false;

  iFrame.src = `https://edtmobiliteng.wigorservices.net/WebPsDyn.aspx?action=posEDTBEECOME&Tel=${valeurPrenom}.${valeurNom}&date=${
    (date.getMonth() > 8 ? date.getMonth() + 1 : "0" + (date.getMonth() + 1)) +
    "/" +
    (date.getDate() > 9 ? date.getDate() : "0" + date.getDate()) +
    "/" +
    date.getFullYear()
  }`;

  popTip();
};

const reload = () => {
  overlay.classList.remove("hide");
  edtPage.classList.add("hide");
  tip.classList.add("hide");
  navButtonReload.classList.add("hide");
  timerOut = false;

  edtPage.classList.remove("hide");
  iFrame.classList.add("hide");
  overlay.classList.remove("hide");

  if (firstTime) {
    timerOut = false;
  }
  firstTime = false;

  iFrame.src = `https://edtmobiliteng.wigorservices.net/WebPsDyn.aspx?action=posEDTBEECOME&Tel=${valeurPrenom}.${valeurNom}&date=${
    (date.getMonth() > 8 ? date.getMonth() + 1 : "0" + (date.getMonth() + 1)) +
    "/" +
    (date.getDate() > 9 ? date.getDate() : "0" + date.getDate()) +
    "/" +
    date.getFullYear()
  }`;

  popTip();
}

const submit = function (event) {
  if (prenom.value != "" && nom.value != "" || (valeurNom && valeurPrenom) ) {
    console.log("yesss");
    edtPage.classList.remove("hide");
    iFrame.classList.add("hide");
    overlay.classList.remove("hide");

    if (firstTime) {
      timerOut = false;
    }
    firstTime = false;



    if(prenom.value != "" && nom.value != ""){
      valeurNom = nom.value.toLowerCase();
      valeurPrenom = prenom.value.toLowerCase();
    }
    valeurDate = userDate.value;
    localStorage.setItem("nom", valeurNom);
    localStorage.setItem("prenom", valeurPrenom);

    iFrame.src = `https://edtmobiliteng.wigorservices.net/WebPsDyn.aspx?action=posEDTBEECOME&Tel=${valeurPrenom}.${valeurNom}&date=${formatDate(valeurDate)}`;
    
    if(event){
      event.preventDefault();
    }
    

    popTip();
  }
};

//Permet de faire pop un message de chargement (venant du tableau plus haut) toute les 3.5 secondes
const popTip = () => {
  setTimeout(() => {
    if (!timerOut) {
      tip.classList.remove("hide");
      tip.innerHTML = tipTab[getRandomInt(tipTab.length)];
      popTip();
    }
  }, 3500);
};

//Quand l'iframe à fini de charger on enlève l'overlay la
iFrame.onload = function () {
  timerOut = true;
  iFrame.classList.remove("hide");
  overlay.classList.add("hide");
  navButtonReload.classList.remove("hide");
};

//Permet de revenir à la page d'accueil en cliquant sur le bouton (tout en faisant un gros reset)
navButton.addEventListener("click", function () {
  overlay.classList.remove("hide");
  edtPage.classList.add("hide");
  tip.classList.add("hide");
  navButtonReload.classList.add("hide");
  timerOut = false;
  checkLocalStorage();
});



function $_GET(param) {
	var vars = {};
	window.location.href.replace( location.hash, '' ).replace( 
		/[?&]+([^=&]+)=?([^&]*)?/gi, // regexp
		function( m, key, value ) { // callback
			vars[key] = value !== undefined ? value : '';
		}
	);

	if ( param ) {
		return vars[param] ? vars[param] : null;	
	}
	return vars;
}



navButtonReload.addEventListener("click", reload)

nom.addEventListener("input", verifNom);
prenom.addEventListener("input", verifPrenom);

form.addEventListener("submit", submit, true);
sectionFastButton.addEventListener("click", fastSubmit);
sectionFastReset.addEventListener("click", fullReset);



//Pour accéder direct a EDT si ya des paramètres 
var $_GET = $_GET();
if($_GET['prenom'] && $_GET['nom']){
  valeurPrenom = $_GET['prenom'];
  console.log(valeurPrenom)
  valeurNom = $_GET['nom'];
  submit();
}



//Pour accéder direct a EDT
if (
  localStorage.getItem("nom") && 
  localStorage.getItem("prenom")
) {
  valeurNom = localStorage.getItem("nom");
  valeurPrenom = localStorage.getItem("prenom");
  prenom.value = localStorage.getItem("prenom");
  nom.value = localStorage.getItem("nom");
  submit();
}