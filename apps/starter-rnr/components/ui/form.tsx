import * as React from 'react';
import { useMemo } from 'react';
import { Text, View } from 'react-native';
import Animated, { FadeInDown, FadeOut } from 'react-native-reanimated';
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
import { Textarea } from '~/components/ui/textarea';
import { cn } from '~/lib/utils';
import { Checkbox } from './checkbox';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type FormError = string | null;
type NoopFn = () => void;

interface IFormItemProps extends React.ComponentPropsWithoutRef<typeof View> {
}

const FormItem = React.forwardRef<
  React.ElementRef<typeof View>,
  IFormItemProps
>(({ className, ...props }, ref) => (
  <View ref={ref} className={cn('space-y-2', className)} {...props} />
));
FormItem.displayName = 'FormItem';

interface IFormLabelProps extends Omit<React.ComponentPropsWithoutRef<typeof Label>, keyof {
  nativeID: never;
}> {
  error?: FormError;
  name: string;
}

const FormLabel = React.forwardRef<
  React.ElementRef<typeof Label>,
  IFormLabelProps
>(({ className, error, name, children, ...props }, ref) => (
  <Label
    ref={ref}
    nativeID={name}
    className={cn(!!error && 'text-destructive', className)}
    {...props}
  >
    {children}
  </Label>
));
FormLabel.displayName = 'FormLabel';

interface IFormDescriptionProps extends React.ComponentPropsWithoutRef<typeof Text> {
  error?: FormError;
}

const FormDescription = React.forwardRef<
  React.ElementRef<typeof Text>,
  IFormDescriptionProps
>(({ className, error, children, ...props }, ref) => (
  <Text
    ref={ref}
    className={cn('text-sm text-muted-foreground pt-1', !!error && 'text-destructive', className)}
    {...props}
  >
    {error ? error : children}
  </Text>
));
FormDescription.displayName = 'FormDescription';

interface IFormMessageProps extends React.ComponentPropsWithoutRef<typeof Animated.Text> {
  error?: FormError;
}

const FormMessage = React.forwardRef<
  React.ElementRef<typeof Animated.Text>,
  IFormMessageProps
>(({ className, error, children, ...props }, ref) => {
  const body = error ? error : children;
  return body ? (
    <Animated.Text
      entering={FadeInDown}
      exiting={FadeOut.duration(275)}
      ref={ref}
      className={cn('text-sm font-medium text-destructive', className)}
      {...props}
    >
      {body}
    </Animated.Text>
  ) : null;
});
FormMessage.displayName = 'FormMessage';

type Override<T, U> = Omit<T, keyof U> & U;

interface FormFieldFieldProps<T> {
  name: string;
  onBlur: NoopFn;
  onFocus: NoopFn;
  onChange: (val: T) => void;
  value: T;
  disabled?: boolean;
}

type FormItemProps<T extends React.ElementType<any>, U> = Override<
  React.ComponentPropsWithoutRef<T>,
  FormFieldFieldProps<U>
> & {
  label?: string;
  description?: string;
};

interface IFormInputProps extends FormItemProps<typeof Input, string> {
  error?: FormError;
}

const FormInput = React.forwardRef<
  React.ElementRef<typeof Input>,
  IFormInputProps
