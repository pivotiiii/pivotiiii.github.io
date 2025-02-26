// User agents handled by Prerender
const BOT_AGENTS = [
    "googlebot",
    "yahoo! slurp",
    "bingbot",
    "yandex",
    "baiduspider",
    "facebookexternalhit",
    "twitterbot",
    "rogerbot",
    "linkedinbot",
    "embedly",
    "quora link preview",
    "showyoubot",
    "outbrain",
    "pinterest/0.",
    "developers.google.com/+/web/snippet",
    "slackbot",
    "vkshare",
    "w3c_validator",
    "redditbot",
    "applebot",
    "whatsapp",
    "flipboard",
    "tumblr",
    "bitlybot",
    "skypeuripreview",
    "nuzzel",
    "discordbot",
    "google page speed",
    "qwantify",
    "pinterestbot",
    "bitrix link preview",
    "xing-contenttabreceiver",
    "chrome-lighthouse",
    "telegrambot",
    "integration-test", // Integration testing
    "google-inspectiontool",
];

// These are the extensions that the worker will skip prerendering
// even if any other conditions pass.
const IGNORE_EXTENSIONS = [
    ".js",
    ".css",
    ".xml",
    ".less",
    ".png",
    ".jpg",
    ".jpeg",
    ".gif",
    ".pdf",
    ".doc",
    ".txt",
    ".ico",
    ".rss",
    ".zip",
    ".mp3",
    ".rar",
    ".exe",
    ".wmv",
    ".doc",
    ".avi",
    ".ppt",
    ".mpg",
    ".mpeg",
    ".tif",
    ".wav",
    ".mov",
    ".psd",
    ".ai",
    ".xls",
    ".mp4",
    ".m4a",
    ".swf",
    ".dat",
    ".dmg",
    ".iso",
    ".flv",
    ".m4v",
    ".torrent",
    ".woff",
    ".ttf",
    ".svg",
    ".webmanifest",
];

async function redirectCrawlers(context) {
    const url = new URL(context.request.url);
    const userAgent = context.request.headers.get("User-Agent")?.toLowerCase() || "";

    const isPrerender = context.request.headers.get("X-Prerender");
    const pathName = url.pathname.toLowerCase();
    const extension = pathName
        .substring(pathName.lastIndexOf(".") || pathName.length)
        ?.toLowerCase();

    // Prerender loop protection
    // Non robot user agent
    // Ignore extensions
    if (
        isPrerender ||
        !BOT_AGENTS.some((bot) => userAgent.includes(bot)) ||
        (extension.length && IGNORE_EXTENSIONS.includes(extension))
    ) {
        return await context.next();
    }

    // Build Prerender request
    const newURL = `https://service.prerender.io/${context.request.url}`;
    const newHeaders = new Headers(context.request.headers);

    newHeaders.set("X-Prerender-Token", context.env.PRERENDER_TOKEN);
    return fetch(
        new Request(newURL, {
            headers: newHeaders,
            redirect: "manual",
        }),
    );
}

export const onRequest = [redirectCrawlers];
