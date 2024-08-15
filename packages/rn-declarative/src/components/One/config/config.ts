import IFieldMargins from "../../../model/IFieldMargins";
import IRootMargins from "../../../model/IRootMargins";

import { BREAKPOINTS } from "../../../hooks/useMediaContext";

export const FIELD_DEBOUNCE = 400;

export const DEFAULT_MARGINS: IFieldMargins = {
    mb: 8,
    mr: 8,
};

export const DEFAULT_ROOT_MARGINS: IRootMargins = {
    mt: 8,
    ml: 8,
};

export const DEFAULT_BREAKPOINTS = BREAKPOINTS;
