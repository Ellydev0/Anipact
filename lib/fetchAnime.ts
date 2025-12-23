import type {
  fetchInfiniteAnimeResponseType,
  fetchMostPopularAnimeResponseType,
} from "./fetchAnimeTypes";

export async function fetchTrendingAnime({
  pageParam = 1,
}): Promise<fetchInfiniteAnimeResponseType> {
  const query = `
      query PageInfo($page: Int, $perPage: Int, $type: MediaType, $sort: [MediaSort], $season: MediaSeason, $seasonYear: Int, $isAdult: Boolean) {
        Page(page: $page, perPage: $perPage) {
          pageInfo {
            currentPage
            hasNextPage
          }
          media(type: $type, sort: $sort, season: $season, seasonYear: $seasonYear, isAdult: $isAdult) {
            id
            genres
            meanScore
            bannerImage
            description
            seasonYear
            season
            status
            episodes
            title {
              english
              romaji
            }
            coverImage {
              extraLarge
            }
          }
        }
      }
    `;

  const variables = {
    page: pageParam,
    perPage: 8,
    isAdult: false,
    type: "ANIME",
    sort: "TRENDING_DESC",
  };

  try {
    console.log(pageParam);

    const res = await fetch("https://graphql.anilist.co", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    });
    const json = await res.json();
    return json.data.Page;
  } catch (e) {
    console.log(e);
    throw new Error("Failed to fetch trending anime");
  }
}

export async function fetchPopularAnime({
  pageParam = 1,
}): Promise<fetchInfiniteAnimeResponseType> {
  const query = `
      query PageInfo($page: Int, $perPage: Int, $type: MediaType, $sort: [MediaSort], $season: MediaSeason, $seasonYear: Int, $isAdult: Boolean) {
        Page(page: $page, perPage: $perPage) {
          pageInfo {
            currentPage
            hasNextPage
          }
          media(type: $type, sort: $sort, season: $season, seasonYear: $seasonYear, isAdult: $isAdult) {
            id
            genres
            meanScore
            bannerImage
            description
            seasonYear
            season
            status
            episodes
            title {
              english
              romaji
            }
            coverImage {
              extraLarge
            }
          }
        }
      }
    `;

  const month = new Date().getMonth();
  const year = new Date().getFullYear();
  const season =
    month >= 2 && month <= 4 //March to May
      ? "SPRING"
      : month >= 5 && month <= 7 //June to August
        ? "SUMMER"
        : month >= 8 && month <= 10 //September to November
          ? "FALL"
          : "WINTER";

  const variables = {
    page: pageParam,
    perPage: 8,
    type: "ANIME",
    sort: "POPULARITY_DESC",
    isAdult: false,
    season: season,
    seasonYear: year,
  };

  try {
    console.log(pageParam);
    const res = await fetch("https://graphql.anilist.co", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    });
    const json = await res.json();
    return json.data.Page;
  } catch (e) {
    console.log(e);
    throw new Error("Failed to fetch popular anime");
  }
}

export async function fetchMostPopularAnime(): Promise<
  fetchMostPopularAnimeResponseType[]
> {
  const query = `
    query PageInfo($page: Int, $perPage: Int, $type: MediaType, $sort: [MediaSort],$season: MediaSeason, $seasonYear: Int) {
      Page(page: $page, perPage: $perPage) {
        pageInfo {
          hasNextPage
        }
        media(type: $type, sort: $sort,season:$season,seasonYear:$seasonYear) {
          id
          genres
          meanScore
          bannerImage
          description
          seasonYear
          season
          title {
            english
            romaji
          }
          coverImage {
            extraLarge
            color
          }
        }
      }
    }
  `;

  const month = new Date().getMonth();
  const year = new Date().getFullYear();
  const seasons = [
    "WINTER",
    "WINTER",
    "SPRING",
    "SPRING",
    "SPRING",
    "SUMMER",
    "SUMMER",
    "SUMMER",
    "FALL",
    "FALL",
    "FALL",
    "WINTER",
  ];

  const season = seasons[month];

  const variables = {
    page: 1,
    perPage: 7,
    type: "ANIME",
    sort: "POPULARITY_DESC",
    season: season,
    seasonYear: year,
  };

  try {
    const res = await fetch("https://graphql.anilist.co", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    });
    const json = await res.json();
    return json.data.Page.media;
  } catch (e) {
    console.log(e);
    throw new Error("Failed to fetch the most popular anime");
  }
}
