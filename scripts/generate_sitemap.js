const fs = require('fs');
const axios = require('axios');
const path = require('path');

const GITHUB_USERNAME = 'jason111nn';  // GitHub 使用者名稱
const BASE_URL = 'https://jason111nn.github.io';  // GitHub Pages 網址
const OUTPUT_FILE = path.join(__dirname, '../sitemap.xml');  // 存到根目錄

async function generateSitemap() {
    try {
        console.log('正在獲取 GitHub 專案資料...');
        // 如果需要避免 API 限制，可在此加入 GitHub Token：
        // headers: { Authorization: `token YOUR_GITHUB_TOKEN` }
        const response = await axios.get(`https://api.github.com/users/${GITHUB_USERNAME}/repos`);
        const repos = response.data;

        if (!Array.isArray(repos) || repos.length === 0) {
            console.error('❌ 未獲取到任何專案資料，請檢查 API 回應或是否達到限額');
            return;
        }
        console.log(`✅ 成功獲取到 ${repos.length} 個專案`);

        let sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n`;
        sitemap += `<?xml-stylesheet type="text/xsl" href="sitemap.xsl"?>\n`;  // 可選的 XSL 樣式參考
        sitemap += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
        sitemap += `  <url>\n    <loc>${BASE_URL}/</loc>\n  </url>\n`;  // 首頁

        repos.forEach((repo) => {
            if (!repo.fork) {  // 排除 fork 的專案
                sitemap += `  <url>\n    <loc>${BASE_URL}/${repo.name}/</loc>\n  </url>\n`;
            }
        });

        sitemap += `</urlset>`;

        console.log(`生成的 sitemap.xml 內容長度：${sitemap.length} bytes`);

        // 使用 UTF-8 格式寫入檔案
        fs.writeFileSync(OUTPUT_FILE, sitemap, 'utf8');
        console.log('✅ sitemap.xml 生成成功，儲存在：', OUTPUT_FILE);
    } catch (error) {
        console.error('❌ 發生錯誤：', error);
    }
}

generateSitemap();
