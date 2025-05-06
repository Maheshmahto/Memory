export interface MediaItem {
  id: string;
  type: 'image' | 'video';
  url: string;
  description?: string;
  width: number;
  height: number;
  creator?: string;
  tags?: string[];
}

export interface ModalState {
  isOpen: boolean;
  mediaItem: MediaItem | null;
}