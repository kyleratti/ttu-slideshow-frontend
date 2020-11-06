export interface ISettings {
  interval: number;
  apiUrl: string;
}

export const createSettings = () =>
  ({
    interval: 1000 * 5,
    apiUrl: "127.0.0.1:45454", // TODO: Read from env?
  } as ISettings);
