import type {
  SignFunction,
  UnsignFunction,
} from "./deps/@remix-run/server-runtime.ts";

const encoder = new TextEncoder();

export const sign: SignFunction = async (value, secret) => {
  let data = encoder.encode(value);
  let key = await createKey(secret, ["sign"]);
  let signature = await crypto.subtle.sign("HMAC", key, data);
  let hash = btoa(String.fromCharCode(...new Uint8Array(signature))).replace(
    /=+$/,
    ""
  );

  return value + "." + hash;
};

export const unsign: UnsignFunction = async (cookie, secret) => {
  let value = cookie.slice(0, cookie.lastIndexOf("."));
  let hash = cookie.slice(cookie.lastIndexOf(".") + 1);

  let data = encoder.encode(value);
  let key = await createKey(secret, ["verify"]);
  let signature = byteStringToUint8Array(atob(hash));
  let valid = await crypto.subtle.verify("HMAC", key, signature, data);

  return valid ? value : false;
};

async function createKey(
  secret: string,
  usages: CryptoKey["usages"]
): Promise<CryptoKey> {
  let key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    usages
  );

  return key;
}

function byteStringToUint8Array(byteString: string): Uint8Array {
  let array = new Uint8Array(byteString.length);

  for (let i = 0; i < byteString.length; i++) {
    array[i] = byteString.charCodeAt(i);
  }

  return array;
}
