import { useBoolean } from '@chakra-ui/react';
import downscale from 'downscale';
import { useEffect, useState } from 'react';

export interface FileWrapper {
  id: number;
  file: File;
  dataUrl: string;
}

let currentFileId = 0;

function useUploadManager() {
  const [newRawFiles, setNewRawFiles] = useState<File[]>([]);
  const [files, setFiles] = useState<FileWrapper[]>([]);
  const [isLoading, setIsLoading] = useBoolean(false);

  useEffect(() => {
    const len = newRawFiles.length;
    if (len === 0) return;
    setIsLoading.on();
    const filesArray: FileWrapper[] = [];

    const nextFile = async (i: number) => {
      const file = newRawFiles[i];
      const blob = await downscale(file, 100, 100, { returnBlob: true });
      const dataUrl = URL.createObjectURL(blob);
      const newFile = {
        id: currentFileId,
        file,
        dataUrl,
      };
      currentFileId += 1;
      filesArray.push(newFile);
      if (i < len - 1) {
        nextFile(i + 1);
      } else {
        setFiles((existing) => existing.concat(filesArray));
        setIsLoading.off();
        setNewRawFiles([]);
      }
    };

    try {
      nextFile(0);
    } catch {
      setIsLoading.off();
    }
  }, [newRawFiles, setIsLoading]);

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(event.currentTarget.files ?? []);
    setNewRawFiles(newFiles);
  };

  const removeFile = (removeId: number) => {
    setFiles((prev) => prev.filter(({ id }) => id !== removeId));
  };

  const clearAll = () => {
    setFiles([]);
    setNewRawFiles([]);
  };

  return {
    files,
    isLoading,
    changeHandler,
    removeFile,
    clearAll,
  };
}

export default useUploadManager;
