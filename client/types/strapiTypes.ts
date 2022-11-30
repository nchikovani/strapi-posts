export type strapiType<T> = {
  data: T
};

export type post = {
  id: number;
  attributes: {
    content: string;
    title: string;
    description: string;
    segment_name: string;
    image: strapiType<image>;
    category: strapiType<category>;
    createdAt: string;
    publishedAt: string;
    updatedAt: string;
  }
};

export type strapiPost = strapiType<post>;

export type image = {
  id: number;
  attributes: {
    name: string;
    caption: string;
    url: string;
    formats: {
      small: {
        url: string;
      }
    }
    createdAt: string;
    publishedAt: string;
    updatedAt: string;
  }
}

export type category = {
  id: number;
  attributes: {
    name: string;
    segment_name: string;
    createdAt: string;
    publishedAt: string;
    updatedAt: string;
  }
}