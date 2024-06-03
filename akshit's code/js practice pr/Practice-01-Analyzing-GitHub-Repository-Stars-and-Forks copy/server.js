import { Application, Router } from "https://deno.land/x/oak@v14.0.0/mod.ts";
import { fetchRepos } from "./fetchRepos.js";
import { fetchUser } from "./fetchUser.js";
import { topLocation } from "./topLocation.js";

const router = new Router();
router.get("/", (ctx) => {
  ctx.response.body = `<!DOCTYPE html>
    <html>
      <head><title>Hello oak!</title><head>
      <body>
        <h1>Hello JavaScript!</h1>
        <h2>Hello Practice-01</h2>
      </body>
    </html>
  `;
});

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

app.listen({ port: 8080 });

router.get("/github/repos/:owner/:repo", (ctx) => {
  ctx.response.body = async () => {
    try {
      return await fetchRepos(ctx.params.owner, ctx.params.repo);
    } catch (err) {
      return err;
    }
  };
});

router.get("/github/repos/:owner/:repo/stargazers", (ctx) => {
  ctx.response.body = async () => {
    try {
      return await fetchRepos(ctx.params.owner, ctx.params.repo, true);
    } catch (err) {
      return err;
    }
  };
});

router.get("/github/user/:username", (ctx) => {
  ctx.response.body = async () => {
    try {
      return await fetchUser(ctx.params.username);
    } catch (error) {
      return error;
    }
  };
});

router.get(
  "/github/repos/top3/:owner/:repo/stargazers",
  async (ctx) => {
    const owner = ctx.params.owner;
    const repo = ctx.params.repo;
    try {
      const tod3Location = await topLocation(owner, repo);
      ctx.response.body = JSON.stringify(tod3Location, null, 2);
    } catch (err) {
      ctx.response.body = err;
    }
  },
);
