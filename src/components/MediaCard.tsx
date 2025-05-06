import React, { useState, useRef } from 'react';
import { Download, Heart } from 'lucide-react';
import { MediaItem } from '../types';

interface MediaCardProps {
  item: MediaItem;
  onClick: (item: MediaItem) => void;
}

const MediaCard: React.FC<MediaCardProps> = ({ item, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (item.type === 'video' && videoRef.current) {
      videoRef.current.play()
        .then(() => console.log("Video playing:", item.title))
        .catch(err => console.error("Video play failed:", err));
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (item.type === 'video' && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const handleDownload = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const response = await fetch(item.url);
      if (!response.ok) throw new Error(`Failed to fetch ${item.url}`);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = (item.title || `media_${item.id}`).replace(/\s+/g, '_').toLowerCase() + (item.type === 'image' ? '.jpg' : '.mp4');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
      alert('Failed to download the file. Please try again.');
    }
  };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  const aspectRatio = `${(item.height / item.width) * 100}%`;

  return (
    <div
      className="rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 mb-4 cursor-pointer animate-fade-in"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => onClick(item)}
    >
      <div className="relative" style={{ paddingBottom: aspectRatio }}>
        {item.type === 'image' ? (
          <img
            src={item.url}
            alt={item.title || `Media ${item.id}`}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <video
            ref={videoRef}
            src={item.url}
            muted
            loop
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}

        {/* Hover overlay with actions */}
        <div
          className={`absolute inset-0 bg-black bg-opacity-20 flex items-end justify-between p-3 transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="flex space-x-2">
            <button
              onClick={handleLike}
              className={`p-2 rounded-full ${isLiked ? 'bg-accent-500 text-white' : 'bg-white text-gray-700'} transition-colors duration-300 hover:scale-105`}
            >
              <Heart size={16} className={isLiked ? 'fill-current' : ''} />
            </button>
            <button
              onClick={handleDownload}
              className="p-2 rounded-full bg-white text-gray-700 transition-transform duration-300 hover:scale-105"
            >
              <Download size={16} />
            </button>
          </div>
          {item.type === 'video' && (
            <span className="bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
              VIDEO
            </span>
          )}
        </div>
      </div>

      {/* Optional metadata below the media */}
      <div className="p-2">
        <h3 className="text-sm font-medium text-gray-800 truncate">{item.title || `Media ${item.id}`}</h3>
        {item.creator && (
          <p className="text-xs text-gray-500 truncate">by {item.creator}</p>
        )}
      </div>
    </div>
  );
};

export default MediaCard;