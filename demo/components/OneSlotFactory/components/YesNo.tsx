import * as React from "react";
import { useMemo, useState, useEffect, useRef } from "react";

import { Icon, IndexPath, Select, SelectItem } from "@ui-kitten/components";
import { useOnePayload, useOneProps, useOneState, useAsyncAction, IYesNoSlot,  } from 'rn-declarative';

import { Pressable } from "react-native";

const OPTIONS = [
  "Yes",
  "No",
];

const DEFAULT_INDEX = new IndexPath(0);

export const YesNoField = ({
  value: upperValue,
  disabled,
  readonly,
  description = "",
  placeholder = "",
  noDeselect,
  title = "",
  tr = (v) => v,
  dirty,
  invalid,
  incorrect,
  onChange,
}: IYesNoSlot) => {
  const [labels, setLabels] = useState<Record<string, string>>({});

  const initComplete = useRef(false);

  const payload = useOnePayload();
  const { object } = useOneState();

  const value = useMemo(() => {
    if (upperValue === true) {
      return new IndexPath(0);
    }
    if (upperValue === false) {
      return new IndexPath(1);
    }
    return undefined;
  }, [upperValue]);

  const displayValue = useMemo(() => {
    if (upperValue === true) {
      return OPTIONS[0];
    }
    if (upperValue === false) {
      return OPTIONS[1];
    }
    return undefined;
  }, [value]);

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
  
  const error = useMemo(() => dirty && (invalid !== null || incorrect !== null), [dirty, invalid, incorrect]);

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

  if (loading || !initComplete.current) {
    return (
      <Select
        key={"loading"}
        value="Loading"
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
      selectedIndex={value}
      value={displayValue}
      caption={(dirty && (invalid || incorrect)) || description}
      placeholder={placeholder}
      label={title}
      size="medium"
      status={error ? "danger" : undefined}
      onSelect={(index) => {
        if (index instanceof IndexPath) {
          handleChange(OPTIONS[index.row]);
        }
      }}
      accessoryRight={!noDeselect ? (
        <Pressable onPress={() => handleChange(null)}>
          <Icon name="close" />
        </Pressable >
      ) : undefined}
    >
      {OPTIONS.map((value) => (
        <SelectItem key={value} title={labels[value] || value} />
      ))}
    </Select>
  );
};

export default YesNoField;
