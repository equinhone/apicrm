import * as fs from 'fs';





export async function ImportaContatosJson(): Promise<void> {
    try {
        const jsonString = fs.readFileSync('D:\Desenvolvimento\Projetos\apicrm\import\response.json', 'utf-8');
        const jsonData = JSON.parse(jsonString);

        for (const key in jsonData) {  
            console.log(`${key}: ${jsonData[key]}`)
          }


        // Do something with the parsed data
    } catch (err) {
        console.error(err);
    }
}
