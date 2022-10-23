import { ToastPosition, useToast, UseToastOptions } from '@chakra-ui/react';

const share = async (
  toast: ReturnType<typeof useToast>,
  position: ToastPosition,
  url: string
) => {
  const successToast: UseToastOptions = {
    title: 'Copied link to clipboard',
    position,
    status: 'success',
    duration: 3000,
  };

  try {
    await (navigator.permissions.query as any)({
      name: 'clipboard-write',
    });
    await navigator.clipboard.writeText(url);
    toast(successToast);
  } catch {
    if (!document.execCommand)
      toast({
        title: 'Could not copy the url to clipboard',
        position,
        status: 'error',
        duration: 4000,
      });
    else setTimeout(() => toast(successToast), 250);
  }
};

export default share;
