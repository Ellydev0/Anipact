import { QueryFunctionContext } from "@tanstack/react-query";
import type {
  fetchAnimeDetailsResponseType,
  fetchAnimeMetadataResponseType,
  fetchAnimeRecommendationsResponseType,
  fetchAnimeSearchResponseType,
  fetchAnimeWatchlistResponseType,
  fetchInfiniteAnimeResponseType,
  fetchMostPopularAnimeResponseType,
} from "./fetchAnimeTypes";

const URL = "https://graphql.anilist.co";

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
    const res = await fetch(URL, {
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
    const res = await fetch(URL, {
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
    const res = await fetch(URL, {
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

export async function fetchAnimeDetails(
  mediaId: number,
): Promise<fetchAnimeDetailsResponseType> {
  const query = `query Media($type: MediaType, $isAdult: Boolean, $mediaId: Int) {
    Media(type: $type, isAdult: $isAdult, id: $mediaId) {
      id
      title {
        english
        romaji
      }
      bannerImage
      coverImage {
        extraLarge
        color
      }
      description
      episodes
      genres
      season
      seasonYear
      status
      startDate {
        month
        year
      }
      endDate {
        month
        year
      }
      countryOfOrigin
      meanScore
      nextAiringEpisode {
        airingAt
      }
      characters {
        nodes {
          image {
            large
          }
          name {
            full
          }
        }
      }
      streamingEpisodes {
        site
        url
        thumbnail
        title
      }
      trailer {
        id
        site
        thumbnail
      }
    }
  }`;

  const variables = {
    type: "ANIME",
    isAdult: false,
    mediaId,
  };

  const res = await fetch(URL, {
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
  return json.data.Media;
}

export async function fetchAnimeMetadata(
  mediaId: number,
): Promise<fetchAnimeMetadataResponseType> {
  const query = `query Media($type: MediaType, $isAdult: Boolean, $mediaId: Int) {
    Media(type: $type, isAdult: $isAdult, id: $mediaId) {
      title {
        english
        romaji
      }
      coverImage {
        extraLarge
        color
      }
      description
    }
  }`;

  const variables = {
    type: "ANIME",
    isAdult: false,
    mediaId,
  };

  const res = await fetch(URL, {
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
  return json.data.Media;
}

export async function fetchAnimeRecommendations(
  ctx: QueryFunctionContext<(string | number)[], number>,
): Promise<fetchAnimeRecommendationsResponseType> {
  const { pageParam = 1, queryKey } = ctx;
  const [, mediaId] = queryKey as [string, number];

  const query = `
    query Media($mediaId: Int, $page: Int, $perPage: Int) {
      Media(id: $mediaId, type: ANIME) {
        recommendations(
          sort: RATING_DESC
          page: $page
          perPage: $perPage
        ) {
          nodes {
            mediaRecommendation {
              id
              episodes
              genres
              meanScore
              season
              seasonYear
              status
              title {
                english
                romaji
              }
              coverImage {
                extraLarge
              }
            }
          }
          pageInfo {
            currentPage
            hasNextPage
          }
        }
      }
    }
  `;

  const res = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query,
      variables: {
        mediaId,
        page: pageParam,
        perPage: 4,
      },
    }),
  });

  const json = await res.json();
  return json.data.Media.recommendations;
}

export const fetchAnimeWatchlist = async (
  ids: number[],
): Promise<fetchAnimeWatchlistResponseType[]> => {
  const query = `
    query ($ids: [Int]) {
      Page(page: 1, perPage: 20) {
        media(id_in: $ids, type: ANIME) {
          id
          genres
          meanScore
          description
          seasonYear
          season
          episodes
          status
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

  const res = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query,
      variables: {
        ids,
      },
    }),
  });

  const json = await res.json();
  return json.data.Page.media;
};

export const fetchAnimeSearch = async (
  search: string,
): Promise<fetchAnimeSearchResponseType[]> => {
  const query = `
    query ($search: String, $isAdult: Boolean) {
      Page(page: 1, perPage: 6) {
        media(type: ANIME, search: $search, isAdult: $isAdult) {
          id
          title {
            english
            romaji
          }
          genres
        }
      }
    }
  `;

  const res = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query,
      variables: {
        search,
        isAdult: false,
      },
    }),
  });

  const json = await res.json();
  return json.data.Page.media;
};
