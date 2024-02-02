import { useRef, useEffect, useState } from 'react';

type AsciiImageProps = {
  file: File | null;
  width: number;
  height: number;
};

const density: string = 'Ñ@#W$9876543210?!abc;:+=-,._ ';
// const pixelSize: number = 1;

const AsciiImage = ({ file, width, height }: AsciiImageProps) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  useEffect(() => {
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {
      if (!e.target?.result) {
        throw new Error('e.target.result is undefined or null');
      }

      if (typeof e.target?.result === 'string') {
        setImageSrc(e.target.result);
      }
    };

    reader.readAsDataURL(file);
  }, [file]);

  // create direct reference to the dom node for the canvas
  // don't want the component to rerender when the canvas is drawn
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // useEffect(() => {
  useEffect(() => {
    if (!imageSrc) return;

    const canvas = canvasRef.current;
    if (!canvas) return; // Make sure canvas is not null

    const ctx = canvas.getContext('2d');
    if (!ctx) return; // Make sure ctx is not null

    ctx.imageSmoothingEnabled = false;

    // function defn we call to load our photo from its source URL.
    const loadImage = (src: string): Promise<HTMLImageElement> => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject; // Handle the loading error
        img.src = src;
      });
    };

    const drawAsciiImage = async () => {
      const photo = await loadImage(imageSrc);

      // Scale the image to fit within the canvas dimensions while maintaining aspect ratio
      const aspectRatio = photo.width / photo.height;
      let resizedWidth, resizedHeight;
      if (width / height > aspectRatio) {
        resizedHeight = height;
        resizedWidth = height * aspectRatio;
      } else {
        resizedWidth = width;
        resizedHeight = width / aspectRatio;
      }

      canvas.width = width;
      canvas.height = height;

      const w = resizedWidth / width;
      const h = resizedHeight / height;

      // draw the image to the canvas
      ctx.drawImage(photo, 0, 0, resizedWidth, resizedHeight);

      // get the pixel data from the canvas
      const photoData = ctx.getImageData(0, 0, resizedWidth, resizedHeight);

      ctx.fillStyle = 'rgba(0, 0, 230, 1)';
      ctx.fillRect(0, 0, width, height);

      // go through every pixel of the image
      // get the brightness of every pixel in the image
      // pixel array = [ r, g, b, a, r, g, b, a, ...]
      for (let i = 0; i < resizedWidth; i++) {
        for (let j = 0; j < resizedHeight; j++) {
          const pixelIndex = (i + j * resizedWidth) * 4;
          const r = photoData.data[pixelIndex + 0];
          const g = photoData.data[pixelIndex + 1];
          const b = photoData.data[pixelIndex + 2];

          const brightness = (r + g + b) / 3;
          const character = mapBrightnessToCharacter(brightness);

          const fillColor =
            brightness > 128 ? `rgba(0, 0, ${255 - (brightness - 128) * 2}, 1)` : 'rgba(255, 255, 255, 1)';
          ctx.fillStyle = fillColor;

          ctx.font = '7.41px monospace';
          ctx.fillText(character, i * w, j * h);
        }
      }
    };

    const mapBrightnessToCharacter = (brightness: number) => {
      const index = Math.floor(map(brightness, 0, 169, density.length, 0));
      return density.charAt(index);
    };

    const map = (value: number, start1: number, stop1: number, start2: number, stop2: number): number => {
      return ((value - start1) / (stop1 - start1)) * (stop2 - start2) + start2;
    };

    drawAsciiImage();
  }, [imageSrc, width, height]);

  return (
    <>
      <div className='w-556 h-755 p-6 rounded-lg shadow-md flex'>
        <div className='flex flex-col items-center justify-center'>
          <canvas
            ref={canvasRef}
            className='mb-4 h-500 w-500 aspect-w-1 aspect-h-1 object-cover rounded-lg'
          />
        </div>
      </div>
    </>
  );
};

export default AsciiImage;
