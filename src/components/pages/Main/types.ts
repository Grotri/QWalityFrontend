export interface IDefect {
  id: string;
  name: string;
  date: string;
  isDeleted: boolean;
}

export interface ICamera {
  id: string;
  online: boolean;
  title: string;
  uptime: string;
  defects: IDefect[];
  link: string;
}
