/* eslint-disable react/prop-types */
import { CForm } from '@coreui/react'
import React, { useState } from 'react'
import { FormCustomInputs, FormSaveButton } from './index'

const FormCustom = (props) => {
  const { tableinfo, setisShowModal, setRecordEdited } = props
  const [record, setRecord] = useState({})
  let keys = Object.keys(tableinfo.fields)
  let component_list = []

  return (
    <>
      <CForm className="row g-3">
        {keys.forEach(function (key) {
          component_list.push(
            <FormCustomInputs
              //key={tableinfo.fields[key].fieldName + 'editablerow'}
              type={tableinfo.fields[key].fieldType}
              field={tableinfo.fields[key].fieldEditableName}
              //badge={tableinfo.fields[key].badge}
              md={tableinfo.fields[key].md}
              header={tableinfo.fields[key].header}
              record={record}
              className={tableinfo.fields[key].className}
              options={tableinfo.fields[key].options}
              setRecord={setRecord}
            />,
          )
        })}
        {component_list.map((component) => (
          <>{component}</>
        ))}

        <FormSaveButton
          apiroute={tableinfo.apiSave}
          row={record}
          setisShowModal={setisShowModal}
          setRecordEdited={setRecordEdited}
        />
      </CForm>
    </>
  )
}

export default FormCustom
