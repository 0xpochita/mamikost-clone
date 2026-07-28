import type { ReactNode } from "react";

export type PromoBanner = {
  src: string;
  alt: string;
  href: string;
};

export type PromoCardAction = {
  label: string;
  href: string;
  variant: "outline" | "link";
};

export type PromoCardProps = {
  title: string;
  description: string;
  action?: PromoCardAction;
  media?: ReactNode;
  className?: string;
};

export type PartnerLogo = {
  alt: string;
  src: string;
  width: number;
  height: number;
  className: string;
};
