import env from '@/app/env'

import {Client,Users,Avatars,Databases,Storage} from 'node-appwrite'

let client = new Client();

client
    .setEndpoint(env.appwrite.endpoint) // Your API Endpoint
    .setProject(env.appwrite.projectId) // Your project ID
    .setKey(env.appwrite.apiKey) // Your secret API key
;

const databases = new Databases(client);
const storage = new Storage(client);
const avatars = new Avatars(client);
const users = new Users(client);


export { client, databases, storage, avatars, users}