type ForumDto = {
  id: number;
  name: string;
  themes: ThemeDto[];
  messages: MessageDto[];
};
type ForumInfo = {
  id: number;
  name: string;
  themes: ThemeInfo[];
  messages: MessageInfo[];
};

type ThemeDto = {
  id: number;
  name: string;
  viewCount: number;
  messages: MessageDto[];
  forumId: number;
  forum: ForumDto;
};
type ThemeInfo = {
  id: number;
  name: string;
  viewCount: number;
  messages: MessageInfo[];
  forumId: number;
};

type MessageDto = {
  id: number;
  content: string;
  createdAt: string;
  user: UserDto;
  likedByUsers: UserDto[];
};
type MessageInfo = {
  id: number;
  content: string;
  createdAt: Date;
  user: UserInfo;
  likedByUsers: UserInfo[];
};

type ForumRequestDto = {
  name: string;
}
type ForumRequestInfo = {
  name: string;
}

type ThemeRequestDto = {
  name: string;
  viewCount?: number;
  forumId: number;
}
type ThemeRequestInfo = {
  name: string;
  viewCount?: number;
  forumId: number;
}

type ThemeUpdateViewCountDto = {
  viewCount: number;
}
type ThemeUpdateViewCountInfo = {
  viewCount: number;
}

type MessageRequestDto = {
  content: string;
  themeId: number;
  forumId: number;
}
type MessageRequestInfo = {
  content: string;
  themeId: number;
  forumId: number;
}
