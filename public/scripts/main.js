function alphabetSelect()
{
  let choix=document.createElement("select");
    let option;
    option=document.createElement("option");
    option.text="choisir clé";
    option.selected=true;
    option.disabled=true;
    choix.add(option);
    for(let i=0;i<26;i++)
    {
      option=document.createElement("option");
      option.text=String.fromCharCode(i+65) + "  ou  " + i;
      option.value=i;
      choix.add(option);
    }
    choix.required=true;
    return choix;

}   

function initilise()
{
  let aff = document.getElementById("affineKey1");
  let alphCesar = document.getElementById("alphabetCesar");
  let cipherKey= document.getElementById('cipherKey');
        aff.style.display="none";
       cipherKey.style.display="inline";
       document.getElementById("validity").style.display="inline";
       cipherKey.style.width="18em";
       cipherKey.type="text";


  if(alphCesar != null)
      alphCesar.style.display="none";

}

function  substAlgo ()
{
  initilise();
 selection=document.querySelector('input[type=radio]:checked');
  //console.log(selection.value);
  let keyLabel=document.getElementById('keyLabel');
  if (selection.value==="cesar") {

    document.getElementById('cipherKey').style.display="none";
    document.getElementById("validity").style.display="none";
    if(!document.getElementById("alphabetCesar")){
      let alphabet=alphabetSelect();
      alphabet.id="alphabetCesar";
      keyLabel.appendChild(alphabet)
    }else
    {
      document.getElementById("alphabetCesar").style.display="inline";
    }
    
    
  }
  else if(selection.value==="affine")
  {
    let choix=document.getElementById("affineKey1");
    if (choix.length < 26) {
      let inversible=[1,3,5,7,9,11,15,17,19,21,23,25];
      let option;
      for(let i of inversible)
      {
        option=document.createElement("option");
        option.text= i;
        // option.value=i;
        choix.add(option);
      }      
    }
    
    choix.style.display="inline";
    let affKey2=document.getElementById("cipherKey");
    affKey2.type="number";
    affKey2.style.width="4em";

  }
}
function transpAlgo(){

  document.getElementById("rst").innerText= "Le chiffrement par transposition Pas encore disponible";
console.log("not yet handled !")
}

/**
 * BUTTON LISTENERS AND RESPONSE HANDLER PART
 */

let btnChiffrer = document.getElementById("btnChiffrer");
let btnDechiffrer = document.getElementById("btnDechiffer");

btnChiffrer.addEventListener("click",(ev)=>{
ev.preventDefault();
inputMananger(0);
});
btnDechiffrer.addEventListener("click",(ev)=>{
  ev.preventDefault();
inputMananger(1);
})
function inputMananger(op){
var radioAlgo= document.querySelector('input[type=radio]:checked');
var key= document.getElementById("cipherKey");
var text = document.getElementById("textField");
if(check(radioAlgo, key, text)){
   let algo =radioAlgo.value;
   let finalText= format(text.value);
   let keyValue = ((radioAlgo.value==="cesar") ? document.getElementById("alphabetCesar").value : (radioAlgo.value==="affine") ? [document.getElementById("affineKey1").value,key.value] : key.value);
  send({"algo": algo,
        "key": keyValue,
        "text": finalText,
         "op" : op               
}, resHandler,spinShower);
}

}
function warning(alertMsg){
  let msgarea=document.getElementById("holder");
  let divWarn = document.createElement("div");
  divWarn.classList.add("alert", "alert-warning", "alert-dismissible", "fade", "show");
  divWarn.role="alert";
  let  msg= document.createTextNode(alertMsg);
  let  btn=document.createElement("button");
   btn.type="button"; 
   btn.classList.add("close");
   btn.setAttribute("data-dismiss","alert" );
   btn.setAttribute("aria-label","Close");
   let sp=document.createElement("span");
   sp.setAttribute("aria-hidden","true");
   sp.innerHTML="&times;";
   btn.appendChild(sp);
   divWarn.appendChild(msg)
   divWarn.appendChild(btn);
   msgarea.appendChild(divWarn);
   window.setTimeout(()=>{
    let warn=new bootstrap.Alert(document.querySelector('.alert'));
      warn.close()}, 3000);
}

