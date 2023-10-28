 const { Octokit } = require('@octokit/core');
const fs = require('fs');
const path = require('path');

const octokit = new Octokit();

const owner = '92835792385729572'; 
const repo = '554y54552725737yh';
async function downloadRepoFiles() {
  try {
    const response = await octokit.request('GET /repos/{owner}/{repo}/contents', {
      owner,
      repo,
    });

    for (const item of response.data) {
      if (item.type === 'file') {
        const fileContent = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
          owner,
          repo,
          path: item.path,
        });

        const filePath = path.join(__dirname, item.path);
        fs.writeFileSync(filePath, Buffer.from(fileContent.data.content, 'base64'));

        console.log(`Downloaded: ${item.path}`);
      }
    }

    console.log('All files downloaded successfully.');
  } catch (error) {
    console.error('Error downloading repository:', error);
  }
}

console.log("Updating..")
downloadRepoFiles();
console.log("Finished Updating")