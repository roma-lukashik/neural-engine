import { array, empty } from '../../utils/array'
import { constant, identity } from '../../utils/function'
import { rand } from '../../utils/random'
import { Matrix1, Vector2Matrix, VectorN } from '../utils/types'

export const create = <T extends VectorN, U extends Vector2Matrix<T>>(fill: () => number, ...[d0, ...dn]: T): U =>
  array(d0, () => empty(dn) ? fill() : create(fill, ...dn)) as U

export const zeros = <T extends VectorN>(...dn: T) => create(constant(0), ...dn)

export const ones = <T extends VectorN>(...dn: T) => create(constant(1), ...dn)

export const arange = (dn: number): Matrix1 => array(dn, identity)

// Return samples from the "standard normal" distribution.
export const randn = <T extends VectorN>(...dn: T) => create(rand, ...dn)
