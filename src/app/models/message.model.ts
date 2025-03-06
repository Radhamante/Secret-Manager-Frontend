import { MessageType } from './message-type.enum';
import { OctagonX, Info, TriangleAlert } from 'lucide-angular';

export class Message {
  public id: number = Math.floor(Math.random() * 10000);
  public icon!: typeof Info;
  constructor(
    public content: string,
    public type: MessageType,
    icon?: typeof Info
  ) {
    if (icon) {
      this.icon = icon;
    } else {
      this.setIcon(type);
    }
  }

  private setIcon(type: MessageType) {
    switch (type) {
      case MessageType.INFO:
        this.icon = Info;
        break;
      case MessageType.WARNING:
        this.icon = TriangleAlert;
        break;
      case MessageType.ERROR:
        this.icon = OctagonX;
        break;
      default:
        this.icon = Info;
        break;
    }
  }
}
