"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { zokou } = require("../framework/france");
france({ nomCom: "repo", reaction: "😌", nomFichier: __filename }, async (dest, zk, commandeOptions) => {


const githubRepo = 'https://api.github.com/repos/franceking1/Flash-Md';
const img = 'https://telegra.ph/file/f1f2303ff4e39b0a3b6b3.jpg';


    const response = await fetch(githubRepo); 
        const data = await response.json(); 

        if (data) {
            const repoInfo = {
                stars: data.stargazers_count,
                forks: data.forks_count,
                lastUpdate: data.updated_at,
                owner: data.owner.login
            };
const releaseDate = new Date(data.created_at).toLocaleDateString('en-GB');
            const lastUpdateDate = new Date(repoInfo.lastUpdate).toLocaleDateString('en-GB');

const gitdata = `Hello 👋 
This is *FLASH-MD* The following is *FLASH-MD's*
*REPOSITORY:* ${data.html_url}
✨ *STARS:* ${repoInfo.stars}
🧧 *FORKS:* ${repoInfo.forks}
📅 *RELEASED:* ${releaseDate}
🕐 *LAST UPDATED:* ${lastUpdateDate}
👨‍💻 *CRETOR:* *France King®🐐🔵*`;


await zk.sendMessage(dest, { image: { url: img }, caption: gitdata });

} else {
console.log("Could not fetch data")

}


});

   /* let z = 'Hello This is  *FLASH-MD* \n\n ' + "The Following is *FLASH-MD Repo.*";
    let d = ' https://github.com/franceking1/Flash-Md';
    let varmess = z + d;
    var img = 'https://telegra.ph/file/f1f2303ff4e39b0a3b6b3.jpg';
    await zk.sendMessage(dest, { image: { url: img }, caption: varmess });
    //console.log("montest")
});
console.log("mon test");*/
