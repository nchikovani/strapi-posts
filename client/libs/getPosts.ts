const getPosts = async (start: number) => {
  if (start > 0) {
    const postRes = await fetch(`http://localhost:3050/strapi/api/posts?populate[category]=category&populate[image]=image&pagination[start]=${start}&pagination[limit]=2`);
    return await postRes.json();
  }
  const postRes = await fetch(`http://strapi:${process.env.STRAPI_PORT}/api/posts?populate[category]=category&populate[image]=image&pagination[start]=${start}&pagination[limit]=2`);
  return await postRes.json();
};

export default getPosts;