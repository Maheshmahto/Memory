import React from 'react';
import Masonry from 'react-masonry-css';
import MediaCard from './MediaCard';
import { MediaItem } from '../types';

interface MediaGridProps {
  items: MediaItem[];
  onItemClick: (item: MediaItem) => void;
}

const MediaGrid: React.FC<MediaGridProps> = ({ items, onItemClick }) => {
  // Define breakpoints for responsive masonry grid
  const breakpointColumns = {
    default: 5,
    1536: 4,
    1280: 3,
    1024: 3,
    768: 2,
    640: 2,
    500: 1
  };

  return (
    <Masonry
      breakpointCols={breakpointColumns}
      className="flex w-auto -ml-4"
      columnClassName="pl-4 bg-clip-padding"
    >
      {items.map((item) => (
        <MediaCard 
          key={item.id} 
          item={item} 
          onClick={onItemClick} 
        />
      ))}
    </Masonry>
  );
};

export default MediaGrid;