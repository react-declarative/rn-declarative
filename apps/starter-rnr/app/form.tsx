import * as React from 'react';
import { ScrollView } from 'react-native';
import { FieldType, One, TypedField } from 'rn-declarative';

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
