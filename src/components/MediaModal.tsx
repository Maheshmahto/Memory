import React, { useRef, useEffect } from 'react';
import { Download, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { MediaItem } from '../types';

interface MediaModalProps {
  mediaItem: MediaItem;
  onClose: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
  hasNext?: boolean;
  hasPrevious?: boolean;
}

const MediaModal: React.FC<MediaModalProps> = ({ 
  mediaItem, 
  onClose, 
  onNext, 
  onPrevious,
  hasNext = false,
  hasPrevious = false
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (mediaItem.type === 'video' && videoRef.current) {
      videoRef.current.play().catch(err => console.error("Video play failed:", err));
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      } else if (event.key === 'ArrowRight' && onNext && hasNext) {
        onNext();
      } else if (event.key === 'ArrowLeft' && onPrevious && hasPrevious) {
        onPrevious();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [mediaItem, onClose, onNext, onPrevious, hasNext, hasPrevious]);

  const handleDownload = async () => {
    try {
      const response = await fetch(mediaItem.url);
      if (!response.ok) throw new Error(`Failed to fetch ${mediaItem.url}`);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = (mediaItem.title || `media_${mediaItem.id}`).replace(/\s+/g, '_').toLowerCase() + (mediaItem.type === 'image' ? '.jpg' : '.mp4');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
      alert('Failed to download the file. Please try again.');
    }
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 p-4 animate-fade-in"
      onClick={handleOverlayClick}
    >
      <button 
        className="absolute top-4 right-4 z-50 p-2 bg-black bg-opacity-50 rounded-full text-white hover:bg-opacity-70 transition-colors"
        onClick={onClose}
      >
        <X size={20} />
      </button>

      <div 
        ref={modalRef}
        className="relative max-w-7xl max-h-[90vh] animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative bg-white rounded-lg overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="flex-1 bg-black flex items-center justify-center">
              {mediaItem.type === 'image' ? (
                <img
                  src={mediaItem.url}
                  alt={mediaItem.title || `Media ${mediaItem.id}`}
                  className="max-h-[70vh] object-contain"
                />
              ) : (
                <video
                  ref={videoRef}
                  src={mediaItem.url}
                  controls
                  autoPlay
                  loop
                  className="max-h-[70vh] max-w-full"
                ></video>
              )}
            </div>

            <div className="w-full md:w-80 p-6 bg-white">
              <h2 className="text-xl font-bold text-gray-800 mb-2">{mediaItem.title || `Media ${mediaItem.id}`}</h2>
              
              {mediaItem.description && (
                <p className="text-gray-600 mb-4">{mediaItem.description}</p>
              )}
              
              {mediaItem.creator && (
                <div className="mb-4">
                  <p className="text-sm text-gray-500">
                    Creator: <span className="font-medium text-gray-700">{mediaItem.creator}</span>
                  </p>
                </div>
              )}
              
              <button
                onClick={handleDownload}
                className="w-full flex items-center justify-center py-2 px-4 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
              >
                <Download size={16} className="mr-2" />
                Download
              </button>
            </div>
          </div>
        </div>

        {hasPrevious && (
          <button
            onClick={onPrevious}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-black bg-opacity-50 rounded-full text-white hover:bg-opacity-70 transition-colors z-10"
          >
            <ChevronLeft size={28} />
          </button>
        )}
        
        {hasNext && (
          <button
            onClick={onNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-black bg-opacity-50 rounded-full text-white hover:bg-opacity-70 transition-colors z-10"
          >
            <ChevronRight size={28} />
          </button>
        )}
      </div>
    </div>
  );
};

export default MediaModal;