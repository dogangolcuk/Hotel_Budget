/* eslint-disable react/prop-types */
import { CBadge, CCol, CForm, CFormCheck, CFormInput, CFormLabel, CTooltip } from '@coreui/react'
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

const FormCustomInputs = (props) => {
  const { type, field, header, md, record, options } = props
  const [birimcinsi, setBirimCinsi] = useState('Birim')
  const [tavsiyeYemekMaliyet, setTavsiyeYemekMaliyet] = useState('0')
  const [tavsiyeYemekMiktar, setTavsiyeYemekMiktar] = useState('0')

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
        <>
          <CCol md={md}>
            <CFormLabel>{header}</CFormLabel>
            <CFormInput
              type="text"
              placeholder="..."
              onChange={(e) =>
                handleFormChange({ fieldName: field, fieldValue: e ? e.target.value : null })
              }
            />
          </CCol>
        </>
      )
      break

    case 'date':
      cellcontext = (
        <CCol md={md}>
          <CFormLabel>{header}</CFormLabel>
          <CFormInput
            type="date"
            onChange={(e) =>
              handleFormChange({ fieldName: field, fieldValue: e ? e.target.value : null })
            }
          />
        </CCol>
      )
      break

    case 'percent':
      cellcontext = (
        <CCol md={md}>
          <CForm validated>
            <CFormLabel>{header}</CFormLabel>
            <CFormInput
              type="number"
              placeholder="..."
              min={0}
              max={1}
              step={0.01}
              defaultValue={1}
              onChange={(e) =>
                handleFormChange({ fieldName: field, fieldValue: e ? e.target.value : null })
              }
            />
          </CForm>
        </CCol>
      )
      break
    case 'percent_fire':
      cellcontext = (
        <CCol md={md}>
          <CForm validated>
            <CFormLabel>{header}</CFormLabel>
            <CFormInput
              type="number"
              placeholder="..."
              min={0}
              max={1}
              step={0.01}
              defaultValue={0}
              onChange={(e) =>
                handleFormChange({ fieldName: field, fieldValue: e ? e.target.value : null })
              }
            />
          </CForm>
        </CCol>
      )
      break

    case 'inflation':
      cellcontext = (
        <CCol md={md}>
          <CFormLabel>{header}</CFormLabel>
          <CFormInput
            type="number"
            step={0.01}
            onChange={(e) =>
              handleFormChange({ fieldName: field, fieldValue: e ? e.target.value : null })
            }
          />
        </CCol>
      )
      break

    case 'number':
      cellcontext = (
        <CCol md={md}>
          <CFormLabel>{header}</CFormLabel>
          <CFormInput
            type="number"
            min={0}
            step={1}
            onChange={(e) =>
              handleFormChange({ fieldName: field, fieldValue: e ? e.target.value : null })
            }
          />
        </CCol>
      )
      break

    case 'numbernonzero':
      cellcontext = (
        <CCol md={md}>
          <CFormLabel>{header}</CFormLabel>
          <CFormInput
            type="number"
            min={1}
            step={1}
            onChange={(e) =>
              handleFormChange({ fieldName: field, fieldValue: e ? e.target.value : null })
            }
          />
        </CCol>
      )
      break

    case 'birimmiktar':
      cellcontext = (
        <CCol md={md}>
          <div className={'position-relative'}>
            <CFormLabel>{header}</CFormLabel>
            <CBadge color="info" position="bottom" shape="rounded-pill">
              {birimFormat(birimcinsi, record[field])}
            </CBadge>
          </div>

          <CFormInput
            type="number"
            min={0}
            step={0.1}
            onChange={(e) => {
              handleFormChange({ fieldName: field, fieldValue: e ? e.target.value : null })
              getDataByRoute(`/malzemebase/birim/${record['malzemebaseId']}`).then((value) =>
                setBirimCinsi(value.ad),
              )
            }}
          ></CFormInput>
        </CCol>
      )

      break

    case 'yemekmiktar':
      cellcontext = (
        <CCol md={md}>
          <div className={'position-relative'}>
            <CFormLabel>{header}</CFormLabel>
            <CBadge color="info" position="bottom" shape="rounded-pill">
              {birimcinsi}
            </CBadge>
          </div>

          <CFormInput
            type="number"
            min={0}
            step={1}
            onChange={(e) => {
              handleFormChange({ fieldName: field, fieldValue: e ? e.target.value : null })
              getDataByRoute(`/yemek/birim/${record['yemekId']}`).then((value) =>
                setBirimCinsi(value.ad),
              )
            }}
          ></CFormInput>
        </CCol>
      )

      break

    case 'yemekmiktar_tavsiyeli':
      let badge = tavsiyeYemekMiktar + '->' + birimcinsi
      cellcontext = (
        <CCol md={md}>
          <div className={'position-relative'}>
            <CFormLabel>{header}</CFormLabel>
            <CTooltip content="1 Öğün için Tavsiyedir.">
              <CBadge color="info" position="bottom" shape="rounded-pill">
                {badge}
              </CBadge>
            </CTooltip>
          </div>

          <CFormInput
            type="number"
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
        </CCol>
      )

      break

    case 'select':
      if (md === '0') {
        cellcontext = <></>
      } else {
        cellcontext = (
          <CCol md={md}>
            <CFormLabel>{header}</CFormLabel>
            <Select
              placeholder="..."
              isClearable={true}
              isSearchable={true}
              menuPosition="fixed"
              menuPlacement="auto"
              defaultValue={null}
              options={options}
              onChange={(e) =>
                handleFormChange({ fieldName: field, fieldValue: e ? e.value : null })
              }
            />
          </CCol>
        )
      }
      break

    case 'currency':
      cellcontext = (
        <CCol md={md}>
          <CFormLabel>{header}</CFormLabel>
          <NumericFormat
            allowNegative={false}
            thousandSeparator={true}
            allowedDecimalSeparators={[',', '.']}
            fixedDecimalScale
            allowLeadingZeros={false}
            decimalScale={2}
            customInput={CFormInput}
            onValueChange={(e) =>
              handleFormChange({ fieldName: field, fieldValue: e ? e.value : null })
            }
          ></NumericFormat>
        </CCol>
      )
      break

    case 'currency_malzeme':
      cellcontext = <CFormLabel>Fiyat Girişleri Burada Kapalıdır...</CFormLabel>
      break

    case 'currency_tavsiyeli':
      cellcontext = (
        <CCol md={md}>
          <div className={'position-relative'}>
            <CFormLabel>{header}</CFormLabel>
            <CBadge color="info" position="bottom" shape="rounded-pill">
              {'Hesaplanan Maliyet =' + currencyFormat(parseFloat(tavsiyeYemekMaliyet).toFixed(2))}
            </CBadge>
          </div>
          <NumericFormat
            placeholder="..."
            allowNegative={false}
            thousandSeparator={true}
            allowedDecimalSeparators={[',', '.']}
            fixedDecimalScale
            allowLeadingZeros={false}
            decimalScale={2}
            customInput={CFormInput}
            onValueChange={(e) => {
              handleFormChange({ fieldName: field, fieldValue: e ? e.value : null })
            }}
            onFocus={() => {
              getTavsiyeYemekMaliyet(
                `rawdb/yemekmaliyet/${record['yemekId']}/${record['butceperiodId']}`,
              ).then((value) => setTavsiyeYemekMaliyet(value))
            }}
          ></NumericFormat>
        </CCol>
      )
      break

    case 'unchange':
      cellcontext = <></>
      break

    case 'manuelid':
      let regex_manuelid = /[0-9]d{1-10}/
      let regexforattribute_manuelid = '[0-9]d{1-10}'
      cellcontext = (
        <>
          <CCol md={md}>
            <CForm validated>
              <CFormLabel>{header}</CFormLabel>
              <CFormInput
                type="text"
                placeholder="ID..."
                pattern={regexforattribute_manuelid}
                required
                maxlength="9"
                onKeyUp={(e) => onlyNumberInput(e, regex_manuelid)}
                onChange={(e) =>
                  handleFormChange({ fieldName: field, fieldValue: e ? e.target.value : null })
                }
              />
            </CForm>
          </CCol>
        </>
      )
      break

    case 'hesapkod':
      let regex_hesapkod = /[0-9]d{1-10}/
      let regexforattribute_hesapkod = '[0-9]d{1-10}'
      cellcontext = (
        <>
          <CCol md={md}>
            <CForm validated>
              <CFormLabel>{header}</CFormLabel>
              <CFormInput
                type="text"
                placeholder="..."
                pattern={regexforattribute_hesapkod}
                required
                maxlength="9"
                onKeyUp={(e) => onlyNumberInput(e, regex_hesapkod)}
                onChange={(e) =>
                  handleFormChange({ fieldName: field, fieldValue: e ? e.target.value : null })
                }
              />
            </CForm>
          </CCol>
        </>
      )
      break

    case 'check':
      if (md === '0') {
        cellcontext = <></>
      } else {
        cellcontext = (
          <CCol md={md}>
            <CFormLabel>{header}</CFormLabel>
            <CFormCheck
              onChange={(e) =>
                handleFormChange({ fieldName: field, fieldValue: e ? e.target.checked : null })
              }
            />
          </CCol>
        )
      }
      break

    case 'approval':
      if (md === '0') {
        cellcontext = <></>
      } else {
        cellcontext = (
          <CCol md={md}>
            <CFormLabel>{header}</CFormLabel>
            <CFormCheck
              onChange={(e) =>
                handleFormChange({ fieldName: field, fieldValue: e ? e.target.checked : null })
              }
            />
          </CCol>
        )
      }
      break

    case 'textyear':
      let regex_textyear = /20[^0-1][0-9]/
      let regexforattribute_textyear = '20[^0-1][0-9]'
      cellcontext = (
        <>
          <CCol md={md}>
            <CForm validated>
              <CFormLabel>{header}</CFormLabel>
              <CFormInput
                type="text"
                placeholder="20yy"
                pattern={regexforattribute_textyear}
                required
                maxlength="4"
                onKeyUp={(e) => onlyNumberInput(e, regex_textyear)}
                onChange={(e) =>
                  handleFormChange({ fieldName: field, fieldValue: e ? e.target.value : null })
                }
              />
            </CForm>
          </CCol>
        </>
      )
      break

    case 'password':
      let pwdHash
      cellcontext = (
        <>
          <CCol md={md}>
            <CFormLabel>{header}</CFormLabel>
            <CFormInput
              type="password"
              onChange={(e) => {
                pwdHash = passwordHash(e.target.value)
                handleFormChange({ fieldName: field, fieldValue: pwdHash ? pwdHash : null })
              }}
            />
          </CCol>
        </>
      )
      break

    default:
      break
  }

  return cellcontext
}

export default FormCustomInputs
