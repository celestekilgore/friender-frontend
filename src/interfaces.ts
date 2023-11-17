export interface RegisterInterface {
  username: string,
  password: string,
  zip_code: string,
  friend_radius: string,
  hobbies: string,
  interests: string,
  image: File | null,
}

export interface RegisterFormInterface {
  username: string,
  password: string,
  zip_code: string,
  friend_radius: string,
  hobbies: string,
  interests: string,
  image: string,
}

export interface LoginInterface {
  username: string,
  password: string;
}

export interface TokenApiInterface {
  token: string;
}

export interface UserApiInterface {
  user: UserInterface;
}

export interface RelationshipApiInterface {
  status: string;
}

export interface UserInterface {
  username: string,
  zip_code: string,
  friend_radius: string,
  hobbies: string,
  interests: string,
  image: string,
}

export interface FriendListInterface {
  friends: FriendInterface[]
}

export interface FriendInterface {
  username: string,
  image: string
}

export interface PayloadInterface {
  username: string;
}