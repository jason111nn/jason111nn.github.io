const fs = require('fs');
const axios = require('axios');
const path = require('path');

const GITHUB_USERNAME = 'jason111nn';  // GitHub 使用者名稱
const BASE_URL = 'https://jason111nn.github.io';  // GitHub Pages 網址
const OUTPUT_SITEMAP = path.join(__dirname, '../sitemap.xml');  // 存到根目錄
const OUTPUT_XSL = path.join(__dirname, '../sitemap.xsl');  // XSL 檔案

async function generateSitemap() {
    try {
        console.log('正在獲取 GitHub 專案資料...');
        const response = await axios.get(`https://api.github.com/users/${GITHUB_USERNAME}/repos`);
        const repos = response.data;

        if (!Array.isArray(repos) || repos.length === 0) {
            console.error('❌ 未獲取到任何專案資料');
            return;
        }
        console.log(`✅ 成功獲取到 ${repos.length} 個專案`);

        let sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n`;
        sitemap += `<?xml-stylesheet type="text/xsl" href="sitemap.xsl"?>\n`;  // 讓 XML 讀取 XSL 樣式
        sitemap += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
        sitemap += `  <url>\n    <loc>${BASE_URL}/</loc>\n  </url>\n`;  // 首頁

        repos.forEach((repo) => {
            if (!repo.fork) {
                sitemap += `  <url>\n    <loc>${BASE_URL}/${repo.name}/</loc>\n  </url>\n`;
            }
        });

        sitemap += `</urlset>`;

        // 生成 sitemap.xml
        fs.writeFileSync(OUTPUT_SITEMAP, sitemap, 'utf8');
        console.log('✅ sitemap.xml 生成成功！');

        // 生成 sitemap.xsl (讓瀏覽器顯示美觀)
        const xslContent = `<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:template match="/">
        <html>
            <head>
                <title>網站地圖 - Sitemap</title>
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; }
                    h1 { color: #0073e6; }
                    table { border-collapse: collapse; width: 100%; }
                    th, td { border: 1px solid #ddd; padding: 8px; }
                    th { background-color: #f4f4f4; }
                </style>
            </head>
            <body>
                <h1>網站地圖 (Sitemap)</h1>
                <table>
                    <tr>
                        <th>#</th>
                        <th>頁面 URL</th>
                    </tr>
                    <xsl:for-each select="urlset/url">
                        <tr>
                            <td><xsl:value-of select="position()"/></td>
                            <td><a href="{loc}"><xsl:value-of select="loc"/></a></td>
                        </tr>
                    </xsl:for-each>
                </table>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>`;

        fs.writeFileSync(OUTPUT_XSL, xslContent, 'utf8');
        console.log('✅ sitemap.xsl 生成成功！');
    } catch (error) {
        console.error('❌ 發生錯誤：', error);
    }
}

generateSitemap();
