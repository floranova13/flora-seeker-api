/* eslint-disable max-len */
this.window.onload = () => {
  Array.from(this.document.getElementsByClassName('request-entry')).forEach(button => {
    button.addEventListener('click', () => setRequestInfo(button.value))
  })

  if (this.document.getElementById('species-bar')) {
    Array.from(this.document.getElementsByClassName('species-button')).forEach(button => {
      button.addEventListener('click', () => setCollectionRequestButtons(button.value))
    })
  }
}

const setRequestInfo = val => {
  const labels = ['method', 'route', 'headers', 'body', 'description']
  const params = val.split(' ')

  labels.forEach(label => {
    this.document.getElementById(label).innerHTML = documentation[params[0]][parseInt(params[1])][label]
  })
}

const setCollectionRequestButtons = val => {
  Array.from(this.document.getElementsByClassName('request-entry')).forEach((button, i) => {
    button.value = `collection ${speciesIndex[val] + i}`
    button.addEventListener('click', () => setRequestInfo(button.value))
  })
  const spans = Array.from(this.document.getElementsByClassName('partial-route'))

  spans[0].innerHTML = `/collection/${val}`
  spans[1].innerHTML = `/collection/${val}/{name}`
  spans[2].innerHTML = `/collection/${val}`
  spans[3].innerHTML = `/collection/${val}/{name}`
}

const speciesIndex = {
  falshrooms: 1,
  flesherfungi: 5,
  flourishflora: 9,
  maremolds: 13,
  trees: 17,
  waveskellen: 21
}
