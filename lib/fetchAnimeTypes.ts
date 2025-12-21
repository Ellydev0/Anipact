export type fetchPopularAnimeResponse = {
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
    romaji: string | null;
  };
  coverImage: {
    extraLarge: string;
    color: string;
  };
};

export type fetchMostPopularAnimeResponse = {
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
    romaji: string | null;
  };
  coverImage: {
    extraLarge: string;
    color: string;
  };
};

export interface fetchTrendingAnimeResponse {
  pageInfo: {
    currentPage: number;
    hasNextPage: boolean;
  };
  media: {
    id: number;
    genres: string[];
    meanScore: number;
    description: string;
    seasonYear: number;
    season: string;
    episodes: number;
    status: string;
    title: {
      english: string | null;
      romaji: string | null;
    };
    coverImage: {
      extraLarge: string;
    };
  }; //this media object is an array but because of its dependencies it is not
  //specified as an array, to use it as an array add "[]" to use it as an array.
  // Thanks
}
