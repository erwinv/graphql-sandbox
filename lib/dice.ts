import _ from 'lodash'

export type PropOrMethod<R> = R | (() => R)

export type IDice = {
  numSides: PropOrMethod<number>
  rollOnce: PropOrMethod<number>
  roll: (args: { numRolls: number }) => number[]
}

export class Dice implements IDice {
  private sides: number[]

  constructor(public numSides: number) {
    if (numSides < 1) throw new Error('`numSides` must be greater than 0')
    this.sides = _.range(1, numSides + 1)
  }

  rollOnce() {
    return _.sample(this.sides) as number
  }

  roll({ numRolls }: Parameters<IDice['roll']>[0]) {
    return _.range(numRolls).map(() => this.rollOnce())
  }
}
