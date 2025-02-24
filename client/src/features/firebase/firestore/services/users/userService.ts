import { Firestore } from "firebase/firestore";
import FirestoreService from "../../handler/firestoreService";
import { UserRead, UserWrite } from "../../../../../types/firebase/firestore/structure/users/userStructure";

export class UserService extends FirestoreService<UserRead, UserWrite> {
  constructor(firestore: Firestore) {
    super(firestore, ["users"]);
  }

  protected async formatWriteData(data: UserWrite): Promise<UserWrite> {
    const { displayName, email, photoURL, settings } = data;
    return { displayName, email, photoURL: photoURL, settings };
  }

  protected async formatPartialWriteData(data: Partial<UserWrite>): Promise<Partial<UserWrite>> {
    const { displayName, email, photoURL, settings } = data;
    return { displayName, email, photoURL, settings };
  }
}