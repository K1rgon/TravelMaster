import React from 'react';
import { useParams } from 'react-router-dom';
import Navigation from '../../components/navigation/Navigation';
import RouterItem from '../../components/routes/RouterItem';

export default function RoutePage() {
  const { id } = useParams();
  return (
    <div>
      <Navigation />
      <RouterItem id={id} />
    </div>
  );
}
