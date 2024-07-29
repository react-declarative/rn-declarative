import * as React from "react";
import { memo, useRef, useCallback, useEffect, Fragment, useMemo } from "react";

import isStatefull, { isLayout } from "../../config/isStatefull";
import createFieldInternal from "../../config/createField";
import createLayoutInternal from "../../config/createLayout";

import { useOneState } from "../../context/StateProvider";
import { useOneCache } from "../../context/CacheProvider";
import { useOnePayload } from "../../context/PayloadProvider";

import { typeToString } from "../../helpers/typeToString";

import FieldType from "../../../../model/FieldType";
import IOneProps from "../../../../model/IOneProps";
import IEntity from "../../../../model/IEntity";
import IField from "../../../../model/IField";
import IAnything from "../../../../model/IAnything";

import cached from "../../../../utils/hof/cached";

/**
 * Мы отображаем корневой компонент только после инициализации
 * полей вложенных групп...
 */
const countStatefull = (fields: IField<any>[]) => {
  const { length: total } = fields.filter(isStatefull);
  return Math.max(total, 1);
};

interface IOneInternalProps<
  Data extends IAnything = IAnything,
  Payload = IAnything,
  Field extends IField<Data> = IField<Data>
> extends IOneProps<Data, Payload, Field> {
  rendered: boolean;
}

const DEFAULT_READY_CALLBACK = () => null;
const DEFAULT_INVALIDITY_CALLBACK = () => null;
const DEFAULT_FALLBACK = () => null;

/**
 * Represents the default value for the `shouldUpdateItemList` property of the `IField` interface.
 * The value is a function that compares two data objects and determines whether the item list should be updated.
 *
 * @param prevData - The previous data object.
 * @param currentData - The current data object.
 * @returns - `true` if the item list should be updated, `false` otherwise.
 */
const SHOULD_UPDATE_ITEM_LIST_DEFAULT: IField["shouldUpdateItemList"] = (
  prevData,
  currentData
) => prevData !== currentData;

/**
 * Represents a function that determines whether the "shouldUpdateTr" field should be updated.
 *
 * The function takes in two parameters, "prevValue" and "currentValue", and returns a boolean value indicating whether
 * the "shouldUpdateTr" field should be updated based on a comparison between the two values.
 *
 * @param prevValue - The previous value of the "shouldUpdateTr" field.
 * @param currentValue - The current value of the "shouldUpdateTr" field.
 * @returns - A boolean value indicating whether the "shouldUpdateTr" field should be updated.
 */
const SHOULD_UPDATE_TR_DEFAULT: IField["shouldUpdateTr"] = (
  [prevValue],
  [currentValue]
) => prevValue !== currentValue;

/**
 * Подгрузка списка элементов списка по умолчанию
 * осуществляется только один раз
 */
const makeItemList = (field: IField, payload: IAnything) => {
  const { itemList, shouldUpdateItemList = SHOULD_UPDATE_ITEM_LIST_DEFAULT } =
    field;
  if (!itemList) {
    return undefined;
  }
  return Array.isArray(itemList)
    ? itemList
    : cached<any, any>(
        (prevArgs, currentArgs) =>
          shouldUpdateItemList(prevArgs[0], currentArgs[0], payload),
        itemList
      );
};

/**
 * Подгрузка переводов по умолчанию осуществляется
 * на каждый вызов
 */
const makeTr = (field: IField, payload: IAnything) => {
  const { tr, shouldUpdateTr = SHOULD_UPDATE_TR_DEFAULT } = field;
  if (!tr) {
    return undefined;
  }
  return cached<any, any>(
    (prevArgs, currentArgs) => shouldUpdateTr(prevArgs, currentArgs, payload),
    tr
  );
};

/**
 * @typedef IOneInternalProps - Props for the OneInternal component
 * @template Data - The data type
 * @template Payload - The payload type
 * @template Field - The field type
 * @property rendered - Whether the component has been rendered
 * @property fields - The fields array
 * @property features - The features array
 * @property dirty - Whether the fields are dirty
 * @property ready - The ready callback function
 * @property prefix - The prefix string
 * @property invalidity - The invalidity callback function
 * @property fallback - The fallback callback function
 * @property readonly - Whether the fields are readonly
 * @property focus - The focus callback function
 * @property blur - The blur callback function
 * @property press - The press callback function
 * @property createField - The createField function
 * @property createLayout - The createLayout function
 * @property withNamedPlaceholders - Whether to use named placeholders
 */
