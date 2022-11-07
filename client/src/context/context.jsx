import React, { createContext } from 'react';

const mapsSizeContext = createContext();

function mapsSizeContextProvider({ children }) {
  return (
    <mapsSizeContext.Provider value={{

    }}
    >
      {children}
    </mapsSizeContext.Provider>
  );
}

export { mapsSizeContext };
export default mapsSizeContextProvider;
