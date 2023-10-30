const Hooks = {
  beforeCreate: [],
  beforeUpdate: [],
  beforeFind(query) {
    if (
      this.sequelize.options.tenantId &&
      !this.options.disableMultitenant &&
      !this.sequelize.options.tenant_safe
    ) {
      query.where = Object.assign({}, query.where, {
        tenantId: this.sequelize.options.tenantId,
      })
    }
  },
  beforeSave: [],
  beforeBulkCreate: [],
  beforeBulkUpdate: [],
  beforeBulkDestroy: [],
  beforeValidate(instance, options) {
    if (
      this.sequelize.options.tenantId &&
      !this.options.disableMultitenant &&
      !this.sequelize.options.tenant_safe
    ) {
      instance.tenantId = this.sequelize.options.tenantId
    }
  },
  afterCreate: [],
  afterUpdate: [],
  afterFind: [],
  afterFindAll: [],
  afterBulkCreate: [],
  afterBulkUpdate: [],
  afterBulkDestroy: [],
  afterValidate: [],
  beforeDestroy: [],
  //TODO beforeQuery ile raw querylere multi tenant özelliği kat.
  // beforeQuery(options, query) {
  //   // if (query.type === "RAW") {
  //   // Modify the query object here
  //   // query.where = { ...query.where, tenantId: "1" };

  //   query = query + "where tenant_id=1";
  //   // }
  //   // query = Object.assign(
  //   //   query,
  //   //   // tenantId: this.sequelize.options.tenantId && null,
  //   //   "where tenant_id=1 "
  //   // );
  // },
}
module.exports = Hooks
