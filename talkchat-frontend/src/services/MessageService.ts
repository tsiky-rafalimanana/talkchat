import AxiosService from "./AxiosService";

export class MessageService {

  static async addNewMessage(data: any): Promise<any> {
    return AxiosService.post({url: 'message/new', data});
  }
  

}