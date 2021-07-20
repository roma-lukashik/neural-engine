import { divide } from './divide'
import { arange } from '../creation'
import { reshape } from '../geometry'

describe('divide', () => {
  it('divides scalars', () => {
    expect(divide(4, 2)).toEqual(2)
  })

  it('divides 0x3 and 0x3 matrix', () => {
    const a = [2, 4, 6]
    const b = [1, 2, 3]

    expect(divide(a, b)).toEqual([2, 2, 2])
    expect(divide(b, a)).toEqual([0.5, 0.5, 0.5])
  })

  it('divides 4x3 and 0x3 matrix', () => {
    const a = reshape(arange(1, 13), [4, 3])
    const b = arange(1, 4)
    const c = [
      [1, 1, 1],
      [4, 2.5, 2],
      [7, 4, 3],
      [10, 5.5, 4],
    ]

    expect(divide(a, b)).toEqual(c)
    expect(divide(b, a)).toEqual(c)
  })

  it('divides 2x3x3 and 2x1x3 matrix', () => {
    const a = reshape(arange(1, 19), [2, 3, 3])
    const b = reshape(arange(1, 7), [2, 1, 3])

    const c = [
      [
        [1, 1, 1],
        [4, 2.5, 2],
        [7, 4, 3],
      ],
      [
        [2.5, 2.2, 2],
        [3.25, 2.8, 2.5],
        [4, 3.4, 3],
      ],
    ]

    expect(divide(a, b)).toEqual(c)
    expect(divide(b, a)).toEqual(c)
  })

  it('throws an error if matrix cannot broadcast together', () => {
    const a = reshape(arange(3), [1, 3])
    const b = reshape(arange(4), [2, 2])

    expect(() => divide(a, b)).toThrowError('Matrix could not be broadcast together.')
  })
})
