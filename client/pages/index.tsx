import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import Typography from '@mui/material/Typography';
import styles from '../styles/Home.module.scss'
import MainContainer from "../components/MainContainer";
import {useRouter} from "next/router";
import {GetStaticProps} from "next";

const Home = ({posts}: {posts: {id: string, attributes: any}[]}) => {
  const router = useRouter();

  const handlePostClick = (id: string) => {
    router.push(`/post/${id}`)
  }

  return (
    <MainContainer title="Strapi-posts" description="Strapi-posts description">
      <h1 className={styles.title}>strapi-posts</h1>
      <div className={styles.posts}>
        {posts.map((post) => (
          <Card key={post.id} sx={{ width: 392, height: 272 }} style={{marginBottom: "20px"}} onClick={() => handlePostClick(post.id)}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image={`/strapi${post.attributes.image.data.attributes.url}`}
                alt={post.attributes.title}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {post.attributes.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" className={styles.content_text}>
                  {post.attributes.content}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </div>
    </MainContainer>
  )
}

export default Home;

export const getStaticProps: GetStaticProps = async (context) => {
  try {
    const res = await fetch(`http://strapi:${process.env.STRAPI_PORT}/api/posts?populate[0]=image`);
    const posts = await res.json();

    return {
      props: {posts: posts.data},
      revalidate: 60,
    }
  } catch (e) {
    return {
      props: {posts: []},
      revalidate: 60,
    }
  }
}
