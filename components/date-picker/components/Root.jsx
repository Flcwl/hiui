import React, { useRef, useContext, useEffect, useState } from 'react'
import Input from './Input'
import PickerIcon from './PickerIcon'
import DPContext from '../context'
import { usePlaceholder } from '../hooks'
import { parseValue } from '../utils'

import classNames from 'classnames'
const Root = ({
  onTrigger,
  onMouseEnter,
  onMouseLeave,
  children,
  inputChangeEvent,
  onClear,
  inputFocus,
  rangeInputIsError
}) => {
  const {
    localeDatas,
    type,
    outDate,
    placeholder,
    showTime,
    disabled,
    clearable,
    theme,
    width,
    value,
    format,
    bordered,
    locale
  } = useContext(DPContext)
  const [inputData, setInputData] = useState(outDate)
  const inputRef = useRef(null)
  const placeholders = usePlaceholder({
    type,
    showTime,
    placeholder,
    localeDatas
  })
  useEffect(() => {
    setInputData(value ? parseValue(value, type, format, locale) : outDate)
  }, [outDate, value])
  const onPickerClickEvent = () => {
    onTrigger()
  }

  const pickerIconClick = (isClear) => {
    if (isClear) {
      onClear()
      return
    }
    onPickerClickEvent()
  }
  const _cls = classNames(
    'hi-datepicker__picker',
    `theme__${theme}`,
    `hi-datepicker__picker--${type}`,
    inputFocus && 'hi-datepicker__picker--focus',
    disabled && 'hi-datepicker__picker--disabled',
    showTime && 'hi-datepicker__picker--hastime',
    rangeInputIsError && 'hi-datepicker__picker--error',
    { bordered }
  )

  const renderRange = type.includes('range') || type === 'timeperiod'
  return (
    <div
      className={_cls}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      ref={inputRef}
      style={{ width: width }}
    >
      <div className="hi-datepicker__input" style={{ width: width }}>
        <Input
          date={inputData[0]}
          placeholder={placeholders[0]}
          onChange={inputChangeEvent}
          onFocus={onPickerClickEvent}
          dir={0}
        />
        {renderRange && (
          <React.Fragment>
            <span className="hi-datepicker__input--connection">{localeDatas.datePicker.to}</span>
            <Input
              date={inputData[1]}
              placeholder={placeholders[1]}
              onChange={inputChangeEvent}
              onFocus={onPickerClickEvent}
              dir={1}
            />
          </React.Fragment>
        )}
        <PickerIcon
          focus={inputFocus}
          type={type}
          showTime={showTime}
          disabled={disabled}
          clearable={clearable}
          onClick={pickerIconClick}
        />
        {React.cloneElement(children, { attachEle: inputRef.current })}
      </div>
    </div>
  )
}

export default Root
