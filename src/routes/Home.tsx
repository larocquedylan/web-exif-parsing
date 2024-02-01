import { ImageContext } from '@/components/ImageContent/ImageContext';
import FileInput from '@/components/Input/FileInput';
import { useContext, useState } from 'react';

import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const { setImage } = useContext(ImageContext);
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileSelected = (file: File) => {
    setSelectedFile(file);
    setImage(file); // Set the image in context here
  };

  return (
    <div className='flex flex-col items-center p-10 min-h-screen bg-gradient-to-br from-slate-900 via-red-800 to-blue-600'>
      <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-red-200 to-slate-950 mb-10'>
        PHOTOFUN
      </h1>
      <div className='w-full max-w-md px-8 py-6 bg-white rounded-xl shadow-md'>
        <div className='flex flex-col space-y-4'>
          <FileInput onFileSelected={handleFileSelected} selectedFile={selectedFile} />
          <button
            className='py-2 px-4 bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold rounded-md shadow-md transform hover:scale-105 transition-transform'
            onClick={() => navigate('/exif')}
          >
            Parse Metadata
          </button>
          <button
            className='py-2 px-4 bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold rounded-md shadow-md transform hover:scale-105 transition-transform'
            onClick={() => navigate('/ascii')}
          >
            Make ASCII
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
