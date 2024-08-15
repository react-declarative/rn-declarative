import React from 'react';

import IField, { Value } from './IField';
import IEntity from './IEntity';
import IAnything from './IAnything';
import StyleProperties from './StyleProperties';
import IOneApi from './IOneApi';

import { TSubject } from '../utils/rx/Subject';

import { ISlotFactoryContext } from '../components/One/components/SlotFactory';

type DataOrNull<Data = IAnything> = Data | null;

/**
 * Represents a OneHandler class that can handle data or perform asynchronous tasks with payload.
 * @template Data - The type of data that the OneHandler can handle.
 * @template Payload - The type of payload that the OneHandler can accept.
 */
export type OneHandler<Data = IAnything, Payload = IAnything> = Data | ((payload: Payload) => DataOrNull<Data>) | ((payload: Payload) => Promise<DataOrNull<Data>>) | null;

/**
 * Properties of the <One /> template engine component
 */
export interface IOneProps<Data = IAnything, Payload = IAnything, Field = IField<Data, Payload>> {
  /**
   * Выключить отступ слева сверху по-умолчанию
   */
  noRootMargin?: boolean;
  /**
   * Привязывет поля к нижнему краю
   */
  baseline?: boolean;
  /**
   * Привязывает поля и компоновки к верхнему краю
   */
  noBaseline?: boolean;
  /**
   * Ссылка на объект API
   */
  apiRef?: React.Ref<IOneApi>;
  /**
   * Контекст кастомных полей, в отличие от
   * payload доступен к change detection
   */
  context?: Record<string, any>;
  /**
   * Эмиттер для запроса данных
   */
  reloadSubject?: TSubject<void>;
  /**
   * Генерирует плейсхолдеры согласно схеме полей целевого объекта
   */
  withNamedPlaceholders?: boolean;
  /**
   * Эмиттер для перезаписи данных. Вызывает change(data, true)
   */
  changeSubject?: TSubject<Data>;
  /**
   * Эмиттер для изменения данных. Вызывает change(data, false)
   */
  updateSubject?: TSubject<Data>;
  /**
   * Функция, определяющая, нужно ли включить baseline зависимо от
   * расположения поля в иерархии композиции потомков
   */
  isBaseline?: (field: IField) => boolean;
  /**
   * Корневой компонент привязывает поля к нижнему краю только если
   * нет ни одной компоновки
   */
  isBaselineForRoot?: (field: IField) => boolean;
  /**
   * Фабрика для создания полей пользователя
   */
  createField?: (entity: IEntity<Data>, currentPath: string) => React.ReactElement;
  /**
   * Фабрика для создания компоновок пользователя
   */
  createLayout?: (entity: IEntity<Data>, children: React.ReactNode, currentPath: string) => React.ReactElement;
  /**
   * Класс корневой группы
   */
  className?: string;
  /**
   * Если флаг включен, показываем валидацию до фокусировки по полю
   */
  dirty?: boolean;
  /**
   * Список бизнес-функций, ограничивающий отображение полей
   */
  features?: string[];
  /**
   * Стиль корневой группы
   */
  style?: StyleProperties;
  /**
   * Позволяет загружать данные в компонент
   */
  handler?: OneHandler<Data, Payload>;
  /**
   * Объект, передающийся в пользовательские
   * поля через контекст
   */
  payload?: Payload | (() => Payload);
  /**
   * Вызывается при ошибке в handler
   */
  fallback?: (e: Error) => void;
  /**
   * Коллбек, вызываемый при не прохождении
   * валидации
   */
  invalidity?: (name: string, msg: string, payload: Payload) => void;
  /**
   * Вызываются при фокусировки по филду
   * в компоненте и потере фокуса
   */
  focus?: (name: string, data: Data, payload: Payload, onValueChange: (value: Value) => void, onChange: (data: Data) => void) => void;
  blur?: (name: string, data: Data, payload: Payload, onValueChange: (value: Value) => void, onChange: (data: Data) => void) => void;
  /**
   * crypt/decrypt значения, получаемого в `makeField` из
   * управляемого объекта
   */
  readTransform?: (value: Value, name: string, data: Data, payload: Payload) => Value;
  writeTransform?: (value: Value, name: string, data: Data, payload: Payload) => Value;
  /**
   * Коллбек для перехвата клика по полю
   */
  press?: (name: string, data: Data, payload: Payload, onValueChange: (value: Value) => void, onChange: (data: Data) => void) => (void | Promise<void>);
  /**
   * Вызывается, когда все поля успели отрисоваться
   * в первый раз, после появления формы
   */
  ready?: () => void;
  /**
   * Вызывается после изменения и передает измененный
   * объект прикладному программисту
   */
  change?: (Data: Data, initial: boolean) => void;
  /**
   * Массив полей, выводимый в компоненте
   */
  fields: Field[];
  /**
   * Префикс для формирования ключей элементов
   */
  prefix?: string;
  /**
   * Коллбеки управления отображением
   * состоянием загрузки
   */
  loadStart?: (source: string) => void;
  loadEnd?: (isOk: boolean, source: string) => void;
  /**
   * Блокирует ввод данных
   */
  readonly?: boolean;
  /**
   * Отключает поля ввода
   */
  disabled?: boolean;
  /**
   * Слоты для полей ввода
   */
  slots?: Partial<ISlotFactoryContext>;
  /**
   * Debounce для FieldType.Text
   */
  fieldDebounce?: number;
}

export default IOneProps;
