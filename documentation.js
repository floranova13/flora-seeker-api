/* eslint-disable max-len */
const documentation = {
  root:
    [
      {
        method: 'GET',
        route: '/',
        headers: '',
        body: '',
        description: 'Returns the basic information for the Seeker Division Database. [CHANGE]'
      },
      {
        method: 'GET',
        route: '/2',
        headers: '',
        body: '',
        description: 'Test'
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
    {
      root: [
        {
          method: 'GET',
          route: '/collection',
          headers: '',
          body: '',
          description: 'Returns a description of the collection data.'
        }
      ],
      falshrooms: [
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
        }
      ],
      flesherfungi: [
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
        }
      ],
      flourishflora: [
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
        }
      ],
      maremolds: [
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
        }
      ],
      trees: [
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
        }
      ],
      waveskellen: [
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
      ]
    },
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

module.exports = documentation
