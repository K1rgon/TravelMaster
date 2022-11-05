import React, { useState } from 'react';
import Button from 'react-bootstrap/esm/Button';
import CreateRoute from '../CreateRoute/CreateRoute';

export default function UserRoutes() {
  const [modalShow, setModalShow] = useState(false);
  return (
    <>
      <Button variant="success" onClick={() => setModalShow(true)}>
        New Route
      </Button>

      <CreateRoute
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}
