import * as React from 'react';

import type ComponentFieldInstance  from './ComponentFieldInstance';
import type { IDebug }  from './ComponentFieldInstance';

import FieldType from './FieldType';
import IAnything from './IAnything';
import IValidation from './IValidation';

/**
 * Represents any possible variable value of <One /> component field.
 *
 * @typedef Value - Represents a value in JavaScript.
 */
export type Value = string | string[] | number | boolean | null;

/**
 * Объект поля для прикладного программиста
 */
export interface IField<Data = IAnything, Payload = IAnything> {

    /**
     * Иконка для FieldType.Button и FieldType.Icon
     */
    icon?: React.ComponentType<any>;

    /**
     * Размер иконки для FieldType.Icon
     */
    iconSize?: number;

    /**
     * Цвет иконки для FieldType.Icon
     */
    iconColor?: "inherit" | "default" | "primary" | "secondary" | "error" | "info" | "success" | "warning";

    /**
     * Цвет фона иконки для FieldType.Icon
     */
    iconBackground?: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';

    /**
     * Тип заливки кнопки для FieldType.Button
     */
    buttonVariant?: 'text' | 'outlined' | 'contained';

    /**
     * Тип размера кнопки для FieldType.Button
     */
    buttonSize?: 'small' | 'medium' | 'large';

    /**
     * Тип цвета кнопки для FieldType.Button
     */
    buttonColor?: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';

    /**
     * Отменяет ожидание фокуса для валидации
     */
    dirty?: boolean;

    /**
     * Параметры фабрики для создания коллбека isInvalid
     */
    validation?: IValidation;

    /**
     * Атрибут, который будет передат в data-testid
     * корневому элементу компоновки
     */
    testId?: string;

    /**
     * Общие поля. Поле name позволяет задать забор
     * поля из целевого объекта, не нужен для group,
     * expansion и line.
     */
    name?: string;

    /**
     * Коллбек для отладки
     */
    debug?: (params: IDebug<Data, Payload>) => void;

    /**
     * Флаг, убирающий поле из древа отрисовки. Следует использовать для
     * создания динамических значений полей компонента
     */
    hidden?: boolean | ((payload: Payload) => boolean);

    /**
     * Исключает группу из DOM древа на телефоне
     */
    phoneHidden?: boolean | ((payload: Payload) => boolean);

    /**
     * Исключает группу из DOM древа на планшете
     */
    tabletHidden?: boolean | ((payload: Payload) => boolean);

    /**
     * Исключает группу из DOM древа на компьютере
     */
    desktopHidden?: boolean | ((payload: Payload) => boolean);

    /**
     * Список бизнес-функций, необходимых для отображения поля
     */
    features?: string[];

    /**
     * Отключает нижний baseline для текущей компоновки
     */
    noBaseline?: boolean;

    /**
     * Флаг, удерживающий подпись текстового поля при пустом
     * значении
     */
    labelShrink?: boolean;

    /**
     * Коллбеки, вызываемый при фокусировке и потере фокуса.
     * Подразумевается изменение формы со стороны прикладного
     * программиста, а не работа с полем ввода
     * (например, обновление ссылки на изображение)
     */
    focus?: (name: string, data: Data, payload: Payload, onValueChange: (value: Value) => void, onChange: (data: Data) => void) => void;
    blur?: (name: string, data: Data, payload: Payload, onValueChange: (value: Value) => void, onChange: (data: Data) => void) => void;
    /**
     * Перехват клика по полю, следует использовать для копирования значения
     * у карточек просмотра без редактирования
     */
    click?: (name: string, data: Data, payload: Payload, onValueChange: (value: Value) => void, onChange: (data: Data) => void) => (void | Promise<void>);

    /**
     * Флаг только на чтение и "круглой окаймовки"
     */
    readonly?: boolean;
    outlined?: boolean;

    /**
     * Автофокус и постоянное отключение поля
     */
    autoFocus?: boolean;
    disabled?: boolean;

    /**
     * Поле, специфичное для RadioField и позволяющее
     * задать значение при выборе элемента кликом
     */
    radioValue?: string;

    /**
     * Отключает цвет для Switch
     */
    switchNoColor?: boolean;

    /**
     * Применяет к Switch второй title
     */
    switchActiveLabel?: string;

    /**
     * Поле type для MatTextField
     */
    inputType?: keyof {
      'text': never,
      'color': never,
      'date': never,
      'email': never,
      'month': never,
      'number': never,
      'password': never,
      'search': never,
      'tel': never,
      'time': never,
      'url': never,
      'week': never,
    };

    /**
     * Паттерн для MatTextField
     * (inputmode: 'decimal' и pattern: '[0-9.,]+' добавят запятую на iOS клавиатуре)
     */
    inputPattern?: string;

    /**
     * Поле inputmode для MatTextField
     */
    inputMode?: keyof {
      'none': never;
      'text': never;
      'tel': never;
      'url': never;
      'email': never;
      'numeric': never;
      'decimal': never;
      'search': never;
    };

    /**
     * Делает TextField многострочным, если
     * inputRows больше единицы
     */
    inputRows?: number;

    /**
     * Ripple эффект для иконок
     */
    leadingIconRipple?: boolean;
    trailingIconRipple?: boolean;

    /**
     * Иконки для MatTextField
     */
    leadingIcon?: React.ComponentType<any>;
    trailingIcon?: React.ComponentType<any>;

