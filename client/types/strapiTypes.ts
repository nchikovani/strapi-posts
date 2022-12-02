export type StrapiType<T> = {
  data: T,
  meta: {
    pagination: {
      page: number,
      pageCount: number,
      pageSize: number,
      total: number
    }
  }
};

export type Post = {
  id: number;
  attributes: {
    content: string;
    title: string;
    description: string;
    segment_name: string;
    image: StrapiType<Image>;
    category: StrapiType<Category>;
    createdAt: string;
    publishedAt: string;
    updatedAt: string;
  }
};

export type StrapiPost = StrapiType<Post>;

export type Image = {
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

export type Category = {
  id: number;
  attributes: {
    name: string;
    segment_name: string;
    createdAt: string;
    publishedAt: string;
    updatedAt: string;
    count: number;
  }
}

export type Comment = {
  id: number;
  attributes: {
    name: string;
    content: string;
    createdAt: string;
    publishedAt: string;
    updatedAt: string;
  }
}