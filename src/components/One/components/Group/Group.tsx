import * as React from "react";

import { IManagedLayout, PickProp } from "../../../../model/IManaged";
import IAnything from "../../../../model/IAnything";
import IField from "../../../../model/IField";

import { StyleSheet, View } from "react-native";
import { useMemo } from "react";
import useMediaContext from "../../../../hooks/useMediaContext";
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
  style: upperStyle,
  phoneStyle: upperPhoneStyle = upperStyle,
  tabletStyle: upperTabletStyle = upperStyle,
  desktopStyle: upperDesktopStyle = upperStyle,
}: IGroupProps & IGroupPrivate) => {

  const { isPhone, isTablet, isDesktop } = useMediaContext();

  const {
    phoneStyle,
    tabletStyle,
    desktopStyle,
  } = useMemo(() => ({
    phoneStyle: upperPhoneStyle ? StyleSheet.create(upperPhoneStyle) : undefined,
    tabletStyle: upperTabletStyle ? StyleSheet.create(upperTabletStyle) : undefined,
    desktopStyle: upperDesktopStyle ? StyleSheet.create(upperDesktopStyle) : undefined,
  }), []);

  const style = useMemo(() => {
    if (isPhone) {
      return phoneStyle;
    }
    if (isTablet) {
      return tabletStyle;
    }
    return desktopStyle;
  }, [isPhone, isTablet, isDesktop]);

  return (
    <View
      style={style}
      {...makeTestId(testId)}
    />
  )
};

Group.displayName = 'Group';

export default Group;
