"use client";
import Image from "next/image";
type Trailer = {
  site: string;
  thumbnail: string;
  id: string;
};
import { useState } from "react";

export default function TrailerPlayer({ trailer }: { trailer: Trailer }) {
  const [play, setPlay] = useState(false);

  if (!trailer || trailer.site !== "youtube") return null;

  return (
    <div className="w-full max-w-xl">
      <h2 className="text-2xl font-semibold mb-5 mt-20 font-xirod">Trailer</h2>

      <div
        className="relative pt-[56.25%] cursor-pointer"
        onClick={() => setPlay(true)}
      >
        {!play ? (
          <Image
            src={trailer.thumbnail}
            alt="Trailer Thumbnail"
            fill
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
        ) : (
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src={`https://www.youtube.com/embed/${trailer.id}?autoplay=1`}
            title="Trailer"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}
      </div>
    </div>
  );
}
