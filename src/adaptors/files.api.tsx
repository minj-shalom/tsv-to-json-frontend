import { AxiosInstance, AxiosRequestConfig } from "axios";
import AxiosAPIAdapter from "./instance/axios";

export class FilesAPI {
  protected instance: AxiosAPIAdapter;

  constructor(
    advancedOption?: AxiosRequestConfig,
    extendSessionSetup?: (session: AxiosInstance) => void
  ) {
    this.instance = new AxiosAPIAdapter(
      {
        baseURL: `${process.env.REACT_APP_REST_API_PROTOCOL}://${process.env.REACT_APP_REST_API_URL}/api`,
        ...advancedOption,
      },
      extendSessionSetup
    );
  }

  async upload(formData: FormData) {
    const result = await this.instance.post<{
      fileId: string;
    }>("/upload", formData);

    return result.data;
  }

  async download(lang: "en" | "ko", fileId: string) {
    const result = await this.instance.binaryGet<Blob>(`/download/${lang}`, {
      responseType: "arraybuffer",
      params: {
        fileId: fileId,
      },
    });
    const file = new Blob([result.data], {
      type: result.headers["content-type"],
    });

    return file;
  }
}
