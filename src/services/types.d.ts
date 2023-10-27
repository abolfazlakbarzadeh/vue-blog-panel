export type Article = {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  createdAt: string;
  updatedAt: string;
  favorited: true;
  favoritesCount: 0;
  author: {
    username: string;
    bio: string;
    image: string;
    following: true;
  };
};

export interface IFetchArticlesParams {
  tag?: string;
  author?: string;
  favorited?: string;
  offset?: number;
  limit?: number;
}
export type FetchArticlesResponse = {
  articles: Article[];
  articlesCount: number;
};
export type FetchArticleResponse = {
  article: Article;
};
export interface ICreateArticleParams {
  title: string;
  description: string;
  body: string;
  tagList: string[];
}
export type CreateArticleResponse = {
  article: Article;
};
export interface IUpdateArticleParams extends ICreateArticleParams {}
export type UpdateArticleResponse = {
  article: Article;
};
