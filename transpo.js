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
  //console.log(tab);
  return tab;
}

function transpoTab(text , key, op=0){
  let nb, i, lastLine, output, columns, border; 
  text=fiveTimes(text);
  const textLength=text.length, keyLength =  key.length;
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
    	if (keyTab[i]<lastLine) border=nb+1; else border=nb;
      columns[keyTab[i]]=text.substring(current,current+border);
     // console.log(columns)
    	current+=border;
    }
    
    output="";
    for (j=0;j<nb;j++){
      for (i=0;i<keyLength;i++) output+=columns[i].charAt(j);
      //console.log(output)
    }
    for (i=0;i<lastLine;i++) output+=columns[i].charAt(nb);
   
    }
    //console.log(output);
    return output;
}
function fiveTimes(plain){
  let ret="", pad= 5 - plain.length % 5;
  if( pad !== 5){
    plain+= randomCharGenerator(pad);
  }
return plain;
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
module.exports = {
  transpoTab
};