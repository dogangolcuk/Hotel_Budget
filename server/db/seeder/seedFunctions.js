const db = require('..')
const fs = require('fs')
const path = require('path')

const createVF = async () => {
  const filepath = path.join(__dirname, 'dbfunctions.sql')
  const sqldata = await fs.readFileSync(filepath, 'utf8')
  await db.didSync.then(() => db.sync({ force: true }))
  try {
    await db.query(sqldata).then((result) => console.log('Fonksiyonlar oluşturuldu...'))
  } catch (error) {}
  await db.close()
}

createVF()
