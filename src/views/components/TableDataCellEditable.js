/* eslint-disable react/prop-types */
import { CBadge, CForm, CFormCheck, CFormInput, CTableDataCell, CTooltip } from '@coreui/react'
import React, { useState } from 'react'
import { NumericFormat } from 'react-number-format'
import Select from 'react-select'

import {
  birimFormat,
  currencyFormat,
  getDataByRoute,
  getTavsiyeYemekMaliyet,
  getTavsiyeYemekMiktar,
  onlyNumberInput,
  passwordHash,
} from '../../util'

const TableDataCellEditable = (props) => {
  const { type, field, record, className, options } = props
  const [birimcinsi, setBirimCinsi] = useState('Birim')
  const [tavsiyeMaliyet, setTavsiyeMaliyet] = useState('0')
  const [tavsiyeYemekMiktar, setTavsiyeYemekMiktar] = useState('0')
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      background: '#fff',
      borderColor: '#9e9e9e',
      minHeight: '31px',
      height: '30px',
      fontSize: '13px',
      boxShadow: state.isFocused ? null : null,
    }),

    valueContainer: (provided, state) => ({
      ...provided,
      height: '30px',
      padding: '0 6px',
    }),

    input: (provided, state) => ({
      ...provided,
      margin: '0px',
    }),
    indicatorSeparator: (state) => ({
      display: 'none',
    }),
    indicatorsContainer: (provided, state) => ({
      ...provided,
      height: '30px',
    }),
    dropdownIndicator: (state) => ({
      display: 'none',
    }),
  }

  const handleFormChange = (value) => {
    const { fieldName, fieldValue } = value
    let newRecord = { ...record }
    newRecord[fieldName] = fieldValue
    props.setRecord(newRecord)
  }

  let cellcontext = null

  switch (type) {
    case 'text':
      cellcontext = (
        <CTableDataCell className={className}>
          <CFormInput
            type="text"
            value={record[field]}
            size={'sm'}
            onChange={(e) =>
              handleFormChange({ fieldName: field, fieldValue: e ? e.target.value : null })
            }
          />
        </CTableDataCell>
      )
      break

    case 'date':
      cellcontext = (
        <CTableDataCell className={className}>
          <CFormInput
            type="date"
            value={record[field]}
            size={'sm'}
            onChange={(e) =>
              handleFormChange({ fieldName: field, fieldValue: e ? e.target.value : null })
            }
          />
        </CTableDataCell>
      )
      break

    case 'percent':
      cellcontext = (
        <CTableDataCell className={className}>
          <CForm validated>
            <CFormInput
              type="number"
              value={record[field]}
              size={'sm'}
              min={0}
              max={1}
              step={0.01}
              onChange={(e) =>
                handleFormChange({ fieldName: field, fieldValue: e ? e.target.value : null })
              }
            />
          </CForm>
        </CTableDataCell>
      )
      break

    case 'percent_fire':
      cellcontext = (
        <CTableDataCell className={className}>
          <CForm validated>
            <CFormInput
              type="number"
              value={record[field]}
              size={'sm'}
              min={0}
              max={1}
              step={0.01}
              onChange={(e) =>
                handleFormChange({ fieldName: field, fieldValue: e ? e.target.value : null })
              }
            />
          </CForm>
        </CTableDataCell>
      )
      break

    case 'inflation':
      cellcontext = (
        <CTableDataCell className={className}>
          <CFormInput
            type="number"
            value={record[field]}
            size={'sm'}
            step={0.01}
            onChange={(e) =>
              handleFormChange({ fieldName: field, fieldValue: e ? e.target.value : null })
            }
          />
        </CTableDataCell>
      )
      break

    case 'number':
      cellcontext = (
        <CTableDataCell className={className}>
          <CFormInput
            type="number"
            value={record[field]}
            size={'sm'}
            min={0}
            step={1}
            onChange={(e) =>
              handleFormChange({ fieldName: field, fieldValue: e ? e.target.value : null })
            }
          />
        </CTableDataCell>
      )
      break

    case 'numbernonzero':
      cellcontext = (
        <CTableDataCell className={className}>
          <CFormInput
            type="number"
            value={record[field]}
            size={'sm'}
            min={1}
            step={1}
            onChange={(e) =>
              handleFormChange({ fieldName: field, fieldValue: e ? e.target.value : null })
            }
          />
        </CTableDataCell>
      )
      break

    case 'birimmiktar':
      cellcontext = (
        <CTableDataCell className={(className, 'position-relative text-center')}>
          <CFormInput
            type="number"
            value={record[field]}
            size={'sm'}
            min={0}
            step={0.1}
            onChange={(e) => {
              handleFormChange({ fieldName: field, fieldValue: e ? e.target.value : null })
              getDataByRoute(`/malzemebase/birim/${record['malzemebaseId']}`).then((value) =>
                setBirimCinsi(value.ad),
              )
            }}
          ></CFormInput>
          <CBadge color="info" position="top" shape="rounded-pill">
            {birimFormat(birimcinsi, record[field])}
          </CBadge>
        </CTableDataCell>
      )
      break

    case 'yemekmiktar':
      cellcontext = (
        <CTableDataCell className={(className, 'position-relative text-center')}>
          <CFormInput
            type="number"
            value={record[field]}
            size={'sm'}
            min={0}
            step={1}
            onChange={(e) => {
              handleFormChange({ fieldName: field, fieldValue: e ? e.target.value : null })
              getDataByRoute(`/yemek/birim/${record['yemekId']}`).then((value) =>
                setBirimCinsi(value.ad),
              )
            }}
          ></CFormInput>
          <CBadge color="info" position="top" shape="rounded-pill">
            {birimcinsi}
          </CBadge>
        </CTableDataCell>
      )
      break

    case 'yemekmiktar_tavsiyeli':
      let badge = tavsiyeYemekMiktar + '->' + birimcinsi
      cellcontext = (
        <CTableDataCell className={(className, 'position-relative text-center')}>
          <CFormInput
            type="number"
            value={record[field]}
            size={'sm'}
            min={0}
            step={1}
            onChange={(e) => {
              handleFormChange({ fieldName: field, fieldValue: e ? e.target.value : null })
            }}
            onFocus={(e) => {
              getDataByRoute(`/yemek/birim/${record['yemekId']}`).then((value) => {
                setBirimCinsi(value.ad)
              })
              getTavsiyeYemekMiktar(`/rawdb/yemekmiktar/${record['butceperiodId']}`).then(
                (value) => {
                  if (value === 'undef') {
                    setTavsiyeYemekMiktar('#')
                  } else {
                    setTavsiyeYemekMiktar(parseInt(value[0].musteri_sayisi))
                  }
                },
              )
            }}
          ></CFormInput>
          <CTooltip content="1 Öğün için Tavsiyedir.">
            <CBadge color="info" position="top" shape="rounded-pill">
              {badge}
            </CBadge>
          </CTooltip>
        </CTableDataCell>
      )
      break

    case 'select':
      cellcontext = (
        <CTableDataCell className={className}>
          <Select
            defaultValue={options[options.findIndex((x) => x.value === record[field])]}
            placeholder="..."
            isClearable={false}
            isSearchable={true}
            options={options}
            menuPosition="fixed"
            menuPlacement="auto"
            styles={customStyles}
            onChange={(e) => handleFormChange({ fieldName: field, fieldValue: e ? e.value : null })}
          />
        </CTableDataCell>
      )
      break
    case 'select_malzeme':
      cellcontext = (
        <CTableDataCell className={className}>
          <Select
            isDisabled={true}
            defaultValue={options[options.findIndex((x) => x.value === record[field])]}
            placeholder="..."
            isClearable={false}
            isSearchable={true}
            options={options}
            menuPosition="fixed"
            menuPlacement="auto"
            styles={customStyles}
            onChange={(e) => handleFormChange({ fieldName: field, fieldValue: e ? e.value : null })}
          />
        </CTableDataCell>
      )
      break

    case 'currency':
      cellcontext = (
        <CTableDataCell className={(className, 'position-relative text-center')}>
          <NumericFormat
            allowNegative={false}
            thousandSeparator={true}
            allowedDecimalSeparators={[',', '.']}
            fixedDecimalScale
            allowLeadingZeros={false}
            decimalScale={2}
            customInput={CFormInput}
            size={'sm'}
            onValueChange={(e) =>
              handleFormChange({ fieldName: field, fieldValue: e ? e.value : null })
            }
          ></NumericFormat>
          <CBadge color="info" position="top" shape="rounded-pill">
            {currencyFormat(record[field])}
          </CBadge>
        </CTableDataCell>
      )
      break
    case 'currency_malzeme':
      cellcontext = (
        <CTableDataCell className={(className, 'position-relative text-center')}>
          <NumericFormat
            readOnly
            placeholder="Düzenleme Yapılamaz..."
            allowNegative={false}
            thousandSeparator={true}
            allowedDecimalSeparators={[',', '.']}
            fixedDecimalScale
            allowLeadingZeros={false}
            decimalScale={2}
            customInput={CFormInput}
            size={'sm'}
            onValueChange={(e) =>
              handleFormChange({ fieldName: field, fieldValue: e ? e.value : null })
            }
          ></NumericFormat>
          <CBadge color="info" position="top" shape="rounded-pill">
            {currencyFormat(record[field])}
          </CBadge>
        </CTableDataCell>
      )
      break

    case 'currency_tavsiyeli':
      cellcontext = (
        <CTableDataCell className={(className, 'position-relative text-center')}>
          <NumericFormat
            allowNegative={false}
            thousandSeparator={true}
            allowedDecimalSeparators={[',', '.']}
            fixedDecimalScale
            allowLeadingZeros={false}
            decimalScale={2}
            customInput={CFormInput}
            size={'sm'}
            onValueChange={(e) =>
              handleFormChange({ fieldName: field, fieldValue: e ? e.value : null })
            }
            onFocus={() => {
              getTavsiyeYemekMaliyet(
                `rawdb/yemekmaliyet/${record['yemekId']}/${record['butceperiodId']}`,
              ).then((value) => setTavsiyeMaliyet(value))
            }}
          ></NumericFormat>
          <CBadge color="info" position="top" shape="rounded-pill">
            {'Hes.Maliyet =' + currencyFormat(parseFloat(tavsiyeMaliyet).toFixed(2))}
          </CBadge>
        </CTableDataCell>
      )
      break

    case 'unchange':
      cellcontext = <CTableDataCell className={className}>{record[field]}</CTableDataCell>
      break

    case 'manuelid':
      cellcontext = <CTableDataCell className={className}>{record[field]}</CTableDataCell>
      break

    case 'hesapkod':
      let regex_hesapkod = /[0-9]d{1-10}/
      let regexforattribute_hesapkod = '[0-9]d{1-10}'
      cellcontext = (
        <CTableDataCell className={className}>
          <CForm validated>
            <CFormInput
              type="text"
              // placeholder="..."
              pattern={regexforattribute_hesapkod}
              size="sm"
              required
              maxlength="9"
              onKeyUp={(e) => onlyNumberInput(e, regex_hesapkod)}
              onChange={(e) =>
                handleFormChange({ fieldName: field, fieldValue: e ? e.target.value : null })
              }
            />
          </CForm>
        </CTableDataCell>
      )
      break

    case 'check':
      cellcontext = (
        <CTableDataCell className={className}>
          <CFormCheck
            checked={record[field]}
            onChange={(e) =>
              handleFormChange({ fieldName: field, fieldValue: e ? e.target.checked : null })
            }
          />
        </CTableDataCell>
      )
      break

    case 'approval':
      cellcontext = (
        <CTableDataCell className={className}>
          <CFormCheck
            checked={record[field]}
            onChange={(e) =>
              handleFormChange({ fieldName: field, fieldValue: e ? e.target.checked : null })
            }
          />
        </CTableDataCell>
      )
      break

    case 'textyear':
      const regex = /20[^0-1][0-9]/
      const regexforattribute = '20[^0-1][0-9]'
      cellcontext = (
        <CTableDataCell className={className}>
          <CForm validated>
            <CFormInput
              type="text"
              placeholder="20yy"
              size="sm"
              pattern={regexforattribute}
              required
              maxlength="4"
              onKeyUp={(e) => onlyNumberInput(e, regex)}
              onChange={(e) =>
                handleFormChange({ fieldName: field, fieldValue: e ? e.target.value : null })
              }
            />
          </CForm>
        </CTableDataCell>
      )
      break

    case 'password':
      let pwdHash
      cellcontext = (
        <CTableDataCell className={className}>
          <CFormInput
            type="password"
            onChange={(e) => {
              pwdHash = passwordHash(e.target.value)
              handleFormChange({ fieldName: field, fieldValue: pwdHash ? pwdHash : null })
            }}
          />
        </CTableDataCell>
      )
      break

    default:
      break
  }

  return cellcontext
}

export default TableDataCellEditable
