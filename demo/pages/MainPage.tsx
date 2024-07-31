import { One, FieldType, TypedField, sleep } from 'rn-declarative';

import { Text } from '@ui-kitten/components';
import { ScrollView } from 'react-native';

const fields: TypedField[] = [
    {
        type: FieldType.Component,
        style: {
            justifyContent: 'center',
            width: '100%',
            height: 125,
        },
        element: () => (
            <Text category='h4'>
                Adaptive columns
            </Text>
        ),
    },
    {
        type: FieldType.Group,
        phoneStyle: {
            width: '100%',
        },
        tabletStyle: {
            width: '50%',
        },
        desktopStyle: {
            width: '25%',
        },
        fields: [
            {
                type: FieldType.Component,
                style: {
                    width: '100%',
                },
                element: () => (
                    <Text category='h6'>
                        FieldType.Text
                    </Text>
                ),
            },
            {
                type: FieldType.Text,
                style: {
                    width: '100%',
                },
                name: 'text',
                title: 'Text',
                description: 'Single line',
            },
            {
                type: FieldType.Text,
                style: {
                    width: '100%',
                },
                validation: {
                    required: true,
                },
                dirty: true,
                name: 'text_invalid',
                title: 'Text',
                description: 'Invalid',
            },
            {
                type: FieldType.Text,
                style: {
                    width: '100%',
                },
                inputMultiline: true,
                name: 'text',
                title: 'Text',
                description: 'Multi line',
            },
        ],
    },
    {
        type: FieldType.Group,
        phoneStyle: {
            width: '100%',
        },
        tabletStyle: {
            width: '50%',
        },
        desktopStyle: {
            width: '25%',
        },
        fields: [
            {
                type: FieldType.Component,
                style: {
                    width: '100%',
                },
                element: () => (
                    <Text category='h6'>
                        FieldType.Text
                    </Text>
                ),
            },
            {
                type: FieldType.Text,
                style: {
                    width: '100%',
                },
                name: 'text',
                title: 'Text',
                description: 'Single line',
            },
            {
                type: FieldType.Text,
                style: {
                    width: '100%',
                },
                validation: {
                    required: true,
                },
                dirty: true,
                name: 'text_invalid',
                title: 'Text',
                description: 'Invalid',
            },
            {
                type: FieldType.Text,
                style: {
                    width: '100%',
                },
                inputMultiline: true,
                name: 'text',
                title: 'Text',
                description: 'Multi line',
            },
        ],
    },
    {
        type: FieldType.Group,
        phoneStyle: {
            width: '100%',
        },
        tabletStyle: {
            width: '50%',
        },
        desktopStyle: {
            width: '25%',
        },
        fields: [
            {
                type: FieldType.Component,
                style: {
                    width: '100%',
                },
                element: () => (
                    <Text category='h6'>
                        FieldType.Text
                    </Text>
                ),
            },
            {
                type: FieldType.Text,
                style: {
                    width: '100%',
                },
                name: 'text',
                title: 'Text',
                description: 'Single line',
            },
            {
                type: FieldType.Text,
                style: {
                    width: '100%',
                },
                validation: {
                    required: true,
                },
                dirty: true,
                name: 'text_invalid',
                title: 'Text',
                description: 'Invalid',
            },
            {
                type: FieldType.Text,
                style: {
                    width: '100%',
                },
                inputMultiline: true,
                name: 'text',
                title: 'Text',
                description: 'Multi line',
            },
        ],
    },
        {
        type: FieldType.Group,
        phoneStyle: {
            width: '100%',
        },
        tabletStyle: {
            width: '50%',
        },
        desktopStyle: {
            width: '25%',
        },
        fields: [
            {
                type: FieldType.Component,
                style: {
                    width: '100%',
                },
                element: () => (
                    <Text category='h6'>
                        FieldType.Text
                    </Text>
                ),
            },
            {
                type: FieldType.Text,
                style: {
                    width: '100%',
                },
                name: 'text',
                title: 'Text',
                description: 'Single line',
            },
            {
                type: FieldType.Text,
                style: {
                    width: '100%',
                },
                validation: {
                    required: true,
                },
                dirty: true,
                name: 'text_invalid',
                title: 'Text',
                description: 'Invalid',
            },
            {
                type: FieldType.Text,
                style: {
                    width: '100%',
                },
                inputMultiline: true,
                name: 'text',
                title: 'Text',
                description: 'Multi line',
            },
        ],
    },
    {
        type: FieldType.Group,
        phoneStyle: {
            width: '100%',
        },
        tabletStyle: {
            width: '50%',
        },
        desktopStyle: {
            width: '25%',
        },
        fields: [
            {
                type: FieldType.Component,
                style: {
                    width: '100%',
                },
                element: () => (
                    <Text category='h6'>
                        FieldType.YesNo
                    </Text>
                ),
            },
            {
                type: FieldType.YesNo,
                style: {
                    width: '100%',
                },
                name: 'yesno',
                title: 'YesNo',
                placeholder: 'yesno',
                description: 'Default',
            },
            {
                type: FieldType.YesNo,
                noDeselect: true,
                style: {
                    width: '100%',
                },
                validation: {
                    required: true,
                },
                dirty: true,
                name: 'yesno_invalid',
                title: 'YesNo',
                placeholder: 'yesno',
                description: 'Invalid',
            },
            {
                type: FieldType.YesNo,
                noDeselect: true,
                style: {
                    width: '100%',
                },
                name: 'yesno',
                title: 'YesNo',
                placeholder: 'yesno',
                description: 'No deselect',
            },
        ]
    },
    {
        type: FieldType.Component,
        style: {
            justifyContent: 'center',
            width: '100%',
            height: 125,
        },
        element: () => (
            <Text category='h4'>
                Adaptive form
            </Text>
        ),
    },
    {
        type: FieldType.Group,
        style: {
            width: '100%',
        },
        fields: [
            {
                type: FieldType.Text,
                phoneStyle: {
                    width: '100%',
                },
                tabletStyle: {
                    width: '50%',
                },
                desktopStyle: {
                    width: '33%',
                },
                inputMultiline: true,
                name: 'text',
                title: 'Text',
                description: 'Multi line',
            },
            {
                type: FieldType.Text,
                phoneStyle: {
                    width: '100%',
                },
                tabletStyle: {
                    width: '50%',
                },
                desktopStyle: {
                    width: '33%',
                },
                name: 'text',
                title: 'Text',
                description: 'Single line',
            },
            {
                type: FieldType.Text,
                phoneStyle: {
                    width: '100%',
                },
                tabletStyle: {
                    width: '50%',
                },
                desktopStyle: {
                    width: '33%',
                },
                name: 'text',
                title: 'Text',
                description: 'Single line',
            },
            {
                type: FieldType.Text,
                phoneStyle: {
                    width: '100%',
                },
                tabletStyle: {
                    width: '50%',
                },
                desktopStyle: {
                    width: '33%',
                },
                name: 'text',
                title: 'Text',
                description: 'Single line',
            },
            {
                type: FieldType.Text,
                phoneStyle: {
                    width: '100%',
                },
                tabletStyle: {
                    width: '50%',
                },
                desktopStyle: {
                    width: '33%',
                },
                name: 'text',
                title: 'Text',
                description: 'Single line',
            },
            {
                type: FieldType.Text,
                phoneStyle: {
                    width: '100%',
                },
                tabletStyle: {
                    width: '50%',
                },
                desktopStyle: {
                    width: '33%',
                },
                name: 'text',
                title: 'Text',
                description: 'Single line',
            },
        ],
    },
];

export const MainPage = () => {
    return (
        <ScrollView>
            <One fields={fields} onChange={console.log} />
        </ScrollView>
    );
};

export default MainPage;
