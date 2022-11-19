import Head from 'next/head'
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import Typography from '@mui/material/Typography';
import styles from '../styles/Home.module.scss'

const Home = ({posts}: {posts: {id: string, attributes: any}[]}) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>strapi-posts</h1>
      <div className={styles.posts}>
        {posts.map((post) => (
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
        ))}
      </div>
    </div>
  )
}

export default Home;

// @ts-ignore
export const getServerSideProps = async (context) => {
  const res = await fetch(`http://172.27.0.1:3050/strapi/api/posts?populate[0]=image`);
  const posts = await res.json();
  return {
    props: {posts: posts.data}
  }
}
