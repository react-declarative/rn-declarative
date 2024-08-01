# ⚛️ rn-declarative

> Responsive layout for the `react-native`

![screencast](https://github.com/react-declarative/rn-declarative/blob/HEAD/assets/screencast.gif)

## Installation

The package is split into two parts: [rn-declarative](https://www.npmjs.com/package/rn-declarative) and [rn-declarative-eva](https://www.npmjs.com/package/rn-declarative-eva). The `rn-declarative` manage the core part: It independent from any UI Kit and can be easely installed to any project. The `rn-declarative-eva` contains bindings to the [UI Kitten](https://akveo.github.io/react-native-ui-kitten/) - an open source ui components for `react-native` build on top of [Eva Design](https://eva.design/). By replacing `rn-declarative-eva` package you can connect the `rn-declarative` to any UI kit, for example, [react-native-paper](https://reactnativepaper.com/)

```bash
npm i @ui-kitten/components @eva-design/eva react-native-svg rn-declarative rn-declarative-eva
```

## Documentation

> [!IMPORTANT]
> This is a fork of project named [react-declarative](https://github.com/react-declarative/react-declarative). You should seek for documentation in that repo. **⭐Star** and **💻Fork** It on github will be appreciated


The `rn-declarative` contains the following fields

```tsx
FieldType.Combo, FieldType.Items, FieldType.Text, FieldType.YesNo, FieldType.Switch, FieldType.Radio, FieldType.Checkbox, FieldType.Component, FieldType.Button
```

And layouts

```tsx
FieldType.Group, FieldType.Fragment, FieldType.Layout, FieldType.Condition
```

## Code sample

> Responsive Forms for the React Native

```tsx
import { One, FieldType, TypedField } from 'rn-declarative';

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
        style: {
            width: '100%',
        },
        fields: [
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
                        name: 'combo_invalid',
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
                        style: {
                            width: '100%',
                        },
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
                        name: 'items_invalid',
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
        ]
    },
    {
        type: FieldType.Group,
        baseline: true,
        style: {
            width: '100%',
        },
        fields: [
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
                                FieldType.Radio
                            </Text>
                        ),
                    },
                    {
                        type: FieldType.Radio,
                        name: 'radio',
                        radioValue: '1',
                        title: 'Radio 1',
                    },
                    {
                        type: FieldType.Radio,
                        name: 'radio',
                        radioValue: '2',
                        title: 'Radio 2',
                    },
                    {
                        type: FieldType.Radio,
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
                        style: {
                            width: '100%',
                        },
                        element: () => (
                            <Text category='h6'>
                                FieldType.Switch
                            </Text>
                        ),
                    },
                    {
                        type: FieldType.Switch,
                        name: 'switch',
                    },
                    {
                        type: FieldType.Switch,
                        name: 'switch',
                    },
                    {
                        type: FieldType.Switch,
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
                        style: {
                            width: '100%',
                        },
                        element: () => (
                            <Text category='h6'>
                                FieldType.Checkbox
                            </Text>
                        ),
                    },
                    {
                        type: FieldType.Checkbox,
                        name: 'checkbox1',
                    },
                    {
                        type: FieldType.Checkbox,
                        name: 'checkbox2',
                    },
                    {
                        type: FieldType.Checkbox,
                        name: 'checkbox2',
                    },
                ],
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

```
