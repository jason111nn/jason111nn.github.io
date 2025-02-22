<?xml version="1.0" encoding="UTF-8"?>
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
</xsl:stylesheet>