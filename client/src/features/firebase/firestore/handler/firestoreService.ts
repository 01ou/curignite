import { 
  Firestore, 
  CollectionReference, 
  DocumentData, 
  DocumentSnapshot, 
  Transaction, 
  QueryConstraint, 
  QuerySnapshot, 
  DocumentReference 
} from "firebase/firestore";
import BatchHandler from "./batchHandler";
import TransactionHandler from "./transactionHandler";
import CollectionManager from "./collectionManager";
import { BaseDocument, BaseDocumentRead, BaseDocumentWrite } from "../../../../types/firebase/firestore/baseTypes";
import { parseDocumentSnapshot, parseQuerySnapshot } from "../snapshotUtils";
import { CRUDHandler } from "./crudHandler";
import { CallbacksHandler } from "./callbacksHandler";
import { getAuth, onAuthStateChanged } from "firebase/auth";

abstract class FirestoreService<
  Read extends BaseDocumentRead,
  Write extends BaseDocumentWrite,
  Document extends BaseDocument = Write
> {
  private _callbacksHandler?: CallbacksHandler<Read>;
  private _batchHandler?: BatchHandler<Document>;
  private _transactionHandler?: TransactionHandler<Read, Document>;
  private _collectionManager: CollectionManager;

  constructor(private firestore: Firestore, private collectionPathComposition: string | string[]) {
    this._collectionManager = new CollectionManager(firestore);
  }

  // ======================================================================
  // Abstract Methods
  // ======================================================================

  /**
   * 不要な情報を除外し、必要なデータがあるかの確認をした書き込みデータを返します。
   * サブクラスで実装してください。
   * @param data 書き込むデータ
   */
  protected abstract formatWriteData(data: Write): Promise<Document>;  

  protected abstract formatPartialWriteData(data: Partial<Write>): Promise<Partial<Document>>;  

  getUid(): Promise<string> {
    return new Promise((resolve, reject) => {
      const auth = getAuth();
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        unsubscribe();
        if (user?.uid) {
          resolve(user.uid);
        } else {
          reject(new Error("認証されていません。"));
        }
      });
    });
  }

  protected checkRequiredProperties(properties: { [key: string]: any }) {
    const missingProperties = Object.keys(properties).filter(key => properties[key] === undefined);
    if (missingProperties.length > 0) {
        throw new Error(`必要なプロパティが足りていません: ${missingProperties.join(', ')}`);
    }
  }

  // ======================================================================
  // Collection Reference
  // ======================================================================

  /**
   * parentDocumentIds は、コレクション間に挟む親ドキュメントIDの配列です。
   * @param parentDocumentIds 
   * @returns 対象コレクションの参照
   */
  public getCollectionRef(parentDocumentIds: string[] = []): CollectionReference<DocumentData> {
    return this._collectionManager.getCollectionRef(this.collectionPathComposition, parentDocumentIds);
  }

  // ======================================================================
  // Lazy Initialization: Batch / Transaction Handlers
  // ======================================================================

  private get callbacksHandler(): CallbacksHandler<Read> {
    if (!this._callbacksHandler) {
      this._callbacksHandler = new CallbacksHandler<Read>();
    }
    return this._callbacksHandler;
  }

  private get batchHandler(): BatchHandler<Document> {
    if (!this._batchHandler) {
      this._batchHandler = new BatchHandler<Document>(this.firestore);
    }
    return this._batchHandler;
  }

  private get transactionHandler(): TransactionHandler<Read, Document> {
    if (!this._transactionHandler) {
      this._transactionHandler = new TransactionHandler<Read, Document>(this.firestore);
    }
    return this._transactionHandler;
  }

  // ======================================================================
  // CRUD Methods
  // ======================================================================

  async create(data: Write, parentDocumentIds: string[] = []): Promise<DocumentReference<Document>> {
    console.log('called create');
    const collectionRef = this.getCollectionRef(parentDocumentIds);
    return CRUDHandler.create<Document>(collectionRef, await this.formatWriteData(data));
  }

  async createWithId(data: Write, documentId: string, parentDocumentIds: string[] = [], merge: boolean = false): Promise<void> {
    console.log('called createWithId');
    const collectionRef = this.getCollectionRef(parentDocumentIds);
    return CRUDHandler.createWithId<Document>(collectionRef, documentId, await this.formatWriteData(data), merge);
  }

  protected async readAsDocumentSnapshot(documentId: string, parentDocumentIds: string[] = []): Promise<DocumentSnapshot<Read>> {
    const collectionRef = this.getCollectionRef(parentDocumentIds) as CollectionReference<Read>;
    return CRUDHandler.readAsDocumentSnapshot<Read>(collectionRef, documentId);
  }

  async read(documentId: string, parentDocumentIds: string[] = []): Promise<Read | null> {
    console.log('called read');
    const collectionRef = this.getCollectionRef(parentDocumentIds);
    return CRUDHandler.read<Read>(collectionRef, documentId);
  }

  async update(data: Partial<Write>, documentId: string, parentDocumentIds: string[] = []): Promise<void> {
    console.log('called update');
    const collectionRef = this.getCollectionRef(parentDocumentIds);
    return CRUDHandler.update<Document>(collectionRef, documentId, await this.formatPartialWriteData(data));
  }

  async hardDelete(documentId: string, parentDocumentIds: string[] = []): Promise<void> {
    console.log('called hard delete');
    const collectionRef = this.getCollectionRef(parentDocumentIds);
    return CRUDHandler.hardDelete(collectionRef, documentId);
  }

  async softDelete(documentId: string, parentDocumentIds: string[] = [], updateFields: Partial<Write> = {}): Promise<void> {
    console.log('called soft delete');
    const collectionRef = this.getCollectionRef(parentDocumentIds);
    return CRUDHandler.softDelete<Document>(collectionRef, documentId, await this.formatPartialWriteData(updateFields));
  }

  async getAllAsQuerySnapshot(parentDocumentIds: string[] = [], ...queryConstraints: QueryConstraint[]): Promise<QuerySnapshot<Read>> {
    const collectionRef = this.getCollectionRef(parentDocumentIds) as CollectionReference<Read>;
    return CRUDHandler.getAllAsQuerySnapshot<Read>(collectionRef, ...queryConstraints);
  }

  async getAll(parentDocumentIds: string[] = [], ...queryConstraints: QueryConstraint[]): Promise<Read[]> {
    console.log('called get all');
    const collectionRef = this.getCollectionRef(parentDocumentIds);
    return CRUDHandler.getAll<Read>(collectionRef, ...queryConstraints);
  }

  async getFirstMatch(field: keyof Read, value: any, parentDocumentIds: string[] = []): Promise<Read | null> {
    console.log('called get first match');
    const collectionRef = this.getCollectionRef(parentDocumentIds);
    return CRUDHandler.getFirstMatch<Read>(collectionRef, field, value);
  }

  async getAllWithPagination(
    parentDocumentIds: string[] = [],
    startAfterDoc?: DocumentSnapshot<Read>,
    limitCount?: number,
    ...queryConstraints: QueryConstraint[]
  ): Promise<Read[]> {
    const collectionRef = this.getCollectionRef(parentDocumentIds);
    return CRUDHandler.getAllWithPagination<Read>(collectionRef, startAfterDoc, limitCount, ...queryConstraints);
  }

  // ======================================================================
  // Callbacks Methods
  // ======================================================================

  addCallback(
    callback: (snapshot: DocumentSnapshot<Read, DocumentData>) => void, 
    documentId: string, 
    parentDocumentIds: string[] = [], 
    callbackId?: string
  ): string {
    const collectionRef = this.getCollectionRef(parentDocumentIds) as CollectionReference<Read>;
    return this.callbacksHandler.addCallback(collectionRef, documentId, callback, callbackId);
  }

  addReadCallback(
    callback: (data: Read | null) => void, 
    documentId: string, 
    parentDocumentIds: string[] = [], 
    callbackId?: string
  ): string {
    return this.addCallback(
      (snapshot) => callback(parseDocumentSnapshot(snapshot)), 
      documentId, 
      parentDocumentIds, 
      callbackId
    );
  }

  removeCallback(callbackId: string, documentId: string, parentDocumentIds: string[] = []): void {
    const collectionRef = this.getCollectionRef(parentDocumentIds) as CollectionReference<Read>;
    this.callbacksHandler.removeCallback(collectionRef, documentId, callbackId);
  }
  
  addCollectionCallback(
    callback: (snapshot: QuerySnapshot<Read, DocumentData>) => void, 
    parentDocumentIds: string[] = [], 
    callbackId?: string
  ): string {
    const collectionRef = this.getCollectionRef(parentDocumentIds) as CollectionReference<Read>;
    return this.callbacksHandler.addCollectionCallback(collectionRef, callback, callbackId);
  }

  addReadCollectionCallback(
    callback: (data: Read[]) => void, 
    parentDocumentIds: string[] = [], 
    callbackId?: string
  ): string {
    return this.addCollectionCallback(
      (snapshot) => callback(parseQuerySnapshot(snapshot)), 
      parentDocumentIds, 
      callbackId
    );
  }

  removeCollectionCallback(callbackId: string, parentDocumentIds: string[] = []): void {
    const collectionRef = this.getCollectionRef(parentDocumentIds) as CollectionReference<Read>;
    this.callbacksHandler.removeCollectionCallback(collectionRef, callbackId);
  }

  // ======================================================================
  // BatchHandler Methods
  // ======================================================================

  startBatch(parentDocumentIds: string[] = []): void {
    const collectionRef = this.getCollectionRef(parentDocumentIds);
    this.batchHandler.startBatch(collectionRef);
  }

  cancelBatch(parentDocumentIds: string[] = []): void {
    const collectionRef = this.getCollectionRef(parentDocumentIds);
    this.batchHandler.cancelBatch(collectionRef);
  }

  async commitBatch(parentDocumentIds: string[] = []): Promise<void> {
    const collectionRef = this.getCollectionRef(parentDocumentIds);
    await this.batchHandler.commitBatch(collectionRef);
  }

  async setInBatch(data: Write, documentId: string, parentDocumentIds: string[] = []): Promise<void> {
    const collectionRef = this.getCollectionRef(parentDocumentIds);
    this.batchHandler.set(collectionRef, documentId, await this.formatWriteData(data));
  }

  async updateInBatch(data: Partial<Write>, documentId: string, parentDocumentIds: string[] = []): Promise<void> {
    const collectionRef = this.getCollectionRef(parentDocumentIds);
    this.batchHandler.update(collectionRef, documentId, await this.formatPartialWriteData(data));
  }

  deleteInBatch(documentId: string, parentDocumentIds: string[] = []): void {
    const collectionRef = this.getCollectionRef(parentDocumentIds);
    this.batchHandler.delete(collectionRef, documentId);
  }

  // ======================================================================
  // TransactionHandler Methods
  // ======================================================================

  async runTransaction(
    transactionCallback: (transaction: Transaction) => Promise<void>, 
    parentDocumentIds: string[] = []
  ): Promise<void> {
    const collectionRef = this.getCollectionRef(parentDocumentIds);
    await this.transactionHandler.runTransaction(collectionRef, transactionCallback);
  }

  async getInTransaction(documentId: string, parentDocumentIds: string[] = []): Promise<DocumentSnapshot<Read>> {
    const collectionRef = this.getCollectionRef(parentDocumentIds) as CollectionReference<Read>;
    return this.transactionHandler.get(collectionRef, documentId);
  }

  async readInTransaction(documentId: string, parentDocumentIds: string[] = []): Promise<Read | null> {
    const snapshot = await this.getInTransaction(documentId, parentDocumentIds);
    return parseDocumentSnapshot<Read>(snapshot);
  }

  async setInTransaction(data: Write, documentId: string, parentDocumentIds: string[] = []): Promise<void> {
    const collectionRef = this.getCollectionRef(parentDocumentIds) as CollectionReference;
    this.transactionHandler.set(collectionRef, documentId, await this.formatWriteData(data));
  }

  async updateInTransaction(data: Partial<Write>, documentId: string, parentDocumentIds: string[] = []): Promise<void> {
    const collectionRef = this.getCollectionRef(parentDocumentIds) as CollectionReference;
    this.transactionHandler.update(collectionRef, documentId, await this.formatPartialWriteData(data));
  }

  deleteInTransaction(documentId: string, parentDocumentIds: string[] = []): void {
    const collectionRef = this.getCollectionRef(parentDocumentIds) as CollectionReference;
    this.transactionHandler.delete(collectionRef, documentId);
  }
}

export default FirestoreService;
