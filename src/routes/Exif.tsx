import { useContext, useState } from 'react';
// import FileInput from '../components/Input/FileInput';
import PhotoViewer from '../components/Photo/Photo';
import { CardTitle, CardHeader, CardContent, Card } from '../components/ui/card';
import ExifViewer from '../components/ExifData/ExifViewer';
import { defaultOptions } from '../utils/ExifOptions';
import ExifOptions from '../components/ExifOptions/ExifOptions';
import { ImageContext } from '@/components/ImageContent/ImageContext';

const Exif: React.FC = (file) => {
  const { image } = useContext(ImageContext);
  const [parseOptions, setParseOptions] = useState<typeof defaultOptions>(defaultOptions);

  const handleOptionsChange = (newOptions: typeof defaultOptions) => {
    setParseOptions((prevOptions) => ({ ...prevOptions, ...newOptions }));
  };

  return (
    <>
      <div className='w-full min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-slate-950 to-blue-900 p-2'>
        <section className='w-full py-12 md:py-24 lg:py-32'>
          <div className='container space-y-12 px-4 md:px-6'>
            <h2 className='text-3xl font-bold tracking-tighter sm:text-5xl text-center text-white'>
              Web Exif Viewer
            </h2>
            <p className='max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400 text-center mx-auto'>
              Extract metadata from your photos!
            </p>
          </div>
        </section>
        <main className='flex-grow p-4'>
          <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
            <Card>
              <CardHeader>
                <CardTitle>Drag or Select Photo</CardTitle>
              </CardHeader>
              <CardContent className='flex flex-col space-y-4'>
                <div className='w-full flex flex-col'>
                  <p>{file}</p>
                  <ExifOptions onOptionsChange={handleOptionsChange} parseOptions={parseOptions} />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Photo View</CardTitle>
              </CardHeader>
              <CardContent>
                <PhotoViewer file={image} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Metadata View</CardTitle>
              </CardHeader>
              <CardContent>
                <ExifViewer file={image} parseOptions={parseOptions} />
              </CardContent>
            </Card>
          </div>
        </main>
        <section className='w-full py-12 md:py-24 lg:py-32'></section>
        <footer className='flex items-center justify-center p-4'>
          <span className='text-sm text-gray-600'>dylan larocque</span>
        </footer>
      </div>
    </>
  );
};

export default Exif;
