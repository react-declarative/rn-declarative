import * as React from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useAsyncAction, useOnePayload, useOneProps, useOneState, useRenderWaiter } from "rn-declarative";

import { FormInput, FormSelect } from "~/components/ui/form";

import { IYesNoSlot } from "rn-declarative";

const LOADING_LABEL = "Loading";

const OPTIONS = [
  "Yes",
  "No",
];

export const YesNoField = ({
  value: upperValue,
  disabled,
  readonly,
  description = "",
  placeholder = "",
  name,
  title = "",
  tr = (v) => v,
  dirty,
  invalid,
  incorrect,
  onChange,
  onFocus,
  onBlur,
}: IYesNoSlot) => {
  const [labels, setLabels] = useState<Record<string, string>>({});

  const initComplete = useRef(false);

  const payload = useOnePayload();
  const { object } = useOneState();

  const options = useMemo(() => {
    return OPTIONS.map((value) => ({
      label: value,
      value,
    }));
  }, []);

  const value = useMemo(() => {
    if (upperValue === true) {
      return OPTIONS[0];
    }
    if (upperValue === false) {
      return OPTIONS[1];
    }
    return null;
  }, [upperValue]);

  const { fallback } = useOneProps();

  const { loading, execute } = useAsyncAction(
    async () => {
      const labels: Record<string, string> = {};
      await Promise.all(
        OPTIONS.map(
          async (item) =>
            (labels[item] = await Promise.resolve(tr(item, object, payload)))
        )
      );
      setLabels(labels);
      initComplete.current = true;
    },
    {
      fallback,
    }
  );
  
  const error = useMemo(() => dirty ? invalid || incorrect || null : null, [dirty, invalid, incorrect]);  

  useEffect(() => {
    execute();
  }, []);

  const handleChange = (value: any) => {
    if (readonly) {
      return;
    }
    if (disabled) {
      return;
    }
    onChange(value === "Yes" ? true : value === "No" ? false : null);
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


export default YesNoField;
