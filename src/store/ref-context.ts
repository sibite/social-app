import React, { createContext, createRef } from 'react';

const PortalRefContext = createContext<React.RefObject<HTMLElement | null>>(
  createRef()
);

export default PortalRefContext;
