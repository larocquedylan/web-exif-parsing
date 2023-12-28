import { useState, useEffect, useCallback } from "react";
import exifr from "exifr";

interface ExifViewerProps {
    file: File | null;

    parseOptions: object;
}

interface ExifData {
    [key: string]: string | number | Date;
}

const ExifViewer: React.FC<ExifViewerProps> = ({ file, parseOptions }) => {
    // exifData state
    const [exifData, setExifData] = useState<ExifData | null>(null);
    const [timeElapsed, setTimeElapsed] = useState<number>(0);
    const [fileSize, setFileSize] = useState<number>(0);
    const [tagCount, setTagCount] = useState<number>(0);

    const renderExifData = useCallback(() => {
        if (!exifData) {
        return;
    } else {
        // when we mergeOutput the data isn't displayed - but it would segment them better
        // if we got it segmented properly, we could put them into tabs like tyson wanted
        console.log(exifData);

        return Object.entries(exifData).map(([key, value], i) => {
            if (typeof value === "string" || typeof value === "number") {
            return (
                <tr key={i} className="w-1/2">
                {" "}
                <td>
                    {" "}
                    <strong>
                    <p>{key}:</p>{" "}
                    </strong>{" "}
                </td>{" "}
                <td>
                    <p>{value}</p>{" "}
                </td>{" "}
                </tr>
            );}
        });
        }
    }, [exifData, parseOptions]);

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
            setTagCount(Object.entries(parsedFile).length);
        } catch (error) {
            console.error(
            "Error with the fetch or possibly the parsing of the image: ",
            error
            );
        }
    };
    retrieveExif();
    }, [file, parseOptions]);

  return (
    <div className="exif-viewer">
        {" "}
        <div className="exif-viewer__info">
            {" "}
            <p className="exif-viewer__size-time">{`${(fileSize / 1000000).toFixed(
            2
            )} Mb, in ${timeElapsed.toFixed(3)} ms`}</p>{" "}
            <p className="exif-viewer__tag-count">{`Total Tags accounted for: ${tagCount}`}</p>{" "}
        </div>

        <div className="table-container">
            <tbody>{renderExifData()}</tbody>{" "}
        </div>
    </div>
  );
};

export default ExifViewer;