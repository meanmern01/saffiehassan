import { createContext, useContext } from 'react';

type PageContext = {
    bodyClass?: string;
};

const PageContext = createContext<PageContext>({});

export const PageContextProvider = PageContext.Provider;

export const usePageContext = () => useContext(PageContext);
