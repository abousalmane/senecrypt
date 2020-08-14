function sortbyOccurences(a,b)
{
    return parseInt(b.Occurences) - parseInt(a.Occurences);
}
ecartList = (objTrig) =>{
  objTrig["Ecart"]=[];
    for(let i = 0; i< objTrig["Position"].length - 1;i++)
    {
        for(let j = i+1; j<objTrig["Position"].length;j++)
            objTrig["Ecart"].push(Math.abs(objTrig["Position"][j] - objTrig["Position"][i]))  ;

    }
}
// Calcul le pgcd de tous les ecart puis retournent un array tableau des diviseurs comms au Ecarts
pgcdList = (listEcart, keyMin,keyMax) =>{
  let pgcdEcart=[];
  // Si n'y a qu un seul ecart on cherche ses diviseurs entre keyMin et KeyMax
  if(listEcart.length === 1){
    let c=keyMin, l =Math.ceil(listEcart[0]/2);
    while(c < l && c  <= keyMax){
        if(listEcart[0] % c ===0) 
             pgcdEcart.push(c) ;
      c++;
    }
    if(listEcart[0]<=keyMax)
      pgcdEcart.push(listEcart[0]);
   return pgcdEcart; 
  }
  // sinon
    for(let i = 0; i<listEcart.length - 1;i++)   {  
        for(let j = i+1; j<listEcart.length;j++)
        {
           let currPgcd =  pgcd(listEcart[j], listEcart[i])
           if( currPgcd >= keyMin  && currPgcd <= keyMax )
             pgcdEcart.push(currPgcd);
        }
            
    }
    if(pgcdEcart.length === 0)
    return [];
    // retourne un objet qui a pour cle les pgcd et pour valeur leurs nombres doccurences
    let pgcdObjt = pgcdEcart.reduce( (acc, curr) =>{
      acc[curr] ? acc[curr]++ : acc[curr] = 1;
      return acc; 
    },{});
    // on recupere les cle selon leurs ordres doccurence
  let listCle = Object.keys(pgcdObjt).sort( (a,b)=>{ return  pgcdObjt[b] - pgcdObjt[a]})//.map(Number);
  //Ajoutons les diviseurs du plus petit des PGCDs de tous les  ecarts, diviseurs superieurs a  keyMin  
  let minCle = Math.min(...listCle);
  let diviseurMin=[], c=keyMin, l=Math.ceil(minCle/2);
  while(c <= l ){
      if(minCle % c ===0) 
           diviseurMin.push(c) ;
    c++;
  }
  listCle.splice(listCle.indexOf(minCle),0,...diviseurMin);
  return listCle;
   
}

