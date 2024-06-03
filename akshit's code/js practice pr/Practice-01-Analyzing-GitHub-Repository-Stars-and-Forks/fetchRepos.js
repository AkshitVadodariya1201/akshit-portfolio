import { repoAPI } from "./urls.js";
import { fetchReq } from "./funcs.js";

async function fetchRepos(owner, repo, star = false) {
  if (star) {
    return await fetchReq(
      `${repoAPI}/${owner}/${repo}/stargazers?per_page=100`,
    ).then((response) => {
      if (!response.ok) {
        throw {
          "Error": "Repo Not Found!",
        };
      }
      return response.json();
    })
      .then((stargazers) => JSON.stringify(stargazers, null, 2))
      .catch((err) => {
        throw err;
      });
  }
  return await fetchReq(
    `${repoAPI}/${owner}/${repo}`,
  ).then((response) => {
    if (!response.ok) {
      throw {
        "Error": "Repo Not Found!",
      };
    }
    return response.json();
  })
    .then((repoData) => JSON.stringify(repoData, null, 2))
    .catch((err) => {
      throw err;
    });
}

export { fetchRepos };
