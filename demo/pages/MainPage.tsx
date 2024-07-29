import { One, FieldType, TypedField } from 'rn-declarative';

const fields: TypedField[] = [
    {
        type: FieldType.Text,
        style: {
            width: '45%',
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
    }
];

export const MainPage = () => {
    return (
        <One fields={fields} onChange={console.log} />
    );
};

export default MainPage;
