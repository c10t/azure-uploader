import axios, { AxiosRequestConfig } from 'axios'

class AzureApi {
  private apiBaseURL: string
  private blobBaseURL: string
  private authToken: string

  constructor(apiBaseURL: string, blobBaseURL = '', authToken = '') {
    this.apiBaseURL = apiBaseURL
    this.blobBaseURL = blobBaseURL
    this.authToken = authToken
  }

  public getFileList = async () => {
    const config: AxiosRequestConfig = {
      headers: {
        'X-ZUMO-AUTH': this.authToken
      }
    }

    return axios.get(`${this.apiBaseURL}/api/get-file-list`, config)
      .then(response => {
        console.log(response)
        return response.data
      })
      .catch(error => ({ error }))
  }

  public uploadFile = async (file: File, uploadProgressCallback: (p: number) => void) => {
    const sas = await this.getUploadSasURL(file.name)
    await this.uploadBlob(sas, file, uploadProgressCallback)
    await this.waitForFile(file.name)
  }

  private getUploadSasURL = async (filename: string) => {
    const config: AxiosRequestConfig = {
      headers: {
        'X-ZUMO-AUTH': this.authToken
      },
      params: {
        filename
      }
    }

    return axios.get(`${this.apiBaseURL}/api/get-upload-url`, config)
      .then(response => response.data.url as string)
  }

  private uploadBlob = async (sasURL: string, file: File, uploadProgressCallback: (p: number) => void) => {
    const config: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'application/octet-stream',
        'x-ms-version': '2017-04-17',
        'x-ms-blob-type': 'BlockBlob',
        'x-ms-blob-content-type': file.type
      },
      onUploadProgress: (e: any) => {
        if (e.lengthComputable) {
          uploadProgressCallback(e.loaded / e.total * 100)
        } else {
          uploadProgressCallback(0)
        }
      }
    }

    return axios.put(sasURL, file, config).then(() => sasURL)
  }

  private waitForFile = async (filename: string) => {
    return new Promise(resolve => {
      setTimeout(async () => {
        const filelist = await this.getFileList()
        if (filelist.some((x: any) => x.id === filename)) {
          resolve(filename)
        } else {
          resolve(this.waitForFile(filename))
        }
      }, 500)
    })
  }
}

export default AzureApi
