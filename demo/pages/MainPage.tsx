import { One, FieldType, TypedField } from 'rn-declarative';

const fields: TypedField[] = [
    {
        type: FieldType.Text,
        name: 'text',
        title: 'text',
    },
];

export const MainPage = () => {
    return (
        <One fields={fields} />
    );
};

export default MainPage;
