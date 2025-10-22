import rss, { pagesGlobToRssItems } from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function GET(context) {
    const allPosts = await getCollection("posts");

    return rss({
        title: "Paul's Blog | Powered by Astro",
        description: "Security Engineer & Developer",
        site: context.site,

        // 移除尾部斜杠
        trailingSlash: false,
        stylesheet: "/rss/pretty-feed-v3.xsl",

        // items: 文章列表
        // items: await pagesGlobToRssItems(import.meta.glob("./**/*.md")),

        items: allPosts.map((post) => ({
            title: post.data.title,
            pubDate: post.data.date,
            description: post.data.description,
            link: `/posts/${post.slug}/`,
        })),
        // customData: `<language>en-us</language>`,
    });
}
