const fs = require('fs');
const axios = require('axios');
const path = require('path');

const GITHUB_USERNAME = 'jason111nn';  // GitHub 使用者名稱
const BASE_URL = 'https://jason111nn.github.io';  // GitHub Pages 網址
const OUTPUT_FILE = path.join(__dirname, '../sitemap.xml');  // 存到根目錄

async function generateSitemap() {
    try {
        console.log('📡 正在獲取 GitHub Repositories...');
        const response = await axios.get(`https://api.github.com/users/${GITHUB_USERNAME}/repos`);
        const repos = response.data;

        if (!Array.isArray(repos) || repos.length === 0) {
            console.error('❌ 無法獲取 GitHub Repositories，請檢查 API 是否成功。');
            return;
        }

        console.log(`✅ 成功獲取 ${repos.length} 個 Repositories！`);

        let sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n`;
        sitemap += `<?xml-stylesheet type="text/xsl" href="sitemap.xsl"?>\n`;  // 引用 XSL
        sitemap += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
        sitemap += `  <url>\n    <loc>${BASE_URL}/</loc>\n  </url>\n`;  // 首頁

        repos.forEach((repo) => {
            if (!repo.fork) {  // 排除 fork 的專案
                sitemap += `  <url>\n    <loc>${BASE_URL}/${repo.name}/</loc>\n  </url>\n`;
            }
        });

        sitemap += `</urlset>`;

        console.log('📁 正在寫入 sitemap.xml...');
        fs.writeFileSync(OUTPUT_FILE, sitemap);
        console.log('✅ sitemap.xml 生成成功！');

    } catch (error) {
        console.error('❌ 發生錯誤：', error);
    }
}

generateSitemap();
