import { promises as fs } from "fs";




function somenteNumeros(atext: string) {
    var numbers = atext.replace(/[^0-9]/g,'');
    return parseInt(numbers);
}

async function gravaTxt(AFileName:String,AContent:String) {
    try {
      //const content = 'Some content!';
      await fs.writeFile('C:/CRMAME/Node/'+AFileName+'.txt', AContent);
    } catch (err) {
      console.log(err);
    }
  }



async function downloadImageUrl(AUrl:string, APath:string) {
    const response = await fetch(AUrl);
    const blob = await response.blob();
    const arrayBuffer = await blob.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);  
    
    //const imageBase64  = buffer.toString('base64');
    //gravaTxt('aa.buf',imageBase64)
    
    await fs.writeFile(APath, buffer);
}

async function imageUrlToBase64(AUrl:string){
    try {
        const response = await fetch(AUrl);
        const blob = await response.blob();
        const arrayBuffer = await blob.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const imageBase64  = buffer.toString('base64');
        return imageBase64;
      } catch (err) {
        console.log(err);
      }

}

async function imageUrlToBase64DataUrl(AUrl:string) {
    try {
      const response = await fetch(AUrl);  
      const blob = await response.arrayBuffer();  
      const contentType = response.headers.get('content-type');  
      const base64String = `data:${contentType};base64,${Buffer.from(
        blob,
      ).toString('base64')}`;

      //gravaTxt('aa.buf',base64String)
      return base64String;
    } catch (err) {
      console.log(err);
    }
}

  export default {
    imageUrlToBase64,
    imageUrlToBase64DataUrl,
    somenteNumeros,
    downloadImageUrl,
    gravaTxt
}






