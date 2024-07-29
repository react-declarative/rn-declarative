import * as React from "react";

import { View } from "react-native";

import { IManagedLayout, PickProp } from "../../../../model/IManaged";
import IAnything from "../../../../model/IAnything";
import IField from "../../../../model/IField";

import useMediaContext from "../../../../hooks/useMediaContext";
import useManagedStyle from "../../hooks/useManagedStyle";

import makeTestId from "../../helpers/makeTestId";

/**
 * Represents the props for a group component.
 *
 * @template Data - The type of data accepted by the group component.
 * @template Payload - The type of payload used by the group component.
 * @extends IManagedLayout - Inherit props from IManagedLayout.
 */
export interface IGroupProps<Data = IAnything, Payload = IAnything> extends IManagedLayout<Data, Payload> {
  style?: PickProp<IField<Data, Payload>, 'style'>;
  testId?: PickProp<IField<Data, Payload>, 'testId'>;
}

/**
 * Represents a private interface for a group component.
 *
 * @interface IGroupPrivate
 */
interface IGroupPrivate {
  children: React.ReactNode;
}

/**
 * Group component
 *
 * @typedef Group
 * @property style - The style property of the group
 * @property phoneStyle - The phone style property of the group
 * @property tabletStyle - The tablet style property of the group
 * @property desktopStyle - The desktop style property of the group
 * @property children - The children of the group
 *
 * @param Group - The Group component function
 * @returns The rendered component
 */
export const Group = ({
  testId,
  style,
  phoneStyle,
  tabletStyle,
  desktopStyle,
  children,
}: IGroupProps & IGroupPrivate) => {

  const { isPhone, isTablet, isDesktop } = useMediaContext();

  const computedStyle = useManagedStyle(
    {
      isPhone,
      isTablet,
      isDesktop,
    },
    {
      style,
      phoneStyle,
      tabletStyle,
      desktopStyle,
    }
  );

  return (
    <View
      style={computedStyle}
      {...makeTestId(testId)}
    >
      {children}
    </View>
  )
};

Group.displayName = 'Group';

export default Group;