    /**
     * При клике на иконку мы можем запросить данные из модального
     * окна, расположенного в коде прикладного программиста. Коллбек
     * получает на вход текущее значение поля и функцию onChange...
     */
    leadingIconClick?: (value: Value, data: Data, payload: Payload, onValueChange: (v: Value) => void, onChange: (data: Data) => void) => void;
    trailingIconClick?: (value: Value, data: Data, payload: Payload, onValueChange: (v: Value) => void, onChange: (data: Data) => void) => void;

    /**
     * Поле, позволяющее передавать собственные значения в FieldType.Items и FieldType.Combo
     */
    freeSolo?: boolean;

    /**
     * Варианты выбора для ComboField и ItemsField
     */
    itemList?: string[] | ((data: Data, payload: Payload) => string[]) | ((data: Data, payload: Payload) => Promise<string[]>),

    /**
     * Отключает возможность сброса выбора значения для Items и Combo
     */
    noDeselect?: boolean;

    /**
     * Включает change-detection для выпадающих меню. По умолчанию выключено
     */
    watchItemList?: boolean;

    /**
     * Включает change-detection для поля компонента. По умолчанию выключено
     */
    watchOneContext?: boolean;

    /**
     * Позволяет мемоизировать вызов compute
     */
    shouldRecompute?: (prevData: Data, nextData: Data, payload: Payload) => boolean;

    /**
     * Позволяет мемоизировать перевод
     */
    shouldUpdateTr?: (prevArgs: [string, Data], currentArgs: [string, Data], payload: Payload) => boolean;

    /**
     * Позволяет мемоизировать список элементов
     */
    shouldUpdateItemList?: (prevData: Data, currentData: Data, payload: Payload) => boolean;

    /**
     * Позволяет перевести значения у ComboField и ItemsField
     * из поле itemList на человеческий, если
     * используются константы
     */
    tr?: ((s: string, data: Data, payload: Payload) => string) | ((s: string, data: Data, payload: Payload) => Promise<string>),

    /**
     * Отключает fulltext фильтр для FieldType.Complete
     */
    keepRaw?: boolean;

    /**
     * Тип поля для логического ветвления при рендеринге
     */
    type: FieldType;

    /**
     * Стиль корневого элемента для поля (опционально)
     */
    style?: React.CSSProperties;

    /**
     * Заголовок и описание, если возможен вывод у поля
     */
    title?: string;
    description?: string;

    /**
     * placeholder для TextField, ComboField, ItemsField
     */
    placeholder?: string;

    /**
     * Колонки для One. Не используются в List (кроме фильтров).
     * Если указано поле columns, то остальные приравниваются к
     * его значению
     */
    columns?: string;
    phoneColumns?: string;
    tabletColumns?: string;
    desktopColumns?: string;

    /**
     * Дочерние поля для групп
     */
    fields?: IField<Data>[];
    child?: IField<Data>;

    /**
     * Функция, позволяющая организовать валидацию. Если
     * возвращаемое значение не равно null, считается за
     * ошибкую
     */
    isInvalid?: (v: Data, payload: Payload) => null | string;

    /**
     * Функция, позволяющая огранизовать неблокирующую валидацию. Проверка
     * правописания (spellcheck) должен быть отображен в UI, но не должен
     * блокировать кнопку "Сохранить"
     */
    isIncorrect?: (v: Data, payload: Payload) => null | string;

    /**
     * Функция, позволяющая скрыть поле, исходя из целевого
     * объекта
     */
    isVisible?: (v: Data, payload: Payload) => boolean;

    /**
     * Функция, позволяющая отключить поле, исходя из целевого
     * объекта
     */
    isDisabled?: (v: Data, payload: Payload) => boolean;

    /**
     * Функция, позволяющая отключить ввод данных в поле, исходя из целевого
     * объекта
     */
    isReadonly?: (v: Data, payload: Payload) => boolean;

    /**
     * Функция, применяемая если значение поля вычисляется динамически.
     * Включает readonly.
     */
    compute?: (v: Data, payload: Payload) => (Promise<Value> | Value);

    /**
     * Инъекция JSX для ComponentField
     */
    element?: React.ComponentType<ComponentFieldInstance<Data, Payload>>;

    /**
     * Коллбек, вызываемый у поля при не прохождении
     * валидации
     */
    invalidity?: (name: string, e: string, payload: Payload) => void;

    /**
     * Коллбек для 2Way биндингов. Вызывается если поле валидно
     * перед применением нового целевого объекта при исходящем изменении
     */
    map?: (data: Data, payload: Payload) => Data;

    /**
     * Значение по-умолчанию для поля
     */
    defaultValue?: Value | ((payload: Payload) => Value);

    /**
     * Коллбек, позволяющий применить собственную компоновку
     */
    customLayout?: (props: React.PropsWithChildren<Data & {
      onChange: (data: Partial<Data>) => void;
      _fieldData: Data;
      _fieldParams: IField;
      _payload: Payload;
    }>) => React.ReactElement;

    /**
     * Предикат для компоновки Condition
     */
    condition?: ((data: Data, payload: Payload) => boolean) | ((data: Data, payload: Payload) => Promise<boolean>)

    /**
     * Позволяет мемоизировать вызов condition
     */
    shouldCondition?: (prevData: Data, nextData: Data, payload: Payload) => boolean;

    /**
     * Компонент отображения загрузки condition
     */
    conditionLoading?: React.ComponentType<{ data: Data; payload: Payload }>;

    /**
     * Компонент отображения else для condition
     */
    conditionElse?: React.ComponentType<{ data: Data; payload: Payload }>;
  }

export default IField;
