import React from 'react';
import { doc, updateDoc, getDoc} from 'firebase/firestore';
import { db } from '../../firebase-config';

const NewTask = ({ data}) => {
 async function handleAccept(documentId, taskId) {
  try {
    // Reference the nested path: employees/{employeeId}/tasks/{taskId}
    const taskRef = doc(db, `employees/${documentId}/tasks/${taskId}`);
    const docSnap = await getDoc(taskRef);

    if (docSnap.exists()) {
      // If the document exists, update its status
      await updateDoc(taskRef, { status: "accepted" });
      console.log("Task updated successfully!");
    } else {
      // Log an error if the document is not found
      console.error(`Task with ID: ${taskId} for employee: ${documentId} does not exist.`);
    }
  } catch (error) {
    console.error("Error updating task:", error);
  }
}
  

  return (
    <div className='flex-shrink-0 h-full w-[300px] p-5 bg-blue-400 rounded-xl'>
      <div className='flex justify-between items-center'>
        <h3 className='bg-red-600 text-2xl px-3 py-1 rounded'>{data.category}</h3>
        <h4 className='text-sm'>{data.date}</h4>
      </div>
      <h2 className='mt-5 text-2xl font-semiboldrounded font-medium'>{data.title}</h2>
      <p className='text-sm mt-2'>{data.description}</p>
      <div className='flex justify-between mt-4'>
        <button
          onClick={handleAccept} // Trigger task status change
          className='bg-yellow-500 rounded font-medium py-1 px-2 text-xs'>
          Accept this Task
        </button>
      </div>
    </div>
  );
};

export default NewTask;
