import { One, FieldType, TypedField } from 'rn-declarative';

const fields: TypedField[] = [
    {
        type: FieldType.Text,
        phoneStyle: {
            width: '100%',
        },
        tabletStyle: {
            width: '75%',
        },
        desktopStyle: {
            width: '25%',
        },
        name: 'text',
        title: 'text',
        description: 'test',
    },
    {
        type: FieldType.Items,
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
