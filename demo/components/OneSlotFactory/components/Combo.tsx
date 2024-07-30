import * as React from "react";
import { useMemo, useState, useRef, useEffect } from "react";

import { Icon, IndexPath, Select, SelectItem } from "@ui-kitten/components";

import { Pressable } from "react-native";
import { IComboSlot, useOneState, useOneProps, useOnePayload, useAsyncAction, useRenderWaiter } from 'rn-declarative';

const DEFAULT_INDEX = new IndexPath(0);

const getArrayHash = (value: any) =>
  Object.values<string>(value || {})
    .sort((a, b) => b.localeCompare(a))
    .join("-");

interface IState {
  options: string[];
  labels: Record<string, string>;
}

export const Combo = ({
  value: upperValue,
  disabled,
  readonly,
  description = "",
  placeholder = "",
  itemList = [],
  watchItemList,
  noDeselect,
  freeSolo,
  title = "",
  dirty,
  invalid,
  incorrect,
  tr = (s) => s.toString(),
  onChange,
}: IComboSlot) => {
  const { object } = useOneState();
  const payload = useOnePayload();

  const [state, setState] = useState<IState>(() => ({
    options: [],
    labels: {},
  }));

  const initComplete = useRef(false);

  const waitForRender = useRenderWaiter([state], 10);

  const value = useMemo(() => {
    if (Array.isArray(upperValue)) {
      const [first] = upperValue;
      return first;
    }
    return upperValue;
  }, [upperValue]);

  const displayValue = useMemo(() => {
    return value ? state.labels[value] || value || undefined : undefined;
}, [value]);

  const selectValue = useMemo(() => {
    if (Array.isArray(upperValue)) {
      const [first] = upperValue;
      const index = state.options.findIndex((value) => value === first);
      if (index === undefined) {
        return undefined;
      }
      return first ? new IndexPath(index) : undefined;
    }
    const index = state.options.findIndex((value) => value === upperValue);
    if (index === undefined) {
      return undefined;
    }
    return upperValue ? new IndexPath(index) : undefined;
  }, [upperValue]);

  const { fallback } = useOneProps();

  const { loading, execute } = useAsyncAction(
    async (object) => {
      const labels: Record<string, string> = {};
      itemList = itemList || [];
      const options: string[] = [
        ...new Set(
          Object.values(
            typeof itemList === "function"
              ? await Promise.resolve(itemList(object, payload))
              : itemList
          )
        ),
      ];
      await Promise.all(
        options.map(
          async (item) =>
            (labels[item] = await Promise.resolve(tr(item, object, payload)))
        )
      );

      if (freeSolo && value) {
        !options.includes(value) && options.push(value);
      }

      setState({ labels, options });
      initComplete.current = true;
      await waitForRender();
    },
    {
      fallback,
    }
  );

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
  }, [valueHash, disabled, dirty, invalid, incorrect, object, readonly]);

  const error = useMemo(() => dirty && (invalid !== null || incorrect !== null), [dirty, invalid, incorrect]);

  const handleChange = (value: any) => {
    if (readonly) {
      return;
    }
    if (disabled) {
      return;
    }
    onChange(value || null);
  };

  if (loading || !initComplete.current) {
    return (
      <Select
        key={"loading"}
        size="medium"
        value="Loading"
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
      disabled={disabled}
      selectedIndex={selectValue}
      caption={(dirty && (invalid || incorrect)) || description}
      placeholder={placeholder}
      label={title}
      size="medium"
      value={displayValue}
      status={error ? "danger" : "basic"}
      onSelect={(index) => {
        if (index instanceof IndexPath) {
          handleChange(state.options[index.row]);
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

export default Combo;
