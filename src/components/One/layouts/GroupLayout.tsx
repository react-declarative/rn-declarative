import * as React from "react";

import Group, { IGroupProps } from "../../../components/Group";
import BaselineAdjust from "../components/common/BaselineAdjust";

import IAnything from "../../../model/IAnything";

import makeLayout from "../components/makeLayout/makeLayout";

/**
 * Interface for defining the props of GroupLayout component.
 *
 * @template Data - The type of data associated with the group.
 * @template Payload - The type of payload associated with the group.
 */
export interface IGroupLayoutProps<Data = IAnything, Payload = IAnything> extends IGroupProps<Data, Payload> {}

/**
 * Represents the private interface for the GroupLayout class.
 *
 * @interface
 */
interface IGroupLayoutPrivate {
  children?: React.ReactNode;
}

/**
 * Represents a layout component used for grouping and organizing child components.
 *
 * @template Data - The type of data passed to the component.
 * @param props - The props to configure the GroupLayout component.
 * @param props.columns - The number of columns for the component.
 * @param props.phoneColumns - The number of phone columns for the component.
 * @param props.tabletColumns - The number of tablet columns for the component.
 * @param props.desktopColumns - The number of desktop columns for the component.
 * @param [props.fieldRightMargin='0'] - The right margin value for fields.
 * @param [props.fieldBottomMargin='0'] - The bottom margin value for fields.
 * @param [props.style] - The inline style object for the component.
 * @param [props.className] - The CSS class for the component.
 * @param props.children - The child components to be rendered.
 * @returns The rendered GroupLayout component.
 */
export const GroupLayout = <Data extends IAnything = IAnything>({
  columns,
  phoneColumns,
  tabletColumns,
  desktopColumns,
  fieldRightMargin = '0',
  fieldBottomMargin = '0',
  style,
  testId,
  children,
}: IGroupLayoutProps<Data> & IGroupLayoutPrivate) => {
    return (
        <Group
            data-testid={testId}
            style={style}
            isItem={true}
            columns={columns}
            phoneColumns={phoneColumns}
            tabletColumns={tabletColumns}
            desktopColumns={desktopColumns}
            fieldRightMargin={fieldRightMargin}
            fieldBottomMargin={fieldBottomMargin}
        >
          <Group
          >
            {children}
            <BaselineAdjust />
          </Group>
        </Group>
    );
};

GroupLayout.displayName = 'GroupLayout';

export default makeLayout(GroupLayout) as typeof GroupLayout;
