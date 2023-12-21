import { useRef, useEffect, useState } from 'react';

type AsciiImageProps = {
    file: File | null;
    width: number;
    height: number;
}

const density: string = 'Ñ@#W$9876543210?!abc;:+=-,._ ';
const pixelSize: number = 1;

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
    
    // create reference to canvas element where we will draw
    const canvasRef = useRef(null);

    useEffect(() => {
        if (!imageSrc) return;

        // reference the canvas element for drawing
        const canvas = canvasRef.current;

        // get the drawing context which lets us draw to it
        const ctx = canvas.getContext('2d');

        ctx.imageSmoothingEnabled = false;

        // function defn we call to load our photo from its source URL.
        const loadImage = (src: string) => {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.src = src;
        });
        };

        const drawAsciiImage = async () => {
            const photo = await loadImage(imageSrc);
            
            const resizedWidth = photo.width / pixelSize;
            const resizedHeight = photo.height / pixelSize;
            
            canvas.width = width;
            canvas.height = height;

            // w and h are the dimensions of each pixel on the canvas.
            const w = width / resizedWidth;
            const h = height / resizedHeight;

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
                    brightness > 128
                    ? `rgba(0, 0, ${255 - (brightness - 128) * 2}, 1)`
                    : 'rgba(255, 255, 255, 1)';
                    ctx.fillStyle = fillColor;

                    ctx.font = '7.41px monospace';
                    ctx.fillText(character, i * w, j * h);
                }
            }
        };

        const mapBrightnessToCharacter = (brightness) => {
            const index = Math.floor(map(brightness, 0, 169, density.length, 0));
            return density.charAt(index);
        };

        const map = (value, start1, stop1, start2, stop2) => {
            return ((value - start1) / (stop1 - start1)) * (stop2 - start2) + start2;
        };

        drawAsciiImage();
    }, [imageSrc, width, height]);

    
     return (
        <canvas ref={canvasRef} />
    );  
};

export default AsciiImage;




