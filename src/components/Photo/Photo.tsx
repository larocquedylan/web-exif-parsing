import { useState, useEffect } from 'react';

interface PhotoViewerProps {
    file: File | null;
}

const PhotoViewer: React.FC<PhotoViewerProps> = ({ file }) => {
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

    return (
    <>        
        {imageSrc && <img src={imageSrc} alt='Uploaded Preview' />}
    </>
    );
};

export default PhotoViewer;