export type { ISize } from './model/ISize';

import { TypedField as TypedFieldInternal } from './model/TypedField';
import { IValidation as IValidationInternal } from './model/IValidation';
import { IInvalidField as IInvalidFieldInternal } from './model/IInvalidField';
import { StyleProperties as StylePropertiesInternal } from './model/StyleProperties';
import { CompiledStyles as CompiledStylesInternal } from './model/CompiledStyles';
import { IField as IFieldInternal } from './model/IField';
import { IEntity as IEntityInternal } from './model/IEntity';
import { IManaged as IManagedInternal } from './model/IManaged';

export { FieldType } from './model/FieldType';
export { SelectionMode } from './model/SelectionMode';

import { IOneApi as IOneApiInternal } from './model/IOneApi';

import { IOption as IOptionInternal } from './model/IOption';

export { useChangeDelay } from './hooks/useChangeDelay';

import { OneHandler as OneHandlerInternal } from './model/IOneProps';

import { useActualCallback } from './hooks/useActualCallback';
import { useActualValue } from './hooks/useActualValue';
import { useActualState } from './hooks/useActualState';
import { useActualRef } from './hooks/useActualRef';
import { useRenderWaiter } from './hooks/useRenderWaiter';

import { useAsyncAction } from './hooks/useAsyncAction';
import { useAsyncValue } from './hooks/useAsyncValue';
import { useSinglerunAction } from './hooks/useSinglerunAction';
import { useQueuedAction } from './hooks/useQueuedAction';
import { useMediaContext } from './hooks/useMediaContext';
import { useChangeSubject } from './hooks/useChangeSubject';
import { useDeepChangeSubject } from './hooks/useDeepChangeSubject';
import { useReloadTrigger } from './hooks/useReloadTrigger';
import { useSingleton } from './hooks/useSingleton';
import { useSubject } from './hooks/useSubject';
import { useChange } from './hooks/useChange';

import IAnything from './model/IAnything';
import IRowData, { RowId } from './model/IRowData';

export type { IRowData, RowId };

export type TypedField<Data = IAnything, Payload = IAnything> = TypedFieldInternal<Data, Payload>;
export type IField<Data = IAnything, Payload = IAnything> = IFieldInternal<Data, Payload>;
export type IFieldEntity<Data = IAnything, Payload = IAnything> = IEntityInternal<Data, Payload>;
export type IFieldManaged<Data = IAnything, Value = IAnything> = IManagedInternal<Data, Value>;
export type IInvalidField<Data = IAnything, Payload = IAnything> = IInvalidFieldInternal<Data, Payload>;
export type IValidation = IValidationInternal;
export type StyleProperties = StylePropertiesInternal;
export type CompiledStyles = CompiledStylesInternal;

export type OneHandler<Data = IAnything> = OneHandlerInternal<Data>;

export type IOneApi<Data = IAnything> = IOneApiInternal<Data>;

export type IOption<Payload = any> = IOptionInternal<Payload>;

export { Async } from './components';
export { If } from './components';

export { One, OneTyped, OneConfig } from './components';

export { OneSlotFactory, OneDefaultSlots } from './components';

export { isBaseline, isBaselineSimple, isBaselineForRoot } from './components';

export { createField, makeField } from './components';
export { createLayout, makeLayout } from './components';

export { useOneProps, useOneState, useOnePayload, useOneFeatures, useOneRadio, useOneContext } from './components';

export { useActualCallback };
export { useActualValue };
export { useActualState };
export { useActualRef };
export { useRenderWaiter };

export { useChangeSubject };
export { useDeepChangeSubject };
export { useReloadTrigger };

export { useSinglerunAction };
export { useAsyncAction };
export { useAsyncValue };
export { useQueuedAction };
export { useMediaContext };

export { useSingleton };
export { useSubject };
export { useChange };

import { IOnePublicProps as IOnePublicPropsInternal } from './model/IOnePublicProps';
export type IOnePublicProps<Data = IAnything, Field extends IField<Data> = IField<Data>> = IOnePublicPropsInternal<Data, Field>;

