import * as React from "react";
import { useRef, useMemo, useState, useCallback } from "react";

import OneInternal from "../OneInternal";
import OneConfig, { GET_REF_SYMBOL } from "../OneConfig";

import IOneProps from "../../../../model/IOneProps";
import IAnything from "../../../../model/IAnything";
import IField from "../../../../model/IField";
import FieldType from "../../../../model/FieldType";

import deepFlat from "../../../../utils/deepFlat";

import StateProvider from "../../context/StateProvider";
import FeatureProvider from "../../context/FeatureProvider";
import PayloadProvider from "../../context/PayloadProvider";
import CacheProvider from "../../context/CacheProvider";
import RadioProvider from "../../context/RadioProvider";
import DebounceProvider from "../../context/DebounceProvider";
import OneContextProvider from "../../context/OneContextProvider";

import { isBaselineForField } from "../../config/isBaseline";

import SlotFactory from "../SlotFactory";
import Container from "../Container";

import useSingleton from "../../../../hooks/useSingleton";
import useActualValue from "../../../../hooks/useActualValue";

import makeTestId from "../../helpers/makeTestId";

const BASE_CLASS = "rn-declarative__oneGenesis";
const READY_CLASS = "rn-declarative__oneGenesisReady";

const DEFAULT_READY = () => null;
const DEFAULT_CHANGE = (data: IAnything) => console.log({ data });
const DEFAULT_OUTGOING_TRANSFORM = (data: IAnything) => data;

/**
 * Represents the OneGenesis component.
 * @param props - The props for the component.
 * @param props.change - The change callback function.
 * @param props.ready - The ready callback function.
 * @param props.fields - The fields array.
 * @param props.slots - The slots object.
 * @param props.payload - The payload object.
 * @param props.fieldDebounce - The debounce time for field updates.
 * @param props.features - The features object.
 * @param props.context - The context object.
 * @param props.className - The class name for the component.
 * @param props.style - The style object for the component.
 * @param props.sx - The inline style object for the component.
 * @return - The rendered component.
 */
export const OneGenesis = <
  Data extends IAnything = IAnything,
  Payload = IAnything,
  Field extends IField<Data> = IField<Data>
>(
  props: IOneProps<Data, Payload, Field>
) => {
  const isReady = useRef(false);

  const [rendered, setRendered] = useState(false);

  const oneConfig = useSingleton(OneConfig[GET_REF_SYMBOL]);

  const {
    isBaselineForRoot = isBaselineForField,
    outgoingTransform = DEFAULT_OUTGOING_TRANSFORM,
    change = DEFAULT_CHANGE,
    ready = DEFAULT_READY,
    fields = [],
    slots = {},
    payload: upperPayload = {} as Payload,
    fieldDebounce = 0,
    noRootMargin,
    features,
    context,
    baseline,
    noBaseline,
  } = props;

  const payload = useSingleton(upperPayload);

  const defaultStyle = useMemo(() => ({
    width: '100%',
    paddingLeft: noRootMargin ? undefined : oneConfig.ROOT_MARGINS.ml,
    paddingTop: noRootMargin ? undefined : oneConfig.ROOT_MARGINS.mt,
  }), []);

  const { style = defaultStyle } = props;

  const fieldsSnapshot = useMemo(() => fields, []);

  const ready$ = useActualValue(ready);
  const change$ = useActualValue(change);

  /**
   * A callback function that handles the ready state.
   *
   * This callback function is used to set the component's rendered state as true and call the ready function, if the component is not already in the ready state. It is a memoized callback
   * function created using the useCallback hook.
   *
   * @function handleReady
   * @returns
   */
  const handleReady = useCallback(() => {
    const { current: ready } = ready$;
    if (!isReady.current) {
      isReady.current = true;
      setRendered(true);
      ready();
    }
  }, []);

  /**
   * Handles the change event by validating the new data and calling the provided callback function if the data is valid.
   *
   * @param newData - The new data being passed to the event handler.
   * @param initial - Indicates if the data is being changed initially or not.
   *
   * @returns
   */
  const handleChange = useCallback((newData: Data, initial: boolean) => {
    const { current: change } = change$;
    let isValid = true;
    deepFlat(fields).forEach(({ isInvalid = () => null, hidden }: IField) => {
      const isHidden = typeof hidden === 'function' ? hidden(payload) : hidden;
      if (!isHidden) {
        isValid = isValid && (isInvalid(newData, payload) || null) === null;
      }
    });
    if (isValid) {
      change(outgoingTransform(newData, payload), initial);
    }
  }, []);

  /**
   * Represents the state parameters.
   * @typedef StateParams
   * @property props - The additional properties.
   * @property context - The context information.
   * @property fields - The fields snapshot.
   * @property change - The change handler function.
   * @property features - The feature details.
   * @property payload - The payload information.
   */
  const stateParams = {
    ...props,
    context: undefined,
    fields: fieldsSnapshot,
    change: handleChange,
    features,
    payload,
  };

  /**
   * Represents the view parameters for rendering a view.
   *
   * @typedef ViewParams
   * @property props - The props to pass to the view component.
   * @property context - The context of the view.
   * @property fields - The fields snapshot for the view.
   * @property ready - The callback function to handle the ready state.
   * @property features - The features for the view.
   * @property payload - The payload for the view.
   * @property rendered - Indicates whether the view has been rendered.
   */
  const viewParams = {
    ...props,
    context: undefined,
    fields: fieldsSnapshot,
    ready: handleReady,
    features,
    payload,
    rendered,
    baseline,
    noBaseline,
  };

  const testId = rendered ? READY_CLASS : BASE_CLASS;

  /**
   * Корневой компонент привязывает поля к нижнему краю только если
   * нет ни одной компоновки
   */
  const isBaselineAlign = useMemo(() => {
    if (baseline) {
      return true;
    }
    if (noBaseline) {
      return false;
    }
    return fieldsSnapshot.every(isBaselineForRoot);
  }, []);

  return (
    <CacheProvider>
      <DebounceProvider payload={fieldDebounce}>
        <OneContextProvider context={context}>
          <RadioProvider
            initialState={() =>
              deepFlat(fields)
                .filter(({ type }) => type === FieldType.Radio)
                .filter(({ name }) => name)
                .reduce<Record<string, string | null>>(
                  (acm, { name, defaultValue }) => ({
                    ...acm,
                    [name!]: acm[name!] || String(defaultValue) || null,
                  }),
                  {}
                )
            }
          >
            <FeatureProvider features={features}>
              <PayloadProvider payload={payload}>
                <StateProvider<Data, Payload, Field> {...stateParams}>
                  <SlotFactory {...slots}>
                    <Container
                      style={style}
                      isBaselineAlign={isBaselineAlign}
                      {...makeTestId(testId)}
                    >
                      <OneInternal<Data, Payload, Field> {...viewParams} />
                    </Container>
                  </SlotFactory>
                </StateProvider>
              </PayloadProvider>
            </FeatureProvider>
          </RadioProvider>
        </OneContextProvider>
      </DebounceProvider>
    </CacheProvider>
  );
};

OneGenesis.displayName = "OneGenesis";

export default OneGenesis;
