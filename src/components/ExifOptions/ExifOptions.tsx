// import { useState, useCallback } from 'react';
// import defaultOptions from '@/components/ExifOptions/ExifOptions';
// import './ExifOptions.css';

// interface ExifOptionsProps {
//     onOptionsChange: (options: typeof defaultOptions) => void;
//     parseOptions: typeof defaultOptions;
// }

// type OptionsType = typeof defaultOptions;

// // type TooltipData = {
// //     [key in keyof typeof defaultOptions]?: string;
// // };

// // const tooltips: TooltipData = {
// //     tiff: 'Tagged Image File Format segment - consists of IFD0, IFD1, EXIF, GPS, Interop.',
// //     xmp: 'Extensible Metadata Platform - contains edits done to raw file and camera information.',
// //     icc: 'Characterize the color profile embedded in a photo.',
// //     iptc: 'Captions and copyrights associated with a photo.',
// //     jfif: 'JPEG Fifle Inerchange Format - specifies supplamentary metadata.',
// //     ihdr: 'Image Header - basic file information (PNG ONLY)',
// //     ifd0: 'Image - Image File Directory 0 - basic info about the image.',
// //     ifd1: 'Thumbnail - Image File Directory 1 - basic info about the embedded thumbnail.',
// //     exif: 'Exchangeable Image File Format - Detailed information about the photo.',
// //     gps: 'GPS coordinates of the photo',
// //     interop: 'Interoporability tag',
// //     makerNote: 'Maker Note tag',
// //     userComment: 'User Comment tag',
// //     translateKeys: 'Translates tag keys from numeric codes to understandable string names.',
// //     translateValues: 'Translates tag values from raw enums to understandable strings.',
// //     reviveValues: 'Convert dates from strings to a Date instances and tags to a more readable format.',
// //     sanitize: 'Round decimals',
// //     mergeOutput: 'Merges all parsed APP segments and blocks into a single object.',
// //     silentErrors:
// //     'Failing silently enables reading broken files. Errors stored in an object instead of throwing.',
// // };

// const ExifOptions: React.FC<ExifOptionsProps> = ({ onOptionsChange, parseOptions }) => {
//     const [options, setOptions] = useState(parseOptions);
//     const [selectAll, setSelectAll] = useState(true);
//     const [tooltip, setTooltip] = useState<string | null>(null);
    
//     const toggleSelectAll = useCallback(() => {
//     const newOptions: OptionsType = Object.keys(defaultOptions).reduce((opts, key) => {
//         const optionKey = key as keyof OptionsType;
//         opts[optionKey] = selectAll;
//         return opts;
//     }, {} as OptionsType);
//     setOptions(newOptions);
//     onOptionsChange(newOptions);
//     setSelectAll(!selectAll);
//     }, [selectAll, onOptionsChange]);

//     const handleOptionToggle = useCallback(
//     (key: keyof typeof defaultOptions) => {
//         const updatedOptions = { ...options, [key]: !options[key] };
//         setOptions(updatedOptions);
//         onOptionsChange(updatedOptions);
//     },[options, onOptionsChange],
//     );

//     return (
//         <div className='exif-options'>
//             <button onClick={toggleSelectAll} className='exif-options__toggle-button'>
//                 {selectAll ? 'Select All' : 'Deselect All'}
//             </button>
//             {Object.keys(defaultOptions).map((key) => {
//             const optionKey = key as keyof typeof defaultOptions;

//         return (
//             <label
//             key={key}
//             className='exif-options__option'
//             onMouseEnter={() => setTooltip(tooltips[optionKey] ?? null)}
//             onMouseLeave={() => setTooltip(null)}
//             >
//                 <input
//                 type='checkbox'
//                 checked={options[optionKey]}
//                 onChange={() => handleOptionToggle(optionKey)}
//                 className='exif-options__checkbox'
//                 />
//                 <p className='exif-options__label-text'>{key}</p>
//                 {tooltip && <div className='tooltip'>{tooltip}</div>}
//             </label>
//             );
//         })}
//         </div>
//     );
// };

// export default ExifOptions;