import * as React from "react";

import Group, { IGroupProps } from "../components/Group";

import { PickProp } from "../../../model/IManaged";

import IAnything from "../../../model/IAnything";
import IEntity from "../../../model/IEntity";

import makeLayout from "../components/makeLayout/makeLayout";

/**
 * Interface for defining the props of GroupLayout component.
 *
 * @template Data - The type of data associated with the group.
 * @template Payload - The type of payload associated with the group.
 */
export interface IGroupLayoutProps<Data = IAnything, Payload = IAnything> extends IGroupProps<Data, Payload> { }

/**
 * Represents the private interface for the GroupLayout class.
 *
 * @interface
 */
interface IGroupLayoutPrivate {
  children?: React.ReactNode;
  isBaselineAlign?: PickProp<IEntity, 'isBaselineAlign'>;
  isPhone?: boolean;
  isTablet?: boolean;
  isDesktop?: boolean;
}

/**
 * Represents a layout component used for grouping and organizing child components.
 *
 * @template Data - The type of data passed to the component.
 * @param props - The props to configure the GroupLayout component.
 * @param props.style - The number of style for the component.
 * @param props.styleColumns - The number of phone style for the component.
 * @param props.styleColumns - The number of tablet style for the component.
 * @param props.styleColumns - The number of desktop style for the component.
 * @param props.children - The child components to be rendered.
 * @returns The rendered GroupLayout component.
 */
export const GroupLayout = <Data extends IAnything = IAnything>({
  style,
  phoneStyle,
  tabletStyle,
  desktopStyle,
  isBaselineAlign,
  isPhone,
  isTablet,
  isDesktop,
  testId,
  children,
}: IGroupLayoutProps<Data> & IGroupLayoutPrivate) => {
  return (
    <Group
      testId={testId}
      style={style}
      phoneStyle={phoneStyle}
      tabletStyle={tabletStyle}
      desktopStyle={desktopStyle}
      isBaselineAlign={isBaselineAlign}
      isPhone={isPhone}
      isTablet={isTablet}
      isDesktop={isDesktop}
    >
      {children}
    </Group>
  );
};

GroupLayout.displayName = 'GroupLayout';

export default makeLayout(GroupLayout) as typeof GroupLayout;
