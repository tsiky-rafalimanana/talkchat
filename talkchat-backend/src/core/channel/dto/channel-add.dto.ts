export class ChannelAddDTO {
  name: string;
  description?: string;
  archived?: boolean;
  direct?: boolean;
  private?: boolean;
  members: { id: string } []
}