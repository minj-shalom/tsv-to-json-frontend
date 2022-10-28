import { message } from "antd";
import { FilesAPI } from "../adaptors/files.api";

const downloadBlobData = (data: Blob, lang: "en" | "ko") => {
  const url = window.URL.createObjectURL(data);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", `${lang}.ts`);
  link.style.cssText = "display:none";
  document.body.appendChild(link);
  link.click();
  link.remove();
};

export class FilesService {
  constructor(private filesApi: FilesAPI) {}

  async upload(formData: FormData, callback?: (fileId: string) => void) {
    const result = await this.filesApi
      .upload(formData)
      .then((response) => {
        message.success("업로드를 완료하였습니다.");
        if (callback) {
          callback(response.data.fileId);
        }
        return response.data.fileId;
      })
      .catch((e) => {
        message.error("업로드에 실패하였습니다.");
        return e;
      });
    return result;
  }

  async download(lang: "en" | "ko", fileId: string) {
    await this.filesApi
      .download(lang, fileId)
      .then((response) => {
        downloadBlobData(response, lang);
        message.success(`${lang}.ts 파일을 다운로드 하였습니다.`);
      })
      .catch(() => {
        message.error("파일을 다운로드할 수 없습니다.");
      });
  }
}
