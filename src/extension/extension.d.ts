
declare global {
  interface String {
    isNullOrEmpty(this: string): boolean;
  }
  interface Array<T>{
    firstOrDefault(predicate:(item:T)=>boolean):T;
    pushAll(arr:Array<T>):void;
  }
}

export {};
