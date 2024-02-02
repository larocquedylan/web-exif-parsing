import { useState, useEffect, useCallback } from 'react';
import exifr from 'exifr';
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from '@/components/ui/table';

interface ExifViewerProps {
  file: File | null;
  parseOptions: object;
}

interface ExifData {
  [key: string]: string | number | Date;
}

const ExifViewer: React.FC<ExifViewerProps> = ({ file, parseOptions }) => {
  const [exifData, setExifData] = useState<ExifData | null>(null);
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const [fileSize, setFileSize] = useState<number>(0);

  const renderExifRows = useCallback(() => {
    if (!exifData) return null;
    return Object.entries(exifData).map(([key, value], i) => {
      if (typeof value === 'string' || typeof value === 'number') {
        const formattedKey = key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());
        return (
          <TableRow key={i}>
            <TableCell className='text-sm'>{formattedKey}</TableCell>
            <TableCell className='text-sm'>{value}</TableCell>
          </TableRow>
        );
      }
      return null;
    });
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
    <div className='flex flex-col w-full text-white overflow-x-auto'>
      <p className='mb-2'>{`${(fileSize / 1000000).toFixed(2)} Mb in ${timeElapsed.toFixed(3)} ms`}</p>
      <div className='overflow-x-auto w-full flex justify-center items-center'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='w-[150px]'>Metadata Tag</TableHead>
              <TableHead>Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>{renderExifRows()}</TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ExifViewer;
