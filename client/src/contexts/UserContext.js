import { createContext } from "react";

// `createContext` does not take initial value - it takes the value that is provided when you try to use this context with no provider.

export const UserContext = createContext(null);
