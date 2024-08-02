/**
 * Represents a Node in a tree structure.
 */
export interface ITreeNode {
    label: string;
    value: string;
    /**
     * Represents an array of child nodes excluding the "child" property (recursion).
     *
     * @typedef ChildArray
     */
    child?: Omit<ITreeNode, "child">[];
}

export default ITreeNode;
