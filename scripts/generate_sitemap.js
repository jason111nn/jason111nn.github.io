const fs = require('fs');
const axios = require('axios');
const path = require('path');

const GITHUB_USERNAME = 'jason111nn';
const BASE_URL = 'https://jason111nn.github.io';
const OUTPUT_FILE = path.join(__dirname, '../sitemap.xml');

async function generateSitemap() {
    try {
        const response = await axios.get(`https://api.github.com/users/${GITHUB_USERNAME}/repos`);
        const repos = response.data;

        let sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n`;
        sitemap += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
        sitemap += `  <url>\n    <loc>${BASE_URL}/</loc>\n    <lastmod>2025-02-22</lastmod>\n    <priority>1.00</priority>\n  </url>\n`;

        repos.forEach((repo) => {
            if (!repo.fork) {
                sitemap += `  <url>\n    <loc>${BASE_URL}/${repo.name}/</loc>\n    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>\n    <priority>0.80</priority>\n  </url>\n`;
            }
        });

        sitemap += `</urlset>`;

        fs.writeFileSync(OUTPUT_FILE, sitemap);
        console.log('✅ sitemap.xml 生成成功！');
    } catch (error) {
        console.error('❌ 無法獲取 GitHub Repos:', error);
    }
}

generateSitemap();
