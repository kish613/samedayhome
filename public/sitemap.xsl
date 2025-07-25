<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <title>XML Sitemap - Same Day Home Buyer</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <style type="text/css">
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
            color: #333;
            background: #f8f9fa;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
          }
          h1 {
            color: #1e3a8a;
            font-size: 32px;
            margin-bottom: 10px;
          }
          .intro {
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            margin-bottom: 30px;
          }
          .intro p {
            margin: 10px 0;
            line-height: 1.6;
          }
          table {
            width: 100%;
            background: white;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          }
          th {
            background: #1e3a8a;
            color: white;
            padding: 15px;
            text-align: left;
            font-weight: 600;
          }
          td {
            padding: 12px 15px;
            border-bottom: 1px solid #e5e7eb;
          }
          tr:last-child td {
            border-bottom: none;
          }
          tr:hover {
            background: #f3f4f6;
          }
          a {
            color: #2563eb;
            text-decoration: none;
          }
          a:hover {
            text-decoration: underline;
          }
          .priority {
            font-weight: 600;
          }
          .priority-high { color: #059669; }
          .priority-med { color: #f59e0b; }
          .priority-low { color: #6b7280; }
          .stats {
            display: flex;
            gap: 20px;
            margin-bottom: 20px;
          }
          .stat-card {
            background: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            flex: 1;
          }
          .stat-value {
            font-size: 24px;
            font-weight: bold;
            color: #1e3a8a;
          }
          .stat-label {
            color: #6b7280;
            font-size: 14px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>XML Sitemap</h1>
          
          <div class="intro">
            <p><strong>This is an XML Sitemap</strong> for <a href="https://samedayhomebuyer.co.uk">samedayhomebuyer.co.uk</a></p>
            <p>This sitemap contains all URLs that search engines should crawl and index. It helps search engines like Google discover and understand the structure of the website.</p>
            <p>For more information about sitemaps, visit <a href="https://www.sitemaps.org/" target="_blank">sitemaps.org</a>.</p>
          </div>

          <div class="stats">
            <div class="stat-card">
              <div class="stat-value"><xsl:value-of select="count(sitemap:urlset/sitemap:url)"/></div>
              <div class="stat-label">Total URLs</div>
            </div>
            <div class="stat-card">
              <div class="stat-value"><xsl:value-of select="count(sitemap:urlset/sitemap:url[sitemap:priority >= 0.8])"/></div>
              <div class="stat-label">High Priority Pages</div>
            </div>
            <div class="stat-card">
              <div class="stat-value"><xsl:value-of select="count(sitemap:urlset/sitemap:url[contains(sitemap:loc, '/blog/')])"/></div>
              <div class="stat-label">Blog Posts</div>
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th style="width: 50%">URL</th>
                <th>Priority</th>
                <th>Change Frequency</th>
                <th>Last Modified</th>
              </tr>
            </thead>
            <tbody>
              <xsl:for-each select="sitemap:urlset/sitemap:url">
                <xsl:sort select="sitemap:priority" order="descending"/>
                <tr>
                  <td>
                    <a href="{sitemap:loc}">
                      <xsl:value-of select="sitemap:loc"/>
                    </a>
                  </td>
                  <td>
                    <span class="priority">
                      <xsl:attribute name="class">
                        <xsl:choose>
                          <xsl:when test="sitemap:priority >= 0.8">priority priority-high</xsl:when>
                          <xsl:when test="sitemap:priority >= 0.5">priority priority-med</xsl:when>
                          <xsl:otherwise>priority priority-low</xsl:otherwise>
                        </xsl:choose>
                      </xsl:attribute>
                      <xsl:value-of select="sitemap:priority"/>
                    </span>
                  </td>
                  <td><xsl:value-of select="sitemap:changefreq"/></td>
                  <td><xsl:value-of select="sitemap:lastmod"/></td>
                </tr>
              </xsl:for-each>
            </tbody>
          </table>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>