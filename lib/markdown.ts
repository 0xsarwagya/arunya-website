import { promises as fs } from "node:fs";
import path from "node:path";
import { compileMDX } from "next-mdx-remote/rsc";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeCodeTitles from "rehype-code-titles";
import rehypePrism from "rehype-prism-plus";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

// custom components imports
import Note from "@/components/note";

// add custom components
const components = {
	Note,
};

// can be used for other pages like blogs, Guides etc
async function parseMdx<Frontmatter>(rawMdx: string) {
	return await compileMDX<Frontmatter>({
		source: rawMdx,
		options: {
			parseFrontmatter: true,
			mdxOptions: {
				rehypePlugins: [
					rehypeCodeTitles,
					rehypePrism,
					rehypeSlug,
					rehypeAutolinkHeadings,
				],
				remarkPlugins: [remarkGfm],
			},
		},
		components,
	});
}

// logic for docs

type BaseMdxFrontmatter = {
	title: string;
	description: string;
};

export async function getDocsForSlug(slug: string) {
	try {
		const contentPath = getDocsContentPath(slug);
		const rawMdx = await fs.readFile(contentPath, "utf-8");
		return await parseMdx<BaseMdxFrontmatter>(rawMdx);
	} catch (err) {
		console.log(err);
	}
}

export async function getDocsTocs(slug: string) {
	const contentPath = getDocsContentPath(slug);
	const rawMdx = await fs.readFile(contentPath, "utf-8");
	// captures between ## - #### can modify accordingly
	const headingsRegex = /^(#{2,4})\s(.+)$/gm;
	let match: RegExpExecArray | null;
	const extractedHeadings = [];
	// biome-ignore lint/suspicious/noAssignInExpressions: Only way to get all matches
	while ((match = headingsRegex.exec(rawMdx)) !== null) {
		const headingLevel = match[1].length;
		const headingText = match[2].trim();
		const slug = sluggify(headingText);
		extractedHeadings.push({
			level: headingLevel,
			text: headingText,
			href: `#${slug}`,
		});
	}
	return extractedHeadings;
}

function sluggify(text: string) {
	const slug = text.toLowerCase().replace(/\s+/g, "-");
	return slug.replace(/[^a-z0-9-]/g, "");
}

function getDocsContentPath(slug: string) {
	return path.join(process.cwd(), "/contents/docs/", `${slug}/index.mdx`);
}