const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:5001";

interface LoginInterface {
  username: string,
  password: string
}

interface LoginApiInterface {
  token: string
}

class FrienderApi {

  static async login(formData: LoginInterface): Promise<string> {
    const url = `${BASE_URL}/login`;
    const headers = {
      'content-type':'application/json'
    };
    const body = JSON.stringify(formData);
    const resp = await fetch(url,{method: "POST",body,headers});
    const data: LoginApiInterface = await resp.json();
    return data.token;
  }

}

export default FrienderApi;