
declare global {
  interface String {
    isNullOrEmpty(this: string): boolean;
  }
}

export {};
