import _ from 'lodash'
import { PropOrMethod, IDice, Dice } from './dice'

const NUM_SIDES = _.random(2, 12)

let dice: IDice

beforeAll(() => {
  dice = new Dice(NUM_SIDES)
})

describe('Dice', () => {
  test('invalid number of sides', () => {
    expect(() => new Dice(0)).toThrow()
    expect(() => new Dice(-_.random(1, 12))).toThrow()
  })

  test('number of sides', () => {
    expect(dice.numSides).toEqual(NUM_SIDES)
  })

  test('roll once', () => {
    const roll = getPropOrInvokeMethod(dice, 'rollOnce')
    expect(roll).toBeGreaterThan(0)
    expect(roll).toBeLessThanOrEqual(NUM_SIDES)
  })

  test('roll', () => {
    const rolls = dice.roll({ numRolls: 100 })
    expect(rolls).toHaveLength(100)
    for (const roll of rolls) {
      expect(roll).toBeGreaterThan(0)
      expect(roll).toBeLessThanOrEqual(NUM_SIDES)
    }
  })
})

function getPropOrInvokeMethod<T,
  O extends Record<string, PropOrMethod<T>>,
  P extends keyof O
>(obj: O, propName: P) {
  const propOrMethod = obj[propName] as PropOrMethod<T>

  return isProp(propOrMethod) ? propOrMethod : propOrMethod.call(obj)
}

function isProp<T>(x: PropOrMethod<T>): x is T {
  return !_.isFunction(x)
}
