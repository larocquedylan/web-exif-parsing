import { useState, useEffect, useCallback } from 'react';
import exifr from 'exifr';

interface ExifViewerProps {
  file: File | null;

  parseOptions: object;
}

interface ExifData {
  [key: string]: string | number | Date;
}

const ExifViewer: React.FC<ExifViewerProps> = ({ file, parseOptions }) => {
  // exifData state
  const [exifData, setExifData] = useState<ExifData | null>(null);
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const [fileSize, setFileSize] = useState<number>(0);

  const renderExifData = useCallback(() => {
    if (!exifData) {
      return;
    } else {
      return Object.entries(exifData).map(([key, value], i) => {
        const formattedKey = key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase()); // Example formatting
        if (typeof value === 'string' || typeof value === 'number') {
          return (
            <tr key={i} className={`border border-sky-950`}>
              <th
                className='text-xs font-lg leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 whitespace-nowrap text-left'
                scope='row'
              >
                <p className=''>{formattedKey}</p>
              </th>
              <td className='py-1 text-xs leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 '>
                {value}
              </td>
            </tr>
          );
        }
      });
    }
  }, [exifData]);

  useEffect(() => {
    const retrieveExif = async () => {
      if (!file) return;

      try {
        const startTimer = performance.now();
        const parsedFile = await exifr.parse(file, parseOptions);
        const endTimer = performance.now();
        setTimeElapsed(endTimer - startTimer);
        setFileSize(file.size);
        setExifData(parsedFile);
      } catch (error) {
        console.error('Error with the fetch or possibly the parsing of the image: ', error);
      }
    };
    retrieveExif();
  }, [file, parseOptions]);

  return (
    <div className='flex flex-col w-full'>
      <div className='flex flex-col space-y-1 pb-2'>
        <p className='exif-viewer__size-time'>{`${(fileSize / 1000000).toFixed(
          2,
        )} Mb in ${timeElapsed.toFixed(3)} ms`}</p>
      </div>
      <div className='flex'>
        <tbody className='w-full'>{renderExifData()}</tbody>
      </div>
    </div>
  );
};

export default ExifViewer;
