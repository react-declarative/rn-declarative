import * as React from 'react';
import { ScrollView } from 'react-native';
import { FieldType, One, TypedField } from 'rn-declarative';
import { FormGroup, FormLabel } from '~/components/ui/form';

import { Text } from '~/components/ui/text';

const frameworks = [
  {
    value: 'next.js',
    label: 'Next.js',
  },
  {
    value: 'sveltekit',
    label: 'SvelteKit',
  },
  {
    value: 'nuxt.js',
    label: 'Nuxt.js',
  },
  {
    value: 'remix',
    label: 'Remix',
  },
  {
    value: 'astro',
    label: 'Astro',
  },
];

const fields: TypedField[] = [
  {
    type: FieldType.Text,
    style: {
      width: '100%',
    },
    validation: {
      required: true,
    },
    name: 'email',
    title: 'Email',
    placeholder: 'tripolskypetr@gmail.com',
    description: 'This will not be shared.',
  },
  {
    type: FieldType.Text,
    textVariant: "password",
    style: {
      width: '100%',
    },
    validation: {
      required: true,
    },
    name: 'email',
    title: 'Password',
    placeholder: 'Password',
    description: 'Use a secure password.',
  },
  {
    type: FieldType.Text,
    inputMultiline: true,
    style: {
      width: '100%',
    },
    validation: {
      required: true,
    },
    name: 'bio',
    title: 'Tell me about yourself',
    placeholder: 'I am ...',
    description: 'This will be used by AI.',
  },
  {
    type: FieldType.Component,
    style: {
      width: '100%',
      marginTop: 16,
      marginBottom: 8,
    },
    element: () => (
      <FormGroup
        label="Account Type"
        description='Select your account type.'
      />
    ),
  },
  {
    type: FieldType.Block,
    style: {
      marginBottom: 12,
      width: '100%',
    },
    fields: [
      {
        type: FieldType.Radio,
        radioValue: 'staff',
        title: 'Staff',
        name: 'account',
      },
      {
        type: FieldType.Radio,
        radioValue: 'admin',
        title: 'Admin',
        name: 'account',
      },
      {
        type: FieldType.Radio,
        radioValue: 'owner',
        title: 'Owner',
        name: 'account',
      },
    ],
  },
  {
    type: FieldType.Combo,
    name: 'framework',
    title: 'Favorite Framework',
    placeholder: 'Select framework',
    description: 'More important than your skills.',
    style: {
      width: '100%',
    },
    itemList: frameworks.map(({ value }) => value),
    tr: (value) => {
      const framework = frameworks.find((framework) => framework.value === value);
      if (framework) {
        return framework.label;
      }
      return value;
    }
  },
  {
    type: FieldType.Switch,
    style: {
      width: '100%',
      marginTop: 8,
    },
    title: 'Enable notifications',
    description: 'We will send you spam.',
    name: 'notify',
  },
  {
    type: FieldType.Checkbox,
    style: {
      width: '100%',
      marginBottom: 8,
    },
    title: 'Accept terms & conditions',
    name: 'agree',
  },
  {
    type: FieldType.Button,
    style: {
      width: '100%',
    },
    buttonVariant: 'primary',
    title: 'Submit',
  },
];

export default function FormScreen() {
  return (
    <ScrollView
      contentContainerClassName='p-6 mx-auto w-full max-w-xl'
      showsVerticalScrollIndicator={false}
      automaticallyAdjustContentInsets={false}
      contentInset={{ top: 12 }}
    >
      <One
        fields={fields}
      />
    </ScrollView>
  );
}
