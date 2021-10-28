import AxiosService from "./AxiosService";

export class ChannelService {

  static async addNewChannel(data: any): Promise<any> {
    return AxiosService.post({url: 'channel/new', data});
  }
  static async getChannel(channelId: string): Promise<any> {
    return AxiosService.get({url: 'channel/' + channelId});
  }
  static async getUserChannel(): Promise<any> {
    return AxiosService.get({url: 'channel/user-channel'});
  }
  
}