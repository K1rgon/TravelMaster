/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import style from './Comments.module.css';

export default function Comments({ id }) {
  const user = useSelector((store) => store.user);
  const [commentList, setCommentList] = useState([]);
  const [message, setMessage] = useState({ text: '', user_id: user.id });

  const getComments = async () => {
    const res = await fetch('http://localhost:3001/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
        message,
      }),
      credentials: 'include',
    });
    const toJson = await res.json();
    setCommentList(toJson);
  };

  useEffect(() => {
    getComments();
  }, []);
  console.log(commentList);

  const messageHandler = (e) => {
    setMessage((prev) => ({ ...prev, [e.target.name]: e.target.value, user_id: user.id }));
  };

  const sendMessage = (e) => {
    e.preventDefault();
    getComments();
    setMessage({ text: '', user_id: id });
  };

  return (
    <div className={style.box}>
      <div className={style.commentlist}>
        {commentList.length
          ? (
            <div className={style.comments}>
              {commentList.map((comment) => (
                <div className={style.item} key={comment.id}>
                  {`${comment.User.login} ${new Date(comment.createdAt).toLocaleString()}`}
                  <br />
                  {comment.text}
                </div>
              ))}
            </div>
          )
          : <div>К этой поездке еще не никто не оставил комментарий</div>}
      </div>
      {user.login
        ? (
          <div className={style.blockmMessage}>
            <p>Оставить коментарий</p>
            <input onChange={(e) => messageHandler(e)} name="text" type="text" placeholder="Введите текст комментария" />
            <button type="submit" onClick={(e) => sendMessage(e)} className={style.btn}><span>Отправить</span></button>
          </div>
        )
        : <div>Для того чтобы оставить комментарий нужно авторизоваться</div>}
    </div>
  );
}
