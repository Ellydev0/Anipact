export interface fetchMostPopularAnimeResponseType {
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
}

export interface fetchInfiniteAnimeResponseType {
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

export interface fetchAnimeDetailsResponseType {
  id: number;
  title: {
    english: string | null;
    romaji: string | null;
  };
  genres: string[];
  meanScore: number;
  status: string;
  startDate: {
    month: number | null;
    year: number | null;
  };
  endDate: {
    month: number | null;
    year: number | null;
  };
  coverImage: {
    extraLarge: string;
    color: string;
  };
  bannerImage: string | null;
  description: string;
  seasonYear: number;
  season: "FALL" | "WINTER" | "SUMMER" | "SPRING";
  episodes: number;
  countryOfOrigin: string;
  nextAiringEpisode: {
    airingAt: number | null;
  };
  characters: {
    nodes: {
      image: {
        large: string;
      };
      name: {
        full: string;
      };
    }[];
  };
  streamingEpisodes: {
    site: string;
    url: string;
    title: string;
  }[];
  trailer: {
    id: string;
    site: string;
    thumbnail: string;
  };
}

export interface fetchAnimeRecommendationsResponseType {
  pageInfo: {
    currentPage: number;
    hasNextPage: boolean;
  };
  nodes: {
    mediaRecommendation: {
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
    };
  }[];
}

export interface fetchAnimeWatchlistResponseType {
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
}
