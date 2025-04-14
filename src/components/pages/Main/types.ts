export interface IDefect {
  id: string;
  name: string;
  date: string;
}

export interface ICamera {
  id: string;
  online: boolean;
  title: string;
  defectsCount: number;
  uptime: string;
  defects: IDefect[];
}
