import { Firestore } from "firebase/firestore";
import { UserRead, UserWrite } from "../../../../types/firebase/firestore/structure/users/userStructure";
import FirestoreService from "../../../../functions/firebase/firestore/handler/firestoreService";

export class UserService extends FirestoreService<UserRead, UserWrite> {
  constructor(firestore: Firestore) {
    super(firestore, ["users"]);
  }

  filterWriteData(data: UserWrite): UserWrite {
    const { createdById, displayName, email, photoURL, settings } = data;
    return { createdById, displayName, email, photoURL, settings };
  }
}