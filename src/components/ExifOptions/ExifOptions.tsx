import { useState, useCallback } from 'react';
import { defaultOptions } from '@/utils/ExifOptions';
import { Checkbox } from '../ui/checkbox';
import { Button } from '../ui/button';

interface ExifOptionsProps {
  onOptionsChange: (options: typeof defaultOptions) => void;
  parseOptions: typeof defaultOptions;
}

type OptionsType = typeof defaultOptions;

const ExifOptions: React.FC<ExifOptionsProps> = ({ onOptionsChange, parseOptions }) => {
  const [options, setOptions] = useState(parseOptions);
  const [selectAll, setSelectAll] = useState(true);

  const toggleSelectAll = useCallback(() => {
    const newOptions: OptionsType = Object.keys(defaultOptions).reduce((opts, key) => {
      const optionKey = key as keyof OptionsType;
      opts[optionKey] = selectAll;
      return opts;
    }, {} as OptionsType);
    setOptions(newOptions);
    onOptionsChange(newOptions);
    setSelectAll(!selectAll);
  }, [selectAll, onOptionsChange]);

  const handleOptionToggle = useCallback(
    (key: keyof typeof defaultOptions) => {
      const updatedOptions = { ...options, [key]: !options[key] };
      setOptions(updatedOptions);
      onOptionsChange(updatedOptions);
    },
    [options, onOptionsChange],
  );

  return (
    <div className='flex flex-col'>
      <Button onClick={toggleSelectAll} variant="secondary" className='my-2'>
        {selectAll ? 'Select All' : 'Deselect All Tags'}
      </Button>
      {Object.keys(defaultOptions).map((key) => {
        const optionKey = key as keyof typeof defaultOptions;

        return (
          <div className='flex flex-row items-center justify-start p-2'>
            <label
              key={key}
              className='text-black text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
            >
                { ' ' } 
            </label>
            <Checkbox checked={options[optionKey]} onChange={() => handleOptionToggle(optionKey)} />
            <p className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 pl-4'>
              {key}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default ExifOptions;
