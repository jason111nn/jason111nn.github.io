const fs = require('fs');
const axios = require('axios');
const path = require('path');

const GITHUB_USERNAME = 'jason111nn';
const BASE_URL = 'https://jason111nn.github.io';
const OUTPUT_XML = path.join(__dirname, '../sitemap.xml');

// 確保 scripts 資料夾存在
const OUTPUT_DIR = path.join(__dirname, '');  // 這裡指定為當前目錄，因為放在 scripts/ 裡

if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function generateSitemap() {
    try {
        const response = await axios.get(`https://api.github.com/users/${GITHUB_USERNAME}/repos`);
        const repos = response.data;

        if (!Array.isArray(repos) || repos.length === 0) {
            throw new Error('❌ 沒有找到任何 GitHub Repositories');
        }

        let sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n`;
        sitemap += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
        sitemap += `  <url>\n    <loc>${BASE_URL}/</loc>\n  </url>\n`;  // 首頁

        let hasUrls = false;

        repos.forEach((repo) => {
            if (!repo.fork) {
                sitemap += `  <url>\n    <loc>${BASE_URL}/${repo.name}/</loc>\n  </url>\n`;
                hasUrls = true;
            }
        });

        sitemap += `</urlset>`;

        if (!hasUrls) {
            throw new Error('❌ 沒有有效的 URL 被加入 sitemap.xml');
        }

        fs.writeFileSync(OUTPUT_XML, sitemap);
        console.log('✅ sitemap.xml 生成成功！');
    } catch (error) {
        console.error('❌ 錯誤:', error);
    }
}
console.log('✅ sitemap.xsl 生成成功！');

generateSitemap();
