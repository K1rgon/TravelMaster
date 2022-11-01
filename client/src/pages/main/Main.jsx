import React from 'react';
import MainLog from '../../components/MainLog/MainLog';
import MainNoLog from '../../components/MainNoLog/MainNoLog';

export default function Main() {
  const login = false; // брать переменную нужно из стейта
  return (
    <div>
      {login === true ? <MainLog /> : <MainNoLog />}
    </div>
  );
}
