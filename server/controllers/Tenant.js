const { Tenant } = require('../db/models')
const { Op } = require('sequelize')

const getTenantAll = async () => {
  return await Tenant.findAll({
    order: [['id', 'DESC']],
  })
}

const getTenantAllOrdered = async (orderby) => {
  const { model, field, ascdesc } = orderby
  let ordercontext = null
  switch (model) {
    case 'self':
      ordercontext = [[`${field}`, `${ascdesc}`]]
      break
    default:
      break
  }
  return await Tenant.findAll({
    order: ordercontext,
  })
}

const getTenantAllFieldSearch = async (searchterms) => {
  const { id, ad, url } = searchterms

  return await Tenant.findAll({
    where: {
      [Op.or]: [
        { id: { [Op.eq]: `${id}` } },
        { ad: { [Op.iLike]: `%${ad}%` } },
        { url: { [Op.iLike]: `%${url}%` } },
      ],
    },
    order: [['id', 'DESC']],
  })
}

const getTenant = async (id) => {
  return await Tenant.findByPk(id)
}

const getTenantForSelect = async () => {
  return await Tenant.findAll({
    attributes: ['id', 'ad'],
    order: [['id', 'DESC']],
  })
}

const saveTenant = async (data) => {
  const { id, ad, url } = data

  if (id && id > 0) {
    const row = await Tenant.findByPk(id)
    row.ad = ad
    row.url = url
    await row.save()
    return row
  } else {
    return await Tenant.create({
      ad: ad,
      url: url,
    })
  }
}

const delTenant = async (id) => {
  const row = await Tenant.findByPk(id)
  return row.destroy()
}

module.exports = {
  getTenantAll,
  getTenant,
  saveTenant,
  delTenant,
  getTenantAllFieldSearch,
  getTenantForSelect,
  getTenantAllOrdered,
}
