import { FirestoreService } from "./firestore.service";


export interface Donee{
    grubu: string;
    adi: string;
    il: string;
    tel: string;
    tarih: string;
    aciklama: string;
    olusturma: number;
}
export class HomePage {
    constructor(public firestoreService: FirestoreService){}
}