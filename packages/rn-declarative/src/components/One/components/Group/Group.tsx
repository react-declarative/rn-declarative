import * as React from "react";

import { View, StyleSheet } from "react-native";

import { IManagedLayout, PickProp } from "../../../../model/IManaged";
import IAnything from "../../../../model/IAnything";
import IField from "../../../../model/IField";

import OneConfig, { GET_REF_SYMBOL } from "../OneConfig";
import Adjust from "./components/Adjust";

import useMediaContext from "../../../../hooks/useMediaContext";
import useSingleton from "../../../../hooks/useSingleton";
import useManagedStyle from "../../hooks/useManagedStyle";

import makeTestId from "../../helpers/makeTestId";

const defaultStyle =  {
  flexDirection: 'column',
} as const;

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
  isBaselineAlign?: boolean;
}

const styles = StyleSheet.create({
  baseline: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-end',
  },
  noBaseline: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
})

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
  isBaselineAlign,
  children,
}: IGroupProps & IGroupPrivate) => {

  const oneConfig = useSingleton(OneConfig[GET_REF_SYMBOL]);

  const { isPhone, isTablet, isDesktop } = useMediaContext(oneConfig.BREAKPOINTS);

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
    },
    {
      ...defaultStyle,
      justifyContent: isBaselineAlign ? 'flex-end': 'flex-start',
    },
  );

  return (
    <View
      style={computedStyle}
      {...makeTestId(testId)}
    >
      <View style={isBaselineAlign ? styles.baseline : styles.noBaseline}>
        {children}
      </View>
      {!isBaselineAlign && <Adjust />}
    </View>
  )
};

Group.displayName = 'Group';

export default Group;
