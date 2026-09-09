import { cn } from "cn";
import ExpoJuyLogo from "@/components/ExpoJuyLogo";

type BrandMarkProps = {
  className?: string;
  intro?: boolean;
  inverted?: boolean;
};

export function BrandMark({ className, intro = false, inverted = false }: BrandMarkProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 font-bold tracking-[-0.04em]",
        intro && "intro-logo flex-col gap-5",
        className,
      )}
      aria-label="ExpoJuy 2026"
    >
      <span className="relative inline-block w-[1.4rem] h-[1.95rem] flex-shrink-0" aria-hidden="true">
        <ExpoJuyLogo className="w-full h-full object-contain" />
      </span>
      <span
        className={cn(
          "brand-wordmark leading-none",
          intro ? "text-3xl sm:text-4xl" : "text-[1.05rem]",
          inverted ? "text-white" : "text-[#0b123b]",
        )}
      >
        EXPOJUY
        <span className="ml-1.5 align-top text-[0.58em] font-semibold tracking-[0.04em]">
          2026
        </span>
      </span>
    </span>
  );
}
