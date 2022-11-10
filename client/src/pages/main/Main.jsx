import React from 'react';
import { useSelector } from 'react-redux';
import MainLog from '../../components/MainLog/MainLog';
import MainNoLog from '../../components/MainNoLog/MainNoLog';

export default function Main() {
  const user = useSelector((state) => state.user);
  return (
    <div>
      {user.login ? <MainLog /> : <MainNoLog />}
    </div>
  );
}
