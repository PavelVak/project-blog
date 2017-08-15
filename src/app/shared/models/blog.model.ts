export class Blog {
  public blogHead: string;
  public blogContent: string;
  public blogData: string;
  constructor(blogHead: string = '', blogContent: string = '', blogData: string = '') {
    this.blogHead = blogHead;
    this.blogContent = blogContent;
    this.blogData = blogData;
  }
}
