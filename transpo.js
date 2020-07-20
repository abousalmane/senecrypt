// This function create a numerique key ordered by given keyword letters position
function createKeyTab(keyText)
{
  var tab=new Array(keyText.length);
  var pos,i,j;
  var alphabet='ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  
  
  pos=0;
  
  for (j=0;j<26;j++)
  {
    for (i=0;i<keyText.length;i++)
    {
    	if (keyText.charAt(i)==alphabet.charAt(j)) 
    	{
    		tab[pos]=i;
    		pos++;
    	}
    	
    }
  }
  console.log(tab);
  return tab;
}

function transpoTab(text , key, op=0){
  let nb, i, lastLine, output;
  let columns, border; 
  const textLength=text.length, keyLength =  key.length;
	 // key=formate_entree(key);
	 nb=Math.floor(textLength/keyLength);
   lastLine=textLength-nb*keyLength;
   const keyTab= createKeyTab(key);
   columns=new Array(keyLength);
  if(op===0){

      for (i=0;i<keyLength;i++) {

      if (i<lastLine) border=nb+1; else border=nb;
      columns[i]="";
      for (j=0;j<border;j++)
      {
        columns[i]+=text.charAt(j*keyLength+i);
      }
    }
    // On releve par les columns...
    
    output="";
    for (i=0; i<keyLength; i++){
    	output+=columns[keyTab[i]];
    }
  }
    else if(op===1){
      
    columns=new Array(keyLength);
    current=0;
    
    for (i=0;i<keyLength;i++)
    {
    	if (keyTab.indexOf(i)<lastLine) border=nb+1; else border=nb;
      columns[keyTab[i]]=text.substring(current,current+border);
      console.log(columns)
    	current+=border;
    }
    
    output="";
    for (j=0;j<nb;j++){
      for (i=0;i<keyLength;i++) output+=columns[i].charAt(j);
      console.log(output)
    }
    for (i=0;i<lastLine;i++) output+=columns[i].charAt(nb);
   
    }
    console.log(output);
    return output;
}