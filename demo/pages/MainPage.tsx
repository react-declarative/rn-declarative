import { One, FieldType, TypedField } from 'rn-declarative';

const fields: TypedField[] = [
    {
        type: FieldType.Text,
        style: {
            width: '50%',
        },
        name: 'text',
        title: 'text',
        description: 'test',
    },
    {
        type: FieldType.Text,
        style: {
            width: '50%',
        },
        name: 'text',
        title: 'text',
        description: 'test',
    },
    {
        type: FieldType.Items,
        style: {
            width: '50%',
        },
        itemList: [
            "Foo",
            "Bar",
            "Baz",
        ],
        name: 'items',
        title: 'Items',
        description: 'test',
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
    {
        type: FieldType.Combo,
        style: {
            width: '100%',
        },
        name: 'combo',
        title: 'combo',
        placeholder: 'combo',
        itemList: [
            'Test 1',
            'Test 2',
            'Test 3',
        ]
    },
    {
        type: FieldType.Switch,
        name: 'switch',
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
        type: FieldType.Button,
        name: 'btn',
        title: 'Submit',
        press: (name, data) => console.log({ data }),
    },
    {
        type: FieldType.YesNo,
        name: 'yesno',
        placeholder: 'Unset',
    },
];

export const MainPage = () => {
    return (
        <One fields={fields} onChange={console.log} />
    );
};

export default MainPage;
