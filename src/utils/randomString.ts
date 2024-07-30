/**
 * Generates a random string using the UUID library.
 *
 * @returns A randomly generated string.
 */
export const randomString = () => (Math.random() + 1).toString(36).substring(7);

export default randomString;
