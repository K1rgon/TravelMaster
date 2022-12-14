import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import style from './Personal.module.css';
import image from '../../image/user.png';
import { routesInit } from '../../store/route/actions';

export default function Personal() {
  const user = useSelector((store) => store.user);
  const [userInfo, setUser] = useState(user);
  const [isShow, setIsShow] = useState(false);
  const [carInfo, setCarInfo] = useState({
    brand: '', model: '', year: '', fuel: '',
  });
  const [allCars, setAllCars] = useState([]);
  const dispatch = useDispatch();
  const routes = useSelector((store) => store.route);
  console.log(routes);
  const updateUser = async (data) => {
    const res = await fetch('http://localhost:3001/user/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: user.id,
        foto: data,
      }),
      credentials: 'include',
    });
    const toJson = await res.json();
  };

  const getCars = async () => {
    const res = await fetch('http://localhost:3001/car/new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...carInfo, id: user.id }),
    });
    const toJson = await res.json();
    setAllCars(toJson);
  };

  const trigerInput = () => document.querySelector('#imageFile').click();

  const formNewCarHandler = (e) => {
    setCarInfo((preMy) => ({ ...preMy, [e.target.name]: e.target.value }));
  };

  const formPostHandler = (e) => {
    e.preventDefault();
    getCars();
    setIsShow(false);
    console.log(carInfo);
  };

  useEffect(() => {
    dispatch(routesInit());
    getCars();
  }, []);

  const inputFotoHandler = (e) => {
    const { files } = e.target;
    if (files[0].type.match('image')) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setUser((preMy) => ({ ...preMy, foto: ev.target.result }));
        updateUser(ev.target.result);
      };
      reader.readAsDataURL(files[0]);
    } else {
      // eslint-disable-next-line no-alert
      alert('???????????????? ???????? ?????????????? ????????');
    }
  };

  return (
    <div className={style.block}>
      <div className={style.blockleft}>
        <img className={style.imageprofile} src={userInfo.foto || image} width="200px" height="200px" alt="???????? ???? ?????????????? ??????????????????" />
        <input className={style.btninput} id="imageFile" type="file" accept="image/*" onChange={(e) => inputFotoHandler(e)} />
        <button className={style.btnselect} type="button" onClick={() => trigerInput()}>?????????????????? ?????????? ????????</button>
        <div className={style.userphoto} />
        <div className={style.username}>{`${userInfo.name} ${userInfo.surname}`}</div>
        <div className={style.username}>
          {' '}
          ???????? ??????????:
          {`${user.email}`}
        </div>
      </div>
      <div className={style.blockright}>
        <div className={style.routes}>
          ???????? ????????????????
          {routes.map((rout, index) => (
            <Link className={style.rout} to={`/publicroutes/${rout.id}`} id={index}>{`???????????????? ???????????????? : ${rout.title ? rout.title : '???????????????? ??????'} , ???????????? : ${rout.done ? '????????????????' : '????????????????????'}`}</Link>
          ))}
        </div>
        <div className={style.cars}>
          <p>?????? ??????????</p>
          <button type="button" onClick={() => setIsShow(!isShow)}>???????????????? ?????????? ????????????</button>
          {isShow
            ? (
              <form method="POST" id="form">
                <input onChange={(e) => formNewCarHandler(e)} placeholder="??????????" type="text" id="brand" name="brand" />
                <input onChange={(e) => formNewCarHandler(e)} placeholder="????????????" type="text" id="model" name="model" />
                <input onChange={(e) => formNewCarHandler(e)} placeholder="?????? ??????????????" type="text" id="year" name="year" />
                <input onChange={(e) => formNewCarHandler(e)} placeholder="???????????? ??????????????" type="text" id="fuel" name="fuel" />
                <button onClick={(e) => formPostHandler(e)} type="submit" form="form">?????????????????? ?????????? ????????????</button>
              </form>
            )
            : (
              <>
                {allCars.map((car, index) => (
                  <div className={style.car} id={index}>{`?????????? : ${car.brand} ????????????: ${car.model} , ?????? ?????????????? : ${car.year}`}</div>
                ))}
              </>
            )}

        </div>
      </div>
    </div>

  );
}
