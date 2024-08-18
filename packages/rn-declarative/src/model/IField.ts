import * as React from 'react';

import type ComponentFieldInstance  from './ComponentFieldInstance';
import type { IDebug }  from './ComponentFieldInstance';

import FieldType from './FieldType';
import IAnything from './IAnything';
import IValidation from './IValidation';
import ITreeNode from './ITreeNode';

import StyleProperties from './StyleProperties';

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
     * Отменяет ожидание фокуса для валидации
     */
    dirty?: boolean;

    /**
     * Вариант кнопки
     */
    buttonVariant?: keyof {
      primary: 'primary',
      secondary: 'secondary'
    };

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
     * Отключает нижний baseline для текущей компоновки
     */
    noBaseline?: boolean;

    /**
     * Принудительно включает нижний baseline для текущей компоновки
     */
    baseline?: boolean;

    /**
     * Список бизнес-функций, необходимых для отображения поля
     */
    features?: string[];

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
    press?: (name: string, data: Data, payload: Payload, onValueChange: (value: Value) => void, onChange: (data: Data) => void) => (void | Promise<void>);

    /**
     * Флаг только на чтение
     */
    readonly?: boolean;

    /**
     * Отключение поля
     */
    disabled?: boolean;

    /**
     * Поле, специфичное для RadioField и позволяющее
     * задать значение при выборе элемента кликом
     */
    radioValue?: string;

    /**
     * Делает TextField многострочным
     */
    inputMultiline?: boolean;

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
    leadingIconPress?: (value: Value, data: Data, payload: Payload, onValueChange: (v: Value) => void, onChange: (data: Data) => void) => void;
    trailingIconPress?: (value: Value, data: Data, payload: Payload, onValueChange: (v: Value) => void, onChange: (data: Data) => void) => void;

    /**
     * Поля, специфичные для SliderField
     */
    minSlider?: number;
    maxSlider?: number;
    stepSlider?: number;
    labelFormatSlider?: (v: number) => string | number;

    /**
     * Максимальное число для высчитывания процента
     * (минимальное число всегда ноль)
     */
    maxPercent?: number;

    /**
     * Отключает отчерк у линии
     */
    lineTransparent?: boolean;

    /**
     * Показывает процент числом слева
     */
    showPercentLabel?: boolean;

    /**
     * Подсказки для CompleteField
     */
    tip?: string[] | ((value: string, data: Data, payload: Payload) => (string[] | Promise<string[]>));

    /**
     * Коллбек выбора элемента из CompleteField
     */
    tipSelect?: (value: string, data: Data, payload: Payload, onChange: (data: Data) => void) => void;

    /**
     * Поле, позволяющее передавать собственные значения в FieldType.Items и FieldType.Combo
     */
    freeSolo?: boolean;

    /**
     * Варианты выбора для ComboField и ItemsField
     */
    itemList?: string[] | ((data: Data, payload: Payload) => string[]) | ((data: Data, payload: Payload) => Promise<string[]>),

    /**
     * Вариант выбора для TreeField
     */
    itemTree?: ITreeNode[] | ((data: Data, payload: Payload) => ITreeNode[]) | ((data: Data, payload: Payload) => Promise<ITreeNode[]>);

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
    style?: StyleProperties;
    phoneStyle?: StyleProperties;
    tabletStyle?: StyleProperties;
    desktopStyle?: StyleProperties;

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
     * Шрифт для поля Typography
     */
    typoVariant?: keyof {
      h1: 'h1',
      h2: 'h2',
      h3: 'h3',
      h4: 'h4',
      h5: 'h5',
      h6: 'h6',
      subtitle1: 'subtitle1',
      subtitle2: 'subtitle2',
      body1: 'body1',
      body2: 'body2',
      caption: 'caption',
    };

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

    /**
     * Функция для выбора документа из справочника
     * для useSearchModal
     */
    choose?: (data: Data, payload: Payload) => (Promise<string | string[] | null> | string | string[] | null);
}

export default IField;
