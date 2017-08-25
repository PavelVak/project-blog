export class Blog {
  public blogHead: string;
  public blogContent: string;
  public blogData: string;
  public $key: string;
  public authorName: string;
  public authorKey: string;
  constructor(blogHead: string = '', blogContent: string = '', blogData: string = '') {
    this.blogHead = blogHead;
    this.blogContent = blogContent;
    this.blogData = blogData;
  }
}
