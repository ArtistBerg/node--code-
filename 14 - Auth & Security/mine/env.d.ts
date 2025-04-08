// env.d.ts
declare namespace NodeJS {
  interface ProcessEnv {
    CLIENT_ID: string;
    CLIENT_SECRET: string;
    CLIENT_KEY_1: string;
    CLIENT_KEY_2: string;
    // add more if needed
  }
}
