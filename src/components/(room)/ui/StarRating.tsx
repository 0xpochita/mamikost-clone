import { LuStar } from "react-icons/lu";

const MAX_STARS = 5;

export function StarRating({ score }: { score: number }) {
  return (
    <span className="flex items-center gap-0.5" role="img">
      {Array.from({ length: MAX_STARS }, (_, index) => (
        <LuStar
          aria-hidden
          className={
            index < Math.round(score)
              ? "size-4 fill-ink text-ink"
              : "size-4 text-line"
          }
          key={`star-${index + 1}`}
        />
      ))}
      <span className="sr-only">
        {score} dari {MAX_STARS}
      </span>
    </span>
  );
}