import { ICheckBoxSlot as ICheckBoxSlotInternal } from './components';
import { IYesNoSlot as IYesNoSlotInternal } from './components';
import { IComboSlot as IComboSlotInternal } from './components';
import { IItemsSlot as IItemsSlotInternal } from './components';
import { IRadioSlot as IRadioSlotInternal } from './components';
import { ISwitchSlot as ISwitchSlotInternal } from './components';
import { IButtonSlot as IButtonSlotInternal } from './components';
import { ITextSlot as ITextSlotInternal } from './components';

import { ICompleteSlot as ICompleteSlotInternal } from './components';
import { IDateSlot as IDateSlotInternal } from './components';
import { IProgressSlot as IProgressSlotInternal } from './components';
import { IRatingSlot as IRatingSlotInternal } from './components';
import { ISliderSlot as ISliderSlotInternal } from './components';
import { ITimeSlot as ITimeSlotInternal } from './components';
import { IChooseSlot as IChooseSlotInternal } from './components';

export type ICheckBoxSlot = ICheckBoxSlotInternal;
export type IComboSlot = IComboSlotInternal;
export type IYesNoSlot = IYesNoSlotInternal;
export type IItemsSlot = IItemsSlotInternal;
export type IRadioSlot = IRadioSlotInternal;
export type ISwitchSlot = ISwitchSlotInternal;
export type ITextSlot = ITextSlotInternal;
export type IButtonSlot = IButtonSlotInternal;

export type ICompleteSlot = ICompleteSlotInternal;
export type IDateSlot = IDateSlotInternal;
export type IProgressSlot = IProgressSlotInternal;
export type IRatingSlot = IRatingSlotInternal;
export type ISliderSlot = ISliderSlotInternal;
export type ITimeSlot = ITimeSlotInternal;
export type IChooseSlot = IChooseSlotInternal;

export { randomString } from './utils/randomString';
export { compareFulltext } from './utils/compareFulltext';
export { promiseState, promiseValue } from './utils/promiseState';

export { compareArray } from './utils/compareArray';
export { isObject } from './utils/isObject';

export { createValueProvider } from './utils/createValueProvider';
export { createStateProvider } from './utils/createStateProvider';

export { formatText } from './utils/formatText';

export { singleshot } from './utils/hof/singleshot';
export { singlerun, Task } from './utils/hof/singlerun';
export { cancelable, CANCELED_SYMBOL as CANCELED_PROMISE_SYMBOL } from './utils/hof/cancelable';
export { debounce } from './utils/hof/debounce';
export { queued } from './utils/hof/queued';
export { cached } from './utils/hof/cached';
export { memoize } from './utils/hof/memoize';
export { trycatch } from './utils/hof/trycatch';

export { sleep } from './utils/sleep';
export { deepFlat } from './utils/deepFlat';

export type { IBreakpoints } from './model/IBreakpoints';
export type { IFieldMargins } from './model/IFieldMargins';

export { BehaviorSubject } from './utils/rx/BehaviorSubject';
export { EventEmitter } from './utils/rx/EventEmitter';
export { Observer } from './utils/rx/Observer';
export { Operator } from './utils/rx/Operator';
export { Subject } from './utils/rx/Subject';
export { Source } from './utils/rx/Source';

export { makeTestId } from './components';

export { getAvailableFields } from './utils/getAvailableFields';
export { getInitialData } from './utils/getInitialData';
export { getInvalidFields } from './utils/getInvalidFields';
export { getFieldsError } from './utils/getFieldsError';
export { getFieldsVariant } from './utils/getFieldsVariant';

export { isInvalidFieldData } from './utils/isInvalidFieldData';

import type TSubjectInternal from './model/TSubject';
import TBehaviorSubjectInternal from './model/TBehaviorSubject';
import TObserverInternal, { TObservable as TObservableInternal } from './model/TObserver';

export type TSubject<Data = void> = TSubjectInternal<Data>;
export type TObserver<Data = void> = TObserverInternal<Data>;
export type TObservable<Data = void> = TObservableInternal<Data>;
export type TBehaviorSubject<Data = unknown> = TBehaviorSubjectInternal<Data>;

export { compose } from './utils/compose';
