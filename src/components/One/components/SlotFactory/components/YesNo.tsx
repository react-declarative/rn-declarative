import * as React from "react";
import { useMemo, useState, useEffect, useRef } from "react";

import { Icon, IndexPath, Select, SelectItem } from "@ui-kitten/components";

import { useOnePayload } from "../../../context/PayloadProvider";
import { useOneProps } from "../../../context/PropsProvider";
import { useOneState } from "../../../context/StateProvider";

import { useAsyncAction } from "../../../../../hooks/useAsyncAction";

import { IYesNoSlot } from "../../../slots/YesNoSlot";
import { TouchableOpacity } from "react-native";

const OPTIONS = [
  "Yes",
  "No",
];

const DEFAULT_INDEX = new IndexPath(0);

/**
 * Represents a YesNoField component.
 * @typedef  YesNoField
 * @property value - The value of the YesNoField.
 * @property disabled - Indicates whether the YesNoField is disabled.
 * @property readonly - Indicates whether the YesNoField is readonly.
 * @property description - The description of the YesNoField.
 * @property placeholder - The placeholder text of the YesNoField.
 * @property noDeselect - Indicates whether deselection is allowed for the YesNoField.
 * @property title - The title of the YesNoField.
 * @property tr - The translation function for the YesNoField.
 * @property dirty - Indicates whether the YesNoField is dirty.
 * @property invalid - Indicates whether the YesNoField is invalid.
 * @property incorrect - Indicates whether the YesNoField is incorrect.
 * @property onChange - The change event handler for the YesNoField.
 */
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

  /**
   * Handles the change in value.
   *
   * @param value - The new value.
   */
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
      caption={(dirty && (invalid || incorrect)) || description}
      placeholder={placeholder}
      label={title}
      status={error ? "danger" : undefined}
      onSelect={(index) => {
        if (index instanceof IndexPath) {
          handleChange(OPTIONS[index.row]);
        }
      }}
      accessoryRight={!noDeselect ? (
        <TouchableOpacity onPress={() => handleChange(null)}>
          <Icon name="close" />
        </TouchableOpacity >
      ) : undefined}
    >
      {OPTIONS.map((value) => (
        <SelectItem key={value} title={labels[value] || value} />
      ))}
    </Select>
  );
};

export default YesNoField;
