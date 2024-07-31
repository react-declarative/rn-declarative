import { useMemo } from 'react';

import IAnything from '../../../../../model/IAnything';
import { Value } from '../../../../../model/IField';

/**
 * Represents the interface for managing the memory state in the application.
 *
 * @interface IMemory
 */
interface IMemory {
    inputUpdate: boolean;
    objectUpdate: boolean;
    initComplete: boolean;
    pressDisabled: boolean;
    fieldName: string;
    isMounted: boolean;
    lastDebouncedValue: Value;
    fieldReadonly$: boolean;
    upperReadonly$: boolean;
    focusReadonly$: boolean;
    debouncedValue$: Value;
    invalid$: string | null;
    object$: IAnything;
    value$: Value;
}

/**
 * Represents an interface for memory data.
 *
 * @interface
 * @extends Omit<IMemory, 'inputUpdate' | 'objectUpdate' | 'initComplete' | 'isMounted' | 'fieldName'>
 */
interface IMemoryData extends Omit<IMemory, keyof {
    inputUpdate: never;
    objectUpdate: never;
    initComplete: never;
    isMounted: never;
    fieldName: never;
}> {
    prefix: string;
    name: string;
}

/**
 * Creates a memory object using the given parameters.
 *
 * @param memoryData - The data needed to create the memory object.
 * @param memoryData.prefix - The prefix to use for the memory field name.
 * @param memoryData.name - The name of the memory field.
 * @param memoryData.lastDebouncedValue - The last debounced value of the memory field.
 * @param memoryData.debouncedValue$ - The observable for the debounced value of the memory field.
 * @param memoryData.fieldReadonly$ - The observable for the readonly state of the memory field.
 * @param memoryData.focusReadonly$ - The observable for the readonly state of the focus.
 * @param memoryData.invalid$ - The observable for the invalid state of the memory field.
 * @param memoryData.object$ - The observable for the object of the memory field.
 * @param memoryData.upperReadonly$ - The observable for the readonly state of the upper field.
 * @param memoryData.value$ - The observable for the value of the memory field.
 * @returns - The memory object.
 */
export const useFieldMemory = ({
    prefix,
    name,
    pressDisabled,
    lastDebouncedValue,
    debouncedValue$,
    fieldReadonly$,
    focusReadonly$,
    invalid$,
    object$,
    upperReadonly$,
    value$,
}: IMemoryData) => {
    /**
     * Variable representing the memory object.
     *
     * @typedef IMemory
     * @property inputUpdate - Represents whether input has been updated.
     * @property objectUpdate - Represents whether object has been updated.
     * @property initComplete - Represents whether initialization has been completed.
     * @property fieldName - Represents the field name.
     * @property lastDebouncedValue - Represents the last debounced value.
     * @property isMounted - Represents whether the component is mounted.
     * @property debouncedValue$ - Represents the debounced value.
     * @property fieldReadonly$ - Represents the field readonly value.
     * @property focusReadonly$ - Represents the focus readonly value.
     * @property invalid$ - Represents the invalid value.
     * @property object$ - Represents the object value.
     * @property upperReadonly$ - Represents the upper readonly value.
     * @property value$ - Represents the value.
     */
    const memory = useMemo((): IMemory => ({
        inputUpdate: false,
        objectUpdate: false,
        initComplete: false,
        fieldName: `${prefix}(${name || 'unknown'})`,
        lastDebouncedValue,
        isMounted: true,
        pressDisabled: false,
        debouncedValue$: null as never,
        fieldReadonly$: null as never,
        focusReadonly$: null as never,
        invalid$: null as never,
        object$: null as never,
        upperReadonly$: null as never,
        value$: null as never,
    }), []);
    memory.debouncedValue$ = debouncedValue$;
    memory.fieldReadonly$ = fieldReadonly$;
    memory.focusReadonly$ = focusReadonly$;
    memory.invalid$ = invalid$;
    memory.object$ = object$;
    memory.upperReadonly$ = upperReadonly$;
    memory.value$ = value$;
    memory.pressDisabled = pressDisabled;
    return { memory };
}

export default useFieldMemory;