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
import { BaseDocumentRead, BaseDocumentWrite } from "../../../../types/firebase/firestore/baseTypes";
import { parseDocumentSnapshot, parseQuerySnapshot } from "../snapshotUtils";
import { CRUDHandler } from "./crudHandler";
import { CallbacksHandler } from "./callbacksHandler";

abstract class FirestoreService<
  Read extends BaseDocumentRead,
  Write extends BaseDocumentWrite
> {
  private _callbacksHandler?: CallbacksHandler<Read>;
  private _batchHandler?: BatchHandler<Write>;
  private _transactionHandler?: TransactionHandler<Read, Write>;
  private _collectionManager: CollectionManager;

  constructor(private firestore: Firestore, private collectionPathComposition: string | string[]) {
    this._collectionManager = new CollectionManager(firestore);
  }

  // ======================================================================
  // Abstract Methods
  // ======================================================================

  /**
   * 不要な情報を除外した書き込みデータを返します。
   * サブクラスで実装してください。
   * @param data 書き込むデータ
   */
  abstract filterWriteData(data: Write): Write;

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

  private get batchHandler(): BatchHandler<Write> {
    if (!this._batchHandler) {
      this._batchHandler = new BatchHandler<Write>(this.firestore);
    }
    return this._batchHandler;
  }

  private get transactionHandler(): TransactionHandler<Read, Write> {
    if (!this._transactionHandler) {
      this._transactionHandler = new TransactionHandler<Read, Write>(this.firestore);
    }
    return this._transactionHandler;
  }

  // ======================================================================
  // CRUD Methods
  // ======================================================================

  async create(data: Write, parentDocumentIds: string[] = []): Promise<DocumentReference<Write>> {
    console.log('called create');
    const collectionRef = this.getCollectionRef(parentDocumentIds);
    const filteredData = this.filterWriteData(data);
    return CRUDHandler.create<Write>(collectionRef, filteredData);
  }

  async createWithId(data: Write, documentId: string, parentDocumentIds: string[] = [], merge: boolean = false): Promise<void> {
    console.log('called createWithId');
    const collectionRef = this.getCollectionRef(parentDocumentIds);
    return CRUDHandler.createWithId<Write>(collectionRef, documentId, data, merge);
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
    return CRUDHandler.update<Write>(collectionRef, documentId, data);
  }

  async hardDelete(documentId: string, parentDocumentIds: string[] = []): Promise<void> {
    console.log('called hard delete');
    const collectionRef = this.getCollectionRef(parentDocumentIds);
    return CRUDHandler.hardDelete(collectionRef, documentId);
  }

  async softDelete(documentId: string, parentDocumentIds: string[] = [], updateFields?: Partial<Write>): Promise<void> {
    console.log('called soft delete');
    const collectionRef = this.getCollectionRef(parentDocumentIds);
    return CRUDHandler.softDelete<Write>(collectionRef, documentId, updateFields);
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

  setInBatch(data: Write, documentId: string, parentDocumentIds: string[] = []): void {
    const collectionRef = this.getCollectionRef(parentDocumentIds) as CollectionReference<Write>;
    this.batchHandler.set(collectionRef, documentId, data);
  }

  updateInBatch(data: Partial<Write>, documentId: string, parentDocumentIds: string[] = []): void {
    const collectionRef = this.getCollectionRef(parentDocumentIds) as CollectionReference<Write>;
    this.batchHandler.update(collectionRef, documentId, data);
  }

  deleteInBatch(documentId: string, parentDocumentIds: string[] = []): void {
    const collectionRef = this.getCollectionRef(parentDocumentIds) as CollectionReference<Write>;
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

  setInTransaction(data: Write, documentId: string, parentDocumentIds: string[] = []): void {
    const collectionRef = this.getCollectionRef(parentDocumentIds) as CollectionReference<Write>;
    this.transactionHandler.set(collectionRef, documentId, data);
  }

  updateInTransaction(data: Partial<Write>, documentId: string, parentDocumentIds: string[] = []): void {
    const collectionRef = this.getCollectionRef(parentDocumentIds) as CollectionReference<Write>;
    this.transactionHandler.update(collectionRef, documentId, data);
  }

  deleteInTransaction(documentId: string, parentDocumentIds: string[] = []): void {
    const collectionRef = this.getCollectionRef(parentDocumentIds) as CollectionReference<Write>;
    this.transactionHandler.delete(collectionRef, documentId);
  }
}

export default FirestoreService;
