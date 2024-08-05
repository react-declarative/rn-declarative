import * as React from 'react';

const defaultStyle = {
    backgroundColor: 'transparent',
    border: '0 solid black',
    boxSizing: 'border-box',
    color: 'black',
    display: 'inline',
    font: '14px System',
    listStyle: 'none',
    margin: 0,
    padding: 0,
    position: 'relative',
    textAlign: 'start',
    textDecoration: 'none',
    whiteSpace: 'pre-wrap',
    wordWrap: 'break-word'
} as const;

interface IViewProps {
    style?: React.CSSProperties;
    children: React.ReactNode;
}

/**
 * @see https://github.com/necolas/react-native-web/blob/67d52a43a9f872f1b59954f4d2720ced25205747/packages/react-native-web/src/exports/Text/index.js
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
