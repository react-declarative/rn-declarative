import * as React from "react";

import { View } from "react-native";

import useManagedStyle from "../hooks/useManagedStyle";

import IField from "../../../model/IField";
import IEntity from "../../../model/IEntity";
import IAnything from "../../../model/IAnything";
import { IManagedLayout, PickProp } from "../../../model/IManaged";

import makeLayout from "../components/makeLayout/makeLayout";
import makeTestId from "../helpers/makeTestId";

export interface IBlockLayoutProps<Data = IAnything, Payload = IAnything>
  extends IManagedLayout<Data, Payload> {
  style?: PickProp<IField<Data, Payload>, "style">;
  hidden?: PickProp<IField<Data, Payload>, 'hidden'>;
}

const defaultStyles = {
  flexDirection: 'row',
} as const;

/**
 * An interface representing a block layout private.
 *
 * @template Data - Type for the data of the entity.
 * @extends {IEntity<Data>}
 */
interface IBlockLayoutPrivate<Data = IAnything> extends IEntity<Data> {
  children?: React.ReactNode;
  isPhone?: boolean;
  isTablet?: boolean;
  isDesktop?: boolean;
}

/**
 * Represents a block layout component.
 *
 * @template Data - The type of data to be rendered in the layout.
 *
 * @param props - The component props.
 * @param props.children - The children to be rendered inside the layout.
 * @param props.className - The CSS class name for the layout.
 * @param props.style - The inline styles for the layout.
 * @param props.sx - The theme styling object for the layout (sx prop from Theme-UI).
 * @param props.blockLayout - The block layout component to be used (defaults to Fragment).
 * @param props.otherProps - Other props specific to the block layout.
 *
 * @returns The rendered block layout component.
 */
export const BlockLayout = <Data extends IAnything = IAnything>({
  children,
  style,
  className,
  phoneStyle = style,
  tabletStyle = style,
  desktopStyle = style,
  testId,
  isPhone = false,
  isTablet = false,
  isDesktop = false,
}: IBlockLayoutProps<Data> & IBlockLayoutPrivate<Data>) => {
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
    },
    defaultStyles,
  );

  return (
    <View className={className} style={computedStyle} {...makeTestId(testId)}>
      {children}
    </View>
  );
};

BlockLayout.displayName = "BlockLayout";

export default makeLayout(BlockLayout) as typeof BlockLayout;
