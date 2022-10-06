import React from 'react';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';

import 'easymde/dist/easymde.min.css';
import styles from './AddPost.module.scss';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from '../../utils/axios';

export const AddPost = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [text, setText] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [title, setTitle] = React.useState('');
  const [tags, setTags] = React.useState('');
  const [imgUrl, setImgUrl] = React.useState('');
  const importFileRef = React.useRef(null)

  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData()
      const file = event.target.files[0]
      formData.append('image', file)
      const { data } = await axios.post('/upload', formData)
      console.log(data.url)
      setImgUrl(data.url)
    } catch (err) {
      console.log(err)
    }
  };

  const onClickRemoveImage = async (event) => {
    setImgUrl('')
  };

  const onChange = React.useCallback((text) => {
    setText(text);
  }, []);

  const onSubmit = async () => {
    try {
      setLoading(true)

      const fields = {
        title,
        imgUrl,
        tags: tags.split(' '),
        text
      }

      const { data } = id ? await axios.patch(`/posts/${id}`, fields) : await axios.post('/posts', fields)

      const _id = id ? id : data._id

      navigate(`/posts/${_id}`)

    } catch (err) {
      console.log(err)
      alert('Ошибка при создании статьи')
    }
  }

  React.useEffect(() => {
    if (id) {
      const { data } = axios.get(`posts/${id}`).then(({ data }) => {
        setTitle(data.title)
        setText(data.text)
        setImgUrl(data.imgUrl)
        setTags(data.tags.join(''))
      }
      )
    }
  }, [])


  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: '400px',
      autofocus: true,
      placeholder: 'Введите текст...',
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    [],
  );

  return (
    <Paper style={{ padding: 30 }}>
      <Button onClick={() => importFileRef.current.click()} variant="outlined" size="large">
        Загрузить превью
      </Button>
      <input ref={importFileRef} type="file" onChange={handleChangeFile} hidden />
      {imgUrl && (
        <>
          <Button variant="contained" color="error" onClick={onClickRemoveImage}>
            Удалить
          </Button>
          <img className={styles.image} src={`http://localhost:3333${imgUrl}`} alt="Uploaded" />
        </>
      )}

      <br />
      <br />
      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Заголовок статьи..."
        fullWidth
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField
        classes={{ root: styles.tags }}
        variant="standard" placeholder="Тэги"
        fullWidth
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />

      <SimpleMDE className={styles.editor} value={text} onChange={onChange} options={options} />
      <div className={styles.buttons}>
        <Button onClick={onSubmit} size="large" variant="contained">
          Опубликовать
        </Button>
        <Link to="/">
          <Button size="large">Отмена</Button>
        </Link>
      </div>
    </Paper>
  );
};
