import * as React from 'react';
import { useContext, useMemo } from 'react';
import { createContext } from 'react';

import IOneApi from '../../../model/IOneApi';
import IOneProps from '../../../model/IOneProps';

/**
 * Represents the context object used by the application.
 * @interface Context
 */
interface Context {
    apiRef: React.Ref<IOneApi> | null;
    reloadSubject: Exclude<IOneProps['reloadSubject'], undefined> | null;
    changeSubject: Exclude<IOneProps['changeSubject'], undefined> | null;
    updateSubject: Exclude<IOneProps['updateSubject'], undefined> | null;
}

const ApiContext = createContext<Context>(null as never);

/**
 * Represents the properties for the `ApiProvider` component.
 */
interface IApiProviderProps {
    children: React.ReactNode;
    apiRef?: React.Ref<IOneApi> | null;
    reloadSubject?: IOneProps['reloadSubject'] | null;
    changeSubject?: IOneProps['changeSubject'] | null;
    updateSubject?: IOneProps['updateSubject'] | null;
}

/**
 * Represents a provider component that wraps its children components with an API context.
 *
 * @typedef IApiProviderProps
 * @property children - The children components to wrap.
 * @property apiRef - The reference to the API.
 * @property reloadSubject - The subject for triggering reload events.
 * @property changeSubject - The subject for triggering change events.
 * @property updateSubject - The subject for triggering update events.
 */
export const ApiProvider = ({
    children,
    apiRef = null,
    reloadSubject = null,
    changeSubject = null,
    updateSubject = null,
}: IApiProviderProps) => {
    /**
     * storing a form target object value.
     *
     * @param callback - The function to be called to create the object.
     * @param dependencies - The dependencies that, when changed, will trigger the recalculation of the memoized value.
     *
     * @returns - The memoized object value.
     */
    const value = useMemo(() => ({
        apiRef,
        reloadSubject,
        changeSubject,
        updateSubject,
    }), [
        apiRef,
        reloadSubject,
        changeSubject,
        updateSubject,
    ]);
    return (
        <ApiContext.Provider value={value}>
            {children}
        </ApiContext.Provider>
    );
};

export const useApiRef = () => useContext(ApiContext);

export default ApiProvider;
