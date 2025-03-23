import { Permission} from 'node-appwrite'
import {questionAttachmentBucket} from '@/models/name'
import {storage} from '@/models/server/config'


export async function getOrCreateStorage(){
    // create Collection
    try {
        try {
           await storage.getBucket(questionAttachmentBucket);
             console.log('storage connected'); 
        } catch (error) {
            await storage.createBucket(
                questionAttachmentBucket,
                questionAttachmentBucket,
                [
                        Permission.read('any'),
                        Permission.read('users'),
                        Permission.delete('users'),
                        Permission.create('users'),
                        Permission.update('users')
                ],
                false,
                undefined,
                undefined,
                ['jpg','png','gif','jpeg','webp','heic']
            );
    
            console.log('storage created');
            console.log('storage connected');
            
            
        } 
    } catch (error) {
        console.log('error in storage');
        
    }

   
}