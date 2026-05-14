/// <reference types="vite/client" />

declare module '*.svg' {
  const src: string;
  export default src;
}

declare module '*.png' {
  const src: string;
  export default src;
}

declare module 'react-star-ratings' {
  import type { FC } from 'react';

  export type StarRatingsProps = {
    rating: number;
    starRatedColor?: string;
    starEmptyColor?: string;
    numberOfStars?: number;
    name?: string;
    starDimension?: string;
    starSpacing?: string;
  };

  const StarRatings: FC<StarRatingsProps>;
  export default StarRatings;
}