function trigramme(texte, keymin=3, keyMax=25)
{
	var trigrammes=new Array(17576);
	var alphabet='ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	
	var i;
	var j;
	var k;
   // On commence par initialiser le tableau des bigrammes...
   for (i=0;i<26;i++)
     for (j=0;j<26;j++)
       for (k=0;k<26;k++)
       {
       	  trigrammes[i*26*26+j*26+k]=new Object;
       	  trigrammes[i*26*26+j*26+k]["Trigrammes"]=alphabet.charAt(i)+alphabet.charAt(j)+alphabet.charAt(k);;
          trigrammes[i*26*26+j*26+k]["Occurences"]=0;
          trigrammes[i*26*26+j*26+k]["Position"]=[];
       }
       
  //On le remplit!
  
  for (i=0;i<texte.length-2;i++)
  {
    trigrammes[alphabet.indexOf(texte.charAt(i))*26*26+alphabet.indexOf(texte.charAt(i+1))*26+alphabet.indexOf(texte.charAt(i+2))]["Occurences"]++;
    trigrammes[alphabet.indexOf(texte.charAt(i))*26*26+alphabet.indexOf(texte.charAt(i+1))*26+alphabet.indexOf(texte.charAt(i+2))]["Position"].push(i+1);
  
  }     
       
  //On trie le tableau
  trigrammes.sort(sortbyOccurences);
  // Onrecupere que les trigrammes aparu pls dune fois   
    i=0;
  while(trigrammes[i]["Occurences"]>1) {
      ecartList(trigrammes[i]);
      i++;  
  }     
  if(i === 0){
      return [{"Repetition":"NEANT"}];
  }
  trigrammes = trigrammes.slice(0,i) ;       
  let allEcart = trigrammes.reduce((accumulator, obj) => accumulator.concat(obj["Ecart"]),[] );
  let listPgcd = pgcdList(allEcart,keymin,keyMax);
  trigrammes.push({"LougueurCle" : listPgcd}) ;
/*   console.log("Tous les ecarts"+allEcart + " -- total " + allEcart.length);
  console.log(" --------------------- ------------------------  ");
  console.log(" Longueur Cle Probable " + listPgcd)  */
 	return trigrammes;	
}
function bigramme(texte,keymin=3, keyMax=25)
{
	var bigrammes=new Array(676);
	var alphabet='ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	
	var i;
	var j;
    var sortie='';
    sortie+="Nombre de caracteres analyses du texte : "+texte.length+"\n";
// On commence par initialiser le tableau des bigrammes...
   for (i=0;i<26;i++)
     for (j=0;j<26;j++)
       {
       	  bigrammes[i*26+j]=new Object;
       	  bigrammes[i*26+j]["Bigrammes"]=alphabet.charAt(i)+alphabet.charAt(j);
           bigrammes[i*26+j]["Occurences"]=0;
           bigrammes[i*26+j]["Position"]=[];
           
       }    
  //On le remplit!
  for (i=0;i<texte.length-1;i++)
  {
    bigrammes[alphabet.indexOf(texte.charAt(i))*26+alphabet.indexOf(texte.charAt(i+1))]["Occurences"]++;
    bigrammes[alphabet.indexOf(texte.charAt(i))*26+alphabet.indexOf(texte.charAt(i+1))]["Position"].push(i+1);
    
  }     
       
  //On trie le tableau
  bigrammes.sort(sortbyOccurences);
  i=0;
  while(bigrammes[i]["Occurences"]>1) {
    ecartList(bigrammes[i]);
    i++;  
}     
if(i === 0){
    return [{"Repetition":"NEANT"}];
}
  bigrammes = bigrammes.slice(0,i);
  let allEcart = bigrammes.reduce((accumulator, obj) => accumulator.concat(obj["Ecart"]),[] );
  let listPgcd = pgcdList(allEcart,keymin,keyMax);
  bigrammes.push({"LougueurCle" : listPgcd}) ;

 return bigrammes; 
}
function quadrigramme(texte, keyMin=3, keyMax=25)
{
	var quadrigrammes=new Array(456976);
	var alphabet='ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	var i;
	var j;
	var k;
	var l;
   // On commence par initialiser le tableau des bigrammes...
   for (i=0;i<26;i++)
     for (j=0;j<26;j++)
       for (k=0;k<26;k++)
         for (l=0;l<26;l++)
         {
       	    quadrigrammes[i*26*26*26+j*26*26+k*26+l]=new Object;
       	    quadrigrammes[i*26*26*26+j*26*26+k*26+l]["Quadrigrammes"]=alphabet.charAt(i)+alphabet.charAt(j)+alphabet.charAt(k)+alphabet.charAt(l);
             quadrigrammes[i*26*26*26+j*26*26+k*26+l]["Occurences"]=0;
             quadrigrammes[i*26*26*26+j*26*26+k*26+l]["Position"]=[];
         }
       
  //On le remplit!
  
  for (i=0;i<texte.length-3;i++)
  {
  	quadrigrammes[alphabet.indexOf(texte.charAt(i))*26*26*26+alphabet.indexOf(texte.charAt(i+1))*26*26+alphabet.indexOf(texte.charAt(i+2))*26+alphabet.indexOf(texte.charAt(i+3))]["Occurences"]++;
    quadrigrammes[alphabet.indexOf(texte.charAt(i))*26*26*26+alphabet.indexOf(texte.charAt(i+1))*26*26+alphabet.indexOf(texte.charAt(i+2))*26+alphabet.indexOf(texte.charAt(i+3))]["Position"].push(i+1);
  }     
       
  //On trie le tableau
  quadrigrammes.sort(sortbyOccurences);
  i=0;
  while(quadrigrammes[i]["Occurences"]>1) {
      ecartList(quadrigrammes[i]);
      i++;  
  }     
  if(i === 0){
      return [{"Repetition":"NEANT"}];
  }
  quadrigrammes = quadrigrammes.slice(0,i) ;       
  let allEcart = quadrigrammes.reduce((accumulator, obj) => accumulator.concat(obj["Ecart"]),[] );
  let listPgcd = pgcdList(allEcart,keyMin,keyMax);
  quadrigrammes.push({"LougueurCle" : listPgcd}) ;

  return quadrigrammes;     
}


