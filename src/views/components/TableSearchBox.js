/* eslint-disable react/prop-types */
import { cilX } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CButton, CFormInput, CInputGroup, CTooltip } from '@coreui/react'
import React, { useEffect, useRef, useState } from 'react'
import { handleSearch, justNumbers } from '../../util'

const TableSearchBox = (props) => {
  const { apiSearchRoute, fields } = props
  // const [searchTerm, setSearchTerm] = useState({ id: -1, gelir_miktar: -1, gider_miktar: -1 })
  const [searchTerm, setSearchTerm] = useState({})

  const searchBoxRef = useRef()

  useEffect(() => {
    handleSearch(apiSearchRoute, searchTerm, props)
  }, [searchTerm])

  const searchFull = (fields, value) => {
    let searchcontext = {}

    for (let field in fields) {
      switch (fields[field]) {
        case 'text':
          searchcontext[field] = value.trim()
          break
        case 'number':
          searchcontext[field] = justNumbers(value)
          break
        default:
          break
      }
      setSearchTerm(searchcontext)
    }
  }

  const handleChange = (e) => {
    e.target.value === ''
      ? props.setOrderField({ model: 'self', field: 'id', ascdesc: 'DESC' })
      : searchFull(fields, e.target.value)

    // handleSearch(apiSearchRoute, searchTerm, props)
  }

  return (
    <>
      <CInputGroup className="w-100">
        <CFormInput
          ref={searchBoxRef}
          type="search"
          placeholder="Ara..."
          onChange={(e) => handleChange(e)}
        ></CFormInput>
        <CTooltip content="Temizle">
          <CButton
            variant="outline"
            color="danger"
            shape="rounded-end"
            onClick={() => {
              searchBoxRef.current.value = ''
              props.setOrderField({ model: 'self', field: 'id', ascdesc: 'DESC' })
              props.setSearchState({})
            }}
          >
            <CIcon icon={cilX} size={'sm'} />
          </CButton>
        </CTooltip>
      </CInputGroup>
    </>
  )
}

export default TableSearchBox
