/* eslint-disable max-len */
const documentation = {
  root:
    [
      {
        method: 'GET',
        route: '/',
        headers: '',
        body: '',
        description: 'Returns the basic information for the Seeker Division Database.'
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
        route: '/seekers/lodestars',
        headers: '',
        body: '',
        description: 'Returns a list of all "lodestar" seekers.'
      },
      {
        method: 'GET',
        route: '/seekers/{id}',
        headers: '',
        body: '',
        description: 'Returns the seeker associated with the numeric id  provided in the route.'
      },
      {
        method: 'GET',
        route: '/seekers/title/{title}',
        headers: '',
        body: '',
        description: 'Returns a list of all seekers with the title provided in the route.'
      },
      {
        method: 'POST',
        route: '/seekers',
        headers: 'Content-Type: application/json',
        body: '{ “name”: “Lillium”, “age”: “19”, “gender”: “other”, “title”: “Seeker Ardent”, "lodestar": “true” }',
        description: 'Creates a new seeker from the data provided in the body.'
      },
      {
        method: 'PATCH',
        route: '/seekers/{id}/{property}',
        headers: 'Content-Type: application/json',
        body: '{ val }',
        description: 'Alters the requested property of the seeker with the provided numeric id in the route unless it is a "lodestar" seeker. The only properties that can be altered are: "name", "age", "gender", and "title".'
      },
      {
        method: 'DELETE',
        route: '/seekers/{id}',
        headers: '',
        body: '',
        description: 'Deletes the seeker associated with the numeric id provided in the route unless it is a "lodestar" seeker.'
      }
    ],
  collection:
    {
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
          body: '{ “name”: “Ilunite Glowcap”, “description”: “A small grey fungus that absorbs what little light it can from its surroundings. It generates its own illumination, like many organisms in the Ilunite Forest\'s unique ecosystem. It does this to broadcast it\'s location to wilderness creatures that will feed on the mushroom cap, releasing contained spores.”, “rarity”: “legendary”, viraburstAbsorption: “72” }',
          description: 'Creates a new falshroom from the data provided in the body.'
        },
        {
          method: 'PATCH',
          route: '/collection/falshrooms/{name}/{property}',
          headers: 'Content-Type: application/json',
          body: '{ val }',
          description: 'Alters the requested property of the falshroom with the name provided in the route unless it has a listed rarity of "unique".'
        },
        {
          method: 'DELETE',
          route: '/collection/falshrooms/{name}',
          headers: '',
          body: '',
          description: 'Deletes the falshroom associated with the name provided in the route unless it has a listed rarity of "unique".'
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
          description: 'Returns the flesherfungus associated with the name provided in the route.'
        },
        {
          method: 'POST',
          route: '/collection/flesherfungi',
          headers: 'Content-Type: application/json',
          body: '{ “name”: “Acumben\'s Curse”, "description": “Lures victims in with a sweet scent, immobilizing them with a powerful adhesive coating the area where it grows. Prey who have fallen for its snare don\'t even know they\'ve they\'re in danger, distracted by the fruit grown from the corpses of the last victims. The fungus invades the new host through that fruit, weakening them and slowing feeding on them from within until they finally expire and the cycle repeats.”, “rarity”: “legendary”, threat: “12” }',
          description: 'Creates a new flesherfungus from the data provided in the body.'
        },
        {
          method: 'PATCH',
          route: '/collection/flesherfungi/{name}/{property}',
          headers: 'Content-Type: application/json',
          body: '{ val }',
          description: 'Alters the requested property of the flesherfungus with the name provided in the route unless it has a listed rarity of "unique".'
        },
        {
          method: 'DELETE',
          route: '/collection/flesherfungi/{name}',
          headers: '',
          body: '',
          description: 'Deletes the flesherfungus associated with the name provided in the route unless it has a listed rarity of "unique".'
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
          description: 'Returns the flourishflora associated with the name provided in the route.'
        },
        {
          method: 'POST',
          route: '/collection/flourishflora',
          headers: 'Content-Type: application/json',
          body: '{ “name”: “Feverfane”, “description”: “A mildly toxic plant to those that attempt to consume it, but otherwise harmless. The Feverfane flower will arrange its pink petals in one of three configurations. The thriving configuration is often one of two, whichever is more distinguishable from the flowering plants sharing a habitat.”, “rarity”: “common”, producerCoefficient: “1” }',
          description: 'Creates a new flourishflora from the data provided in the body.'
        },
        {
          method: 'PATCH',
          route: '/collection/flourishflora/{name}/{property}',
          headers: 'Content-Type: application/json',
          body: '{ val }',
          description: 'Alters the requested property of the flourishflora with the name provided in the route unless it has a listed rarity of "unique".'
        },
        {
          method: 'DELETE',
          route: '/collection/flourishflora/{name}',
          headers: '',
          body: '',
          description: 'Deletes the flourishflora associated with the name provided in the route unless it has a listed rarity of "unique".'
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
          description: 'Returns the maremold associated with the name provided in the route.'
        },
        {
          method: 'POST',
          route: '/collection/maremolds',
          headers: 'Content-Type: application/json',
          body: '{ “name”: “Moreph”, “description”: “Set apart from its genetic relatives by a high rate of mutation, Moreph is more of an overwhelming nuisance than it is a catastrophe in and of itself. However, experts in the field have voiced concerns that this may not always be the case. Left alone, it may be the Moreph that contributes to this century\'s colonization disaster.”, “rarity”: “uncommon”, mutationRate: “330” }',
          description: 'Creates a new maremold from the data provided in the body.'
        },
        {
          method: 'PATCH',
          route: '/collection/maremolds/{name}/{property}',
          headers: 'Content-Type: application/json',
          body: '{ val }',
          description: 'Alters the requested property of the maremold with the name provided in the route unless it has a listed rarity of "unique".'
        },
        {
          method: 'DELETE',
          route: '/collection/maremolds/{name}',
          headers: '',
          body: '',
          description: 'Deletes the maremold associated with the name provided in the route unless it has a listed rarity of "unique".'
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
          description: 'Returns the tree associated with the name provided in the route.'
        },
        {
          method: 'POST',
          route: '/collection/trees',
          headers: 'Content-Type: application/json',
          body: '{ “name”: “Vitanark Rush”, “description”: “Towering trees with thick trunks encased in reddish bark. The oldest discovered trees are members of the Vitanark genus.”, “rarity”: “rare”, height: “126.5” }',
          description: 'Creates a new tree from the data provided in the body.'
        },
        {
          method: 'PATCH',
          route: '/collection/trees/{name}/{property}',
          headers: 'Content-Type: application/json',
          body: '{ val }',
          description: 'Alters the requested property of the tree with the name provided in the route unless it has a listed rarity of "unique".'
        },
        {
          method: 'DELETE',
          route: '/collection/trees/{name}',
          headers: '',
          body: '',
          description: 'Deletes the tree associated with the name provided in the route unless it has a listed rarity of "unique".'
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
          description: 'Returns the waveskell associated with the name provided in the route.'
        },
        {
          method: 'POST',
          route: '/collection/waveskellen',
          headers: 'Content-Type: application/json',
          body: '{ “name”: “Gharescole”, “description”: “Travellers who\'ve had the opportunity (or misfortune) to encounter the ocean in the last colonization wave tell tales thick webs green covering large swaths of the ocean surface. These aquatic plants only grow in saltwater environments. They aren\'t poisonous or dangerous themselves, but they conceal organisms and environmental hazards that are.”, “rarity”: “common”, "cascade": "clarion" }',
          description: 'Creates a new waveskell from the data provided in the body.'
        },
        {
          method: 'PATCH',
          route: '/collection/waveskellen/{name}/{property}',
          headers: 'Content-Type: application/json',
          body: '{ val }',
          description: 'Alters the requested property of the waveskell with the name provided in the route unless it has a listed rarity of "unique".'
        },
        {
          method: 'DELETE',
          route: '/collection/waveskellen/{name}',
          headers: '',
          body: '',
          description: 'Deletes the waveskell associated with the name provided in the route unless it has a listed rarity of "unique".'
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
        description: 'Returns a summary description of the map data.'
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
        description: 'Returns the location associated with the name provided in the route.'
      },
      {
        method: 'POST',
        route: '/map/locations/{name}',
        headers: 'Content-Type: application/json',
        body: '{ val }',
        description: 'Adds a territory provided in the body to the location referenced by location named in the route unless it already exists.'
      },
      {
        method: 'PATCH',
        route: '/map/locations/{name}/{threat}',
        headers: 'Content-Type: application/json',
        body: '{ val }',
        description: 'Alters the threat property of the requested location referenced in the route. This must be done periodically according to the master schedule. It is for the safety of all seekers that the threat property reflect accurate field analysis.'
      },
      {
        method: 'DELETE',
        route: '/map/locations/{name}/{territory}',
        headers: '',
        body: '',
        description: 'Deletes the territory associated with the location name and territory name provided in the route. Please follow procedure and use restraint when altering a location\'s territory data.'
      }
    ],
  corruption:
    [
      {
        method: 'GET',
        route: '/corruption/1',
        headers: '',
        body: '',
        description: '[PathOs prevented from notifying Council.]'
      },
      {
        method: 'GET',
        route: '/corruption/2',
        headers: '',
        body: '',
        description: '[Research Division compromised.]'
      },
      {
        method: 'GET',
        route: '/corruption/3',
        headers: '',
        body: '',
        description: '[Administration Division overtaxed.]'
      },
    ]
}

module.exports = documentation
