import * as React from 'react';
import { useMemo, useState, useRef, useEffect } from 'react';

import compareArray from '../../../../../utils/compareArray';
import isObject from '../../../../../utils/isObject';

import { Icon, IndexPath, Select, SelectItem } from "@ui-kitten/components";

import { Pressable } from "react-native";

import { useOneState } from '../../../context/StateProvider';
import { useOneProps } from '../../../context/PropsProvider';
import { useOnePayload } from '../../../context/PayloadProvider';

import { useAsyncAction } from '../../../../../hooks/useAsyncAction';
import { useRenderWaiter } from '../../../../../hooks/useRenderWaiter';

import { IItemsSlot } from '../../../slots/ItemsSlot';

const DEFAULT_INDEX = new IndexPath(0);

const getArrayHash = (value: any) =>
    Object.values<string>(value || {})
        .sort((a, b) => b.localeCompare(a))
        .join('-');

interface IState {
    options: string[];
    labels: Record<string, string>;
}

/**
 * @param Items - The main function that renders the Autocomplete component.
 * @param Items.value - The value of the autocomplete field. It can be a string or an object.
 * @param Items.disabled - Determines whether the autocomplete field is disabled or not.
 * @param Items.readonly - Determines whether the autocomplete field is readonly or not.
 * @param Items.description - The description of the autocomplete field.
 * @param Items.placeholder - The placeholder text of the autocomplete field.
 * @param Items.itemList - The list of items to be populated in the autocomplete dropdown.
 * @param Items.freeSolo - Determines whether the user can input values that are not in the itemList.
 * @param Items.noDeselect - Determines whether the user can deselect values in the autocomplete field.
 * @param Items.watchItemList - Determines whether to watch for changes in the itemList.
 * @param Items.dirty - Determines whether the autocomplete field has been modified.
 * @param Items.invalid - Determines whether the autocomplete field has an invalid value.
 * @param Items.incorrect - Determines whether the autocomplete field has an incorrect value.
 * @param Items.title - The title text of the autocomplete field.
 * @param Items.tr - A translation function that takes a string and returns a translated string.
 * @param Items.onChange - A callback function that is called when the value of the autocomplete field changes.
 * @returns The Autocomplete component.
 */
export const Items = ({
    value: upperValue,
    disabled,
    readonly,
    description,
    placeholder,
    itemList = [],
    freeSolo,
    noDeselect,
    watchItemList,
    dirty,
    style,
    invalid,
    incorrect,
    title,
    tr = (s) => s.toString(),
    onChange,
}: IItemsSlot) => {

    const { object } = useOneState();
    const payload = useOnePayload();

    const [state, setState] = useState<IState>(() => ({
        options: [],
        labels: {},
    }));

    const initComplete = useRef(false);

    const waitForRender = useRenderWaiter([state], 10);

    /**
     * Memoized value casted to array.
     *
     * @type {Array}
     * @param upperValue - The value used to compute the memoized array.
     * @returns - The memoized array value.
     */
    const arrayValue = useMemo(() => {
        if (typeof upperValue === 'string') {
            return [upperValue];
        }
        if (upperValue) {
            const result = Object.values<string>(upperValue);
            return isObject(result) ? [] : result;
        }
        return [];
    }, [upperValue]);

    const prevValue = useRef(arrayValue);

    /**
     * Memoizes the value based on the input array value.
     *
     * @param arrayValue - The array value.
     * @returns - The memoized value.
     */
    const value = useMemo(() => {
        if (compareArray(prevValue.current, arrayValue)) {
            return prevValue.current;
        }
        prevValue.current = arrayValue;
        return arrayValue;
    }, [arrayValue]);

    const selectValue = useMemo(() => {
        return value
            .map((key) => {
                const index = state.options.findIndex((value) => value === key);
                return index !== -1 ? new IndexPath(index) : undefined as never;
            })
            .filter(v => v);
    }, [value]);

    const displayValue = useMemo(() => {
        return value.map((k) => state.labels[k] || k).join(', ') || undefined;
    }, [value]);

    const {
        fallback,
    } = useOneProps();

    const {
        loading,
        execute,
    } = useAsyncAction(async (object) => {
        const labels: Record<string, string> = {};
        itemList = itemList || [];
        const options: string[] = [...new Set(Object.values(typeof itemList === 'function' ? await Promise.resolve(itemList(object, payload)) : itemList))];
        await Promise.all(options.map(async (item) => labels[item] = await Promise.resolve(tr(item, object, payload))));
        if (freeSolo) {
            value.forEach((item) => {
                if (!options.includes(item)) {
                    options.push(item);
                }
            });
        }
        setState({ options, labels });
        initComplete.current = true;
        await waitForRender();
    }, {
        fallback,
    });

    const valueHash = getArrayHash(value);
    const prevObject = useRef<any>(null);
    const initial = useRef(true);

    useEffect(() => {
        if (!initial.current) {
            if (prevObject.current === object) {
                return;
            }
            if (!watchItemList) {
                return;
            }
        }
        prevObject.current = object;
        initial.current = false;
        execute(object);
    }, [
        valueHash,
        disabled,
        dirty,
        invalid,
        incorrect,
        object,
        readonly,
    ]);

    const error = useMemo(() => dirty && (invalid !== null || incorrect !== null), [dirty, invalid, incorrect]);

    /**
     * Handles a change event by calling the provided onChange function with the value.
     * If the value is an empty string or undefined, null is passed to the onChange function.
     * After calling onChange, the changeSubject is notified.
     *
     * @param value - The value to be passed to the onChange function.
     * @returns
     */
    const handleChange = (value: any) => {
        if (disabled) {
            return;
        }
        if (readonly) {
            return;
        }
        onChange(value?.length ? value : null);
    };

    if (loading || !initComplete.current) {
        return (
            <Select
                key={"loading"}
                style={style}
                value="Loading"
                size="medium"
                selectedIndex={DEFAULT_INDEX}
                caption={(dirty && (invalid || incorrect)) || description}
                placeholder={placeholder}
                label={title}
                status={error ? "danger" : undefined}
                disabled
            >
                <SelectItem title='Loading' />
            </Select>
        );
    }

    return (
        <Select
            multiSelect={true}
            disabled={disabled}
            selectedIndex={selectValue}
            value={displayValue}
            size="medium"
            style={style}
            caption={(dirty && (invalid || incorrect)) || description}
            placeholder={placeholder}
            label={title}
            status={error ? "danger" : undefined}
            onSelect={(index) => {
                if (Array.isArray(index)) {
                    handleChange(index.map(({ row }) => state.options[row]));
                }
            }}
            accessoryRight={!noDeselect ? (
                <Pressable onPress={() => handleChange(null)}>
                    <Icon name="close" />
                </Pressable >
            ) : undefined}
        >
            {state.options.map((value) => (
                <SelectItem key={value} title={state.labels[value] || value} />
            ))}
        </Select>
    );
};

export default Items;
