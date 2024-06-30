import { Client, Account } from "appwrite";

export const client = new Client();

const pId = process.env.PROJECT_ID as any;

client.setEndpoint("https://cloud.appwrite.io/v1").setProject(pId); // Replace with your project ID

export const account = new Account(client);
export { ID } from "appwrite";
