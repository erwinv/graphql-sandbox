import _ from 'lodash'
import express from 'express'
import { buildSchema } from 'graphql'
import { graphqlHTTP } from 'express-graphql'

const schema = buildSchema(`
  type RandomDie {
    numSides: Int!
    rollOnce: Int!
    roll(numRolls: Int!): [Int]
  }

  type Query {
    getDie(numSides: Int): RandomDie
  }
`)

type PropOrMethod<R> = R | (() => R)

interface IRandomDie {
  numSides: PropOrMethod<number>
  rollOnce: PropOrMethod<number>
  roll: (args: { numRolls: number }) => number[]
}

class RandomDie implements IRandomDie {
  private sides: number[]

  constructor(public numSides: number) {
    if (numSides < 1) throw new Error('`numSides` must be greater than 1')
    this.sides = _.range(1, numSides + 1)
  }

  rollOnce() { return _.sample(this.sides) as number }

  roll({ numRolls }: Parameters<IRandomDie['roll']>[0]) {
    return _.range(numRolls).map(() => this.rollOnce())
  }
}

const PORT = 4000

express()
  .use('/graphql', graphqlHTTP({
    schema,
    rootValue: {
      getDie: ({ numSides }: { numSides?: number }) => new RandomDie(numSides ?? 6),
    },
    graphiql: true,
  }))
  .listen(PORT, () => console.log(`Running a GraphQL API server at http://localhost:${PORT}/graphql`))
