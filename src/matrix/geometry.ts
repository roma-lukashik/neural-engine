import { first, size } from '../utils/array'
import { error, isDefined } from '../utils/function'
import {
  Matrix,
  Matrix0,
  Matrix1,
  Matrix2,
  Matrix2Vector,
  Matrix3,
  Matrix4,
  MatrixDimensions,
  MatrixN,
  NLevelNestedMatrix,
  Vector2,
} from './types'

export const at = <
  T1 extends MatrixN,
  T2 extends MatrixDimensions<T1>,
  T3 extends NLevelNestedMatrix<T1, T2>
>(matrix: T1, ...[d0, ...dn]: T2): T3 => {
  const i = d0 < 0 ? len(matrix) + d0 : d0
  if (!isDefined(matrix[i])) {
    return error(`Index ${i} out of bounds [0, ${len(matrix) - 1}].`)
  }
  return (len(dn) > 0 ? at(matrixn(matrix[i]), ...dn) : matrix[i]) as T3
}

export const shape = <T extends MatrixN, U extends Matrix2Vector<T>>(matrix: T): U => [
  len(matrix),
  ...(isMatrixN(first(matrix)) ? shape(matrixn(first(matrix))) : []),
] as U

export const partition = <
  T extends Matrix,
  U extends (
    T extends Matrix0 ? [] :
    T extends Matrix1 ? [Vector2] :
    T extends Matrix2 ? [Vector2, Vector2] :
    T extends Matrix3 ? [Vector2, Vector2, Vector2] :
    T extends Matrix4 ? [Vector2, Vector2, Vector2, Vector2] :
    Vector2[]
  )
>(matrix: T, ...[d0, ...rest]: U): T =>
  d0 && isMatrixN(matrix) ? matrix.slice(...d0).map((x) => partition(x, ...rest)) as T : matrix

export const newaxis = <T1 extends Matrix>(matrix: T1, axis: number): T1[] =>
  axis === 0 || !isMatrixN(matrix) ? [matrix] : matrix.map((x) => newaxis(x, axis - 1)) as T1[]

// Number of rows.
export const len = (matrix: Matrix): number => isMatrixN(matrix) ? size(matrix) : 0

// Number of dimensions.
export const ndim = (matrix: Matrix): number => isMatrixN(matrix) ? size(shape(matrix)) : 0

export const matrix0 = (value: Matrix): Matrix0 =>
  isMatrixN(value) ? error(`Value is not an instance of Matrix0`) : value

// Typesafe casting value to MatrixN.
export const matrixn = <T extends MatrixN>(value: Matrix0 | T): T =>
  isMatrixN(value) ? value : error(`Value ${value} is not an instance of MatrixN`)

export const isMatrix0 = (matrix: Matrix): matrix is Matrix0 => len(matrix) === 0

export const isMatrix1 = (matrix: Matrix): matrix is Matrix1 => ndim(matrix) === 1

export const isMatrix2 = (matrix: Matrix): matrix is Matrix2 => ndim(matrix) === 2

export const isMatrixN = <T extends MatrixN>(matrix: Matrix0 | T): matrix is T => Array.isArray(matrix)
