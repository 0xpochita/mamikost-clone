export type KosOwner = {
  name: string;
  activeSince: string;
  lastOnline: string;
  transactionCount: number;
};

export type KosReview = {
  author: string;
  timeAgo: string;
  rating: number;
  body: string;
  ownerReply: string;
};

export type KosRatingBreakdown = {
  label: string;
  score: number;
};

export type KosRule = {
  label: string;
  detail?: string;
};

export type KosDetail = {
  breadcrumb: string[];
  roomFacilities: string[];
  bathroomFacilities: string[];
  publicFacilities: string[];
  parkingFacilities: string[];
  roomRules: KosRule[];
  houseRules: string[];
  ownerStory: string[];
  deposit: number;
  isElectricityIncluded: boolean;
  roomDimension: string;
  owner: KosOwner;
  reviews: KosReview[];
  ratingBreakdown: KosRatingBreakdown[];
  transactionCount: number;
};
