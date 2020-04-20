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

const documentation = {
  index:
    [
      {
        method: 'GET',
        route: '/',
        headers: '',
        body: '',
        description: 'Returns the basic information for the Seeker Division Database. [CHANGE]'
      }
    ],
  seekers:
    [
      {
        method: 'GET',
        route: '/seekers',
        headers: '',
        body: '',
        description: 'Returns a list of all seekers.'
      },
      {
        method: 'GET',
        route: '/seekers/{id}',
        headers: '',
        body: '',
        description: 'Returns the seeker associated with the numeric id  provided in the route.'
      },
      {
        method: 'POST',
        route: '/seekers',
        headers: 'Content-Type: application/json',
        body: '{ “id”: “0”, “name”: “Lillium”, “age”: “19”, “gender”: “Other”, “section”: “Seeker Ardent”, "lodestar": “true” }',
        description: 'Creates a new seeker from the data provided in the body.'
      },
      {
        method: 'DELETE',
        route: '/seekers/{id}',
        headers: '',
        body: '',
        description: 'Deletes the seeker associated with the numeric id provided in the route unless it is a ‘lodestar’ seeker.'
      }
    ],
  collection:
    [
      {
        method: 'GET',
        route: '/collection',
        headers: '',
        body: '',
        description: 'Returns a description of the collection data.'
      },
      {
        method: 'GET',
        route: '/collection/falshrooms',
        headers: '',
        body: '',
        description: 'Returns a list of all falshrooms in the collection.'
      },
      {
        method: 'GET',
        route: '/collection/falshrooms/{name}',
        headers: '',
        body: '',
        description: 'Returns the falshrooms associated with the string name provided in the route.'
      },
      {
        method: 'POST',
        route: '/collection/falshrooms',
        headers: 'Content-Type: application/json',
        body: '{ “name”: “X”, “description”: “X”, “rarity”: “legendary”, viraburstAbsorption: “72” }',
        description: 'Creates a new falshroom from the data provided in the body.'
      },
      {
        method: 'DELETE',
        route: '/collection/falshrooms/{name}',
        headers: '',
        body: '',
        description: 'Deletes the falshroom associated with the string name provided in the route unless it has a listed rarity of ‘unique’.'
      },
      {
        method: 'GET',
        route: '/collection/flesherfungi',
        headers: '',
        body: '',
        description: 'Returns a list of all flesherfungi in the collection.'
      },
      {
        method: 'GET',
        route: '/collection/flesherfungi/{name}',
        headers: '',
        body: '',
        description: 'Returns the flesherfungus associated with the string name provided in the route.'
      },
      {
        method: 'POST',
        route: '/collection/flesherfungi',
        headers: 'Content-Type: application/json',
        body: '{ “name”: “X”, “description”: “X”, “rarity”: “legendary”, threat: “1” }',
        description: 'Creates a new flesherfungus from the data provided in the body.'
      },
      {
        method: 'DELETE',
        route: '/collection/flesherfungi/{name}',
        headers: '',
        body: '',
        description: 'Deletes the flesherfungus associated with the string name provided in the route unless it has a listed rarity of ‘unique’.'
      },
      {
        method: 'GET',
        route: '/collection/flourishflora',
        headers: '',
        body: '',
        description: 'Returns a list of all flourishflora in the collection.'
      },
      {
        method: 'GET',
        route: '/collection/flourishflora/{name}',
        headers: '',
        body: '',
        description: 'Returns the flourishflora associated with the string name provided in the route.'
      },
      {
        method: 'POST',
        route: '/collection/flourishflora',
        headers: 'Content-Type: application/json',
        body: '{ “name”: “X”, “description”: “X”, “rarity”: “legendary”, producerCoefficient: “1” }',
        description: 'Creates a new flourishflora from the data provided in the body.'
      },
      {
        method: 'DELETE',
        route: '/collection/flourishflora/{name}',
        headers: '',
        body: '',
        description: 'Deletes the flourishflora associated with the string name provided in the route unless it has a listed rarity of ‘unique’.'
      },
      {
        method: 'GET',
        route: '/collection/maremolds',
        headers: '',
        body: '',
        description: 'Returns a list of all maremolds in the collection.'
      },
      {
        method: 'GET',
        route: '/collection/maremolds/{name}',
        headers: '',
        body: '',
        description: 'Returns the maremold associated with the string name provided in the route.'
      },
      {
        method: 'POST',
        route: '/collection/maremolds',
        headers: 'Content-Type: application/json',
        body: '{ “name”: “X”, “description”: “X”, “rarity”: “legendary”, mutationRate: “1” }',
        description: 'Creates a new maremold from the data provided in the body.'
      },
      {
        method: 'DELETE',
        route: '/collection/maremolds/{name}',
        headers: '',
        body: '',
        description: 'Deletes the maremold associated with the string name provided in the route unless it has a listed rarity of ‘unique’.'
      },
      {
        method: 'GET',
        route: '/collection/trees',
        headers: '',
        body: '',
        description: 'Returns a list of all trees in the collection.'
      },
      {
        method: 'GET',
        route: '/collection/trees/{name}',
        headers: '',
        body: '',
        description: 'Returns the tree associated with the string name provided in the route.'
      },
      {
        method: 'POST',
        route: '/collection/trees',
        headers: 'Content-Type: application/json',
        body: '{ “name”: “X”, “description”: “X”, “rarity”: “legendary”, height: “3.5” }',
        description: 'Creates a new tree from the data provided in the body.'
      },
      {
        method: 'DELETE',
        route: '/collection/trees/{name}',
        headers: '',
        body: '',
        description: 'Deletes the tree associated with the string name provided in the route unless it has a listed rarity of ‘unique’.'
      },
      {
        method: 'GET',
        route: '/collection/waveskellen',
        headers: '',
        body: '',
        description: 'Returns a list of all waveskellen in the collection.'
      },
      {
        method: 'GET',
        route: '/collection/waveskellen/{name}',
        headers: '',
        body: '',
        description: 'Returns the waveskell associated with the string name provided in the route.'
      },
      {
        method: 'POST',
        route: '/collection/waveskellen',
        headers: 'Content-Type: application/json',
        body: '{ “name”: “X”, “description”: “X”, “rarity”: “legendary” }',
        description: 'Creates a new waveskell from the data provided in the body.'
      },
      {
        method: 'DELETE',
        route: '/collection/waveskellen/{name}',
        headers: '',
        body: '',
        description: 'Deletes the waveskell associated with the string name provided in the route unless it has a listed rarity of ‘unique’.'
      }
    ],
  map:
    [
      {
        method: 'GET',
        route: '/map',
        headers: '',
        body: '',
        description: '[]'
      },
      {
        method: 'GET',
        route: '/map/locations',
        headers: '',
        body: '',
        description: 'Returns a list of all locations in the map.'
      },
      {
        method: 'GET',
        route: '/map/locations/{name}',
        headers: '',
        body: '',
        description: 'Returns the location associated with the string name provided in the route.'
      }
      /*
      {
        method: 'POST',
        route: '/map/locations/{name}',
        headers: '',
        body: '',
        description: 'Returns the location associated with the string name provided in the route.'
      }
      */
    ],
  corruption:
    [
      {
        method: '',
        route: '',
        headers: '',
        body: '',
        description: ''
      },
      {
        method: '',
        route: '',
        headers: '',
        body: '',
        description: ''
      },
      {
        method: '',
        route: '',
        headers: '',
        body: '',
        description: ''
      },
    ]
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
