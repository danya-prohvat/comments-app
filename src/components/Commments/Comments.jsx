import React from 'react';
import styles from "./Comments.module.scss";
import classNames from 'classnames';
import axios from "axios";
import {useEffect, useState} from "react";
import userIcon from '../../assets/userIcon.png'

const Comments = () => {
    const [url, setUrl] = useState('https://jordan.ashton.fashion/api/goods/30/comments?page=1');
    const [comments, setComments] = useState([]);
    const [pagination, setPagination] = useState([]);
    const [showBy, setShowBy] = useState(3);

    useEffect(() => {
        axios.get(url)
            .then(response => {
                console.log(response.data.data)
                setPagination(response.data.links)
                setComments(response.data.data)
                setShowBy(3)
            })
    }, [url])


    return (<div className={classNames(styles.comments)}>

        {/*commentSection*/}
        <div className={classNames(styles.comments__commentSection)}>
            {comments.map((comment, ind) => {

                {/*calculate date in yyyy-mm-dd*/}
                let newDate = new Date(comment.created_at)
                let date = (newDate.getDate() < 10 ? '0' + newDate.getDate() : newDate.getDate()) + ':' + (newDate.getMonth() < 10 ? '0' + newDate.getMonth() : newDate.getMonth()) + ':' + newDate.getFullYear();

                if (ind < showBy) return <div className={classNames(styles.comments__comment, styles.comment)}
                                                  key={comment.id}>
                    {/*comment*/}
                    <div className={classNames(styles.comment__authorData)}>
                        <div className={classNames(styles.comment__author)}>
                            <img src={userIcon} alt=""/>
                            <span className={classNames(styles.ffff)}>{comment.name}</span>
                        </div>
                        <span
                            className={classNames(styles.comment__date)}>{comments.length > 0 && date}
                        </span>
                    </div>
                    <span className={classNames(styles.comment__text)}>{comment.text}</span>
                    <br/>

                </div>
            })}

            {/*button.showMore*/}
            {showBy < comments.length &&
            <button className={classNames(styles.comments__showMore)} onClick={() => setShowBy(showBy + 3)}>Show
                more</button>}
        </div>

        {/*pagination*/}
        <ul className={classNames(styles.comments__paginationSection)}>
            {pagination.map((paginationItem, ind) => {
                if (ind === 0) return <li
                    className={classNames(styles.comments__arrow, {[styles.comments__arrow_disabled]: pagination[1].active})}
                    onClick={() => !pagination[1].active && setUrl(paginationItem.url)}
                    key={ind}>&laquo; previous</li>
                else if (ind === 14) return <li
                    className={classNames(styles.comments__arrow, {[styles.comments__arrow_disabled]: pagination[pagination.length - 2].active})}
                    onClick={() => !pagination[pagination.length - 2].active && setUrl(paginationItem.url)}
                    key={ind}>next &raquo;</li>
                else return <li
                        className={classNames(styles.comments__paginationItem, {[styles.comments__paginationItem_active]: paginationItem.active}, {[styles.comments__plug]: paginationItem.label === '...'})}
                        onClick={() => paginationItem.label !== '...' && setUrl(paginationItem.url)}
                        key={ind}>{paginationItem.label}</li>
            })}
        </ul>

    </div>);
}

export default Comments;