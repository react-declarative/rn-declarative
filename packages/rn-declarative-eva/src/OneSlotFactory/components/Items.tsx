import * as React from 'react';
import { useMemo, useState, useRef, useEffect } from 'react';

import { Icon, IndexPath, Select, SelectItem } from "@ui-kitten/components";
import { compareArray, isObject, useOneState, useOneProps, useOnePayload, useAsyncAction, useRenderWaiter, IItemsSlot } from 'rn-declarative';
import { Pressable } from "react-native";

const DEFAULT_INDEX = new IndexPath(0);

const getArrayHash = (value: any) =>
    Object.values<string>(value || {})
        .sort((a, b) => b.localeCompare(a))
        .join('-');

interface IState {
    options: string[];
    labels: Record<string, string>;
}

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
    invalid,
    incorrect,
    title,
    onFocus,
    onBlur,
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
                value="Loading"
                size="medium"
                selectedIndex={DEFAULT_INDEX}
                caption={(dirty && (invalid || incorrect)) || description}
                placeholder={placeholder}
                label={title}
                status={error ? "danger" : "basic"}
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
            onFocus={onFocus}
            onBlur={onBlur}
            size="medium"
            caption={(dirty && (invalid || incorrect)) || description}
            placeholder={placeholder}
            label={title}
            status={error ? "danger" : "basic"}
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
