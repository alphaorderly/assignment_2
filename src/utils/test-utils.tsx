import React, { ReactElement } from 'react';
import { render, RenderOptions, RenderResult } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

interface ProviderProps {
    children?: NonNullable<React.ReactNode>;
}

export const TheProvider: React.FC<ProviderProps> = ({ children }) => (
    <RecoilRoot>
        <BrowserRouter>{children}</BrowserRouter>
    </RecoilRoot>
);

// here is the issue for function return type
const customRender = (
    ui: ReactElement,
    options?: Omit<RenderOptions, 'queries'>
): RenderResult => render(ui, { wrapper: TheProvider, ...options });

export * from '@testing-library/react';

export { customRender as render };
