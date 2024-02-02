import { useContext, useState } from 'react';
import PhotoViewer from '../components/Photo/Photo';
import ExifViewer from '../components/ExifData/ExifViewer';
import { defaultOptions } from '../utils/ExifOptions';
import ExifOptions from '../components/ExifOptions/ExifOptions';
import { ImageContext } from '@/components/ImageContent/ImageContext';
import NavBar from '@/components/NavBar/NavBar';
import { useNavigate } from 'react-router-dom';

const Exif: React.FC = () => {
  const { image } = useContext(ImageContext);
  const [parseOptions, setParseOptions] = useState<typeof defaultOptions>(defaultOptions);
  const navigate = useNavigate();

  const handleOptionsChange = (newOptions: typeof defaultOptions) => {
    setParseOptions((prevOptions) => ({ ...prevOptions, ...newOptions }));
  };

  return (
    <>
      <div className='flex flex-col items-center p-10 min-h-screen bg-gradient-to-br from-black via-slate-800 to-slate-950'>
        {/* container */}
        <div className='w-full max-w-[1000px]'>
          {/* header */}
          <section className='w-full py-12'>
            <div className='container space-y-4 px-4 md:px-6'>
              <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-red-200 to-fuchsia-950 mb-10 text-center'>
                Metadata
              </h1>
            </div>
          </section>

          {/* main content */}
          <main className='flex flex-col lg:flex-row justify-center gap-8 w-full'>
            {/* photo and parse options */}
            <section className='p-4 flex flex-col md:w-1/2'>
              <h2 className='text-white text-lg font-semibold mb-4'>Photo</h2>
              <PhotoViewer file={image} />
              <details className='my-4 cursor-pointer' open>
                <summary className='text-lg font-semibold text-white'>Parse Options</summary>
                <div className='mt-2 space-y-2'>
                  <ExifOptions onOptionsChange={handleOptionsChange} parseOptions={parseOptions} />
                </div>
              </details>
            </section>
            {/* exif tags views */}
            <section className='flex flex-col w-full lg:w-1/2 p-4'>
              <h2 className='text-white text-lg font-semibold mb-4'>Metadata View</h2>
              <div className='rounded-lg overflow-x-auto'>
                <ExifViewer file={image} parseOptions={parseOptions} />
              </div>
            </section>
          </main>

          <section className='flex justify-center gap-8 md:8 lg:py-12'>
            <button
              className='py-2 px-4 bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold rounded-md shadow-md transform hover:scale-105 transition-transform'
              onClick={() => navigate('/')}
            >
              {'< Try a different photo'}
            </button>
            <button
              className='py-2 px-4 bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold rounded-md shadow-md transform hover:scale-105 transition-transform'
              onClick={() => navigate('/ascii')}
            >
              {'Make it ASCII >'}
            </button>
          </section>
          <footer className='flex items-center justify-center p-4'>
            <NavBar />
          </footer>
        </div>
      </div>
    </>
  );
};

export default Exif;
