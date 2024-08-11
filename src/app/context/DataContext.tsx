// DataContext.js
import React, { createContext, ReactNode } from 'react';
import spaceData from '../data.json';
import { SpaceTravelData } from '../utils/types';

export const DataContext = createContext<SpaceTravelData>({});

export const DataProvider = ({ children }: {children: ReactNode}) => {
    const data = spaceData;

    return (
        <DataContext.Provider value={data}>
            {children}
        </DataContext.Provider>
    );
};
