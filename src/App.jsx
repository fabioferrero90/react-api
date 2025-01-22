import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

function App() {

  const base_endpoint= import.meta.env.VITE_API_URL
  const [posts, setPosts] = useState([])


  const fetchData = () => (
    axios.get(`${base_endpoint}/posts`)
      .then(res => (
        console.log(res.data),
        setPosts(res.data)
      ))
  )

  const handleImageError = (e) => {
    e.target.src = 'https://placehold.co/600x400';
  }

  useEffect(() =>{
    fetchData()
  }, [])

  return(
    <>
      <h1 className="mt-5 text-center">Elenco dei Post</h1>
      <div className="cardbox container mt-5">
        <div className="row">
          {posts.map(post => (
              <div className="card p-3 col-6" key={post.id}>
                <img src={`${import.meta.env.VITE_API_URL}${post.image}`} className="card-img-top" alt={post.title} onError={handleImageError}/>
                <div className="card-body">
                  <h5 className="card-title">{post.title}</h5>
                  <p className="card-text">{post.content}</p>
                  <a href="#" className="btn btn-danger">Elimina</a>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  )
}

export default App
