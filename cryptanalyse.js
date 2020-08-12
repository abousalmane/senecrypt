function sortbyoccurences(a,b)
{
    return parseInt(b.occurences) - parseInt(a.occurences);
}
ecartList = (objTrig) =>{
  objTrig["ecart"]=[];
    for(let i = 0; i< objTrig["pos"].length - 1;i++)
    {
        for(let j = i+1; j<objTrig["pos"].length;j++)
            objTrig["ecart"].push(Math.abs(objTrig["pos"][j] - objTrig["pos"][i]))  ;

    }
}
// Calcul le pgcd de tous les ecart puis retournent ceux ayant le plus doccurrences situe entre KeyMin et KeyMax
pgcdList = (listEcart, keyMin,keyMax) =>{
  let pgcdEcart=[];
    for(let i = 0; i< listEcart.length - 1;i++)   {  
        for(let j = i+1; j<listEcart.length;j++)
        {
           let currPgcd =  pgcd(listEcart[j], listEcart[i])
           if( currPgcd >= keyMin  && currPgcd <= keyMax )
           pgcdEcart.push(currPgcd);
        }
            
    }
    console.log(" tous les pgcddes ecart ---"+ pgcdEcart);
   
    // retourne un objet qui a pour cle les pgcd et pour occurences leurs nombres doccurences
    let pgcdObjt = pgcdEcart.reduce( (acc, curr) =>{
      acc[curr] ? acc[curr]++ : acc[curr] = 1;
      return acc; 
    },{});
  return Object.keys(pgcdObjt).sort( (a,b)=>{ return  pgcdObjt[b] - pgcdObjt[a]});

   
}


function trigramme(texte, keymin=3, keyMax=25)
{
	var trigrammes=new Array(17576);
	var alphabet='ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	
	var i;
	var j;
	var k;
    var sortie='';
    
    //texte=formate_stat_entree(texte);
    
    sortie+="Nombre de caracteres analysés du texte : "+texte.length+"\n";


   // On commence par initialiser le tableau des bigrammes...
   for (i=0;i<26;i++)
     for (j=0;j<26;j++)
       for (k=0;k<26;k++)
       {
       	  trigrammes[i*26*26+j*26+k]=new Object;
       	  trigrammes[i*26*26+j*26+k]["nom"]=alphabet.charAt(i)+alphabet.charAt(j)+alphabet.charAt(k);;
          trigrammes[i*26*26+j*26+k]["occurences"]=0;
          trigrammes[i*26*26+j*26+k]["pos"]=[];
       }
       
  //On le remplit!
  
  for (i=0;i<texte.length-2;i++)
  {
    trigrammes[alphabet.indexOf(texte.charAt(i))*26*26+alphabet.indexOf(texte.charAt(i+1))*26+alphabet.indexOf(texte.charAt(i+2))]["occurences"]++;
    trigrammes[alphabet.indexOf(texte.charAt(i))*26*26+alphabet.indexOf(texte.charAt(i+1))*26+alphabet.indexOf(texte.charAt(i+2))]["pos"].push(i+1);
  
  }     
       
  //On trie le tableau
  trigrammes.sort(sortbyoccurences);
  // my add   
    i=0;
  while(trigrammes[i]["occurences"]>1)
       {ecartList(trigrammes[i]);
          // sortie+=trigrammes[i]["nom"]+" : "+trigrammes[i]["occurences"]+"--"+"Position "+trigrammes[i]["pos"]+"--ecart--"+trigrammes[i]["ecart"] + "\n";
           i++;
       }     
       trigrammes = trigrammes.slice(0,i) ;       
  let allEcart = trigrammes.reduce((accumulator, obj) => accumulator.concat(obj["ecart"]),[] );
  let listPgcd = pgcdList(allEcart,keymin,keyMax);
  trigrammes.push({"LougueurCle" : listPgcd}) ;
  console.log("Tous les ecarts"+allEcart + " -- total " + allEcart.length);
  console.log(" --------------------- ------------------------  ");
  console.log(" Longueur Cle Probable " + listPgcd) 
 	return trigrammes;	
	
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
//console.log(trigramme("LFWKIMJCLPSISWKHJOGLKMVGURAGKMKMXMAMJCVXWUYLGGIISWALXAEYCXMFKMKBQBDCLAEFLFWKIMJCGUZUGSKECZGBWYMOACFVMQKYFWXTWMLAIDOYQBWFGKSDIULQGVSYHJAVEFWBLAEFLFWKIMJCFHSNNGGNWPWDAVMQFAAXWFZCXBVELKWMLAVGKYEDEMJXHUXDAVYXL",5,16)); // cle = 6
// console.log(trigramme("JCCMFQKDWLFVZQWCSCESXYOAVSXLWARBBVZQEQWEGKZSVKZQXCBVDIIZWIUCVWTJSTZUWKOQKXIDOQJSTCSVRJIZHBRBBISDVRMJJQJOOVGLVBWPSARTNCSCIOQVBBRZIJIZWOKVRCESUVFMKOTVSTCSDFMIZHTVGGVIFMSZKGAFIDIWZVHAVFMWSZDSZTCUDSTVGDRZDVGTVBBVGLLBKFECZZTRUMVBBISLVIFVOCOZMJCUDSQCSUGCZKOQKQMJTITSAUSOZGIEHACSAZZMEQMCOXRWFCSDZRMGFMJECVXIMOQJJCLBNLFMKCCLBMWCCZBMKFIMSZJSZCSURQIUOUCSZLPIEECZRMWWTVSBKCCJQMJFCSOVJGCIZIICCKSMKQMLLYLCVECCJOKTFWTVMJIZCOXFWBIWVVIVACCICCCOCKFMJINWWBUOBKSVUFM")); // cle = 
module.exports = {
    trigramme
};