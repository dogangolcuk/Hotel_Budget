import React, { useEffect, useState } from 'react'
import CIcon from '@coreui/icons-react'
import { cilBurn } from '@coreui/icons'

import { CAlert, CAlertHeading, CCard, CCardBody, CCardTitle } from '@coreui/react'
import { getOrderedDataForTable, getSelectOptions } from '../../../util'
import { TableCustom } from '../../components'

const ButcePeriodView = () => {
  const [data, setData] = useState([])
  const [butceSelectData, setButceSelectData] = useState([])

  const [orderField, setOrderField] = useState({ model: 'self', field: 'id', ascdesc: 'DESC' })
  const [recordEdited, setRecordEdited] = useState(false)
  const [recordDeleted, setRecordDeleted] = useState(false)
  const [alertVisible, setalertVisible] = useState(true)
  const tableinfo = {
    tablecaption: 'Bütçe Periodları',
    apiSearch: '/butceperiod/search',
    apiOrder: '/butceperiod/order',
    apiSave: '/butceperiod',
    apiDelete: '/butceperiod',
    argSearch: {
      id: 'number',
      ad: 'text',
      tahmini_enflasyon: 'number',
      butcead: 'text',
    },
    fields: {
      id: {
        model: 'self',
        header: '#',
        fieldEditableName: 'id',
        fieldReadOnlyName: 'id',
        fieldType: 'unchange',
        className: 'col-1',
        md: '0',
      },
      ad: {
        model: 'self',
        header: 'Period Adı',
        fieldEditableName: 'ad',
        fieldReadOnlyName: 'ad',
        fieldType: 'text',
        className: 'col-2',
        md: '4',
      },
      baslama_tarihi: {
        model: 'self',
        header: 'Başlangıç Tarihi',
        fieldEditableName: 'baslama_tarihi',
        fieldReadOnlyName: 'baslama_tarihi',
        fieldType: 'date',
        className: 'col-2',
        md: '4',
      },
      bitis_tarihi: {
        model: 'self',
        header: 'Bitiş Tarihi',
        fieldEditableName: 'bitis_tarihi',
        fieldReadOnlyName: 'bitis_tarihi',
        fieldType: 'date',
        className: 'col-2',
        md: '4',
      },
      tahmini_enflasyon: {
        model: 'self',
        header: 'Enflasyon Beklentisi',
        fieldEditableName: 'tahmini_enflasyon',
        fieldReadOnlyName: 'tahmini_enflasyon',
        fieldType: 'inflation',
        className: 'col-1',
        md: '4',
      },
      butceId: {
        model: 'Butce',
        header: 'Bağlı Bütçe',
        fieldEditableName: 'butceId',
        fieldReadOnlyName: 'butce.ad',
        fieldType: 'select',
        className: 'col-3',
        options: butceSelectData,
        md: '8',
      },
    },
  }

  useEffect(() => {
    getSelectOptions('/butce/forselect').then((value) => setButceSelectData(value))
  }, [])

  useEffect(() => {
    getOrderedDataForTable(tableinfo.apiOrder, orderField).then((data) => setData(data))
  }, [orderField, recordDeleted, recordEdited, tableinfo.apiOrder])

  return (
    <>
      <CCard className="mb-3" style={{ display: 'block', height: '700px', overflowY: 'auto' }}>
        <CCardTitle>
          <CAlert
            className="text-center"
            color="danger"
            dismissible
            visible={alertVisible}
            onClose={() => setalertVisible(false)}
          >
            <CAlertHeading tag="h4">
              <CIcon icon={cilBurn} className="flex-shrink-0 me-2" width={24} height={24} />
              Enflasyon Beklentilerini <b>BÜTÇE BAŞLANGICI</b>
              {"'"}nı baz alarak giriniz.!!!
            </CAlertHeading>
            <p>
              Örneğin; Bütçe başlangıcını Ocak ayını baz alırsanız,Ocak ayının 100 birim parası
              Ağustos ayı için girdiğiniz %33 enflasyon tahminiyle 133 birim paraya denktir.
            </p>
            <p className="mb-0">
              Her enflasyon tahminini bir önceki bütçe perioduna göre değil BÜTÇE BAŞLANGICI
              {"'"}na göre giriniz. Örneğin Ağustos ayı için Hazirana göre fiyat artışını değil
              bütçe başlanıcı olarak alınan Ocak ayından itibaren olan 7 aylık olan enflasyon
              tahmininizi giriniz!!!
            </p>
          </CAlert>
        </CCardTitle>
        <CCardBody>
          <TableCustom
            data={data}
            tableinfo={tableinfo}
            setOrderField={setOrderField}
            setData={setData}
            setRecordEdited={setRecordEdited}
            setRecordDeleted={setRecordDeleted}
          />
        </CCardBody>
      </CCard>
    </>
  )
}

export default ButcePeriodView
