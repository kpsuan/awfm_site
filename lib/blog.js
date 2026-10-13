import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { marked } from 'marked';

// Blog posts are Markdown files in content/blog/<slug>.md with front matter:
// title, description, date (YYYY-MM-DD), category, cover (image URL), author.
const DIR = path.join(process.cwd(), 'content', 'blog');

const readingTime = (text) => Math.max(1, Math.round(text.split(/\s+/).length / 220));

export function getAllPosts() {
  return fs.readdirSync(DIR)
    .filter((f) => f.endsWith('.md'))
    .map((f) => {
      const slug = f.replace(/\.md$/, '');
      const { data, content } = matter(fs.readFileSync(path.join(DIR, f), 'utf8'));
      return { slug, ...data, minutes: readingTime(content) };
    })
    .filter((p) => !p.draft)
    .sort((a, b) => String(b.date).localeCompare(String(a.date)));
}

export function getPost(slug) {
  const file = path.join(DIR, `${slug}.md`);
  const { data, content } = matter(fs.readFileSync(file, 'utf8'));
  return { slug, ...data, minutes: readingTime(content), html: marked.parse(content) };
}

export const formatDate = (d) =>
  new Date(`${d}T12:00:00Z`).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
