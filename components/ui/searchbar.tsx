import clsx from "clsx";
import { Search } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

type SearchbarProps = {
  disabled?: boolean;
  className: string;
  input?: boolean;
  setValue?: Dispatch<SetStateAction<string>>;
  onClickFn?: () => void;
};

const Searchbar = ({
  disabled = true,
  className,
  input = false,
  setValue,
  onClickFn,
}: SearchbarProps) => {
  return (
    <div
      onClick={onClickFn}
      className={clsx(
        "text-muted bg-background/70 border-muted/50 border-[0.5] cursor-pointer h-fit backdrop-blur-md rounded-md px-4 py-2",
        className,
      )}
    >
      {input ? (
        <div className="flex items-center justify-start gap-4 w-full">
          <Search />
          <input
            type="text"
            placeholder="Search Anime"
            onChange={(e) => setValue?.(e.target.value)}
            disabled={disabled}
            className="w-full h-full outline-none text-[.9rem] disabled:cursor-pointer"
          />
        </div>
      ) : (
        <div className="flex items-center justify-start gap-4 w-full">
          <Search onClick={onClickFn} />
          <div className="w-fit h-full outline-none text-[.9rem] disabled:cursor-pointer">
            Search Anime
          </div>
        </div>
      )}
    </div>
  );
};

export default Searchbar;
