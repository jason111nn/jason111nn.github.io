<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
    <xsl:template match="/">
        <html>
            <head>
                <title>Sitemap</title>
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; }
                    h1 { color: #333; }
                    table { width: 100%; border-collapse: collapse; }
                    th, td { padding: 8px; text-align: left; border-bottom: 1px solid #ddd; }
                    th { background-color: #f4f4f4; }
                </style>
            </head>
            <body>
                <h1>網站地圖 (Sitemap)</h1>
                <table>
                    <tr>
                        <th>網址 (URL)</th>
                    </tr>
                    <xsl:for-each select="urlset/url">
                        <tr>
                            <td>
                                <a href="{loc}">
                                    <xsl:value-of select="loc"/>
                                </a>
                            </td>
                        </tr>
                    </xsl:for-each>
                </table>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>
