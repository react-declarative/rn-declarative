import * as React from "react";
import { useMemo, useState, useRef, useEffect } from "react";

import { Icon, IndexPath, Select, SelectItem } from "@ui-kitten/components";

import { Pressable } from "react-native";

import { useOneState } from "../../../context/StateProvider";
import { useOneProps } from "../../../context/PropsProvider";
import { useOnePayload } from "../../../context/PayloadProvider";

import { useAsyncAction } from "../../../../../hooks/useAsyncAction";
import { useRenderWaiter } from "../../../../../hooks/useRenderWaiter";

import { IComboSlot } from "../../../slots/ComboSlot";

const DEFAULT_INDEX = new IndexPath(0);

/**
 * Returns a hash string generated from the values in an array.
 *
 * @param value - The array object to generate the hash from.
 * @returns - The hash string generated from the array values.
 */
const getArrayHash = (value: any) =>
  Object.values<string>(value || {})
    .sort((a, b) => b.localeCompare(a))
    .join("-");

/**
 * Represents the contract for the State class, which holds options and labels.
 *
 * @interface
 */
interface IState {
  options: string[];
  labels: Record<string, string>;
}

/**
 * Represents a Combo component.
 * @param value - The selected value(s) of the Combo.
 * @param disabled - Whether the Combo is disabled or not.
 * @param readonly - Whether the Combo is readonly or not.
 * @param description - The description of the Combo.
 * @param placeholder - The placeholder text of the Combo input.
 * @param itemList - The list of items/options for the Combo.
 * @param watchItemList - Whether to watch the itemList for changes or not.
 * @param noDeselect - Whether to allow deselecting an item or not.
 * @param freeSolo - Whether to allow free text input or not.
 * @param title - The title/label of the Combo.
 * @param dirty - Whether the Combo value is dirty/changed or not.
 * @param invalid - Whether the Combo value is invalid or not.
 * @param incorrect - Whether the Combo value is incorrect or not.
 * @param tr - The translation function for the Combo.
 * @param onChange - The change event handler for the Combo.
 * @returns The Combo component.
 */
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
  style,
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

  /**
   * Returns a memoized value based on the given `upperValue`.
   *
   * @param upperValue - The value to compute the memoized value from.
   * @returns - The computed memoized value.
   */
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

  /**
   * Loads the given variable from a source.
   */
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

  /**
   * Handles the change of a value and triggers the corresponding
   * callback and event.
   *
   * @param value - The new value for the change event.
   * @returns
   */
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
        style={style}
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
      disabled={disabled}
      style={style}
      selectedIndex={selectValue}
      caption={(dirty && (invalid || incorrect)) || description}
      placeholder={placeholder}
      label={title}
      size="medium"
      value={displayValue}
      status={error ? "danger" : undefined}
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
