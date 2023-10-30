import axios from 'axios'
import { percentFormat } from './CommonTools'

let tokendata = localStorage.getItem('tokenbilgisi')
let stokendata = localStorage.getItem('stokenbilgisi')

axios.defaults.headers.common['Authorization'] = `Bearer ${tokendata}`
axios.defaults.headers.common['sAuthorization'] = `Bearer ${stokendata}`

const handleDeleteClick = async (apiroute, id, searchState, apisearch, props) => {
  await axios
    .delete('/api' + apiroute + '/' + id)
    .then((result) => {
      alert('Kayıt Silindi')
      if (Object.keys(searchState).length === 0) {
        props.setRecordDeleted((state) => !state)
      } else {
        protectCurrentState(apisearch, searchState, props)
      }
    })
    .catch((err) => {
      alert('Silmeye çalıştığınız kayıt başka kayıtlara bağlı olabilir.')
    })
}

const protectCurrentState = async (apisearch, searchState, props) => {
  await axios
    .post('/api' + apisearch, searchState)
    .then((result) => {
      props.setData(result.data)
    })
    .catch((error) => {})
}

const handleSaveClick = async (apiroute, row, props) => {
  await axios
    .post('/api' + apiroute, row)
    .then(() => {
      props.setisShowModal(false)
      props.setRecordEdited((state) => !state)
    })
    .catch((error) => {})
}

const handleSaveClickForEditableRow = async (apiroute, row, searchState, apisearch, props) => {
  await axios
    .post('/api' + apiroute, row)
    .then((result) => {
      if (Object.keys(searchState).length === 0) {
        props.setRecordEdited((state) => !state)
      } else {
        protectCurrentState(apisearch, searchState, props)
      }
      props.setRecord({})
      props.setEditRowId(null)
    })
    .catch((error) => {})
}

const handleSearch = async (apiSearchRoute, searchTerm, props) => {
  await axios
    .post('/api' + apiSearchRoute, searchTerm)
    .then((result) => {
      props.setData(result.data)
      props.setSearchState(searchTerm)
    })
    .catch((error) => {})
}

const savebyRoute = async (apiroute, row) => {
  await axios
    .post('/api' + apiroute, row)
    .then((result) => {})
    .catch((error) => {})
}

const deletebyRoute = async (apiroute, id) => {
  await axios
    .delete('/api' + apiroute + '/' + id)
    .then((result) => {
      alert('Kayıt Silindi')
    })
    .catch((err) => {})
}

const getOrderedDataForTable = async (apiroute, orderfields) => {
  try {
    return (await axios.post('/api' + apiroute, orderfields)).data
  } catch (error) {}
}

const getDataByRoute = async (apiroute) => {
  try {
    return (await axios.get('/api' + apiroute)).data
  } catch (error) {}
}

const getDataByRoute2 = async (apiroute) => {
  try {
    return await axios.get('/api' + apiroute)
  } catch (error) {}
}

const getTavsiyeYemekMaliyet = async (apiroute) => {
  try {
    return (await axios.get('/api' + apiroute)).data
  } catch (error) {}
}

const getTavsiyeYemekMiktar = async (apiroute) => {
  try {
    return (await axios.get('/api' + apiroute)).data
  } catch (error) {}
}

const getSelectOptions = async (apiroute) => {
  try {
    const { data } = await axios.get('/api' + apiroute)
    const optionsdata = data.map((opt) => {
      if (opt !== undefined && opt !== null) {
        return {
          label: opt.ad,
          value: opt.id,
        }
      } else {
        return { label: '..', value: '..' }
      }
    })
    return optionsdata
  } catch (error) {}
}

const getSelectOptions2 = async (apiroute) => {
  try {
    const { data } = await axios.get('/api' + apiroute)
    const optionsdata = data.map((opt) => {
      if (opt !== undefined && opt !== null) {
        return {
          label: opt.butceperiod.ad + '-->' + percentFormat(opt.duzeltme_oran),
          value: opt.id,
        }
      } else {
        return { label: '..', value: '..' }
      }
    })
    return optionsdata
  } catch (error) {}
}
const getSelectOptions3 = async (apiroute) => {
  try {
    const { data } = await axios.get('/api' + apiroute)
    const optionsdata = data.map((opt) => {
      if (opt !== undefined && opt !== null) {
        return {
          label: opt.ad + ' ' + opt.soyad,
          value: opt.id,
        }
      } else {
        return { label: '..', value: '..' }
      }
    })
    return optionsdata
  } catch (error) {}
}

const handleLogin = async (logindata, setErrMsg, navigate) => {
  await axios
    .post('/api/login', logindata)
    .then((result) => {
      let token = result.data[0]
      let tenantAd = result.data[1]
      localStorage.setItem('tokenbilgisi', token)
      localStorage.setItem('organization', tenantAd)
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      //TODOBurası global state redux ile değiştir.
      sessionStorage.setItem('bilet', '6d66c744-915d-4567-bdd7-cece1d4a75a8')
      //window.location.href = '#/dashboard'
      // navigate('/dashboard')
      window.open('#/dashboard', '_blank')
      // window.refresh()
    })
    .catch((error) => {
      localStorage.setItem('tokenbilgisi', null)
      localStorage.setItem('organization', null)

      //TODO Burası global state redux ile değiştir.
      sessionStorage.setItem('bilet', false)
      setErrMsg('Giriş Başarısız!!!')
    })
}

const handleSuperAdminLogin = async (logindata, setErrMsg, navigate) => {
  await axios
    .post('/api/superadminlogin', logindata)
    .then((result) => {
      let token = result.data[0]
      let tenantAd = result.data[1]
      localStorage.setItem('stokenbilgisi', token)
      localStorage.setItem('sorganization', tenantAd)
      axios.defaults.headers.common['sAuthorization'] = `Bearer ${token}`
      //TODOBurası global state redux ile değiştir.
      sessionStorage.setItem('sbilet', 'b0a68f5b-6063-47dc-8593-beb20e831e17')
      // navigate('/superadmin')
      window.open('#/superadmin', '_blank')
    })
    .catch((error) => {
      localStorage.setItem('stokenbilgisi', null)
      localStorage.setItem('sorganization', null)
      //TODO Burası global state redux ile değiştir.
      sessionStorage.setItem('sbilet', false)
      setErrMsg('Giriş Başarısız!!!')
    })
}
export {
  getOrderedDataForTable,
  getSelectOptions,
  getSelectOptions2,
  getSelectOptions3,
  getDataByRoute,
  getTavsiyeYemekMaliyet,
  getTavsiyeYemekMiktar,
  getDataByRoute2,
  handleDeleteClick,
  handleSaveClick,
  handleSaveClickForEditableRow,
  handleSearch,
  savebyRoute,
  deletebyRoute,
  handleLogin,
  handleSuperAdminLogin,
}
