import * as React from 'react';
import { Alert, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from '~/components/ui/button';
import { FormCheckbox, FormInput, FormRadioGroup, FormRadioItemGroup, FormSelect, FormSwitch, FormTextarea } from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { RadioGroup, RadioGroupItem } from '~/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';
import { Switch } from '~/components/ui/switch';
import { Text } from '~/components/ui/text';
import { Textarea } from '~/components/ui/textarea';
import { cn } from '~/lib/utils';

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

const emails = [
  { value: 'tom@cruise.com', label: 'tom@cruise.com' },
  { value: 'napoleon@dynamite.com', label: 'napoleon@dynamite.com' },
  { value: 'kunfu@panda.com', label: 'kunfu@panda.com' },
  { value: 'bruce@lee.com', label: 'bruce@lee.com' },
  { value: 'harry@potter.com', label: 'harry@potter.com' },
  { value: 'jane@doe.com', label: 'jane@doe.com' },
  { value: 'elon@musk.com', label: 'elon@musk.com' },
  { value: 'lara@croft.com', label: 'lara@croft.com' },
];

const NopeFn = () => { };

export default function FormScreen() {
  const scrollRef = React.useRef<ScrollView>(null);
  const insets = useSafeAreaInsets();
  const [selectTriggerWidth, setSelectTriggerWidth] = React.useState(0);

  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom,
    left: 12,
    right: 12,
  };

  return (
    <ScrollView
      ref={scrollRef}
      contentContainerClassName='p-6 mx-auto w-full max-w-xl'
      showsVerticalScrollIndicator={false}
      automaticallyAdjustContentInsets={false}
      contentInset={{ top: 12 }}
    >
      <View className='gap-7'>
        <FormInput
          label='Password'
          placeholder='********'
          description='Use a secure password.'
          secureTextEntry
          autoComplete='password'
          name="radio" value="staff" onFocus={NopeFn} onBlur={NopeFn} onChange={NopeFn}
        />
        <FormTextarea
          label='Tell me about yourself'
          placeholder='I am ...'
          description='This will be used by AI.'
          name="radio" value="staff" onFocus={NopeFn} onBlur={NopeFn} onChange={NopeFn}
        />
        <FormRadioGroup
          label='Account Type'
          description='Select your account type.'
          name="radio" value="staff" onFocus={NopeFn} onBlur={NopeFn} onChange={NopeFn}
        >
          <FormRadioItemGroup radioValue='staff' name="" onFocus={NopeFn} onBlur={NopeFn} />
          <FormRadioItemGroup radioValue='admin' name="" onFocus={NopeFn} onBlur={NopeFn} />
          <FormRadioItemGroup radioValue='owner' name="" onFocus={NopeFn} onBlur={NopeFn} />
        </FormRadioGroup>
        <FormSelect
          label='If you were an email, which one would you be?'
          description='Hint: it is not the one you use.'
          options={frameworks}
          name="switch" value="next.js" onChange={NopeFn} onFocus={NopeFn} onBlur={NopeFn}
        />
        <FormSwitch
          label='Enable notifications'
          description='We will send you spam.'
          name="switch" value={true} onChange={NopeFn} onFocus={NopeFn} onBlur={NopeFn}
        />
        <FormCheckbox name="checkbox" value={true} onChange={NopeFn} onFocus={NopeFn} onBlur={NopeFn} label='Accept terms & conditions' />
        <Button>
          <Text>Submit</Text>
        </Button>
        <View>
          <Button
            variant='ghost'
          >
            <Text>Clear errors</Text>
          </Button>
          <Button
            variant='ghost'
          >
            <Text>Clear form values</Text>
          </Button>
        </View>
      </View>
    </ScrollView>
  );
}
