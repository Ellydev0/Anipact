import * as React from "react";

interface EpisodeProps {
  site: string;
  url: string;
  title: string;
}
const Episode: React.FC<EpisodeProps> = (props) => {
  return (
    <div className="bg-card w-fit p-2 rounded" title={props.title}>
      <a href={props.url} target="_blank" rel="noopener noreferrer">
        <h1 className={`text-xl text-accent`}>{props.title}</h1>
        <p className="text-[.6rem] font-light text-muted">src: {props.site}</p>
      </a>
    </div>
  );
};

export default Episode;
