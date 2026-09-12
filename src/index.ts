import { serve } from "bun";
import index from "./index.html";

const IMAGES_DIR = "public/images";
const ICONS_DIR = "public/icons";

async function serveStaticFile(req: Request, dir: string, prefix: string): Promise<Response> {
  const pathname = new URL(req.url).pathname;
  const relative = decodeURIComponent(pathname.slice(prefix.length));

  if (!relative || relative.includes("..")) {
    return new Response("Not found", { status: 404 });
  }

  const file = Bun.file(`./${dir}/${relative}`);
  if (await file.exists()) {
    return new Response(file);
  }

  return new Response("Not found", { status: 404 });
}

const production =
  process.env.NODE_ENV === "production" || process.argv.includes("--production");

const server = serve({
  routes: {
    "/images/*": (req) => serveStaticFile(req, IMAGES_DIR, "/images/"),
    "/icons/*": (req) => serveStaticFile(req, ICONS_DIR, "/icons/"),
    "/*": index,

    "/api/universities": {
      async GET() {
        const { universities } = await import("./data/universities");
        return Response.json(universities);
      },
    },
  },

  development: production
    ? undefined
    : {
        hmr: true,
        console: true,
      },
});

console.log(`^_^ Server running at ${server.url}`);