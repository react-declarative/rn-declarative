import * as React from 'react';
import { Alert, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from '~/components/ui/button';
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
        <Input
          placeholder='hello@zachnugent.ca'
          autoCapitalize='none'
          autoComplete='email'
        />
        <Input
          placeholder='********'
          secureTextEntry
          autoComplete='password'
        />
        <Textarea
          placeholder='I am ...'
        />
        <RadioGroup
          className='gap-4'
          value='admin'
          onValueChange={() => { }}
        >
          {(['staff', 'admin', 'owner'] as const).map((value) => {
            return (
              <View key={value} className={'flex-row gap-2 items-center'}>
                <RadioGroupItem aria-labelledby={`label-for-${value}`} value={value} />
                <Label
                  nativeID={`label-for-${value}`}
                  className='capitalize'
                >
                  {value}
                </Label>
              </View>
            );
          })}
        </RadioGroup>
        <Select defaultValue={{ value: 'apple', label: 'Apple' }}>
          <SelectTrigger className='w-[250px]'>
            <SelectValue
              className='text-foreground text-sm native:text-lg'
              placeholder='Select a fruit'
            />
          </SelectTrigger>
          <SelectContent insets={contentInsets} className='w-[250px]'>
            <SelectGroup>
              <SelectLabel>Fruits</SelectLabel>
              <SelectItem label='Apple' value='apple'>
                Apple
              </SelectItem>
              <SelectItem label='Banana' value='banana'>
                Banana
              </SelectItem>
              <SelectItem label='Blueberry' value='blueberry'>
                Blueberry
              </SelectItem>
              <SelectItem label='Grapes' value='grapes'>
                Grapes
              </SelectItem>
              <SelectItem label='Pineapple' value='pineapple'>
                Pineapple
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Switch
          checked
          onCheckedChange={() => {}}
        />
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
