(() => {
  if (!String.prototype.isNullOrEmpty)
    String.prototype.isNullOrEmpty = function(this: string): boolean {
      return !(this && this.trim());
    };
})();

export {};
