import { useContext } from 'react';
// import FileInput from '../components/Input/FileInput';
import { CardTitle, CardHeader, CardContent, Card } from '../components/ui/card';
import AsciiImage from '../components/Ascii/AsciiImage';
import { ImageContext } from '@/components/ImageContent/ImageContext';

const Ascii: React.FC = () => {
  const { image } = useContext(ImageContext);

  // const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // const handleFileSelected = (file: File) => {
  //   setSelectedFile(file);
  // };

  return (
    <>
      <div className='w-full min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-slate-950 to-blue-900 p-2'>
        <section className='w-full py-12 md:py-24 lg:py-32'>
          <div className='container space-y-12 px-4 md:px-6'>
            <h2 className='text-3xl font-bold tracking-tighter sm:text-5xl text-center text-white'>
              Make your image ASCII
            </h2>
          </div>
        </section>
        <main className='flex-grow p-4'>
          <div className='flex flex-col space-y-6'>
            <Card>
              <CardHeader>
                <CardTitle>Drag or Select Photo</CardTitle>
              </CardHeader>
              <CardContent className='flex flex-col space-y-4'>
                <div className='w-full flex flex-col'>
                  {/* <FileInput onFileSelected={handleFileSelected} file={image} /> */}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>ASCII View</CardTitle>
              </CardHeader>
              <CardContent>
                <AsciiImage file={image} width={556} height={755} />
              </CardContent>
            </Card>
          </div>
        </main>
        <section className='w-full py-12 md:py-24 lg:py-32'></section>
      </div>
    </>
  );
};

export default Ascii;
