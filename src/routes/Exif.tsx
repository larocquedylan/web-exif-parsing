import { useContext, useState } from 'react';
import PhotoViewer from '../components/Photo/Photo';
import { CardTitle, CardHeader, CardContent, Card } from '../components/ui/card';
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
        <section className='w-full py-12'>
          <div className='container space-y-4 px-4 md:px-6'>
            <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-red-200 to-fuchsia-950 mb-10 text-center'>
              Metadata
            </h1>
          </div>
        </section>

        <main className='flex-grow p-4'>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(auto, 1fr) 2fr minmax(auto, 1fr)',
              gap: '1rem',
            }}
          >
            <Card style={{ gridRow: '1 / 2', gridColumn: '1 / 2' }}>
              <CardHeader>
                <CardTitle>What tags do you want to see?</CardTitle>
              </CardHeader>
              <CardContent className='flex flex-col space-y-4'>
                <ExifOptions onOptionsChange={handleOptionsChange} parseOptions={parseOptions} />
              </CardContent>
            </Card>
            <Card style={{ gridRow: '1 / 2', gridColumn: '2 / 3' }}>
              <CardHeader>
                <CardTitle>Photo View</CardTitle>
              </CardHeader>
              <CardContent>
                <PhotoViewer file={image} />
              </CardContent>
            </Card>
            <Card style={{ gridRow: '1 / 2', gridColumn: '3 / 4' }}>
              <CardHeader>
                <CardTitle>Metadata View</CardTitle>
              </CardHeader>
              <CardContent>
                <ExifViewer file={image} parseOptions={parseOptions} />
              </CardContent>
            </Card>
          </div>
        </main>
        <section className='flex justify-center gap-8 md:8 lg:py-12'>
          <button
            className='py-2 px-4 bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold rounded-md shadow-md transform hover:scale-105 transition-transform'
            onClick={() => navigate('/')}
          >
            Upload
          </button>
          <button
            className='py-2 px-4 bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold rounded-md shadow-md transform hover:scale-105 transition-transform'
            onClick={() => navigate('/ascii')}
          >
            ASCII
          </button>
        </section>
        <footer className='flex items-center justify-center p-4'>
          <NavBar />
        </footer>
      </div>
    </>
  );
};

export default Exif;
