import express from 'express'
import { graphqlHTTP } from 'express-graphql'

import { schema } from './schema'
import { Dice } from './dice'

export function App() {
  return express()
    .use('/graphql',
      graphqlHTTP({
        schema,
        rootValue: {
          getDie: ({ numSides }: { numSides?: number }) => new Dice(numSides ?? 6),
        },
        graphiql: true,
      })
    )
}