function pgcd(a,b) {
  a = Math.abs(a);
  b = Math.abs(b);
  if (b > a) {var temp = a; a = b; b = temp;}
  while (b) {
      temp = b;
      b = a % b;
      a = temp;
  }
  return a;
}
/* console.log(trigramme("KQOWEFVJPUJUUNUKGLMEKJINMWUXFQMKJBGWRLFNFGHUDWUUMB"+
"SVLPSNCMUEKQCTESWREEKOYSSIWCTUAXYOTAPXPLWPNTCGOJBGFQHTDWXIZAYGFFNSXCSEYNCTSSPNTUJNYTGGWZGR"+
"WUUNEJUUQEAPYMEKQHUIDUXFPGUYTSMTFFSHNUOCZGMRUWEYTRGKMEEDCTVRECFBDJQC"+
"USWVBPNLGOYLSKMTEFVJJTWWMFMWPNMEMTMHRSPXFSSKFFSTNUOCZGMDOEOYEEKCPJRGP"+
"MURSKHFRSEIUEVGOYCWXIZAYGOSAANYDOEOYJLWUNHAMEBFELXYVLWNOJNSIOFRWUCCESWKVIDGMUCGOCRUWGNMAAFFVNSIUDEKQHCEUCPFC"+
"MPVSUDGAVEMNYMAMVLFMAOYFNTQCUAFVFJNXKLNEIWCWODCCULWRIFT"+
"WGMUSWOVMATNYBUHTCOCWFYTNMGYTQMKBBNLGFBTWOJFTWGNTEJKNEE"+
"DCLDHWTYYIDGMVRDGMPLSWGJLAGOEEKJOFEKUYTAANYTDWIYBNLNYNP"+
"WEBFNLFYNAJEBFR")); */ // cle =5 
//console.log(trigramme("LFWKIMJCLPSISWKHJOGLKMVGURAGKMKMXMAMJCVXWUYLGGIISWALXAEYCXMFKMKBQBDCLAEFLFWKIMJCGUZUGSKECZGBWYMOACFVMQKYFWXTWMLAIDOYQBWFGKSDIULQGVSYHJAVEFWBLAEFLFWKIMJCFHSNNGGNWPWDAVMQFAAXWFZCXBVELKWMLAVGKYEDEMJXHUXDAVYXL",3,16)); // cle = 6
//console.log(quadrigramme("JCCMFQKDWLFVZQWCSCESXYOAVSXLWARBBVZQEQWEGKZSVKZQXCBVDIIZWIUCVWTJSTZUWKOQKXIDOQJSTCSVRJIZHBRBBISDVRMJJQJOOVGLVBWPSARTNCSCIOQVBBRZIJIZWOKVRCESUVFMKOTVSTCSDFMIZHTVGGVIFMSZKGAFIDIWZVHAVFMWSZDSZTCUDSTVGDRZDVGTVBBVGLLBKFECZZTRUMVBBISLVIFVOCOZMJCUDSQCSUGCZKOQKQMJTITSAUSOZGIEHACSAZZMEQMCOXRWFCSDZRMGFMJECVXIMOQJJCLBNLFMKCCLBMWCCZBMKFIMSZJSZCSURQIUOUCSZLPIEECZRMWWTVSBKCCJQMJFCSOVJGCIZIICCKSMKQMLLYLCVECCJOKTFWTVMJIZCOXFWBIWVVIVACCICCCOCKFMJINWWBUOBKSVUFM",3,20)); // cle = 3
//console.log(bigramme("MFUVAHGUTSGVMFUTUJPPETQSOUCIFP",4,10)) // 3
module.exports = {
    trigramme,
    bigramme,
    quadrigramme
};