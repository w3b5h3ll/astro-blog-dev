// src/pages/api/bing-wallpaper.js
export async function GET() {
    try {
        // 请求必应的图片存档 API
        const response = await fetch(
            "https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=zh-CN"
        );
        const data = await response.json();

        // 提取图片信息
        const image = data.images[0];
        const imageUrl = "https://www.bing.com" + image.url;
        const copyright = image.copyright;

        // 将图片 URL 和版权信息返回给前端
        return new Response(JSON.stringify({ imageUrl, copyright }), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
                // 添加缓存策略，例如，缓存6小时，避免频繁请求
                "Cache-Control": "s-maxage=21600, stale-while-revalidate",
            },
        });
    } catch (error) {
        return new Response(
            JSON.stringify({ error: "Failed to fetch image" }),
            {
                status: 500,
                headers: { "Content-Type": "application/json" },
            }
        );
    }
}
