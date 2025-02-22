const fs = require('fs');
const axios = require('axios');
const path = require('path');

const GITHUB_USERNAME = 'jason111nn';  // 你的 GitHub 使用者名稱
const BASE_URL = 'https://jason111nn.github.io';  // 你的 GitHub Pages 網址
const OUTPUT_FILE = path.join(__dirname, '../sitemap.html');  // 儲存成 HTML 文件

async function generateSitemap() {
    try {
        // 取得 GitHub 使用者的公開專案資料
        const response = await axios.get(`https://api.github.com/users/${GITHUB_USERNAME}/repos`);
        const repos = response.data;

        let sitemap = `<!DOCTYPE html>
                       <html lang="en">
                       <head>
                       <meta charset="UTF-8">
                       <meta name="viewport" content="width=device-width, initial-scale=1.0">
                       <title>Sitemap</title>
                       </head>
                       <body>
                           <h1>Your Sitemap</h1>
                           <p>This is your sitemap file content:</p>
                       <ul>\n`;

        // 遍歷所有的專案，並將它們加入到 HTML 中
        repos.forEach((repo) => {
            if (!repo.fork) {  // 排除 fork 的專案
                sitemap += `<li><a href="${BASE_URL}/${repo.name}/">${repo.name}</a></li>\n`;
            }
        });

        sitemap += `    </ul>
</body>
</html>`;

        // 儲存 sitemap.html 到根目錄
        fs.writeFileSync(OUTPUT_FILE, sitemap);
        console.log('✅ sitemap.html 生成成功！');
    } catch (error) {
        console.error('❌ 無法獲取 GitHub Repos:', error);
    }
}

generateSitemap();
