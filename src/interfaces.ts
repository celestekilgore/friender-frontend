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
