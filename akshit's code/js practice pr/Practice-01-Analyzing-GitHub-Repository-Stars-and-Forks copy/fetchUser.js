import { fetchReq } from "./funcs.js";
import { userAPI } from "./urls.js";

async function fetchUser(userName) {
  return await fetchReq(`${userAPI}/${userName}`).then((response) => {
    if (!response.ok) {
      throw {
        "Error": "User Not Found!",
      };
    }
    return response.json();
  })
    .then((users) => JSON.stringify(users, null, 2))
    .catch((err) => {
      throw err;
    });
}

export { fetchUser };
