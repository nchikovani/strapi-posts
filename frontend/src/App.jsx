import {useEffect, useState} from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

function App() {
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    const res = await fetch('/api/posts/values', {method: 'GET'});
    const targetPosts = await res.json();
    setPosts(targetPosts.data)
  };

  useEffect(() => {
    getPosts();
  }, [])

  return (
    <div className="App">
      <h1>strapi-posts</h1>
      <div>
        {posts.map(post => (
          <div className="post" key={post.id}>
            <span className="post__id">{post.id}</span>
            <span>{post.title}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App

