import {useEffect, useState} from 'react'
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import './App.css'


function App() {
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    const res = await fetch('/strapi/api/posts?populate[0]=image', {method: 'GET'});
    const targetPosts = await res.json();
    if (!targetPosts.data) return;
    setPosts(targetPosts.data);
  };

  useEffect(() => {
    getPosts();
  }, [])

  return (
    <div className="App">

    </div>
  )
}

export default App

