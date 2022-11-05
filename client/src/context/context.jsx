import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

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
