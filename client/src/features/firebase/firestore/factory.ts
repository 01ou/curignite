import { Firestore } from 'firebase/firestore';
import { db } from '../firebase';
import { UserService } from './services/users/userService';
import { UserProblemSetService } from './services/users/problemSets/userProblemSetsService';

type ConstructorWithArgs<T, Args extends any[]> = new (...args: Args) => T;

export class ServiceFactory {
  private instances: Map<string, any> = new Map();

  constructor(
    private firestore: Firestore
  ) {}

  private getInstance<T, Args extends any[]>(
    key: string,
    classConstructor: ConstructorWithArgs<T, Args>,
    ...args: Args
  ): T {
    if (!this.instances.get(key)) {
      this.instances.set(key, new classConstructor(...args));
    }
    return this.instances.get(key) as T;
  }

  createUserService() {
    return this.getInstance("user", UserService, this.firestore);
  }

  createUserProblemSetService() {
    return this.getInstance("user/problemSet", UserProblemSetService, this.firestore);
  }
}

const serviceFactory = new ServiceFactory(db);

export default serviceFactory;
