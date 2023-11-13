import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { PostsService } from './posts.service';

interface PostModel {
  id: number;
  author: string;
  title: string;
  content: string;
  likeCount: number;
  commentCount: number;
}

let posts: PostModel[] = [
  {
    id: 1,
    author: 'newjeans_official',
    title: '뉴진스 민지',
    content: '메이크업 고치고 있는 민지',
    likeCount: 1000000,
    commentCount: 999999,
  },
  {
    id: 2,
    author: 'newjeans_official',
    title: '뉴진스 해린',
    content: '노래 연습하고 있는 해린',
    likeCount: 1000000,
    commentCount: 999999,
  },
  {
    id: 3,
    author: 'blackpink_official',
    title: '블랙핑크 로제',
    content: '종합운동장에서 공연중인 로제',
    likeCount: 1000000,
    commentCount: 999999,
  }
];
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}
  @Get()
  getPosts(): PostModel[] {
    return posts;
  }

  @Get(':id')
  // 모든 패스 파라미터는 별도의 처리를 하지 않는 이상 string으로 받게 된다.
  getPost(@Param('id') id: string): PostModel {
    const post = posts.find((post) => post.id === +id);

    if(!post) {
      // nestjs에서 기본으로 제공해주는 에러 타입
      throw new NotFoundException();
    }

    return post;
  }
}
