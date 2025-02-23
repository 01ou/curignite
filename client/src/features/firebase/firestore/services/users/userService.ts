import { Firestore } from "firebase/firestore";
import FirestoreService from "../../handler/firestoreService";
import { UserRead, UserWrite } from "../../../../../types/firebase/firestore/structure/users/userStructure";

export class UserService extends FirestoreService<UserRead, UserWrite> {
  constructor(firestore: Firestore) {
    super(firestore, ["users"]);
  }

  protected async formatWriteData(data: UserWrite): Promise<UserWrite> {
    const { displayName, email, photoURL, settings } = data;
    this.checkRequiredProperties([data, email, settings]);
    return { createdById: await this.getUid(), displayName, email, photoURL: photoURL ?? null, settings };
  }

  protected async formatPartialWriteData(data: Partial<UserWrite>): Promise<Partial<UserWrite>> {
    const { displayName, email, photoURL, settings } = data;
    return { createdById: await this.getUid(), displayName, email, photoURL, settings };
  }
}