export const OneInternal = <
  Data extends IAnything = IAnything,
  Payload = IAnything,
  Field extends IField<Data> = IField<Data>
>({
  rendered = false,
  fields: upperFields = [],
  features,
  dirty,
  ready = DEFAULT_READY_CALLBACK,
  prefix = "root",
  invalidity = DEFAULT_INVALIDITY_CALLBACK,
  fallback = DEFAULT_FALLBACK,
  readonly,
  disabled,
  readTransform,
  writeTransform,
  focus,
  blur,
  press,
  createField = createFieldInternal,
  createLayout = createLayoutInternal,
  withNamedPlaceholders,
}: IOneInternalProps<Data, Payload, Field>) => {

  const payload = useOnePayload();

  /**
   * Коллбеки вынесены из тела компонента для мемоизации
   */
  const {
    focusMap,
    blurMap,
    fieldsMap,
    pressMap,
    statefullMap,
    trMap,
    itemListMap,
  } = useOneCache();

  /**
   * Итерация дочерних полей на каждый рендеринг
   * порождает квадратичную сложность, мемоизируем
   */
  const { fields, statefull } = useMemo(() => {
    const fields = fieldsMap.has(upperFields)
      ? fieldsMap.get(upperFields)!
      : fieldsMap
          .set(
            upperFields,
            upperFields
              .filter(
                (field) =>
                  !features ||
                  !field.features ||
                  field.features.some((feature) => features.includes(feature))
              )
              .filter(({ type }) => type !== FieldType.Phony)
              .filter(({ hidden }) => {
                if (typeof hidden === 'function') {
                  hidden = hidden(payload);
                }
                return !hidden;
              })
              .filter(({ type }) => type !== FieldType.Init)
          )
          .get(upperFields)!;
    return {
      fields,
      statefull: statefullMap.has(upperFields)
        ? statefullMap.get(upperFields)!
        : statefullMap
            .set(upperFields, countStatefull(fields))
            .get(upperFields)!,
    };
  }, []);

  /**
   * Коллбек инициализации исполняется после вызова эффекта
   * входящего изменения каждого поля
   */
  const waitingReady = useRef(statefull);
  const { object, setObject } = useOneState<Data>();

  /**
   * Если в группе нет полей, вызываем инициализацию мануально
   */
  useEffect(() => {
    const { length: total } = fields;
    total == 0 && ready();
  }, []);

  /**
   * Изменяем локальный объект, сообщаем вышестоящему
   * компоненту о изменениях
   */
  const handleChange = useCallback(
    (v: Data, invalidMap: Record<string, boolean>) => {
      setObject(v, invalidMap);
    },
    []
  );

  /**
   * Отображение только после отрисовки всех полей
   * формы
   */
  const handleReady = useCallback(() => {
    if (--waitingReady.current === 0) {
      ready();
    }
  }, [ready]);

  if (object) {
    return (
      <Fragment>
        {fields.map((field, index) => {
          const currentPath = `${prefix}.${typeToString(field.type)}[${index}]`;
          const fields: IField<Data>[] = field.child
            ? [field.child]
            : field.fields || [];
          const entity: IEntity<Data> = {
            readTransform,
            writeTransform,
            invalidity: field.invalidity || invalidity,
            readonly: readonly || field.readonly,
            disabled: disabled || field.disabled,
            testId: field.testId,
            prefix: currentPath,
            change: handleChange,
            ready: handleReady,
            fallback,
            ...field,
            placeholder: withNamedPlaceholders
              ? `${field.name || "unknown"}`
              : field.placeholder,
            /**
             * Retrieves the function associated with the given field from the press map.
             * If no function is found, returns the press map itself.
             *
             * @param field - The field to search in the press map.
             * @returns - The function associated with the field, or the press map.
             */
            press: pressMap.has(field)
              ? pressMap.get(field)
              : pressMap
                  .set(field, async (name, data, payload, onValueChange, onChange) => {
                    if (field.press) {
                      await field.press(name, data, payload, onValueChange, onChange);
                    }
                    if (press) {
                      await press(name, data, payload, onValueChange, onChange);
                    }
                  })
                  .get(field),
            /**
             * Determines if the provided field exists in the focusMap.
             *
             * If the field exists, the corresponding value is returned from the focusMap.
             * If the field does not exist, the focusMap is updated with a new value created as a function.
             * The function takes in parameters and calls "focus" and "focus" (if they exist) passing in the parameters.
             * Then, the updated value is returned from the focusMap.
             *
             * @param field - The field to check in the focusMap.
             * @returns - The value associated with the field in the focusMap.
             */
            focus: focusMap.has(field)
              ? focusMap.get(field)
              : focusMap
                  .set(field, (name, data, payload, onValueChange, onChange) => {
                    field.focus && field.focus(name, data, payload, onValueChange, onChange);
                    focus && focus(name, data, payload, onValueChange, onChange);
                  })
                  .get(field),
            /**
             * Checks if a field exists in the blur map, and returns its value if found.
             * If the field does not exist, it adds a new entry to the blur map and returns it.
             * The new entry is a function that invokes the `blur` method of the `field`, if available,
             * and then invokes the `blur` method passed as an argument.
             *
             * @param field - The field to check or add to the blur map.
             * @returns - The value associated with the field in the blur map,
             *                       or a new function added to the blur map for the field.
             */
            blur: blurMap.has(field)
              ? blurMap.get(field)
              : blurMap
                  .set(field, (name, data, payload, onValueChange, onChange) => {
                    field.blur && field.blur(name, data, payload, onValueChange, onChange);
                    blur && blur(name, data, payload, onValueChange, onChange);
                  })
                  .get(field),
            /**
             * Checks if a field exists in the trMap. If the field exists, it returns the corresponding translation. If the field does not exist, it creates a new translation using the `makeTr`
             * function, stores it in the trMap, and returns the translation.
             *
             * @param field - The field to check in the trMap.
             * @param payload - The payload to use when creating a new translation.
             * @returns - The translation for the specified field.
             */
            tr: trMap.has(field)
              ? trMap.get(field)
              : trMap.set(field, makeTr(field, payload)).get(field),
            /**
             * Returns the itemList for the given field. If the field exists in the itemListMap,
             * the corresponding itemList is returned. Otherwise, a new itemList is created using
             * makeItemList function and added to the itemListMap.
             *
             * @param field - The field for which to get the itemList.
             * @param payload - The payload to be used in makeItemList function.
             * @returns - The itemList for the given field.
             */
            itemList: itemListMap.has(field)
              ? itemListMap.get(field)
              : itemListMap.set(field, makeItemList(field, payload)).get(field),
            object,
            dirty: field.dirty || dirty,
          };
          /**
           * Represents the internal props for component `one`.
           *
           * @template Data - The type of data used by the component.
           *
           * @property rendered - Determines if the component is rendered.
           * @property ready - Callback function for when the component is ready.
           * @property prefix - The current path prefix.
           * @property readonly - Determines if the component is readonly.
           * @property withNamedPlaceholders - Determines if the component has named placeholders.
           * @property createField - Function for creating a field.
           * @property createLayout - Function for creating a layout.
           * @property fields - The list of fields.
           * @property features - The list of features.
           * @property handler - The object handler.
           * @property invalidity - Determines if the component is invalid.
           * @property focus - Determines if the component is focused.
           * @property press - Determines if the component is pressed.
           * @property menu - Determines if the component has a menu.
           * @property blur - Determines if the component is blurred.
           * @property dirty - Determines if the component is dirty.
           */
          const one: IOneInternalProps<Data> = {
            rendered,
            ready: handleReady,
            prefix: currentPath,
            readTransform,
            writeTransform,
            readonly: readonly || field.readonly,
            disabled: disabled || field.disabled,
            withNamedPlaceholders,
            createField,
            createLayout,
            fields,
            features,
            handler: object,
            invalidity,
            focus,
            press,
            blur,
            dirty: field.dirty || dirty,
          };
          if (isLayout(field.type)) {
            return createLayout(
              entity,
              <OneInternalMemo<Data> {...one} />,
              currentPath
            );
          } else {
            return createField(entity, currentPath);
          }
        })}
      </Fragment>
    );
  } else {
    return null;
  }
};

OneInternal.displayName = "OneInternal";

export const OneInternalMemo = memo(OneInternal) as typeof OneInternal;

export default OneInternalMemo;
