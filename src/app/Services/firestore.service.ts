import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore'; 

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(public db: AngularFirestore) { }

  getId() {
    return this.db.createId();
  }

  createInsumo(data: any, path: string, id: string) {
    return this.db.collection(path).doc(id).set(data);
  }

  getInsumo(path: string, id: string) {
    return this.db.collection(path).doc(id).valueChanges();
  }

  getInsumosCollection<type>(path: string) {
    return this.db.collection<type>(path).valueChanges();
  }

  deleteInsumo(path: string, id: string) {
    return this.db.collection(path).doc(id).delete();
  }

  updateInsumo(data: any, path: string, id: string) {
    return this.db.collection(path).doc(id).update(data);
  }



  createProduct(data: any, path: string, id: string) {
    return this.db.collection(path).doc(id).set(data);
  }
  getProduct(path: string, id: string) {
    return this.db.collection(path).doc(id).valueChanges();
  } 
  getProductsCollection<type>(path: string) {
    return this.db.collection<type>(path).valueChanges();
  }
  deleteProduct(path: string, id: string) {
    return this.db.collection(path).doc(id).delete();
  }
  updateProduct(data: any, path: string, id: string) {
    return this.db.collection(path).doc(id).update(data);
  }
  
  

  createSale(data: any, path: string, id: string) {
    return this.db.collection(path).doc(id).set(data);
  }
  getSalesCollection<type>(path: string) {
    return this.db.collection<type>(path).valueChanges();
  }

}
