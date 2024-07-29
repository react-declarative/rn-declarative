import * as React from 'react';
import { memo } from 'react';
import { useEffect, useLayoutEffect, useCallback, useMemo } from 'react';

/* eslint-disable no-console */

import deepClone from '../../../../utils/deepClone';
import set from '../../../../utils/set';
import get from '../../../../utils/get';
import deepCompare from '../../../../utils/deepCompare';

import { useDebounceConfig } from '../../context/DebounceProvider';
import { useOnePayload } from '../../context/PayloadProvider';
import { useOneState } from '../../context/StateProvider';

import useDebounce from '../../hooks/useDebounce';

import useMediaContext from '../../../../hooks/useMediaContext';
import useManagedStyle from '../../hooks/useManagedStyle';
import useManagedCompute from './hooks/useManagedCompute';
import useSubject from '../../../../hooks/useSubject';
import useFieldMemory from './hooks/useFieldMemory';
import useFieldState from './hooks/useFieldState';
import useFieldGuard from './hooks/useFieldGuard';

import IAnything from '../../../../model/IAnything';
import IManaged from '../../../../model/IManaged';
import IEntity from '../../../../model/IEntity';
import IField, { Value } from '../../../../model/IField';

import cancelable, { CANCELED_SYMBOL } from '../../../../utils/hof/cancelable';
import queued from '../../../../utils/hof/queued';
import sleep from '../../../../utils/sleep';

import Subject from '../../../../utils/rx/Subject';

import nameToTitle from '../../helpers/nameToTitle';

import OneConfig, { GET_REF_SYMBOL } from '../OneConfig';

const APPLY_ATTEMPTS = 35;
const APPLY_DELAY = 10;

const defaultStyles = {
    paddingRight: 8,
    paddingBottom: 8,
} as const;

/**
 * Represents the configuration options for makeField hoc.
 *
 * @template Data - The type of data the configuration will handle.
 */
interface IConfig<Data = IAnything> {
    withApplyQueue?: boolean;
    skipDebounce?: boolean;
    skipDirtyPressListener?: boolean;
    skipFocusReadonly?: boolean;
    skipFocusBlurCall?: boolean;
    skipPressListener?: boolean;
    defaultProps?: Partial<Omit<IField<Data>, keyof {
        fields: never;
        child: never;
    }>>;
}

/**
 * Represents the configuration options for making changes.
 * @interface
 */
interface IChangeConfig {
    skipReadonly?: boolean;
}

const changeFocusSubject = new Subject<void>();

const DEFAULT_CHANGE = (v: IAnything) => console.log({ v });
const DEFAULT_FALLBACK = () => null;
const DEFAULT_READY = () => null;
const DEFAULT_MAP = (data: IAnything) => data;
const DEFAULT_PRESS = () => {};
const DEFAULT_READTRANSFORM = (value: Value) => value;
const DEFAULT_WRITETRANSFORM = (value: Value) => value;

/**
 * - Оборачивает IEntity в удобную абстракцию IManaged, где сразу
 *   представлены invalid, disabled, visible и можно задваивать вызов onChange
 * - Управляет фокусировкой, мануально ожидая потерю фокуса, эмулируя onBlur
 */
