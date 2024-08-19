import * as React from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useAsyncAction, useOnePayload, useOneProps, useOneState, useRenderWaiter } from "rn-declarative";

import { FormInput, FormSelect } from "~/components/ui/form";

import { IComboSlot } from "rn-declarative";

const getArrayHash = (value: any) =>
  Object.values<string>(value || {})
    .sort((a, b) => b.localeCompare(a))
    .join("-");

interface IState {
  options: string[];
  labels: Record<string, string>;
}

const LOADING_LABEL = "Loading";

export const Combo = ({
  invalid,
  incorrect,
  value: upperValue,
  name,
  disabled,
  readonly,
  description = "",
  title = "",
  placeholder = "",
  dirty,
  itemList,
  tr = (s) => s.toString(),
  watchItemList,
  onChange,
  onFocus,
  onBlur,
}: IComboSlot) => {

  const { object } = useOneState();
  const payload = useOnePayload();

  const [state, setState] = useState<IState>(() => ({
    options: [],
    labels: {},
  }));

  const options = useMemo(() => {
    return state.options.map((value) => ({
      label: state.labels[value] || value,
      value,
    }));
  }, [state]);

  const initComplete = useRef(false);

  const waitForRender = useRenderWaiter([state], 10);

  const value = useMemo(() => {
    if (Array.isArray(upperValue)) {
      const [first] = upperValue;
      return first;
    }
    return upperValue;
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

      if (value) {
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

  const error = useMemo(() => dirty ? invalid || incorrect || null : null, [dirty, invalid, incorrect]);  

  const handleChange = (value: any) => {
    if (readonly) {
      return;
    }
    if (disabled) {
      return;
    }
    onChange(value || null);
  };

  if (loading) {
    return (
      <FormInput
        name={name}
        disabled
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={onChange}
        value={LOADING_LABEL}
        error={error}
        placeholder={placeholder}
        label={title}
        description={description}
      />
    );
  }

  return (
    <FormSelect
      label={title}
      description={description}
      placeholder={placeholder}
      name={name}
      onFocus={onFocus}
      onBlur={onBlur}
      value={value}
      options={options}
      onChange={handleChange}
      error={error}
    />
  );
}

export default Combo;
