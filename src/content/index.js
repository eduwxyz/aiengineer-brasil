// Load all markdown files from content directory
const contentModules = import.meta.glob('./**/*.md', { query: '?raw', import: 'default', eager: true });

// Simple frontmatter parser
function parseFrontmatter(content) {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);

  if (!match) {
    return { frontmatter: {}, body: content };
  }

  const frontmatterStr = match[1];
  const body = match[2].trim();

  // Parse simple YAML (key: value)
  const frontmatter = {};
  frontmatterStr.split('\n').forEach(line => {
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.slice(0, colonIndex).trim();
      let value = line.slice(colonIndex + 1).trim();

      // Handle null values
      if (value === 'null' || value === '') {
        value = null;
      }
      // Handle quoted strings
      else if ((value.startsWith('"') && value.endsWith('"')) ||
               (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }

      frontmatter[key] = value;
    }
  });

  return { frontmatter, body };
}

// Build content object organized by module/article
export const articleContent = {};

Object.entries(contentModules).forEach(([path, content]) => {
  // Path format: ./module-slug/article-slug.md
  const match = path.match(/\.\/([^/]+)\/([^/]+)\.md$/);
  if (!match) return;

  const [, moduleSlug, articleSlug] = match;
  const { frontmatter, body } = parseFrontmatter(content);

  if (!articleContent[moduleSlug]) {
    articleContent[moduleSlug] = {};
  }

  articleContent[moduleSlug][articleSlug] = {
    video: frontmatter.video || null,
    body: body || null
  };
});

export function getArticleContent(moduleSlug, articleSlug) {
  return articleContent[moduleSlug]?.[articleSlug] || null;
}
