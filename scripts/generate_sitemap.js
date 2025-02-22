const fs = require('fs');
const axios = require('axios');
const path = require('path');

const GITHUB_USERNAME = 'jason111nn';
const BASE_URL = 'https://jason111nn.github.io';
const OUTPUT_XML = path.join(__dirname, '../sitemap.xml');
const OUTPUT_XSL = path.join(__dirname, '../docs/sitemap.xsl'); // 改到 docs/

async function generateSitemap() {
    try {
        const response = await axios.get(`https://api.github.com/users/${GITHUB_USERNAME}/repos`);
        const repos = response.data;

        if (!Array.isArray(repos) || repos.length === 0) {
            throw new Error('❌ 沒有找到任何 GitHub Repositories');
        }

        let sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n`;
        sitemap += `<?xml-stylesheet type="text/xsl" href="docs/sitemap.xsl"?>\n`;
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

// 確保 sitemap.xsl 也被生成
const XSL_CONTENT = `<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:template match="/">
        <html>
        <head>
            <title>網站地圖 - Jason's GitHub Pages</title>
            <style>
                body { font-family: Arial, sans-serif; }
                table { border-collapse: collapse; width: 100%; }
                th, td { border: 1px solid #ddd; padding: 8px; }
                th { background-color: #f2f2f2; }
            </style>
        </head>
        <body>
            <h2>網站地圖</h2>
            <table>
                <tr>
                    <th>網址</th>
                </tr>
                <xsl:for-each select="urlset/url">
                    <tr>
                        <td><a href="{loc}"><xsl:value-of select="loc"/></a></td>
                    </tr>
                </xsl:for-each>
            </table>
        </body>
        </html>
    </xsl:template>
</xsl:stylesheet>`;

fs.writeFileSync(OUTPUT_XSL, XSL_CONTENT);
console.log('✅ sitemap.xsl 生成成功！');

generateSitemap();
