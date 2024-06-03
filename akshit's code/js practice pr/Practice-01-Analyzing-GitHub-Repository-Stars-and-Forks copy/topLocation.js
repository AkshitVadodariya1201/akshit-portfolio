import { fetchRepos } from "./fetchRepos.js";
import { locationAll, loginData } from "./funcs.js";

async function topLocation(owner, repo) {
  try {
    const reposValue = await fetchRepos(
      owner,
      repo,
      true,
    );

    const logs = await loginData(reposValue);
    const locationData = await locationAll(logs);
    const locationValue = locationData.map((item) => {
      return item.location;
    });

    const top = locationValue.reduce((map, city) => {
      const onlyCity = () => {
        if (city != null) {
          const name = city.split(" ");
          const cityName = name[0].split("/");
          return cityName;
        }
      };

      const data = onlyCity();
      if (data != undefined) {
        const cityName = data[0].toLowerCase().replace(/[,./]/g, "");

        if (map.has(cityName)) {
          map.set(cityName, map.get(cityName) + 1);
        } else {
          map.set(cityName, 1);
        }
      }
      return map;
    }, new Map());
    const array = Array.from(top, ([city, num]) => ({ city, num }));
    const top3City = array.sort((a, b) => a.num - b.num)
      .reverse()
      .slice(0, 3);
    return top3City;
  } catch (err) {
    throw err;
  }
}

export { topLocation };
