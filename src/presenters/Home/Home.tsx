import { FilesAPI } from "../../adaptors/files.api";
import { FilesService } from "../../interactors/files.service";
import logo from "../../assets/logos/yennefer.svg";
import icon from "../../assets/icons/yennefer.png";
import { DownloadOutlined, UploadOutlined } from "@ant-design/icons";
import "./Home.scss";
import { useState } from "react";

const filesService = new FilesService(new FilesAPI());

const upload = async (
  formData: FormData,
  callback?: (fileId: string) => void
) => {
  const fileId = await filesService.upload(formData, callback);
  return fileId;
};

const download = async (lang: "en" | "ko", fileId: string) => {
  await filesService.download(lang, fileId);
};

export default function Home() {
  const [fileId, setFileId] = useState<string | undefined>(undefined);

  const allowDownload = (fileId: string) => {
    setFileId(fileId);
  };

  const onUpload = (e: any, callback?: (fileId: string) => void) => {
    const file = e.target.files?.item(0);
    const formData = new FormData();
    formData.append("files", file);
    upload(formData, callback);
  };

  const onDownload = (lang: "en" | "ko", fileId: string) => {
    download(lang, fileId);
  };

  return (
    <div className="home">
      <div className="home__wrapper">
        <div className="home__wrapper__left">
          <div className="home__wrapper__left__title">
            <img
              className="home__wrapper__left__title__image"
              src={logo}
              alt="yennefer"
            />
            <div className="home__wrapper__left__title__text">
              i18n JSON 변환
            </div>
          </div>
          <div className="home__wrapper__left__content">
            tsv 파일을 i18n JSON 파일로 변환할 수 있습니다.
          </div>
          <div className="home__wrapper__left__button-wrapper">
            <label className="button" htmlFor="upload-file">
              <UploadOutlined />
              업로드
            </label>
            <input
              className="upload-button-function"
              id="upload-file"
              type="file"
              name="file"
              accept=".tsv"
              onChange={(e) => onUpload(e, allowDownload)}
            />
            {fileId && (
              <>
                <label
                  className="button"
                  onClick={() => onDownload("en", fileId)}
                >
                  <DownloadOutlined />
                  English 다운로드
                </label>
                <label
                  className="button"
                  onClick={() => onDownload("ko", fileId)}
                >
                  <DownloadOutlined />
                  한국어 다운로드
                </label>
              </>
            )}
          </div>
        </div>
        <div className="home__wrapper__right">
          <img
            className="home__wrapper__right__image"
            src={icon}
            alt="yennefer"
          />
        </div>
      </div>
    </div>
  );
}
