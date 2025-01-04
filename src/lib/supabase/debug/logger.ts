export const authLogger = {
  debug: (message: string, ...args: any[]) => {
    if (import.meta.env.DEV) {
      console.debug(`[Auth] ${message}`, ...args);
    }
  },

  error: (message: string, error?: unknown) => {
    console.error(`[Auth Error] ${message}`, error);
  },

  info: (message: string, data?: any) => {
    if (import.meta.env.DEV) {
      console.info(`[Auth] ${message}`, data || "");
    }
  },
};

// Define or import SpecificType
type SpecificType = {
  id: string;
  name: string;
};

// Replace `any` with a specific type
const logMessage = (message: string) => {
  console.log(message);
};

// Remove or use the `logError` variable if it is declared but never used
const logError = (error: Error) => {
  console.error(error);
};

// Example usage to avoid the `no-unused-vars` error
const exampleError = new Error("An error occurred");
logError(exampleError);

// Example usage to avoid the `no-unused-vars` error
const exampleData: SpecificType = { id: "1", name: "Example" };
const someFunction = (data: SpecificType) => {
  console.log(data);
};

someFunction(exampleData);