>(({ label, name, description, error, onChange, onFocus, onBlur, ...props }, ref) => {
  const inputRef = React.useRef<React.ComponentRef<typeof Input>>(null);

  React.useImperativeHandle(
    ref,
    () => {
      if (!inputRef.current) {
        return {} as React.ComponentRef<typeof Input>;
      }
      return inputRef.current;
    },
    [inputRef.current]
  );

  function handleOnLabelPress() {
    if (!inputRef.current) {
      return;
    }
    if (inputRef.current.isFocused()) {
      inputRef.current?.blur();
    } else {
      inputRef.current?.focus();
    }
  }

  return (
    <FormItem>
      {!!label && (
        <FormLabel name={name} error={error} onPress={handleOnLabelPress}>
          {label}
        </FormLabel>
      )}
      <Input
        ref={inputRef}
        onChangeText={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        {...props}
      />
      {!!description && <FormDescription error={error}>{description}</FormDescription>}
    </FormItem>
  );
});

FormInput.displayName = 'FormInput';

interface IFormTextareaProps extends FormItemProps<typeof Textarea, string> {
  error?: FormError;
}

const FormTextarea = React.forwardRef<
  React.ElementRef<typeof Textarea>,
  IFormTextareaProps
>(({ label, name, error, description, onChange, onFocus, onBlur, ...props }, ref) => {
  const textareaRef = React.useRef<React.ComponentRef<typeof Textarea>>(null);

  React.useImperativeHandle(
    ref,
    () => {
      if (!textareaRef.current) {
        return {} as React.ComponentRef<typeof Textarea>;
      }
      return textareaRef.current;
    },
    [textareaRef.current]
  );

  function handleOnLabelPress() {
    if (!textareaRef.current) {
      return;
    }
    if (textareaRef.current.isFocused()) {
      textareaRef.current?.blur();
    } else {
      textareaRef.current?.focus();
    }
  }

  return (
    <FormItem>
      {!!label && (
        <FormLabel name={name} error={error} onPress={handleOnLabelPress}>
          {label}
        </FormLabel>
      )}

      <Textarea
        ref={textareaRef}
        onChangeText={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        {...props}
      />
      {!!description && <FormDescription error={error}>{description}</FormDescription>}
    </FormItem>
  );
});

FormTextarea.displayName = 'FormTextarea';

interface IFormCheckboxProps extends Omit<FormItemProps<typeof Checkbox, boolean>, keyof {
  onCheckedChange: never;
  checked: never;
}> {
  error?: FormError;
}

const FormCheckbox = React.forwardRef<
  React.ElementRef<typeof Checkbox>,
  IFormCheckboxProps
>(({ label, error, name, description, value, onChange, onFocus, onBlur, ...props }, ref) => {
  const checkboxRef = React.useRef<React.ComponentRef<typeof Checkbox>>(null);

  React.useImperativeHandle(
    ref,
    () => {
      if (!checkboxRef.current) {
        return {} as React.ComponentRef<typeof Checkbox>;
      }
      return checkboxRef.current;
    },
    [checkboxRef.current]
  );

  function handleOnLabelPress() {
    onChange?.(!value);
  }

  return (
    <FormItem className='px-1'>
      <View className='flex-row gap-3 items-center'>
        <Checkbox
          ref={checkboxRef}
          aria-invalid={!!error}
          onCheckedChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          checked={value}
          {...props}
        />
        {!!label && (
          <FormLabel name={name} error={error} onPress={handleOnLabelPress}>
            {label}
          </FormLabel>
        )}
      </View>
      {!!description && <FormDescription error={error}>{description}</FormDescription>}
    </FormItem>
  );
});

FormCheckbox.displayName = 'FormCheckbox';

interface IFormRadioGroupProps extends Omit<FormItemProps<typeof RadioGroup, string>, keyof {
  onValueChange: never;
}> {
  error?: FormError;
}

const FormRadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroup>,
  IFormRadioGroupProps
>(({ label, name, description, error, onChange, onFocus, onBlur, ...props }, ref) => {
  return (
    <FormItem className='gap-3'>
      <View>
        {!!label && <FormLabel name={name} error={error}>{label}</FormLabel>}
        {!!description && <FormDescription className='pt-0'>{description}</FormDescription>}
      </View>
      <RadioGroup
        ref={ref}
        onValueChange={onChange}
        {...props}
      />
      <FormMessage error={error} />
    </FormItem>
  );
});

FormRadioGroup.displayName = 'FormRadioGroup';

interface IFormSelectProps extends Omit<FormItemProps<typeof Select, string | null>, keyof {
  onValueChange: never;
  error: never;
}> {
  error?: FormError;
  placeholder?: string;
  description?: string;
  label: string;
  options: {
    value: string;
    label: string;
  }[];
}

const FormSelect = React.forwardRef<
  React.ElementRef<typeof Select>,
  IFormSelectProps
>(({ label, value, name, description, options, error, placeholder = label, onChange, onFocus, onBlur, ...props }, ref) => {
  const selectedOption = useMemo(() => options.find((option) => option.value === value), [value, options]);
  const insets = useSafeAreaInsets();
  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom,
    left: 12,
    right: 12,
  };
  return (
    <FormItem>
      {!!label && <FormLabel name={name} error={error}>{label}</FormLabel>}
      <Select 
        value={selectedOption}
        onValueChange={(option) => onChange(option ? option.value : null)}
        onOpenChange={(open) => open ? onFocus() : onBlur()}
        {...props}
      >
        <SelectTrigger className='w-[250px]'>
          <SelectValue
            className='text-foreground text-sm native:text-lg'
            placeholder={placeholder}
          />
        </SelectTrigger>
        <SelectContent insets={contentInsets} className='w-[250px]'>
          <SelectGroup>
            <SelectLabel>{label}</SelectLabel>
            {options.map(({ label, value }, idx) => (
              <SelectItem key={`${value}-${idx}`} label={label} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      {!!description && <FormDescription error={error}>{description}</FormDescription>}
    </FormItem>
  );
});

FormSelect.displayName = 'FormSelect';

interface IFormRadioGroupItemProps extends Omit<React.ComponentPropsWithoutRef<typeof RadioGroupItem>, keyof {
  value: never;
  "aria-labelledby": never;
}> {
  name: string;
  label: string;
  description?: string;
  onFocus: NoopFn;
  onBlur: NoopFn;
  radioValue: string;
  error?: FormError;
}

const FormRadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroup>,
  IFormRadioGroupItemProps
>(({ name, error, label, description, radioValue, onFocus, onBlur, ...props }, ref) => {
  return (
    <FormItem>
      <View className="flex-row gap-2 items-center">
        <RadioGroupItem
          aria-labelledby={name}
          value={radioValue}
          onFocus={onFocus}
          onBlur={onBlur}
          {...props}
        />
        <FormLabel
          name={name}
          error={error}
        >
          {label}
        </FormLabel>
      </View>
      {!!description && <FormDescription error={error}>{description}</FormDescription>}
    </FormItem>
  );
});

FormRadioGroupItem.displayName = 'FormRadioGroupItem';

interface IFormSwitchProps extends Omit<FormItemProps<typeof Switch, boolean>, keyof {
  onCheckedChange: never;
  checked: never;
}> {
  error?: FormError;
}

const FormSwitch = React.forwardRef<
  React.ElementRef<typeof Switch>,
  IFormSwitchProps
>(({ label, name, description, error, value, onChange, onFocus, onBlur, ...props }, ref) => {
  const switchRef = React.useRef<React.ComponentRef<typeof Switch>>(null);

  React.useImperativeHandle(
    ref,
    () => {
      if (!switchRef.current) {
        return {} as React.ComponentRef<typeof Switch>;
      }
      return switchRef.current;
    },
    [switchRef.current]
  );

  function handleOnLabelPress() {
    onChange?.(!value);
  }

  return (
    <FormItem className='px-1'>
      <View className='flex-row gap-3 items-center'>
        <Switch
          ref={switchRef}
          aria-invalid={!!error}
          onCheckedChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          checked={value}
          {...props}
        />
        {!!label && (
          <FormLabel name={name} error={error} onPress={handleOnLabelPress}>
            {label}
          </FormLabel>
        )}
      </View>
      {!!description && <FormDescription error={error}>{description}</FormDescription>}
    </FormItem>
  );
});

FormSwitch.displayName = 'FormSwitch';

export {
  FormCheckbox,
  FormDescription,
  FormInput,
  FormItem,
  FormLabel,
  FormMessage,
  FormRadioGroup,
  FormRadioGroupItem,
  FormSelect,
  FormSwitch,
  FormTextarea,
};
