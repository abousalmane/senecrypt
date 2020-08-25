var alphabet= 'ABCDEFGHIJKLMNOPQRSTUVXYZ';
/* 
function standard(entree)
{
  entree.value=entree.value.toUpperCase();
  longueur = entree.value.length;
  entree_standard='';
  for (i=0; i<longueur; i++)
  {
    if (alphabet.indexOf(entree.value.charAt(i))!=-1)
    {
      entree_standard += entree.value.charAt(i)
    }
  }
  entree.value = entree_standard;
}
 */
function creerGrille (clef)
{
	let grille  = '';
	for(let nbr = 0; nbr < Math.min(clef.length,25); nbr++){
		ch= clef.charAt(nbr)
		if (grille.indexOf (ch) < 0) {
			grille += ch
		}
	}
	for(let nbr = 0; nbr < alphabet.length; nbr++){
		ch= alphabet.charAt(nbr)
		if (grille.indexOf (ch) < 0) {
			grille += ch
		}
	}
	return grille
}

function playfair(entree, clef,op)
{
	let matrice = creerGrille(clef);
	let sortie = ""; 
	if(op === 0){
		for(let nbr = 0; nbr < entree.length; nbr=nbr+2){
			let  ch1   = entree.charAt(nbr), ch2   = entree.charAt(nbr+1);
				  if (ch1 === ch2) {ch2="X"; nbr=nbr-1};    // elimine les doublons
			  let ord1  = matrice.indexOf(ch1);
			  let ligne1 = Math.floor(ord1 / 5);
			  let col1  = ord1 % 5;
			  let ord2  = matrice.indexOf(ch2);
			  let ligne2 = Math.floor(ord2 / 5);
			  let col2  = ord2 % 5;
			  if (ligne1 === ligne2) {
				  sortie+= matrice.charAt(5*ligne1 + (col1 + 1)%5);
				  sortie+= matrice.charAt(5*ligne2 + (col2 + 1)%5);
			  } else if (col1 === col2) {
				  sortie+= matrice.charAt(col1 + 5*((ligne1+1)%5));
				  sortie+= matrice.charAt(col2 + 5*((ligne2+1)%5));
			  } else {
				  sortie+= matrice.charAt(5*ligne1 + col2);
				  sortie+= matrice.charAt(5*ligne2 + col1);
			  }
		  }
	}
	else if(op === 1){
		for(let nbr = 0; nbr < entree.length; nbr=nbr+2){
			let ch1   = entree.charAt(nbr),
		      ch2  = entree.charAt(nbr+1),
		   	 ord1  = matrice.indexOf(ch1);
			 ligne1 = Math.floor(ord1 / 5),
			 col1  = ord1 % 5,
			 ord2  = matrice.indexOf(ch2),
			 ligne2 = Math.floor(ord2 / 5),
			 col2  = ord2 % 5;
			 if (ligne1 == ligne2) {
				 sortie += matrice.charAt(5*ligne1 + (col1 + 4)%5);
				 sortie += matrice.charAt(5*ligne2 + (col2 + 4)%5);
			 } else if (col1 == col2) {
				 sortie+= matrice.charAt(col1 + 5*((ligne1+4)%5));
				 sortie+= matrice.charAt(col2 + 5*((ligne2+4)%5));
			 } else {
				 sortie+= matrice.charAt(5*ligne1 + col2);
				 sortie+= matrice.charAt(5*ligne2 + col1);
			 }
		 }
	}
	return sortie+matrice;
}
function polybe(entree,cle,op)
{
	var cle=creerGrille(cle);
	var carre=[[],[],[],[],[]];
	let i=0;
	for(let c=0; c<5; c++){
		carre[c]=cle.substring(i,i+5).split(''); i+=5;
	}
     var substi=new Array(25);	
	 var alphabet_polybe='12345';
    for (i=0;i<25;i++) 
       substi[i]="";

	//var entree=formate_entree_polybe(entree.value);
	// On commence par faire le carré de Polybe;..
	for (i=0;i<5;i++)
	  for (var j=0;j<5;j++)
	  {
	    substi[alphabet.indexOf(carre[i][j])]=alphabet_polybe.charAt(i)+alphabet_polybe.charAt(j);
	  }
	var sortie="";
	
	  if(op===0){
		for (i=0;i<entree.length;i++)
			sortie+=substi[alphabet.indexOf(entree.charAt(i))];
		// completer "sortie" pour quel soit multiple de 5
		let l = 5-sortie.length%5;
		if(l!==5){
			i=0;
			for(i=0;i<l;i++){
				sortie+=Math.floor(Math.random()*5)+1; // add random int from 1 to 5
			}
		}
  }
	  else if(op===1){
		  
		let l = entree.length%2===0 ? entree.length/2 : (entree.length-1)/2; 
		for (i=0;i<l;i++)
			 sortie+=carre[parseInt(entree.charAt(2*i)-1,10)][parseInt(entree.charAt(2*i+1)-1,10)];
	  }
	return sortie+cle;
}
//console.log(polybe("CACHELORDANSLASOUCHEDELARBRE","EXEMPLEPLAYFAIR",0)) ;
//console.log(polybe("322132351115442533214351152151445332351133111521253125113432","EXEMPLEPLAYFAIR",1));


module.exports = {
	playfair,
	polybe

}