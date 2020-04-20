this.window.onload = () => {
  Array.from(this.document.getElementsByClassName('species-button')).forEach(button => {
    button.addEventListener('click', () => setCollectionRequestButtons(button.value))
  })
}

const setCollectionRequestButtons = val => {
  Array.from(this.document.getElementsByClassName('request-entry')).forEach((button, i) => {
    button.value = `collection ${speciesIndex[val] + i}`
  })
  const spans = Array.from(this.document.getElementsByClassName('partial-route'))

  spans[0] = `/collection/${val}`
  spans[1] = `/collection/${val}/{name}`
  spans[2] = `/collection/${val}`
  spans[3] = `/collection/${val}/{name}`
}

const speciesIndex = {
  falshrooms: 1,
  flesherfungi: 5,
  flourishflora: 9,
  maremolds: 13,
  trees: 17,
  waveskellen: 21
}
