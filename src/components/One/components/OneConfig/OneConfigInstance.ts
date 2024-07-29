import { IBreakpoints } from "../../../../hooks/useMediaContext";

import { FIELD_DEBOUNCE } from "../../config/config";

/**
 * Represents a configuration object for the one component.
 *
 * @interface IConfig
 */
export interface IConfig {
    WITH_WAIT_FOR_TAB_LISTENER: boolean;
    WITH_DIRTY_PRESS_LISTENER: boolean;
    WITH_DISMOUNT_LISTENER: boolean;
    WITH_SYNC_COMPUTE: boolean;
    CUSTOM_FIELD_DEBOUNCE: number;
    BREAKPOINTS: IBreakpoints | undefined;
}

/**
 * Represents the initial configuration for a software module.
 * @typedef IConfig
 * @property WITH_DIRTY_PRESS_LISTENER - Whether to include a dirty press listener in the module. Default is true.
 * @property WITH_MOBILE_READONLY_FALLBACK - Whether to include a mobile readonly fallback in the module. Default is true.
 * @property WITH_WAIT_FOR_MOVE_LISTENER - Whether to include a wait for move listener in the module. Default is true.
 * @property WITH_WAIT_FOR_TAB_LISTENER - Whether to include a wait for tab listener in the module. Default is true.
 * @property WITH_WAIT_FOR_TOUCH_LISTENER - Whether to include a wait for touch listener in the module. Default is true.
 * @property WITH_DISMOUNT_LISTENER - Whether to include a dismount listener in the module. Default is true.
 * @property WITH_SYNC_COMPUTE - Whether to include a sync compute feature in the module. Default is false.
 * @property CUSTOM_FIELD_DEBOUNCE - The custom field debounce time for the module. Default is FIELD_DEBOUNCE.
 * @property FIELD_BLUR_DEBOUNCE - The field blur debounce time for the module. Default is BLUR_DEBOUNCE.
 */
const INITIAL_CONFIG: IConfig = {
    WITH_WAIT_FOR_TAB_LISTENER: true,
    WITH_DIRTY_PRESS_LISTENER: true,
    WITH_DISMOUNT_LISTENER: true,
    WITH_SYNC_COMPUTE: false,
    CUSTOM_FIELD_DEBOUNCE: FIELD_DEBOUNCE,
    BREAKPOINTS: undefined,
};

/**
 * Class representing a OneConfigInstance.
 * @class
 */
export class OneConfigInstance {
    private _config: IConfig = INITIAL_CONFIG;
    getRef = () => this._config;
    setValue = (config: Partial<IConfig>) => {
        Object.assign(this._config, INITIAL_CONFIG, config);
    };
};

export default OneConfigInstance;
