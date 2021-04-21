type PagesDto<T> = {
  current_page: number;
  pages: number;
  data: T[];
};

type PagesInfo<T> = {
  currentPage: number;
  pages: number;
  data: T[];
};
