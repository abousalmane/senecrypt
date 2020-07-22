function formatCrypto( str){
   
    let ret="", pad= 5 - str.length % 5;
    if( pad !== 0){
      str+= randomCharGenerator(pad);
      console.log(str)
  
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