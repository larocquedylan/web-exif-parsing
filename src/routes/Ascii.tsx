import { useContext } from 'react';
import AsciiImage from '../components/Ascii/AsciiImage';
import { ImageContext } from '@/components/ImageContent/ImageContext';
import NavBar from '@/components/NavBar/NavBar';
import { useNavigate } from 'react-router-dom';

const Ascii: React.FC = () => {
  const { image } = useContext(ImageContext);
  const navigate = useNavigate();

  return (
    <>
      <div className='flex flex-col items-center p-10 min-h-screen bg-gradient-to-br from-black via-slate-800 to-slate-950'>
        <section className='w-full py-12'>
          <div className='container space-y-4 px-4 md:px-6'>
            <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-red-100 to-blue-600 mb-10 text-right'>
              ASCII
            </h1>
          </div>
        </section>
        <main className='flex-4'>
          <AsciiImage file={image} width={320} height={320} />
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
            onClick={() => navigate('/exif')}
          >
            Metadata
          </button>
        </section>
        <footer className='flex items-center justify-center'>
          <NavBar />
        </footer>
      </div>
    </>
  );
};

export default Ascii;
