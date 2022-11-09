import React from 'react';
import { useParams } from 'react-router-dom';
import Navigation from '../../components/navigation/Navigation';
import RouterItemPublick from '../../components/routes/RouterItemPublic';

export default function RoutePagePublic() {
  const { id } = useParams();
  return (
    <div>
      <Navigation />
      <RouterItemPublick id={id} />
    </div>
  );
}
