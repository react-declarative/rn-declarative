import * as React from 'react';

const defaultStyle = {
    alignItems: 'stretch',
    backgroundColor: 'transparent',
    border: '0 solid black',
    boxSizing: 'border-box',
    display: 'flex',
    flexBasis: 'auto',
    flexDirection: 'column',
    flexShrink: 0,
    listStyle: 'none',
    margin: 0,
    minHeight: 0,
    minWidth: 0,
    padding: 0,
    position: 'relative',
    textDecoration: 'none',
    zIndex: 0
} as const;

interface IViewProps {
    style?: React.CSSProperties;
    children: React.ReactNode;
}

/**
 * @see https://github.com/necolas/react-native-web/blob/67d52a43a9f872f1b59954f4d2720ced25205747/packages/react-native-web/src/exports/View/index.js
 */
export const View = ({
    style,
    children,
}: IViewProps) => {
    return (
        <div style={{...defaultStyle, style}}>
            {children}
        </div>
    );
}

export default View;
