import React, { useState, useCallback } from 'react';
import Header from '../components/Header';
import MediaGrid from '../components/MediaGrid';
import MediaModal from '../components/MediaModal';
import { mediaData } from '../data/media';
import { MediaItem, ModalState } from '../types';
import Footer from '../components/Footer';

const Home: React.FC = () => {
  // State for media items
  const [items] = useState<MediaItem[]>(mediaData);
  
  // State for modal
  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
    mediaItem: null,
  });

  // Handle media item click to open modal
  const handleItemClick = useCallback((item: MediaItem) => {
    setModalState({
      isOpen: true,
      mediaItem: item,
    });
  }, []);

  // Handle modal close
  const handleCloseModal = useCallback(() => {
    setModalState({
      isOpen: false,
      mediaItem: null,
    });
  }, []);

  // Navigate to next item in modal
  const handleNextItem = useCallback(() => {
    if (!modalState.mediaItem) return;
    
    const currentIndex = items.findIndex(item => item.id === modalState.mediaItem?.id);
    if (currentIndex < items.length - 1) {
      setModalState({
        isOpen: true,
        mediaItem: items[currentIndex + 1],
      });
    }
  }, [items, modalState.mediaItem]);

  // Navigate to previous item in modal
  const handlePreviousItem = useCallback(() => {
    if (!modalState.mediaItem) return;
    
    const currentIndex = items.findIndex(item => item.id === modalState.mediaItem?.id);
    if (currentIndex > 0) {
      setModalState({
        isOpen: true,
        mediaItem: items[currentIndex - 1],
      });
    }
  }, [items, modalState.mediaItem]);

  // Check if there's a next or previous item
  const currentIndex = modalState.mediaItem 
    ? items.findIndex(item => item.id === modalState.mediaItem?.id) 
    : -1;
  const hasNext = currentIndex < items.length - 1;
  const hasPrevious = currentIndex > 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-6">
        <MediaGrid items={items} onItemClick={handleItemClick} />
      </main>

      {modalState.isOpen && modalState.mediaItem && (
        <MediaModal 
          mediaItem={modalState.mediaItem}
          onClose={handleCloseModal}
          onNext={handleNextItem}
          onPrevious={handlePreviousItem}
          hasNext={hasNext}
          hasPrevious={hasPrevious}
        />
      )}
      <Footer></Footer>
    </div>
  );
};

export default Home;