function check(selectAlgo, key, text){
 if(!selectAlgo){
  warning("Vous devez choisir un algorithme avant de valider !");
  return false;
 }
if(selectAlgo.value!=="cesar" && selectAlgo.value!=="affine"){
  if(!key.checkValidity()){
    warning("Format de cle incorrect !");
    return false;
  }
}
else if(selectAlgo.value==="cesar"){
  if(!document.getElementById("alphabetCesar").checkValidity()){
    warning("Format de cle incorrect !");
    return false;
  }
    
}
else if(selectAlgo.value==="affine"){
  if(!document.getElementById("affineKey1").checkValidity() || !key.checkValidity()){
    warning("Format de cle incorrect !");
    return false;
  }
  
}
 if(text.value.length === 0 || !text.value.trim()){
   warning("Veillez saisir un texte avant de valider !");
   return false;
 }
return true;
}
function format (text){
    text=text.replace(/[^a-zA-Z]/gi, '');
    return text.toUpperCase();
}    
function send(jsobject,resHandler, spinShower){
  spinShower(true);
  const http= new XMLHttpRequest();
  http.open("POST", '/crypt');
  http.setRequestHeader("Content-Type","application/json");
  http.timeout = 10000; // After 10 second of non -response the request expire
  http.onload = function(){
    if(this.status===200){
      resHandler(http.responseText,jsobject["op"]);
      spinShower(false);
    }
  }
  http.onerror = function(){
    spinShower(false);
    warning("Erreur de connexion");
  }
  http.ontimeout = (e) =>{
    spinShower(false);
    warning("Désolé, la requéte a expiré");
  }
http.send(JSON.stringify(jsobject));
}
spinShower = (bool)=> {
  let holder=document.getElementById("holder");
  if(bool){
  let divSpin = document.createElement("div");
  divSpin.classList.add("spinner-border", "text-primary");
  divSpin.role="status";
let span= document.createElement("span");
    span.textContent = " Chargement en cours ...";
    span.classList.add("text-primary");
   // span.style.float="right";
    holder.appendChild(divSpin);
    holder.appendChild(span);
  }
  else { while(holder.firstChild)
          holder.removeChild(holder.lastChild)        
  }

}
function formatCrypto( str, mode){
   
  let ret="", pad= 5 - str.length % 5;
  if( pad !== 0 && mode === 0){
    str+= randomCharGenerator(pad);

  }
  for(i = 0, len = str.length; i < len; i += 5) {
       ret+=str.substr(i, 5)+ "\t";
    }
    return ret ;
 }
function randomCharGenerator(length) {
   var result           = '';
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}
resHandler = (respText,mode) =>{
  let output="";
  let displayer= document.getElementById("rst");
           displayer.innerHTML="";
  if(document.querySelector('input[type=radio]:checked').value==="playfair"){
     let  square = respText.slice(-25);
     respText =respText.substring(0,respText.length-25);
     displayer.appendChild(fillSquare(square)) ;
  }
 output= "Longueur Texte: "+ respText.length+" caractères\n";
  displayer.appendChild(document.createTextNode(
    output+formatCrypto(respText,mode)
  ));
  }
  function fillSquare(text){

    let  tb=document.createElement("table");
         tb.id="pfSquare";
    let k=0;
  for(let i = 0; i < 5; i++){
      var tr = tb.insertRow(); tr.style.backgroundColor = "#FFFF99";
      tr.width='400px'
      for(var j = 0; j < 5; j++){
        
              let n = i*5+j;
              var td = tr.insertCell();
              td.appendChild(document.createTextNode(text.charAt(n) ));
              td.style.border = '10px solid black';               
      }
  }
  let cp =tb.createCaption(); cp.innerHTML= "<strong>Le tableau clé</strong>";
    cp.style.color="black";
  cp.style.captionSide="top";
  tb.style.margin="auto";
  return tb; 
}