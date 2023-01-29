import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { render, RenderOptions } from '@testing-library/react';
import { FC, ReactElement, ReactNode } from 'react';
import store from './store';
import theme from './theme';

export const AppProviders: FC<{ children: ReactNode }> = ({ children }) => (
  <ChakraProvider theme={theme}>
    <BrowserRouter>
      <Provider store={store}>{children}</Provider>
    </BrowserRouter>
  </ChakraProvider>
);

const customRender = (ui: ReactElement, options?: RenderOptions) => {
  render(ui, { wrapper: AppProviders, ...options });
};

export * from '@testing-library/react';

export { customRender as render };
