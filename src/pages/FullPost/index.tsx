import React from "react";

import { Post } from "../../components/Post";
import { Index } from "../../components/AddComment";
import { CommentsBlock } from "../../components/CommentsBlock";
import { useParams } from "react-router-dom";
import axios from "../../utils/axios";
import ReactMarkdown from "react-markdown";
import { addComment } from "../../redux/slices/postsSlice/postsSlice";
import { useAppDispatch } from "../../redux/types";
import { Comments } from "../../redux/slices/postsSlice/types";

export const FullPost: React.FC = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const [data, setData] = React.useState();
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [comments, setComments] = React.useState<Comments[]>([]);
  const [rerender, setRerender] = React.useState<boolean>(true);

  const fetchData = async () => {
    try {
      const res = await axios.get(`/posts/${id}`);
      const com = await axios.get(`/posts/${id}/comments`);
      setComments(com.data);
      setData(res.data);
      dispatch(addComment(comments));
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      alert("Ошибка при получении статьи");
    }
  };

  const sendMessage = async (message) => {
    if (message) {
      await axios.post(`/posts/${id}/comments`, {
        text: `${message}`,
      });
      const { data } = await axios.get(`/posts/${id}/comments`);
      dispatch(addComment(data));
      setRerender(!rerender);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, [rerender]);

  if (isLoading) {
    return <Post isLoading={isLoading} />;
  }

  return (
    <>
      <Post
        // @ts-ignore
        _id={data._id}
        // @ts-ignore
        title={data.title}
        imgUrl={
          // @ts-ignore
          data.imgUrl ? `${process.env.REACT_APP_API_URL}${data.imgUrl}` : ""
        }
        user={{
          // @ts-ignore
          avatarUrl: data.user.avatarUrl
            ? // @ts-ignore
              data.user.avatarUrl
            : "https://res.cloudinary.com/practicaldev/image/fetch/s--uigxYVRB--/c_fill,f_auto,fl_progressive,h_50,q_auto,w_50/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/187971/a5359a24-b652-46be-8898-2c5df32aa6e0.png",
          // @ts-ignore
          fullName: data.user.fullName,
        }}
        // @ts-ignore
        createdAt={data.createdAt}
        // @ts-ignore
        viewsCount={data.viewsCount}
        // @ts-ignore
        tags={data.tags}
        isFullPost
      >
        {
          // @ts-ignore}
          <ReactMarkdown children={data.text} />
        }
      </Post>
      <CommentsBlock
        // @ts-ignore
        items={comments.filter((el) => id === el.postId)}
        isLoading={false}
      >
        <Index sendMessage={sendMessage} />
      </CommentsBlock>
    </>
  );
};
