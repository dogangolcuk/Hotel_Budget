const jwt = require('jsonwebtoken')
const { rawdb } = require('../db/models')
// require('dotenv').config()
require('dotenv').config({ path: __dirname + '/../../.env' })

const getUserByName = async (namex) => {
  const { username } = namex
  return await rawdb.query(
    `SELECT u.ad as userad, u.email, u.pwd,u.tenant_id
    FROM public.user u
    WHERE u.ad=:_name`,
    {
      replacements: { _name: username },
      type: rawdb.QueryTypes.SELECT,
    },
  )
}

const getVerifyToken = async (token) => {
  const decodedToken = jwt.verify(token, process.env.SECRET_KEY)
  return decodedToken
}

module.exports = {
  getUserByName,
  getVerifyToken,
}
