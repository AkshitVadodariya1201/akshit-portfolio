import { TOKEN } from "./urls.js";
import { fetchUser } from "./fetchUser.js";

const fetchReq = async (url) => {
  const response = await fetch(url, {
    headers: {
      Authorization: `token ${TOKEN}`,
    },
  });
  return response;
};

function loginData(value) {
  try {
    const loginValue = JSON.parse(value).map((item) => item.login);
    return loginValue;
  } catch (error) {
    return error;
  }
}

async function locationAll(data) {
  try {
    const arrayOfUser = [];
    for (const user of data) {
      const users = await fetchUser(user);
      arrayOfUser.push(JSON.parse(users));
    }
    return arrayOfUser;
  } catch (error) {
    throw "Error: Location Not Fetch!" + error;
  }
}

export { fetchReq, locationAll, loginData };
