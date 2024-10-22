import * as React from "react";
import { useMemo } from "react";

import { StyleSheet } from 'react-native';

import FieldWrapper from "../components/FieldWrapper";
import Container from "../components/Container";

import { useOneState } from "../context/StateProvider";
import { useOnePayload } from "../context/PayloadProvider";

import useManagedStyle from "../hooks/useManagedStyle";

import IField from "../../../model/IField";
import IEntity from "../../../model/IEntity";
import IAnything from "../../../model/IAnything";
import IManaged, { IManagedLayout, PickProp } from "../../../model/IManaged";

import makeLayout from "../components/makeLayout/makeLayout";

export interface ICustomLayoutProps<Data = IAnything, Payload = IAnything>
  extends IManagedLayout<Data, Payload> {
  customLayout?: PickProp<IField<Data, Payload>, "customLayout">;
  hidden?: PickProp<IField<Data, Payload>, 'hidden'>;
}

type FieldIgnoreParam = keyof Omit<IManaged, keyof IField> | "readonly" | "dirty";

const FIELD_INTERNAL_PARAMS: FieldIgnoreParam[] = [
  "dirty",
  "fallback",
  "readonly",
  "invalid",
  "loading",
  "object",
  "onChange",
  "prefix",
  "value",
];

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});

/**
 * An interface representing a custom layout private.
 *
 * @template Data - Type for the data of the entity.
 * @extends {IEntity<Data>}
 */
interface ICustomLayoutPrivate<Data = IAnything> extends IEntity<Data> {
  children?: React.ReactNode;
  isBaselineAlign: PickProp<IEntity<Data>, "isBaselineAlign">;
  isPhone?: boolean;
  isTablet?: boolean;
  isDesktop?: boolean;
}

const Fragment = ({ children }: React.PropsWithChildren<{}>) => <>{children}</>;

/**
 * Represents a custom layout component.
 *
 * @template Data - The type of data to be rendered in the layout.
 *
 * @param props - The component props.
 * @param props.children - The children to be rendered inside the layout.
 * @param props.className - The CSS class name for the layout.
 * @param props.style - The inline styles for the layout.
 * @param props.sx - The theme styling object for the layout (sx prop from Theme-UI).
 * @param props.customLayout - The custom layout component to be used (defaults to Fragment).
 * @param props.otherProps - Other props specific to the custom layout.
 *
 * @returns The rendered custom layout component.
 */
export const CustomLayout = <Data extends IAnything = IAnything>({
  className,
  children,
  style,
  phoneStyle = style,
  tabletStyle = style,
  desktopStyle = style,
  testId,
  isBaselineAlign,
  isPhone = false,
  isTablet = false,
  isDesktop = false,
  customLayout: CustomLayout = Fragment,
  ...otherProps
}: ICustomLayoutProps<Data> & ICustomLayoutPrivate<Data>) => {
  const { object, changeObject: handleChange } = useOneState<any>();
  const _payload = useOnePayload();

  const computedStyle = useManagedStyle(
    {
      isPhone,
      isTablet,
      isDesktop,
    },
    {
      phoneStyle,
      tabletStyle,
      desktopStyle,
      style,
    }
  );

  const props = useMemo(() => {
    const _fieldParams = Object.entries(otherProps as IField)
      .filter(
        ([key]) => !FIELD_INTERNAL_PARAMS.includes(key as FieldIgnoreParam)
      )
      .reduce((acm, [key, value]) => ({ ...acm, [key]: value }), {}) as IField;
    return {
      ...object,
      onChange: handleChange,
      _fieldParams,
      _fieldData: object,
      _payload,
      testId,
      isBaselineAlign,
    };
  }, [object]);

  return (
    <FieldWrapper className={className} style={computedStyle}>
      <CustomLayout {...props}>
        <Container style={styles.container} isBaselineAlign={isBaselineAlign}>
          {children}
        </Container>
      </CustomLayout>
    </FieldWrapper>
  );
};

CustomLayout.displayName = "CustomLayout";

export default makeLayout(CustomLayout) as typeof CustomLayout;
