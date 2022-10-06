import React from "react";

import { Post } from "../../components/Post";
import { Index } from "../../components/AddComment";
import { CommentsBlock } from "../../components/CommentsBlock";
import { useParams } from 'react-router-dom';
import axios from '../../utils/axios';
import ReactMarkdown from 'react-markdown';

export const FullPost = () => {
  const { id } = useParams()
  const [data, setData] = React.useState()
  const [isLoading, setIsLoading] = React.useState(true)
  const [comments, setComments] = React.useState([])

  const fetchData = async () => {
    try {
      const res = await axios.get(`/posts/${id}`)
      const com = await axios.get(`/posts/${id}/comments`)
      setComments(com.data)
      setData(res.data)
      setIsLoading(false)
      console.log(comments)
    } catch (err) {
      console.log(err)
      alert('Ошибка при получении статьи')
    }
  }

  React.useEffect(() => {
    fetchData()
  }, [])

  if (isLoading) {
    return <Post isLoading={isLoading} />
  }

  return (
    <>
      <Post
        id={data._id}
        title={data.title}
        imgUrl={data.imgUrl ? `http://localhost:3333${data.imgUrl}` : ''}
        user={{
          avatarUrl:
            data.user.avatarUrl ? data.user.avatarUrl : "https://res.cloudinary.com/practicaldev/image/fetch/s--uigxYVRB--/c_fill,f_auto,fl_progressive,h_50,q_auto,w_50/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/187971/a5359a24-b652-46be-8898-2c5df32aa6e0.png",
          fullName: data.user.fullName,
        }}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        commentsCount={3}
        tags={data.tags}
        isFullPost
      >
        <ReactMarkdown children={data.text} />
      </Post>
      <CommentsBlock
        items={comments.filter((el) => id === el.postId)}
        isLoading={false}
      >
        <Index />
      </CommentsBlock>
    </>
  );
};
