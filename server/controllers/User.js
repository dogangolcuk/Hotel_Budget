const { User, Tenant } = require('../db/models')
const { Op } = require('sequelize')

const getUserAll = async () => {
  return await User.findAll({
    include: {
      model: Tenant,
      as: 'tenant',
    },
    order: [['id', 'DESC']],
  })
}

const getUserAllOrdered = async (orderby) => {
  const { model, field, ascdesc } = orderby
  let ordercontext = null
  switch (model) {
    case 'self':
      ordercontext = [[`${field}`, `${ascdesc}`]]
      break
    case 'Tenant':
      ordercontext = [[{ model: Tenant }, `${field}`, `${ascdesc}`]]
      break
    default:
      break
  }
  return await User.findAll({
    include: {
      model: Tenant,
      as: 'tenant',
    },
    order: ordercontext,
  })
}

const getUserAllFieldSearch = async (searchterms) => {
  const { id, ad, email } = searchterms

  return await User.findAll({
    include: [
      {
        model: Tenant,
        as: 'tenant',
      },
    ],
    where: {
      [Op.or]: [
        { id: { [Op.eq]: `${id}` } },
        { ad: { [Op.iLike]: `%${ad}%` } },
        { email: { [Op.iLike]: `%${email}%` } },
      ],
    },
    order: [['id', 'DESC']],
  })
}

const getUser = async (id) => {
  return await User.findByPk(id, {
    include: {
      model: Tenant,
    },
  })
}

const getUserForSelect = async () => {
  return await User.findAll({
    include: [
      {
        model: Tenant,
        as: 'tenant',
      },
    ],
    attributes: ['id', 'ad'],
    order: [['id', 'DESC']],
  })
}

const saveUser = async (data) => {
  const { id, ad, email, pwd, tenantId } = data

  if (id && id > 0) {
    const row = await User.findByPk(id)
    row.ad = ad
    row.email = email
    row.pwd = pwd
    row.tenantId = tenantId
    await row.save()
    return row
  } else {
    return await User.create({
      ad: ad,
      email: email,
      pwd: pwd,
      tenantId: tenantId,
    })
  }
}

const delUser = async (id) => {
  const row = await User.findByPk(id)
  return row.destroy()
}

module.exports = {
  getUserAll,
  getUser,
  saveUser,
  delUser,
  getUserAllFieldSearch,
  getUserForSelect,
  getUserAllOrdered,
}
