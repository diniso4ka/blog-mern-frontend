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

  const fetchData = async () => {
    try {
      const res = await axios.get(`/posts/${id}`)
      setData(res.data)
      setIsLoading(false)
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
            data.user.imgUrl ? data.user.imgUrl : "https://res.cloudinary.com/practicaldev/image/fetch/s--uigxYVRB--/c_fill,f_auto,fl_progressive,h_50,q_auto,w_50/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/187971/a5359a24-b652-46be-8898-2c5df32aa6e0.png",
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
        items={[
          {
            user: {
              fullName: "Вася Пупкин",
              avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
            },
            text: "Это тестовый комментарий 555555",
          },
          {
            user: {
              fullName: "Иван Иванов",
              avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
            },
            text: "When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top",
          },
        ]}
        isLoading={false}
      >
        <Index />
      </CommentsBlock>
    </>
  );
};
