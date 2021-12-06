import { useState, useEffect, useCallback, useRef } from 'react'
import request from '../request'
import { getFileType } from '../utils'
import { v4 as uuidV4 } from 'uuid'
// import Modal from '../../modal'
import { UploadProps, UploadFileItem } from '../interface'

const useUpload = ({
  fileList,
  defaultFileList,
  onChange,
  uploadAction,
  maxSize,
  name = 'file',
  withCredentials,
  headers,
  data,
  onRemove,
  beforeUpload,
  customUpload,
}: // localeDatas,
UploadProps): [
  UploadFileItem[],
  (files: HTMLInputElement['files']) => Promise<void>,
  (file: UploadFileItem, index: any) => void
] => {
  // const localMap = localeDatas.upload || {}
  const [_fileList, updateFileList] = useState(fileList || defaultFileList || [])
  const fileListRef = useRef(fileList || defaultFileList || [])

  useEffect(() => {
    if (fileList) {
      updateFileList(fileList)
      fileListRef.current = fileList
    }
  }, [fileList])

  const deleteFile = useCallback(
    (file: UploadFileItem, index) => {
      if (file.abort) {
        file.abort()
      }
      let result: boolean | Promise<boolean> = true
      if (onRemove) {
        result = onRemove(file, [...fileListRef.current], index)
      }
      if (!fileList) {
        const newFileList = [...fileListRef.current]
        newFileList.splice(index, 1)
        if (result === true) {
          fileListRef.current = newFileList
          updateFileList(fileListRef.current)
        } else if (result && typeof result.then === 'function') {
          result.then((res) => {
            if (res === true) {
              fileListRef.current = newFileList
              updateFileList(fileListRef.current)
            }
          })
        }
      }
    },
    [onRemove, fileList]
  )

  const onSuccess = useCallback(
    (file: UploadFileItem, res) => {
      const newFileList = [...fileListRef.current]
      file.uploadState = 'success'
      delete file.abort
      const idx = fileListRef.current.findIndex((item) => item.fileId === file.fileId)
      const result: boolean | Promise<boolean> | undefined =
        onChange && onChange(file, newFileList, res)
      // 处理如果onChange return false 的时候需要删除该文件
      if (typeof result === 'boolean' && !result) {
        deleteFile(file, idx)
        return
      }
      newFileList.splice(idx, 1, file)

      if (fileList) {
        return false
      } else if (result && typeof (result as Promise<boolean>).then === 'function') {
        ;(result as Promise<boolean>).then((re) => {
          if (re === false) {
            return false
          } else {
            fileListRef.current = newFileList
            updateFileList(fileListRef.current)
          }
        })
      } else {
        fileListRef.current = newFileList
        updateFileList(fileListRef.current)
      }
    },
    [onChange, deleteFile, fileList]
  )

  const onProgress = useCallback((file: UploadFileItem, e) => {
    const newFileList = [...fileListRef.current]
    file.progressNumber = e.percent
    const idx = fileListRef.current.findIndex((item) => item.fileId === file.fileId)
    newFileList.splice(idx, 1, file)
    fileListRef.current = newFileList
    updateFileList(fileListRef.current)
  }, [])

  const onError = useCallback(
    (file: UploadFileItem, error, res) => {
      const newFileList = [...fileListRef.current]
      file.uploadState = 'error'
      const idx = fileListRef.current.findIndex((item) => item.fileId === file.fileId)
      const result = onChange && onChange(file, newFileList, res)

      // 处理如果onChange return false 的时候需要删除该文件
      if (typeof result === 'boolean' && !result) {
        deleteFile(file, idx)
        return
      }

      newFileList.splice(idx, 1, file)

      if (fileList) {
        return false
      } else if (result && typeof (result as Promise<boolean>).then === 'function') {
        ;(result as Promise<boolean>).then((re) => {
          if (re === false) {
            return false
          } else {
            fileListRef.current = newFileList
            updateFileList(fileListRef.current)
          }
        })
      } else {
        fileListRef.current = newFileList
        updateFileList(fileListRef.current)
      }
    },
    [deleteFile, fileList, onChange]
  )

  const uploadFiles = useCallback(
    async (files: HTMLInputElement['files']) => {
      if (customUpload) {
        customUpload(files)
      } else {
        const _files: UploadFileItem[] = []
        if (files) {
          for (let i = 0; i < files.length; i++) {
            if (beforeUpload) {
              const result = beforeUpload(files[i], fileListRef.current)
              if (result === false) {
                continue
              }
            }
            if (maxSize && files[i].size > maxSize * 1024) {
              // Modal.confirm({
              //   title: localMap.modalTitle,
              //   content: localMap.modalTiptxt,
              //   cancelText: null,
              //   confirmText: localMap.modalBtn,
              // })

              continue
            }
            const file: UploadFileItem = Object.assign(files[i], {
              fielId: uuidV4(),
              uploadState: 'loading' as 'loading',
              fileType: getFileType(files[i]),
            })

            if (file) {
              if (file.fileType === 'img') {
                // 用来图片预览
                const fr = new FileReader()
                fr.onload = (e) => {
                  const url = (e.target?.result || '') as string
                  file.url = url
                }
                fr.readAsDataURL(file)
              }
              _files.push(file)
              if (uploadAction) {
                let _uploadAction =
                  typeof uploadAction === 'string' ? uploadAction : uploadAction(file)
                if (_uploadAction.toString() === '[object Promise]') {
                  await (_uploadAction as Promise<string>)
                    .then((res) => {
                      _uploadAction = res
                    })
                    .catch((error) => {
                      throw new Error(error)
                    })
                }
                const action = request({
                  file,
                  action: _uploadAction as string,
                  name,
                  withCredentials,
                  headers,
                  data,

                  onSuccess,
                  onError,
                  onProgress,
                })
                file.abort = action.abort
              }
            }
          }
        }

        fileListRef.current = _files.reverse().concat(fileListRef.current)
        updateFileList(fileListRef.current)
      }
    },
    [
      onSuccess,
      onProgress,
      onError,
      uploadAction,
      name,
      withCredentials,
      headers,
      data,
      beforeUpload,
      customUpload,
      maxSize,
    ]
  )

  return [_fileList, uploadFiles, deleteFile]
}

export default useUpload
