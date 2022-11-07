/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { newRoute } from '../../store/route/actions';
import Maps from '../Maps/Maps';
import './modal.css';

// eslint-disable-next-line react/prop-types
export default function MyModal({ active, onHide }) {
  const [route, setRoute] = useState({
    title: '', description: '', date_start: '', photo: '',
  });
  const dispatch = useDispatch();

  const inputHandler = (e) => {
    setRoute((preMy) => ({ ...preMy, [e.target.name]: e.target.value }));
  };

  const addRoute = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:3001/api/v1/routes/add', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        title: route.title,
        description: route.description,
        date_start: route.date_start,
        foto: route.photo,
      }),
      credentials: 'include',
    });
    const toJson = await res.json();
    console.log(toJson);
    dispatch(newRoute(toJson));
    onHide();
  };

  const sizeMap = {
    widthMap: '85vw',
    heightMap: '55vh',
    widthInput: '85vw',
    heightInput: '55vh',
  };
  return (
    <div className={active ? 'modal active' : 'modal'} onClick={(e) => onHide()} role="button" tabIndex={0}>
      <div className={active ? 'modal_content active' : 'modal_content'} onClick={(e) => e.stopPropagation()} role="button" tabIndex={0}>
        <div className="maps">
          <Maps sizeMap={sizeMap} />
        </div>
        <div className="input_group">
          <input
            onChange={(e) => inputHandler(e)}
            type="text"
            name="title"
          />
          <label>Название маршрута</label>
        </div>
        <div className="input_group">
          <input onChange={(e) => inputHandler(e)} type="text" name="description" />
          <label>Описание маршрута</label>
        </div>
        <div className="input_group">
          <input onChange={(e) => inputHandler(e)} type="date" name="date_start" />
        </div>
        <div className="input_group">
          <input onChange={(e) => inputHandler(e)} type="file" id="file" name="photo" placeholder="Загрузите фото" />
        </div>
        <button onClick={addRoute} type="submit">Send</button>
      </div>
    </div>
  );
}
