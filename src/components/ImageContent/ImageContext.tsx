import React, { createContext, useState, ReactNode } from 'react';

interface ImageContextType {
  image: File | null;
  setImage: (image: File | null) => void;
}

export const ImageContext = createContext<ImageContextType>({
  image: null,
  setImage: () => {},
});

interface ImageProviderProps {
  children: ReactNode;
}

export const ImageProvider: React.FC<ImageProviderProps> = ({ children }) => {
  const [image, setImage] = useState<File | null>(null);

  return <ImageContext.Provider value={{ image, setImage }}>{children}</ImageContext.Provider>;
};
