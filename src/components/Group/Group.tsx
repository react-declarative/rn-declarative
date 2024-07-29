import * as React from "react";
import { forwardRef } from "react";

import { IManagedLayout, PickProp } from "../../model/IManaged";
import IAnything from "../../model/IAnything";
import IField from "../../model/IField";

import Item from "./Item";
import Container from "./Container";

/**
 * Represents the props for a group component.
 *
 * @template Data - The type of data accepted by the group component.
 * @template Payload - The type of payload used by the group component.
 * @extends IManagedLayout - Inherit props from IManagedLayout.
 */
export interface IGroupProps<Data = IAnything, Payload = IAnything> extends IManagedLayout<Data, Payload> {
  style?: PickProp<IField<Data, Payload>, 'style'>;
}

/**
 * Represents a private interface for a group component.
 *
 * @interface IGroupPrivate
 */
interface IGroupPrivate {
  children: React.ReactNode;
  isItem?: boolean;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  onFocus?: () => void;
  onContextMenu?: React.MouseEventHandler<HTMLDivElement>;
}

/**
 * Group component
 *
 * @typedef Group
 * @property className - The class name of the group
 * @property columns - The columns property of the group
 * @property phoneColumns - The phone columns property of the group
 * @property tabletColumns - The tablet columns property of the group
 * @property desktopColumns - The desktop columns property of the group
 * @property children - The children of the group
 * @property isItem - Whether the group is an item
 * @property style - The style object of the group
 * @property columnsOverride - The columns override property of the group
 * @property sx - The sx property of the group
 * @property fieldRightMargin - The right margin of the field
 * @property fieldBottomMargin - The bottom margin of the field
 * @property onClick - The onClick event handler of the group
 * @property onFocus - The onFocus event handler of the group
 * @property onContextMenu - The onContextMenu event handler of the group
 * @property ...otherProps - Other props passed to the group
 * @property ref - The ref of the group
 *
 * @param Group - The Group component function
 * @returns The rendered component
 */
export const Group = (
  {
    columns = "",
    phoneColumns = "",
    tabletColumns = "",
    desktopColumns = "",
    children,
    isItem,
    style,
    columnsOverride,
    sx,
    fieldRightMargin = '1',
    fieldBottomMargin = '2',
    onClick,
    onFocus,
    onContextMenu,
    ...otherProps
  }: IGroupProps & IGroupPrivate,
  ref: React.Ref<HTMLDivElement>
) => {
  if (isItem) {
    return (
      <Item
        {...otherProps}
        ref={ref}
        style={style}
        columns={columns}
        phoneColumns={phoneColumns}
        tabletColumns={tabletColumns}
        desktopColumns={desktopColumns}
        fieldRightMargin={fieldRightMargin}
        fieldBottomMargin={fieldBottomMargin}
        onFocus={onFocus}
        onClick={onClick}
        onContextMenu={onContextMenu}
        sx={sx}
      >
        {children}
      </Item>
    );
  } else {
    return (
      <Container
        {...otherProps}
        ref={ref}
        columnsOverride={columnsOverride}
        style={style}
        onFocus={onFocus}
        onContextMenu={onContextMenu}
        onClick={onClick}
        sx={sx}
      >
        {children}
      </Container>
    );
  }
};

Group.displayName = 'Group';

export default forwardRef(Group);
