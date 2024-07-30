import { One, FieldType, TypedField, sleep } from 'rn-declarative';

import { Text } from '@ui-kitten/components';

const fields: TypedField[] = [
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
                name: 'text',
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
                element: () => (
                    <Text category='h6'>
                        FieldType.Combo
                    </Text>
                ),
            },
            {
                type: FieldType.Combo,
                style: {
                    width: '100%',
                },
                itemList: [
                    'Test 1',
                    'Test 2',
                    'Test 3',
                ],
                name: 'combo',
                title: 'Combo',
                placeholder: 'combo',
                description: 'Default',
            },
            {
                type: FieldType.Combo,
                noDeselect: true,
                style: {
                    width: '100%',
                },
                itemList: [
                    'Test 1',
                    'Test 2',
                    'Test 3',
                ],
                validation: {
                    required: true,
                },
                dirty: true,
                name: 'combo',
                title: 'Combo',
                placeholder: 'combo',
                description: 'Invalid',
            },
            {
                type: FieldType.Combo,
                noDeselect: true,
                style: {
                    width: '100%',
                },
                itemList: [
                    'Test 1',
                    'Test 2',
                    'Test 3',
                ],
                name: 'combo',
                title: 'Combo',
                placeholder: 'combo',
                description: 'No deselect',
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
                element: () => (
                    <Text category='h6'>
                        FieldType.Items
                    </Text>
                ),
            },
            {
                type: FieldType.Items,
                style: {
                    width: '100%',
                },
                itemList: [
                    'Test 1',
                    'Test 2',
                    'Test 3',
                ],
                name: 'items',
                title: 'Items',
                placeholder: 'items',
                description: 'Default',
            },
            {
                type: FieldType.Items,
                noDeselect: true,
                style: {
                    width: '100%',
                },
                itemList: [
                    'Test 1',
                    'Test 2',
                    'Test 3',
                ],
                validation: {
                    required: true,
                },
                dirty: true,
                name: 'items',
                title: 'Items',
                placeholder: 'items',
                description: 'Invalid',
            },
            {
                type: FieldType.Items,
                noDeselect: true,
                style: {
                    width: '100%',
                },
                itemList: [
                    'Test 1',
                    'Test 2',
                    'Test 3',
                ],
                name: 'items',
                title: 'Items',
                placeholder: 'items',
                description: 'No deselect',
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
                name: 'yesno',
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
                element: () => (
                    <Text category='h6'>
                        FieldType.Radio
                    </Text>
                ),
            },
            {
                type: FieldType.Radio,
                style: {
                    width: '100%',
                },
                name: 'radio',
                radioValue: '1',
                title: 'Radio 1',
            },
            {
                type: FieldType.Radio,
                style: {
                    width: '100%',
                },
                name: 'radio',
                radioValue: '2',
                title: 'Radio 2',
            },
            {
                type: FieldType.Radio,
                style: {
                    width: '100%',
                },
                name: 'radio',
                radioValue: '3',
                title: 'Radio 3',
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
                element: () => (
                    <Text category='h6'>
                        FieldType.Switch
                    </Text>
                ),
            },
            {
                type: FieldType.Switch,
                style: {
                    width: '100%',
                },
                name: 'switch',
            },
            {
                type: FieldType.Switch,
                style: {
                    width: '100%',
                },
                name: 'switch',
            },
            {
                type: FieldType.Switch,
                style: {
                    width: '100%',
                },
                name: 'switch',
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
                element: () => (
                    <Text category='h6'>
                        FieldType.Checkbox
                    </Text>
                ),
            },
            {
                type: FieldType.Checkbox,
                style: {
                    width: '100%',
                },
                name: 'checkbox1',
            },
            {
                type: FieldType.Checkbox,
                style: {
                    width: '100%',
                },
                name: 'checkbox2',
            },
            {
                type: FieldType.Checkbox,
                style: {
                    width: '100%',
                },
                name: 'checkbox2',
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
                element: () => (
                    <Text category='h6'>
                        FieldType.Button
                    </Text>
                ),
            },
            {
                type: FieldType.Button,
                style: {
                    width: '100%',
                },
                name: 'button',
                title: 'Primary',
                press: async () => {
                    await sleep(3_000);
                },
            },
            {
                type: FieldType.Button,
                style: {
                    width: '100%',
                },
                name: 'button',
                disabled: true,
                title: 'Disabled',
                press: async () => {
                    await sleep(3_000);
                },
            },
        ],
    },
];

export const MainPage = () => {
    return (
        <One fields={fields} onChange={console.log} />
    );
};

export default MainPage;
