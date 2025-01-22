import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

function App() {

  const baseForm = { title: '', content: '', image: '', tags: '' }

  const base_endpoint= import.meta.env.VITE_API_URL
  const [posts, setPosts] = useState([])
  const [formData, setFormData] = useState(baseForm);


  const fetchData = () => (
    axios.get(`${base_endpoint}/posts`)
      .then(res => (
        setPosts(res.data)
      ))
  )

  const handleImageError = (e) => {
    e.target.src = 'https://placehold.co/600x400';
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const tags = formData.tags.split(',').map(tag => tag.trim())
    const newPost = { ...formData, tags : tags}
    axios.post(`${base_endpoint}/posts`, newPost)
      .then(res => {
        fetchData();
        setFormData(baseForm);
      });
  };

  const handleDelete = (id) => {
    axios.delete(`${base_endpoint}/posts/${id}`)
      .then(() => {
        fetchData();
      });
  };

  useEffect(() =>{
    fetchData()
  }, [])

  return(
    <>
      <h1 className="mt-5 text-center">Elenco dei Post</h1>
      <div className="container mt-5">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Titolo</label>
            <input type="text" className="form-control" id="title" name="title" value={formData.title} onChange={handleInputChange} required />
          </div>
          <div className="mb-3">
            <label htmlFor="content" className="form-label">Contenuto del post</label>
            <textarea className="form-control" id="content" name="content" value={formData.content} onChange={handleInputChange} required></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="image" className="form-label">URL Immagine</label>
            <input type="text" className="form-control" id="image" name="image" value={formData.image} onChange={handleInputChange} required />
          </div>
          <div className="mb-3">
            <label htmlFor="tags" className="form-label">Tags (separati da virgola)</label>
            <input type="text" className="form-control" id="tags" name="tags" value={formData.tags} onChange={handleInputChange} required />
          </div>
          <button type="submit" className="btn btn-primary">Inserisci Post</button>
        </form>
      </div>
      <div className="cardbox container mt-5">
        <div className="row">
          {posts.map(post => (
              <div className="card p-3 col-6" key={post.id}>
                <img src={post.image} className="card-img-top" alt={post.title} onError={handleImageError}/>
                <div className="card-body">
                  <h5 className="card-title">{post.title}</h5>
                  <p className="card-text">{post.content}</p>
                  <p className="card-text"><strong>Tag:</strong> {post.tags.join(',')}</p>
                  <a href="#" className="btn btn-danger" onClick={() => handleDelete(post.id)}>Elimina</a>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  )
}

export default App
