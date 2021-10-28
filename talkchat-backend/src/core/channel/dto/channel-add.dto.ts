export class ChannelAddDTO {
  name: string;
  description?: string;
  public?: boolean;
  direct?: boolean;
  private?: boolean;
  members: { id: string } []
}