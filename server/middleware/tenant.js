const database = require('../db/index')
//Bu middleware authenticate middleware içine gömüldü.
module.exports = (req, res, next) => {
  // const tenant_id = req.tenant_id;
  const tenant_id = req.tenantId
  if (!tenant_id) {
    return res.status(401).send('Yetki yok!')
  }
  try {
    database.options.tenantId = tenant_id
    database.options.tenant_safe = false
    req.tenantId = tenant_id
    next()
  } catch (err) {
    res.status(401).send('Yanlış yetki girişi!')
  }
}
