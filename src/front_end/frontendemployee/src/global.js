// globals.js

// Define your global variable
const userId = "";

export const getGlobalVariable = () => userId;

export const setGlobalVariable = (value) => {
    userId = value;
};
// Export the variable
export default userId;