export function makeField(
    originalComponent: React.FC<IManaged>,
    fieldConfig: IConfig = {
        withApplyQueue: false,
        skipDirtyPressListener: false,
        skipPressListener: false,
        skipFocusReadonly: false,
        skipFocusBlurCall: false,
        skipDebounce: false,
        defaultProps: { },
    },
) {
    const Component = memo(originalComponent) as unknown as React.FC<IManaged>;
    const oneConfig = OneConfig[GET_REF_SYMBOL]();
    const component = <Data extends IAnything = IAnything>({
        style,
        phoneStyle,
        tabletStyle,
        desktopStyle,
        phoneHidden: upperPhoneHidden = false,
        tabletHidden: upperTabletHidden = false,
        desktopHidden: upperDesktopHidden = false,
        isDisabled: isDisabledUpper,
        isVisible: isVisibleUpper,
        isInvalid: isInvalidUpper,
        isIncorrect: isIncorrectUpper,
        isReadonly: isReadonlyUpper,
        readTransform = DEFAULT_READTRANSFORM,
        writeTransform = DEFAULT_WRITETRANSFORM,
        change = DEFAULT_CHANGE,
        fallback = DEFAULT_FALLBACK,
        ready = DEFAULT_READY,
        compute: upperCompute,
        shouldRecompute,
        press = DEFAULT_PRESS,
        map = DEFAULT_MAP,
        object: upperObject,
        name = '',
        title = nameToTitle(name) || undefined,
        debug,
        focus,
        blur,
        invalidity,
        prefix,
        dirty: upperDirty = false,
        disabled: fieldDisabled = false,
        readonly: upperReadonly = false,
        testId = name,
        ...otherProps
    }: IEntity<Data>) => {
        const { isPhone = false, isTablet = false, isDesktop = false } = useMediaContext(oneConfig.BREAKPOINTS);

        const { object: stateObject, changeObject } = useOneState<Data>();
        const payload = useOnePayload();

        const {
            isDisabled,
            isVisible,
            isInvalid,
            isIncorrect,
            isReadonly,
        } = useFieldGuard({
            prefix,
            name,
            isDisabled: isDisabledUpper,
            isVisible: isVisibleUpper,
            isInvalid: isInvalidUpper,
            isIncorrect: isIncorrectUpper,
            isReadonly: isReadonlyUpper,
        });

        const object = stateObject || upperObject;

        const focusSubject = useSubject<void>();
        const blurSubject = useSubject<void>();

        const compute = useManagedCompute({
            compute: upperCompute,
            object,
            payload,
            shouldRecompute,
        });

        const {
            state: {
                phoneHidden,
                tabletHidden,
                desktopHidden,
                dirty,
                disabled,
                fieldReadonly,
                focusReadonly,
                invalid,
                incorrect,
                loading,
                value,
                visible,
            },
            action: {
                setDirty,
                setDisabled,
                setFieldReadonly,
                setFocusReadonly,
                setInvalid,
                setIncorrect,
                setLoading,
                setValue: setValueAction,
                setVisible,
            },
        } = useFieldState({
            dirty: upperDirty,
        }, {
            compute,
            readTransform,
            config: oneConfig,
            name,
            object,
            payload,
            isVisible,
            isDisabled,
            isInvalid,
            isIncorrect,
            isReadonly,
            phoneHidden: upperPhoneHidden,
            tabletHidden: upperTabletHidden,
            desktopHidden: upperDesktopHidden,
        });

        const debounceSpeed = useDebounceConfig(oneConfig);

        const [debouncedValue, { pending, flush }] = useDebounce(
            value,
            fieldConfig.skipDebounce ? 0 : debounceSpeed
        );

        const { memory } = useFieldMemory({
            prefix,
            name,
            pressDisabled: fieldDisabled || disabled,
            lastDebouncedValue: debouncedValue,
            debouncedValue$: debouncedValue,
            fieldReadonly$: fieldReadonly,
            focusReadonly$: focusReadonly,
            invalid$: invalid,
            object$: object,
            upperReadonly$: upperReadonly,
            value$: value,
        })

        /**
         * После первого вызова setValue мы должны начать
         * проверять входящую валидацию
         */
        const setValue = useCallback((value: Value) => {
            setValueAction(value);
            memory.initComplete = true;
        }, []);

        /**
         * Флаг дизмонтирования компонента, удобен для работы с промисами,
         * можно выпилить
         */
        oneConfig.WITH_DISMOUNT_LISTENER && useLayoutEffect(() => () => {
            memory.isMounted = false;
        }, []);

        /**
         * Если пользователь нажал Tab, следует
         * применить изменения
         */
        oneConfig.WITH_WAIT_FOR_TAB_LISTENER && useEffect(() => changeFocusSubject.subscribe(() => {
            if (pending()) {
                flush();
            }
        }), []);

        /**
         * Коллбек входящего изменения.
         */
        const handleIncomingObject = useCallback(() => {
            const { invalid$: invalid } = memory;
            const { object$: object } = memory;
            const { value$: value } = memory;
            const wasInvalid = !!invalid;
            memory.objectUpdate = true;
            memory.inputUpdate = false;
            if (compute) {
                const visible = isVisible(object, payload);
                const result = visible ? compute(object, payload) : false;
                if (result instanceof Promise) {
                    setLoading(true)
                    result
                        .then((value) => memory.isMounted && setValue(value))
                        .catch((e) => memory.isMounted && fallback(e))
                        .finally(() => memory.isMounted && setLoading(false));
                } else {
                    setValue(result);
                }
                const disabled = isDisabled(object, payload);
                const readonly = isReadonly(object, payload);
                const invalid = isInvalid(object, payload) || null;
                const incorrect = isIncorrect(object, payload) || null;
                setFieldReadonly(readonly);
                setInvalid(invalid);
                setIncorrect(incorrect);
                setDisabled(disabled);
                setVisible(visible);
            } else if (!name) {
                const disabled = isDisabled(object, payload);
                const visible = isVisible(object, payload);
                const readonly = isReadonly(object, payload);
                setFieldReadonly(readonly);
                setDisabled(disabled);
                setVisible(visible);
            } else {
                const disabled = isDisabled(object, payload);
                const visible = isVisible(object, payload);
                const invalid = isInvalid(object, payload) || null;
                const incorrect = isIncorrect(object, payload) || null;
                const readonly = isReadonly(object, payload);
                const newValue = readTransform(get(object, name), name, object, payload);
                let isOk: boolean = newValue !== value;
                isOk = isOk && !wasInvalid;
                if (isOk) {
                    memory.inputUpdate = true;
                    setValue(newValue);
                    setInvalid(invalid);
                    invalid !== null && invalidity(name, invalid, payload);
                    change(object, {
                        [memory.fieldName]: !!invalid,
                    });
                }
                setFieldReadonly(readonly);
                setIncorrect(incorrect);
                setDisabled(disabled);
                setVisible(visible);
            }
            /**
             * Отображаем форму только после отклика всех
             * полей
             */
            ready();
        }, [object]);

        /**
         * Коллбек исходящего изменения
         */
        const handleOutgoingObject = useCallback(() => {
            const { debouncedValue$: debouncedValue } = memory;
            const { invalid$: invalid } = memory;
            const { object$: object } = memory;
            const wasInvalid = !!invalid;
            if (memory.inputUpdate) {
                memory.inputUpdate = false;
            } else if (memory.objectUpdate) {
                memory.objectUpdate = false;
            } else if (compute) {
                return;
            } else {
                const copy = deepClone(object);
                const check = set(copy, name, writeTransform(debouncedValue, name, object, payload));
                const invalid = isInvalid(copy, payload) || null;
                const incorrect = isIncorrect(copy, payload) || null;
                setInvalid(invalid);
                setIncorrect(incorrect);
                setDirty(true);
                if (!name) {
                    return;
                } else if (!check) {
                    throw new Error(`One error invalid name specified "${name}"`);
                } else if (invalid !== null) {
                    invalidity(name, invalid, payload);
                    change(copy, {
                        [memory.fieldName]: !!invalid,
                    });
                } else if (!deepCompare(object, copy) || wasInvalid) {
                    change(fieldConfig.skipDebounce ? map(copy, payload) : copy, {
                        [memory.fieldName]: !!invalid,
                    });
                }
            }
        }, []);

        /**
         * Коллбек входящей валидации, триггер из другого поля
         */
        const handleWasInvalid = useCallback(() => {
            if (!memory.initComplete) {
                return;
            }
            if (memory.inputUpdate) {
                return;
            }
            const { invalid$: wasInvalid, value$, object$ } = memory;
            const copy = deepClone(object$);
            set(copy, name, writeTransform(value$, name, object$, payload));
            const invalid = isInvalid(copy, payload) || null;
            const incorrect = isIncorrect(copy, payload) || null;
            if (!invalid && wasInvalid) {
                setInvalid(invalid);
                change(fieldConfig.skipDebounce ? map(copy, payload) : copy, {
                    [memory.fieldName]: !!invalid,
                });
            }
            if (invalid && !wasInvalid) {
                setInvalid(invalid);
                change(object$, {
                    [memory.fieldName]: !!invalid,
                });
            }
            setIncorrect(incorrect);
        }, []);

        /**
         * Очередь применения изменений из объекта формы. Если прилетело
         * изменение до сабмита текущего значения, применяем незамедлительно
         */
        useEffect(() => {
            /**
             * Если в очереди изменение, данный код осуществит слияние изменений.
             * На следующей итерации отработает handleOutgoingObject, который получит
             * последний целевой объект по ссылке
             */
            if (pending()) {
                flush();
                return;
            }
            if (memory.lastDebouncedValue === debouncedValue) {
                handleIncomingObject();
                handleWasInvalid();
            }
            handleOutgoingObject();
            memory.lastDebouncedValue = debouncedValue;
        }, [debouncedValue, object]);

        /**
         * Если всплытие события клика не сработает, флаг dirty уберется при
         * первом изменени значения
         */
        oneConfig.WITH_DIRTY_PRESS_LISTENER && useEffect(() => {
            if (!fieldConfig.skipDirtyPressListener) {
                return focusSubject.once(() => setDirty(true));
            }
            return undefined;
        }, []);

        /**
         * При редактировании больших форм изменение целевого объекта
         * может произойти между исполнением хука входящего и исходящего изменения
         */
        const waitForApply = useCallback(async () => {
            for (let i = 0; i !== APPLY_ATTEMPTS; i++) {
                if (!memory.inputUpdate && !memory.objectUpdate) {
                    break;
                }
                sleep(APPLY_DELAY);
            }
        }, []);

        /**
         * Позволяет отменить ожидание, применив к форме актуальное
         * значение поля ввода
         */
        const waitForApplyOrCancel = useMemo(() => cancelable(async () => {
            await waitForApply();
            return true;
        }), []);

        /**
         * Блокирует применение изменений,
         * если поле вычисляемое или только
         * на чтение
         */
        const handleChange = useMemo(() => queued(async (newValue: Value, config: IChangeConfig = {}) => {
            if (fieldConfig.withApplyQueue) {
                await waitForApplyOrCancel().then((result) => {
                    if (result !== CANCELED_SYMBOL) {
                        handleChangeSync(newValue, config);
                    }
                });
                return;
            }
            return handleChangeSync(newValue, config);
        }), []);

        /**
         * Для сохранения позиции курсора текстовых полей
         * ОБЯЗАТЕЛЬНО нужно вызывать setState вне контекста
         * промиса, так как полифил при сборке бандла использует
         * функцию генератор
         */
        const handleChangeSync = useCallback((newValue: Value, {
            skipReadonly,
        }: IChangeConfig = {}) => {
            const { fieldReadonly$: fieldReadonly } = memory;
            const { upperReadonly$: upperReadonly } = memory;
            if (memory.inputUpdate) {
                return;
            }
            if (memory.objectUpdate) {
                return;
            }
            if (!memory.isMounted) {
                return;
            }
            if (fieldReadonly && !skipReadonly) {
                return;
            }
            if (upperReadonly && !skipReadonly) {
                return;
            }
            if (compute && !skipReadonly) {
                return;
            }
            setValue(newValue);
        }, []);

        /**
         * Запускает механизм вещания фокусировки,
         * использует полифил для ожидания потери
         * фокуса
         */
        const handleFocus = useCallback(() => {
            const { fieldReadonly$: fieldReadonly } = memory;
            const { upperReadonly$: upperReadonly } = memory;
            if (!memory.isMounted) {
                return;
            }
            changeFocusSubject.next();
            if (!fieldReadonly && !upperReadonly) {
                setFocusReadonly(false);
            }
            if (!fieldConfig.skipFocusBlurCall) {
                blurSubject.once(() => {
                    if (pending()) {
                        flush();
                    }
                    if (blur) {
                        blur(name, memory.object$, payload, (value) => managedProps.onChange(value, {
                            skipReadonly: true,
                        }), changeObject);
                    }
                    setFocusReadonly(true);
                })
                if (focus) {
                    focus(name, memory.object$, payload, (value) => managedProps.onChange(value, {
                        skipReadonly: true,
                    }), changeObject);
                }
            }
        }, []);

        /**
         * Подписка на событие фокуса для поддержки dirty
         */
        useEffect(() => focusSubject.subscribe(handleFocus), []);

        /**
         * Коллбек для перехвата клика из поля. Используется только
         * для FieldType.Button и FieldType.Icon
         */
        const handleExternalPress = useCallback(async () => {
            if (memory.pressDisabled) {
                return;
            }
            await press(name, memory.object$, payload, (value) => managedProps.onChange(value, {
                skipReadonly: true,
            }), changeObject);
        }, []);

        const computedStyle = useManagedStyle(
            {
              isPhone,
              isTablet,
              isDesktop,
            },
            {
              style,
              phoneStyle,
              tabletStyle,
              desktopStyle,
            },
            defaultStyles,
        );

        const computeReadonly = useCallback(() => {
            const { fieldReadonly$: fieldReadonly } = memory;
            const { upperReadonly$: upperReadonly } = memory;
            const { focusReadonly$: focusReadonly } = memory;
            let isReadonly = false;
            isReadonly = isReadonly || upperReadonly;
            if (!fieldConfig.skipFocusReadonly) {
                isReadonly = isReadonly || focusReadonly;
            }
            isReadonly = isReadonly || fieldReadonly;
            isReadonly = isReadonly || !!compute;
            return isReadonly;
        }, []);

        const computeFieldReadonly = useCallback(() => {
            const { fieldReadonly$: fieldReadonly } = memory;
            const { upperReadonly$: upperReadonly } = memory;
            let isReadonly = false;
            isReadonly = isReadonly || upperReadonly;
            isReadonly = isReadonly || fieldReadonly;
            isReadonly = isReadonly || !!compute;
            return isReadonly;
        }, []);

        const managedProps: IManaged<Data> = {
            onChange: fieldConfig.withApplyQueue ? handleChange : handleChangeSync,
            onFocus: () => focusSubject.next(),
            onBlur: () => blurSubject.next(),
            press: handleExternalPress,
            fallback,
            disabled: fieldDisabled || disabled,
            readonly: computeReadonly(),
            dirty: dirty || upperDirty,
            style: computedStyle,
            invalid,
            incorrect,
            value,
            name,
            loading,
            object,
            prefix,
            testId,
            ...otherProps,
            fieldReadonly: computeFieldReadonly(),
        };

        /**
         * Коллбек для отладки
         */
        debug && debug({
            managedProps,
            originalComponent,
            payload,
        });

        const componentProps = {
            ...fieldConfig.defaultProps,
            ...managedProps,
            ...title && { title },
        };

        if (!visible) {
            return null;
        }

        if (phoneHidden && isPhone) {
            return null;
        }

        if (tabletHidden && isTablet) {
            return null;
        }

        if (desktopHidden && isDesktop) {
            return null;
        }

        return (
            <Component {...componentProps as IManaged} />
        );
    };

    component.displayName = `Managed${originalComponent.displayName || 'UnknownField'}`;

    return memo(component) as typeof component;
}

export default makeField;
