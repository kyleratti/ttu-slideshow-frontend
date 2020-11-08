export class Image {
  private m_FileName: string;
  private m_Timestamp: Date;

  public get fileName() {
    return this.m_FileName;
  }

  public get timestamp() {
    return this.m_Timestamp;
  }

  constructor(fileName: string) {
    this.m_FileName = fileName;
    this.m_Timestamp = new Date();
  }
}
