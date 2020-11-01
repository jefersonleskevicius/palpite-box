import { process } from 'autoprefixer'
import { GoogleSpreadsheet, GoogleSpreadSheet } from 'google-spreadsheet'

// const doc = new GoogleSpreadsheet(process.env.SHEET_DOC_ID)

export default async (req, res) => {

  console.log(process.env.VAR1)
  return 1

  try {
    await doc.useServiceAccountAuth({
      client_email: process.env.SHEET_CLIENT_EMAIL,
      client_private_key: process.env.SHEET_CLIENT_PRIVATE_KEY
    })
    await doc.loadInfo()

    const sheet = doc.sheetsByIndex[2]
    await sheet.loadCells('A2:B2')

    const mostrarPromocaoCell = sheet.getCell(1, 0)
    const textoCell = sheet.getCell(1, 1)

    res.end(JSON.stringify({
      showCoupon: mostrarPromocaoCell.value === 'VERDADEIRO',
      message: textoCell.value
    }))
  } catch (err) {
    console.log(err)
    res.end(JSON.stringify({
      showCoupon: false,
      message: ''
    }))
  }


}