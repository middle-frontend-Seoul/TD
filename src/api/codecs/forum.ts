import { User } from 'api/codecs';

export type ThemesType = PagesInfo<ThemeInfo>;

export function fromMessageDto(dto: MessageDto): MessageInfo {
  return {
    id: dto.id,
    content: dto.content,
    createdAt: new Date(dto.createdAt),
    user: dto.user ? User.fromUserDto(dto.user) : ({} as UserInfo),
  };
}

export function fromThemeDto(dto: ThemeDto): ThemeInfo {
  return {
    id: dto.id,
    name: dto.name,
    viewCount: dto.viewCount,
    messages: (dto.messages || []).map((dtoMessage) =>
      fromMessageDto(dtoMessage)
    ),
    forumId: dto.forumId,
  };
}

export function fromForumDto(dto: ForumDto): ForumInfo {
  return {
    id: dto.id,
    name: dto.name,
    themes: (dto.themes || []).map((dtoTheme) => fromThemeDto(dtoTheme)),
    messages: (dto.messages || []).map((dtoMessage) =>
      fromMessageDto(dtoMessage)
    ),
  };
}

export function toForumRequestDto(info: ForumRequestInfo): ForumRequestDto {
  return {
    name: info.name,
  };
}

export function toThemeRequestDto(info: ThemeRequestInfo): ThemeRequestDto {
  return {
    name: info.name,
    viewCount: info.viewCount,
    forumId: info.forumId,
  };
}

export function toThemeUpdateViewCountDto(
  info: ThemeUpdateViewCountInfo
): ThemeUpdateViewCountDto {
  return {
    viewCount: info.viewCount,
  };
}

export function toMessageRequestDto(
  info: MessageRequestInfo
): MessageRequestDto {
  return {
    content: info.content,
    themeId: info.themeId,
    forumId: info.forumId,
  };
}
