type fetchAnimeResponse = {
  id: number;
  genres: string[];
  meanScore: number;
  bannerImage: string | null;
  description: string;
  seasonYear: number;
  season: "FALL" | "WINTER" | "SUMMER" | "SPRING";
  episodes: number;
  title: {
    english: string | null;
    native: string | null;
  };
  coverImage: {
    extraLarge: string;
    color: string;
  };
};

type fetchAnimeResponseCard = {
  id: number;
  genres: string[];
  meanScore: number;
  description: string;
  seasonYear: number;
  episodes: number;
  status: string;
  title: {
    english: string | null;
    native: string | null;
  };
  coverImage: {
    extraLarge: string;
    color: string;
  };
};

export async function fetchTrendingAnime(): Promise<fetchAnimeResponseCard[]> {
  const query = `
    query PageInfo($page: Int, $perPage: Int, $type: MediaType, $sort: [MediaSort]) {
      Page(page: $page, perPage: $perPage) {
        pageInfo {
          hasNextPage
        }
        media(type: $type, sort: $sort) {
          id
          genres
          meanScore
          description
          seasonYear
          episodes
          status
          title {
            english
            native
          }
          coverImage {
            extraLarge
          }
        }
      }
    }
  `;

  const variables = {
    page: 1,
    perPage: 4,
    type: "ANIME",
    sort: "TRENDING_DESC",
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
    throw new Error("Failed to fetch trending anime");
  }
}

export async function fetchPopularAnime(): Promise<fetchAnimeResponse[]> {
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
          episodes
          title {
            english
            native
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
    page: 1,
    perPage: 4,
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
    throw new Error("Failed to fetch popular anime");
  }
}

export async function fetchMostPopularAnime(): Promise<fetchAnimeResponse[]> {
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
          episodes
          title {
            english
            native
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
