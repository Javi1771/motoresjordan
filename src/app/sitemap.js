export default function sitemap() {
  const base = "https://motoresjordanmx.com";
  const now = new Date();

  // Note: Only the root URL is returned — anchor-fragment URLs (e.g. /#services)
  // are ignored by Google Sitemap spec and should not appear in sitemaps.
  // Each section is part of the single-page app at the root URL.
  return [
    { url: base, lastModified: now, changeFrequency: "weekly", priority: 1 },
  ];
}
