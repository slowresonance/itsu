const loadLocalJSON = async (path) => {
  const response = await fetch(path);
  const json = await response.json();
  return json;
};

const getTimezone = async (name, country) => {
  const tz = loadLocalJSON("./cities.json")
    .then((data) =>
      data.filter((city) => city.name === name && city.iso2 === country)
    )
    .then((data) => data[0].timezone);
  return tz;
};

export const getURLParams = (url) => {
  const params = new URL(url).searchParams;
  const cities = params.get("cities");
  return cities;
};

export const getCitiesFromURL = (url) => {
  const cities = getURLParams(url);
  if (cities) {
    return cities.split("|").map(async (city) => {
      const [name, country] = city.split(",");
      const timezone = await getTimezone(name, country);
      return {
        name,
        country,
        timezone: timezone,
      };
    });
  }
  return [];
};

export const getCurrentRootURL = () => {
  const url = window.location.href;
  const rootURL = url.split("?")[0];
  return rootURL;
};

export const encodeURL = (cities) => {
  const encodedCities = cities.map((city) => {
    return `${city.name},${city.country}`;
  });
  const url = new URL(getCurrentRootURL());
  url.searchParams.set("cities", encodedCities.join("|"));
  return url;
};
