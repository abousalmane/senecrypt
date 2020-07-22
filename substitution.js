
function inverseModulo26(a) { 
				for(let i=0; i<26;i++)
				{
					if(a*i%26===1)
						return i;
				} 
				return 0;
			}

	function formatText(text)
		{
			let textformated= text.toUpperCase().replace(/\s/g, '');
			
			return textformated;
		}
	function cesar(text, key, operation = 0)
	{
    		let alphabet= ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
			let result="";
			if(operation === 0)
			{
				for(let i of  text)
				{
					result+=String.fromCharCode( (i.charCodeAt()-65+key)%26 + 65	) ;
				}
			
			}
			else if (operation === 1)
			{
				
				for(let i of  text)
				{
					result+=String.fromCharCode( (i.charCodeAt()-65-key + 26)%26 + 65	) ;
				}
			}
			return result;
	}
  
  function affine(text,cle1,cle2,operation=0) // Verifier avant validation de la saisi que cle1 != 0
  {
	  // le code de verification cle1 inversible modulo 26 devra etre transferer cote client pour plus doptimisation
	  if (inverseModulo26(cle1)===0) {
		  return 0;
	  }
		  
	cle2 = ((cle2 % 26) + 26) % 26; // Au cas ou la cle2 est negative ou superieur a 26 on prendre sa valeur dans (Z/26Z)+
	                                // Ainsi toute cle2 peut etre nimporte quel nombre
	// text=formatText(text);
	
	let result="";
	if(operation === 0)	{
			for(let i of text)
		{
			result+=String.fromCharCode(((cle1*(i.charCodeAt()-65) + cle2 )%26) + 65 ); // y = a*x+b 65 est le code asci de 'A' 
		
		}
	}
	else if(operation === 1){
		let inverseCle1= inverseModulo26(cle1);
		for(let i of text)
		{
			result+=String.fromCharCode(((inverseCle1*(i.charCodeAt()-65 - cle2))%26) + 65 ); // y = a*x+b
		}	
	}
	return result;
  }


  const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  
  function vigenereFamily(text, keyword, xOp, yOp, operation=0) {
	
	if(operation===0){
		let ciphertext = "";
  
	let j = 0;
	for (let i = 0, l= text.length; i<l; i++) {              /* Iterate our plaintext- character by character. */
	  
	  const inputCharacter = text[i];                           /* Store our current plaintext character.  */
	  const inputCharacterIndex = ALPHABET.indexOf(inputCharacter);  /* Store it's index in the alphabet.       */
  
	  /*
	  if (inputCharacterIndex === -1) {  // If our current plaintext character is not included in the alphabet  
		cipherText += inputCharacter;    // directly add it to our ciphertext. Since we are not encrypting      
		continue;                        // it anyways, we can directly move on with the next character.        
	  }
	  */
  
	  const keywordCharacter = keyword[j];                                 /* Our current keyword character.    */         
	  const keywordCharacterIndex = ALPHABET.indexOf(keywordCharacter);    /* It's index in the alphabet.       */
  
	  const indicesSum = (xOp*inputCharacterIndex) + (yOp*keywordCharacterIndex) + 26;           /* We add both indices.         */
  
	  const cipherCharacterIndex = indicesSum % 26;                   /* If it's greater than the length of     */
																	  /* the alphabet we subtract it's length.  */
	  const cipherTextCharacter = ALPHABET[cipherCharacterIndex]; /* We map the alphabet's letter to this index.*/
  
	  j = j === keyword.length - 1 ? 0 : j + 1;             /* If we reached the keyword's end start again      */   
															/* from the beginning by setting it's pointer to 0. */
  
	  ciphertext += cipherTextCharacter;     /* Finally add our current ciphertext character to our ciphertext. */
	}
  
	return ciphertext;
	}
	else if(operation === 1){
		
	let plaintext = "";
  
	let j = 0;
	for (let i = 0, l = text.length; i<l; i++) {                      /* Iterate our ciphertext- character by character. */
		 
	  const ciphertextCharacter = text[i];                                /* Store our current plaintext character. */
	  const ciphertextCharacterIndex = ALPHABET.indexOf(ciphertextCharacter);   /* Store it's index in the alphabet.      */
	  
	/*  if (ciphertextCharacterIndex === -1) {      // If our current ciphertext character is not included in our alphabet 
		plaintext += ciphertextCharacter;          // directly add it to our plaintext without any decryption.            
		continue;                                  // Stop here and jump to the next interation.                         
	  } */
		  
	  const keyCharacter = keyword[j];                                                   /* Store our current key character.  */  
	  const keyCharacterIndex = ALPHABET.indexOf(keyCharacter);                      /* Store it's index in the alphabet. */
  
	  const indicesSum = (xOp*ciphertextCharacterIndex) - (yOp*keyCharacterIndex) + 26;                      /* Subtract both indices */
																					   /* and add the alphabets's length. */    
  
	  const cipherCharacterIndex = indicesSum % 26;                             /* If it's greater than the length of     */
																				/* the alphabet we subtract it's length.  */
	  
	  const cipherCharacter = ALPHABET[cipherCharacterIndex];              /* We map the alphabet's letter to this index. */
  
	  /*     console.log(
		`${input[i]}(${inputCharacterIndex}), ${key[j]}(${keyCharacterIndex}) => 
  ${inputCharacterIndex} - ${keyCharacterIndex} + 26 = ${indicesSum} 
  ${indicesSum} % 26 = ${cipherCharacterIndex} 
  => ${cipherCharacter}(${cipherCharacterIndex})`
	  ); */
  
	  j = j === keyword.length - 1 ? 0 : j + 1;                               /* If we reached the keyword's end start again  */   
																	  /* from the beginning by setting it's pointer to 0. */
  
	  plaintext += cipherCharacter;                     /* Finally add our current plaintext character to our ciphertext. */
	}
  
	return plaintext;
	}
  }
  function vigenere (text,key,operation=0, algoFamily=vigenereFamily){
	if(operation === 0)
	 	return	algoFamily(text,key,1,1,0);
	else if(operation===1)
		 return algoFamily(text,key, 1,1,1)
}
  function allemande (text,key,operation=0, algoFamily=vigenereFamily){ // y= x - k = clair - clé; x= y + k
	if(operation === 0)
	 	return	algoFamily(text,key,1,-1,0);
	else if(operation===1)
		 return algoFamily(text,key,1,-1,1)
}
function beaufort (text,key,operation=0, algoFamily=vigenereFamily){  // y= k-x = cle - clair   ; x = k-y  
	if(operation === 0)
	 	return	algoFamily(text,key,-1,1,0);
	else if(operation===1)
		 return algoFamily(text,key,-1,-1,1);
}


  module.exports = {
	 cesar,
	 affine,
	 vigenere,
	 beaufort,
	 allemande

  };

