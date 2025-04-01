import { Firestore } from 'firebase/firestore'
import { db } from '../firebase'
import { UserService } from './services/users/userService'
import { UserProblemSetService } from './services/users/problemSets/userProblemSetsService'
import { ProblemSetCategoryService } from './services/users/problemSets/categories/problemSetCategoriesService'
import { CategoryProblemService } from './services/users/problemSets/categories/problems/categoryProblemsService'
import { ProblemSetHistoryService } from './services/users/problemSets/histories/problemSetHistoriesService'

type ConstructorWithArgs<T, Args extends any[]> = new (...args: Args) => T

enum ServiceKeys {
  User = 'user',
  UserProblemSet = 'userProblemSet',
  ProblemSetCategory = 'problemSetCategory',
  CategoryProblem = 'categoryProblem',
  ProblemSetHistory = 'problemSetHistory',
}

export class ServiceFactory {
  private static instance: ServiceFactory
  private instances: Map<ServiceKeys, any> = new Map()

  private constructor(private firestore: Firestore) {}

  static getInstance(): ServiceFactory {
    if (!ServiceFactory.instance) {
      ServiceFactory.instance = new ServiceFactory(db)
    }
    return ServiceFactory.instance
  }

  private getInstance<T, Args extends any[]>(
    key: ServiceKeys,
    classConstructor: ConstructorWithArgs<T, Args>,
    ...args: Args
  ): T {
    if (!this.instances.has(key)) {
      this.instances.set(key, new classConstructor(...args))
    }
    return this.instances.get(key) as T
  }

  clearInstances() {
    this.instances.clear()
  }

  deleteInstance(key: ServiceKeys) {
    this.instances.delete(key)
  }

  createUserService() {
    return this.getInstance(ServiceKeys.User, UserService, this.firestore)
  }

  createUserProblemSetService() {
    return this.getInstance(
      ServiceKeys.UserProblemSet,
      UserProblemSetService,
      this.firestore
    )
  }

  createProblemSetCategoryService() {
    return this.getInstance(
      ServiceKeys.ProblemSetCategory,
      ProblemSetCategoryService,
      this.firestore
    )
  }

  createCategoryProblemService() {
    return this.getInstance(
      ServiceKeys.CategoryProblem,
      CategoryProblemService,
      this.firestore
    )
  }

  createProblemSetHistoryService() {
    return this.getInstance(
      ServiceKeys.ProblemSetHistory,
      ProblemSetHistoryService,
      this.firestore
    )
  }
}
