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
      console.info(`[Auth] ${message}`, data || '');
    }
  }
};

function logError(error: { message: string; code?: string }) {
  // ...
}

// Or if the structure is not known, use `unknown`
function logError(error: unknown) {
  // ...
}

const someFunction = (param: SpecificType) => {
  // ...
};

// Remove this line if `someFunction` is not used
// const someFunction = (param: SpecificType) => { ... };