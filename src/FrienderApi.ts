import { RegisterInterface } from "./interfaces";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:5001";

interface LoginInterface {
  username: string,
  password: string;
}

interface TokenApiInterface {
  token: string;
}

interface UserApiInterface {
  user: UserInterface;
}

interface RelationshipApiInterface {
  status: string;
}

interface UserInterface {
  username: string,
  zip_code: string,
  friend_radius: string,
  hobbies: string,
  interests: string,
  image: string,
}

class FrienderApi {
  static token = null;

  static async request(endpoint, headers = {}, body, method = "GET") {
    const url = new URL(`${BASE_URL}/${endpoint}`);
    headers = { ...headers, "x-access-token": `${FrienderApi.token}` };

    // url.search = (method === "GET")
    //   ? new URLSearchParams(data).toString()
    //   : "";

    // // set to undefined since the body property cannot exist on a GET method
    // const body = (method !== "GET" && data)
    //   ? JSON.stringify(data)
    //   : undefined;


    const resp = await fetch(url, { method, body, headers });

    //fetch API does not throw an error, have to dig into the resp for msgs
    if (!resp.ok) {
      console.error("API Error:", resp.statusText, resp.status);
      const { errors } = await resp.json();

      if (Array.isArray(errors)) {
        throw errors;
      }
      else {
        throw [errors];
      }

    }

    return await resp.json();
  }

  static async login(formData: LoginInterface): Promise<string> {
    const headers = {
      'content-type': 'application/json'
    };
    const body = JSON.stringify(formData);
    const data: TokenApiInterface = await FrienderApi.request(
      "login",
      headers,
      body,
      "POST"
    );
    return data.token;
  }

  static async getUser(username: string): Promise<UserInterface> {
    const headers = {
      'content-type': 'application/json'
    };
    const data: UserApiInterface = await FrienderApi.request(
      `users/${username}`,
      headers,
      null,
      "GET"
    );
    return data.user;
  }

  static async register(formData: RegisterInterface): Promise<string> {
    const body = new FormData();
    for (const name in formData) {
      if (!formData[name]) continue;

      body.append(name, formData[name]);
    }
    const data: TokenApiInterface = await FrienderApi.request(
      "register",
      {},
      body,
      "POST"
    );
    return data.token;
  }

  static async getPotentialFriend(
    username: string
  ): Promise<UserInterface> {
    const data: UserApiInterface = await FrienderApi.request(
      `users/${username}/get-potential-friend`,
      {},
      null,
      "GET"
    );

    return data.user;
  }
  static async establishRelationship(
    username: string,
    response: boolean
  ): Promise<string> {
    const headers = {
      'content-type': 'application/json'
    };
    const body = JSON.stringify({ response });

    const data: RelationshipApiInterface = await FrienderApi.request(
      `users/${username}/establish-relationship`,
      headers,
      body,
      "POST"
    );

    return data.status;
  }

  static async getFriends(username: string) {
    const data = await FrienderApi.request(
      `users/${username}/get-friends`,
      {},
      null,
      "GET"
    );

    return data.friends;
  }

}

export default FrienderApi;