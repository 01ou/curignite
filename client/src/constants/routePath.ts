import { createPathStructure } from '../functions/route/pathUtils'
import { PathStructure } from '../types/route/pathTypes'

const createPath = (
  options?: Partial<{ rel: string; param: string }>
): PathStructure => ({
  _abs: '',
  _rel: options?.rel ?? '',
  _param: options?.param,
})

const appPathStructure = {
  ...createPath(),
  task: {
    ...createPath(),
    list: createPath(),
    problemSets: createPath(),
  },
  plan: createPath(),
  learning: createPath(),
}

export const appPaths = createPathStructure(
  appPathStructure,
  'app',
  '/app'
) as typeof appPathStructure

export const rootPaths = {
  top: '/top',
  auth: '/auth',
  main: '/app',
}
