// src/config.ts
import { defineCollection, z } from "astro:content";

const postsCollection = defineCollection({
    type: "content", // 'content' 表示 .md, .mdx
    schema: z.object({
        title: z.string(),
        pubDate: z.date(),
        author: z.string(),
        // ... 你文章 frontmatter 中的其他字段
        tags: z.array(z.string()).optional(),
        
    }),
});

export const collections = {
    posts: postsCollection,
};
