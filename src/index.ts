import { serve } from "bun";
import index from "./index.html";

const IMAGES_DIR = "public/images";
const ICONS_DIR = "public/icons";

const production =
  process.env.NODE_ENV === "production" ||
  process.argv.includes("--production");

// Dev     → 3000
// Start   → 3001
const port = Number(
  process.env.PORT || (production ? 3001 : 3000),
);

async function serveStaticFile(
  req: Request,
  dir: string,
  prefix: string,
): Promise<Response> {
  const pathname = new URL(req.url).pathname;
  const relative = decodeURIComponent(
    pathname.slice(prefix.length),
  );

  if (!relative || relative.includes("..")) {
    return new Response("Not found", { status: 404 });
  }

  const file = Bun.file(`./${dir}/${relative}`);

  if (await file.exists()) {
    return new Response(file);
  }

  return new Response("Not found", { status: 404 });
}

const server = serve({
  port,

  routes: {
    "/images/*": (req) =>
      serveStaticFile(req, IMAGES_DIR, "/images/"),

    "/icons/*": (req) =>
      serveStaticFile(req, ICONS_DIR, "/icons/"),

    "/api/universities": {
      async GET() {
        const { universities } = await import(
          "./data/universities"
        );

        return Response.json(universities);
      },
    },

    "/*": index,
  },

  development: production
    ? undefined
    : {
        hmr: true,
        console: true,
      },
});

console.log(
  `^_^ ${production ? "Production" : "Development"} server running at ${server.url}`,
);