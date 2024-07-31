import * as React from "react";

import FieldType from "../../../model/FieldType";
import IAnything from "../../../model/IAnything";
import IEntity from "../../../model/IEntity";

import GroupLayout from "../layouts/GroupLayout";
import FragmentLayout from "../layouts/FragmentLayout";
import ConditionLayout from "../layouts/ConditionLayout";
import CustomLayout from "../layouts/CustomLayout";

type Layout = (props: React.PropsWithChildren<IEntity>) => React.ReactElement;

const layoutMap: { [key in FieldType]?: Layout } = Object.create(null);

/**
 * Variable to map field types to corresponding layout classes.
 *
 * @typedef FieldTypeMap
 * @property FieldType.Group - Group layout class.
 * @property FieldType.Fragment - Fragment layout class.
 * @property FieldType.Condition - Condition layout class.
 * @property FieldType.Layout - Custom layout class.
 */
Object.assign(layoutMap, {
  [FieldType.Group]: GroupLayout,
  [FieldType.Fragment]: FragmentLayout,
  [FieldType.Condition]: ConditionLayout,
  [FieldType.Layout]: CustomLayout,
});

/**
 * Фабрика для создания компоновок
 */
export const createLayout = <Data extends IAnything = IAnything>(
  entity: IEntity<Data>,
  children: React.ReactNode,
  currentPath = ""
) => {
  const { type } = entity;
  let Layout: Layout | undefined;
  if ((Layout = layoutMap[type])) {
    return (
      <Layout {...entity} key={currentPath}>
        {children}
      </Layout>
    );
  } else {
    throw new Error("FieldFactory unknown key type");
  }
};

export default createLayout;
