const calcPermID = async (address1, address2) => {
  try {
    const adrs1 = address1.slice(2)
    const adrs2 = address2.slice(2)
    const order = adrs1.localeCompare(adrs2)
    const concacted = (order === 0 ? `${adrs1}${adrs2}` : `${adrs2}${adrs1}`)
    const
  } catch (err) {
    console.log('### error in calcPermID', err)
  }
}

module.exports = {
  calcPermID,
}
