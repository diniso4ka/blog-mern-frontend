import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';


import { Post } from '../../components/Post';
import { TagsBlock } from '../../components/TagsBlock';
import { CommentsBlock } from '../../components/CommentsBlock';

import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, fetchTags } from '../../redux/slices/postsSlice/extraReducers';

export const Home = () => {
  const dispatch = useDispatch()
  const userData = useSelector((state) => state.auth.data)
  const [sortType, setSortType] = React.useState('createdAt')
  const { posts, tags } = useSelector(state => state.posts)

  const isPostsLoading = posts.status === 'loading'
  const isTagsLoading = tags.status === 'loading'

  React.useEffect(() => {
    dispatch(fetchPosts(sortType))
    dispatch(fetchTags())
  }, [sortType])



  return (
    <>
      <Tabs style={{ marginBottom: 15 }} value={sortType === 'createdAt' ? 0 : 1} aria-label="basic tabs example">
        <Tab onClick={() => setSortType('createdAt')} label="Новые" />
        <Tab onClick={() => setSortType('viewsCount')} label="Популярные" />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {(isPostsLoading ? [...Array(5)] : posts.items).map((obj, index) =>
            isPostsLoading ? (
              <Post
                key={index}
                isLoading={true}
              />
            ) : (
              <Post
                key={obj._id}
                _id={obj._id}
                title={obj.title}
                imgUrl={obj.imgUrl ? `http://localhost:3333${obj.imgUrl}` : ''}
                user={{
                  avatarUrl: obj.user.avatarUrl ? obj.user.avatarUrl :
                    'https://res.cloudinary.com/practicaldev/image/fetch/s--uigxYVRB--/c_fill,f_auto,fl_progressive,h_50,q_auto,w_50/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/187971/a5359a24-b652-46be-8898-2c5df32aa6e0.png',
                  fullName: obj.user.fullName,
                }}
                createdAt={obj.createdAt}
                viewsCount={obj.viewsCount}
                commentsCount={3}
                tags={obj.tags}
                isEditable={userData?._id === obj.user._id}
              />
            )
          )}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock items={tags.items} isLoading={isTagsLoading} />
          <CommentsBlock
            items={[
              {
                user: {
                  fullName: 'Вася Пупкин',
                  avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
                },
                text: 'Это тестовый комментарий',
              },
              {
                user: {
                  fullName: 'Иван Иванов',
                  avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
                },
                text: 'When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top',
              },
            ]}
            isLoading={false}
          />
        </Grid>
      </Grid>
    </>
  );
};
