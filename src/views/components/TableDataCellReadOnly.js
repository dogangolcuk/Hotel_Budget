/* eslint-disable react/prop-types */
import { CBadge, CTableDataCell } from '@coreui/react'
import React from 'react'
import { currencyFormat, percentFormat, safeTypeBoolean } from '../../util'
import tr from 'date-fns/locale/tr'
import { format } from 'date-fns'
import CIcon from '@coreui/icons-react'
import { cilThumbDown, cilThumbUp } from '@coreui/icons'
const stc = require('string-to-color')

const TableDataCellReadOnly = (props) => {
  const { type, field, badge, rowData, className } = props

  let cellcontext = null

  switch (type) {
    case 'text':
      cellcontext = <CTableDataCell className={className}>{rowData[field]}</CTableDataCell>
      break

    case 'password':
      cellcontext = <CTableDataCell className={className}>{rowData[field]}</CTableDataCell>
      break

    case 'date':
      cellcontext = (
        <CTableDataCell className={className}>
          {format(new Date(rowData[field]), 'dd/MMM/yyyy', { locale: tr })}
        </CTableDataCell>
      )
      break

    case 'percent':
      cellcontext = (
        <CTableDataCell className={className}>{percentFormat(rowData[field])}</CTableDataCell>
      )
      break

    case 'percent_fire':
      cellcontext = (
        <CTableDataCell className={className}>{percentFormat(rowData[field])}</CTableDataCell>
      )
      break

    case 'inflation':
      cellcontext = (
        <CTableDataCell className={className}>{percentFormat(rowData[field])}</CTableDataCell>
      )
      break

    case 'number':
      cellcontext = <CTableDataCell className={className}>{rowData[field]}</CTableDataCell>
      break

    case 'numbernonzero':
      cellcontext = <CTableDataCell className={className}>{rowData[field]}</CTableDataCell>
      break

    case 'birimmiktar':
      let birimad = badge?.split('.')
      if (
        safeTypeBoolean(rowData[birimad[0]]) &&
        safeTypeBoolean(rowData[birimad[0]][birimad[1]])
      ) {
        if (birimad) {
          cellcontext = (
            <CTableDataCell className={className}>
              <div>
                {rowData[field]}{' '}
                <b style={{ fontSize: '9px', color: 'green' }}>
                  {rowData[birimad[0]][birimad[1]][birimad[2]]}
                </b>
              </div>
            </CTableDataCell>
          )
        } else {
          cellcontext = <CTableDataCell className={className}>{rowData[field]}</CTableDataCell>
        }
      } else {
        cellcontext = <CTableDataCell className={className}>---</CTableDataCell>
      }

      break

    case 'yemekmiktar':
      let yemekbirimad = badge?.split('.')
      if (
        safeTypeBoolean(rowData[yemekbirimad[0]]) &&
        safeTypeBoolean(rowData[yemekbirimad[0]][yemekbirimad[1]])
      ) {
        if (yemekbirimad) {
          cellcontext = (
            <CTableDataCell className={className}>
              <div>
                {rowData[field]}{' '}
                <b style={{ fontSize: '9px', color: 'blue' }}>
                  {rowData[yemekbirimad[0]][yemekbirimad[1]][yemekbirimad[2]]}
                </b>
              </div>
            </CTableDataCell>
          )
        } else {
          cellcontext = <CTableDataCell className={className}>{rowData[field]}</CTableDataCell>
        }
      } else {
        cellcontext = <CTableDataCell className={className}>---</CTableDataCell>
      }

      break

    case 'yemekmiktar_tavsiyeli':
      let yemekbirimad1 = badge?.split('.')
      if (
        safeTypeBoolean(rowData[yemekbirimad1[0]]) &&
        safeTypeBoolean(rowData[yemekbirimad1[0]][yemekbirimad1[1]])
      ) {
        if (yemekbirimad1) {
          cellcontext = (
            <CTableDataCell className={className}>
              <div>
                {rowData[field]}{' '}
                <b style={{ fontSize: '9px', color: 'blue' }}>
                  {rowData[yemekbirimad1[0]][yemekbirimad1[1]][yemekbirimad1[2]]}
                </b>
              </div>
            </CTableDataCell>
          )
        } else {
          cellcontext = <CTableDataCell className={className}>{rowData[field]}</CTableDataCell>
        }
      } else {
        cellcontext = <CTableDataCell className={className}>---</CTableDataCell>
      }

      break

    case 'select':
      let modelnested = field.split('.')
      let badgedata = badge?.split('.')
      //butceperiod.butce.ad -->badge data
      //buteceperiod.ad  --> cell data
      if (
        safeTypeBoolean(rowData[modelnested[0]]) &&
        safeTypeBoolean(rowData[modelnested[0]][modelnested[1]])
      ) {
        if (badgedata) {
          cellcontext = modelnested[2] ? (
            <CTableDataCell className={className}>
              <div>{rowData[modelnested[0]][modelnested[1]][modelnested[2]]}</div>
              <div>
                <b
                  style={{
                    fontSize: '7px',
                    color: stc(rowData[badgedata[0]][badgedata[1]][badgedata[2]]),
                  }}
                >
                  {rowData[badgedata[0]][badgedata[1]][badgedata[2]]}
                </b>
              </div>
            </CTableDataCell>
          ) : (
            <CTableDataCell className={`${className}`}>
              <div>{rowData[modelnested[0]][modelnested[1]]} </div>
              <div
              // style={{
              //   backgroundColor: stc(rowData[badgedata[0]][badgedata[1]][badgedata[2]]),
              //   borderRadius: '55px',
              // }}
              >
                <b
                  style={{
                    fontSize: '7px',
                    color: stc(rowData[badgedata[0]][badgedata[1]][badgedata[2]]),
                  }}
                >
                  {rowData[badgedata[0]][badgedata[1]][badgedata[2]]}
                </b>
              </div>
            </CTableDataCell>
          )
        } else {
          cellcontext = modelnested[2] ? (
            <CTableDataCell className={className}>
              {rowData[modelnested[0]][modelnested[1]][modelnested[2]]}
            </CTableDataCell>
          ) : (
            <CTableDataCell className={className}>
              {rowData[modelnested[0]][modelnested[1]]}
            </CTableDataCell>
          )
        }
      } else {
        cellcontext = <CTableDataCell className={className}>---</CTableDataCell>
      }

      break

    case 'select_malzeme':
      let modelnested1 = field.split('.')
      let badgedata1 = badge?.split('.')
      if (
        safeTypeBoolean(rowData[modelnested1[0]]) &&
        safeTypeBoolean(rowData[modelnested1[0]][modelnested1[1]])
      ) {
        if (badgedata1) {
          cellcontext = modelnested1[2] ? (
            <CTableDataCell className={className}>
              <div>{rowData[modelnested1[0]][modelnested1[1]][modelnested1[2]]}</div>
              <div>
                <b
                  style={{
                    fontSize: '7px',
                    color: stc(rowData[badgedata1[0]][badgedata1[1]][badgedata1[2]]),
                  }}
                >
                  {rowData[badgedata1[0]][badgedata1[1]][badgedata1[2]]}
                </b>
              </div>
            </CTableDataCell>
          ) : (
            <CTableDataCell className={`${className}`}>
              <div>{rowData[modelnested1[0]][modelnested1[1]]} </div>
              <div>
                <b
                  style={{
                    fontSize: '7px',
                    color: stc(rowData[badgedata1[0]][badgedata1[1]][badgedata1[2]]),
                  }}
                >
                  {rowData[badgedata1[0]][badgedata1[1]][badgedata1[2]]}
                </b>
              </div>
            </CTableDataCell>
          )
        } else {
          cellcontext = modelnested1[2] ? (
            <CTableDataCell className={className}>
              {rowData[modelnested1[0]][modelnested1[1]][modelnested1[2]]}
            </CTableDataCell>
          ) : (
            <CTableDataCell className={className}>
              {rowData[modelnested1[0]][modelnested1[1]]}
            </CTableDataCell>
          )
        }
      } else {
        cellcontext = <CTableDataCell className={className}>---</CTableDataCell>
      }

      break

    case 'currency':
      cellcontext = (
        <CTableDataCell className={className}>{currencyFormat(rowData[field])}</CTableDataCell>
      )
      break

    case 'currency_malzeme':
      cellcontext = (
        <CTableDataCell className={className}>{currencyFormat(rowData[field])}</CTableDataCell>
      )
      break

    case 'currency_tavsiyeli':
      cellcontext = (
        <CTableDataCell className={className}>{currencyFormat(rowData[field])}</CTableDataCell>
      )
      break

    case 'unchange':
      cellcontext = (
        <CTableDataCell className={className}>
          <b>{rowData[field]}</b>
        </CTableDataCell>
      )
      break

    case 'manuelid':
      cellcontext = <CTableDataCell className={className}>{rowData[field]}</CTableDataCell>
      break

    case 'hesapkod':
      cellcontext = <CTableDataCell className={className}>{rowData[field]}</CTableDataCell>
      break

    case 'check':
      cellcontext = (
        <CTableDataCell className={className}>
          {rowData[field] ? (
            <CBadge color="success" shape="rounded-pill">
              {'AKTİF'}
            </CBadge>
          ) : (
            <CBadge color="danger" shape="rounded-pill">
              {'PASİF'}
            </CBadge>
          )}
        </CTableDataCell>
      )
      break

    case 'approval':
      cellcontext = (
        <CTableDataCell className={className}>
          {rowData[field] ? (
            <CBadge color="success" shape="rounded-pill">
              <CIcon icon={cilThumbUp} color="success" size={'sm'} />
            </CBadge>
          ) : (
            <CBadge color="danger" shape="rounded-pill">
              <CIcon icon={cilThumbDown} color="success" size={'sm'} />
            </CBadge>
          )}
        </CTableDataCell>
      )
      break

    case 'textyear':
      cellcontext = <CTableDataCell className={className}>{rowData[field]}</CTableDataCell>
      break

    default:
      cellcontext = <CTableDataCell className={className}>{rowData[field]}</CTableDataCell>
      break
  }
  return cellcontext
}

export default TableDataCellReadOnly
