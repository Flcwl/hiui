import React, { forwardRef, useCallback } from 'react'
import { cx, getPrefixCls } from '@hi-ui/classname'
import { __DEV__ } from '@hi-ui/env'
import { UploadFileItem, UploadFileList } from './interface'
import { CloseOutlined, DeleteOutlined, FileFilled } from '@hi-ui/icons'

const UPLOAD_PREFIX = getPrefixCls('upload')

/**
 * TODO: What is Upload
 */
export const FileList = forwardRef<HTMLUListElement | null, UploadFileList>(
  ({ prefixCls = UPLOAD_PREFIX, onDownload, onDelete, fileList, showPic }, ref) => {
    const handleItemKeydown = useCallback(
      (e: React.KeyboardEvent<HTMLLIElement>, file: UploadFileItem, index: number) => {
        // ENTER
        if (e.keyCode === 13) {
          e.preventDefault()
          const ele = e.target as HTMLLIElement
          ele.querySelector('a')?.click()
        }
        // DEL
        if (e.keyCode === 46) {
          e.preventDefault()
          onDelete(file, index)
        }
      },
      [onDelete]
    )

    return (
      <ul className={`${prefixCls}__list`} ref={ref}>
        {fileList.map((file, index) => {
          return (
            <li
              key={index}
              className={`${prefixCls}__item`}
              title={file.name}
              tabIndex={0}
              onKeyDown={(e) => {
                handleItemKeydown(e, file, index)
              }}
            >
              {showPic && file.url ? (
                <div className="img-wrap">
                  <img src={file.url} />
                </div>
              ) : (
                <FileFilled />
              )}
              <div className={`${prefixCls}__right-content`}>
                <a
                  tabIndex={-1}
                  target="_blank"
                  rel="noreferrer"
                  href={file.url}
                  className={cx(
                    `${prefixCls}__filename`,
                    file.uploadState === 'error' && `${prefixCls}__filename--error`
                  )}
                  title={file.name}
                  onClick={(e) => {
                    if (onDownload) {
                      e.preventDefault()
                      onDownload(file)
                    }
                  }}
                >
                  {file.name}
                </a>
                <span>
                  {file.uploadState === 'loading' ? (
                    <CloseOutlined onClick={() => onDelete(file, index)} />
                  ) : (
                    <DeleteOutlined onClick={() => onDelete(file, index)} />
                  )}
                </span>
              </div>
              {file.uploadState === 'loading' && (
                <div className={`${prefixCls}__upstatus`}>
                  <i
                    className={`${prefixCls}__upstatus-line`}
                    style={{ width: file.progressNumber + '%' }}
                  />
                </div>
              )}
            </li>
          )
        })}
      </ul>
    )
  }
)

if (__DEV__) {
  FileList.displayName = 'FileList'
}
