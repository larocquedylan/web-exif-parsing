import { ImageContext } from '@/components/ImageContent/ImageContext';
import FileInput from '@/components/Input/FileInput';
import NavBar from '@/components/NavBar/NavBar';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const { setImage } = useContext(ImageContext);
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    // Retrieve the stored file name from localStorage
    const storedFileName = window.localStorage.getItem('file');
    if (storedFileName) {
      // Mock a file object with the stored name (no actual file content)
      const mockFile = new File([], storedFileName);
      setSelectedFile(mockFile);
    }
  }, []);

  const handleFileSelected = (file: File) => {
    setSelectedFile(file);
    setImage(file); // Set the image in context
    window.localStorage.setItem('file', file.name); // Store file name in localStorage
  };

  return (
    <div className='flex flex-col items-center p-10 min-h-screen bg-gradient-to-br from-black via-slate-800 to-slate-950'>
      <section className='w-full py-12'>
        <div className='container space-y-4 px-4 md:px-6'>
          <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-red-200 to-fuchsia-950 mb-10 '>
            Upload
          </h1>
        </div>
      </section>
      <div className='w-full max-w-md px-8 py-6 rounded-xl shadow-md'>
        <div className='flex flex-col space-y-4'>
          <FileInput onFileSelected={handleFileSelected} selectedFile={selectedFile} />
          {selectedFile && (
            <p className='px-4 text-white'>✅ File uploaded successfully! {selectedFile.name}</p>
          )}
        </div>
      </div>
      <section className='flex justify-center gap-8 md:8 lg:py-12'>
        <button
          className='py-2 px-4 bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold rounded-md shadow-md transform hover:scale-105 transition-transform'
          onClick={() => navigate('/exif')}
        >
          Metadata
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
  );
};

export default Home;
