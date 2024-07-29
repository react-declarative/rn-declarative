import * as React from 'react';
import { forwardRef } from 'react';

import { Grid } from '@mui/material';

import { PickProp } from '../../model/IManaged';
import IField from '../../model/IField';

/**
 * Interface representing the props for the Container component.
 */
interface IContainerProps {
  style: PickProp<IField, 'style'>;
  children: React.ReactNode;
  onFocus?: () => void;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  onContextMenu?: React.MouseEventHandler<HTMLDivElement>;
}

/**
 * Represents a container component that wraps its child components within a grid layout.
 *
 * @param props - The properties of the Container component.
 * @param props.style - The inline styles to be applied to the Container component.
 * @param props.children - The child components to be rendered within the Container component.
 * @param props.onFocus - The callback function to be called when the Container component receives focus.
 * @param props.onClick - The callback function to be called when the Container component is clicked.
 * @param props.onContextMenu - The callback function to be called when the Container component's context menu is triggered.
 * @param ref - The ref to attach to the Container component's underlying div element.
 * @returns The rendered Container component.
 */
export const Container = ({
  style,
  children,
  onFocus,
  onClick,
  onContextMenu,
  ...otherProps
}: IContainerProps, ref: React.Ref<HTMLDivElement>) => {
  return (
    <Grid
      {...otherProps}
      ref={ref}
      container={true}
      style={style}
      onClick={onClick}
      onFocus={onFocus}
      onContextMenu={onContextMenu}
    >
      {children}
    </Grid>
  );
}

Container.displayName = 'Container';

export default forwardRef(Container);
