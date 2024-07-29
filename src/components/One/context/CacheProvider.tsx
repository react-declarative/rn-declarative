import * as React from "react";
import { useContext, useMemo, useEffect } from "react";
import { createContext } from "react";

import IField from "../../../model/IField";

/**
 * An interface representing a context that holds mappings between fields and their corresponding values.
 *
 * @interface IContext
 */
interface IContext {
  focusMap: Map<IField, IField['focus']>;
  blurMap: Map<IField, IField['blur']>;
  pressMap: Map<IField, IField['press']>;
  fieldsMap: Map<IField[], IField[]>;
  statefullMap: Map<IField[], number>;
  trMap: Map<IField, IField['tr']>;
  itemListMap: Map<IField, IField['itemList']>;
}

const CacheContext = createContext<IContext>(null as never);

/**
 * Represents the properties for the CacheProvider component.
 */
interface ICacheProviderProps {
  children: React.ReactNode;
}

/**
 * Represents a cache provider used for memoization.
 *
 * @typedef CacheProvider
 * @property cacheMap - Represents a cache map used for memoization.
 * @property cacheMap.focusMap - Map for focusing fields.
 * @property cacheMap.blurMap - Map for blurring fields.
 * @property cacheMap.menuMap - Map for field menus.
 * @property cacheMap.pressMap - Map for field press events.
 * @property cacheMap.fieldsMap - Map for field arrays.
 * @property cacheMap.statefullMap - Map for stateful fields.
 * @property cacheMap.trMap - Map for translational fields.
 * @property cacheMap.itemListMap - Map for items list updates.
 */
export const CacheProvider = ({ children }: ICacheProviderProps) => {
  /**
   * Represents a cache map used for memoization.
   *
   * @typedef CacheMap
   * @property focusMap - Map for focusing fields.
   * @property blurMap - Map for blurring fields.
   * @property fieldsMap - Map for field arrays.
   * @property statefullMap - Map for stateful fields.
   * @property trMap - Map for translational fields.
   * @property itemListMap - Map for items list updates.
   */
  const cacheMap = useMemo((): IContext => {
    const fnMap = Object.create(null);
    Object.assign(fnMap, {
      focusMap: new Map<IField, IField['focus']>(),
      blurMap: new Map<IField, IField['blur']>(),
      pressMap: new Map<IField, IField['press']>(),
      fieldsMap: new Map<IField[], IField[]>(),
      statefullMap: new Map<IField[], number>(),
      trMap: new Map<IField, IField['tr']>(),
      itemListMap: new Map<IField, IField['shouldUpdateItemList']>(),
    });
    return fnMap;
  }, []);
  useEffect(() => () => Object.values(cacheMap).forEach((cache) => {
    cache.clear()
  }), []);
  return (
    <CacheContext.Provider value={cacheMap}>
      {children}
    </CacheContext.Provider>
  );
};

export const useOneCache = () => useContext(CacheContext);

export default CacheProvider;
