import AxiosService from "./AxiosService";

export class UserService {

  static async getAllUsers(): Promise<any> {
    return AxiosService.get({url: 'user/all'});
  }

}