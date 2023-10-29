/* Angular */
import { Injectable } from '@angular/core';
import { arrayUnion, doc, Firestore, updateDoc } from '@angular/fire/firestore';

/* Firebase */
import { collection, CollectionReference } from '@firebase/firestore';

/* Constants */
import { UsersCollection } from '../constants/collections.constants';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly usersCollection!: CollectionReference;

  constructor(
    private readonly firestore: Firestore
  ) {
    this.usersCollection = collection(this.firestore, UsersCollection);
  }

  public addBasketToUserBaskets(id: string, uid: string): Promise<void> {
    return updateDoc(doc(this.firestore, UsersCollection, uid), { baskets: arrayUnion(id) });
  }

}
