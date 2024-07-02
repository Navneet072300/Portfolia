import { Client, Account, Avatars } from "appwrite";

export const client = new Client();

client
  .setEndpoint(process.env.NEXT_PUBLIC_API_ENDPOINT as string)
  .setProject(process.env.NEXT_PUBLIC_PROJECT_ID as string); // Replace with your project ID

export const account = new Account(client);
export const avatars = new Avatars(client);
export { ID } from "appwrite";
