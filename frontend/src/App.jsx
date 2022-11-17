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
      <h1>strapi-posts</h1>
      <div className="posts">
        {posts.map(post => (
          <>
            <Card key={post.id} sx={{ width: 392 }} style={{marginBottom: "20px"}}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image={`/strapi${post.attributes.image.data.attributes.url}`}
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {post.attributes.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {post.attributes.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </>
        ))}
      </div>
    </div>
  )
}

export default App

