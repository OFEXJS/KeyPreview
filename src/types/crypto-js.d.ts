declare module 'crypto-js' {
  export = CryptoJS;
}

declare const CryptoJS: {
  AES: {
    encrypt: (message: string, key: string | CryptoJS.lib.WordArray) => CryptoJS.lib.CipherParams;
    decrypt: (ciphertext: string | CryptoJS.lib.CipherParams, key: string | CryptoJS.lib.WordArray) => CryptoJS.lib.WordArray;
  };
  MD5: (message: string | CryptoJS.lib.WordArray) => CryptoJS.lib.WordArray;
  SHA256: (message: string | CryptoJS.lib.WordArray) => CryptoJS.lib.WordArray;
  lib: {
    WordArray: any;
    CipherParams: {
      create: (options: {
        ciphertext: CryptoJS.lib.WordArray;
        salt?: CryptoJS.lib.WordArray;
        iv?: CryptoJS.lib.WordArray;
        formatter?: any;
      }) => any;
    };
  };
  enc: {
    Utf8: {
      parse: (str: string) => CryptoJS.lib.WordArray;
      stringify: (wordArray: CryptoJS.lib.WordArray) => string;
    };
    Base64: {
      parse: (str: string) => CryptoJS.lib.WordArray;
      stringify: (wordArray: CryptoJS.lib.WordArray) => string;
    };
  };
  format: {
    OpenSSL: {
      stringify: (cipherParams: CryptoJS.lib.CipherParams) => string;
      parse: (str: string) => CryptoJS.lib.CipherParams;
    };
  };
};
