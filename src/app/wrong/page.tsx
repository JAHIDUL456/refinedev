'use client';
import React, { use } from 'react'
import { useTable,  useUpdate,  useDelete ,useCreate} from '@refinedev/core';


const page = () => {

        const{tableQuery:{data,isLoading,refetch}}=useTable({resource:"posts",liveMode: "auto"});
        const {mutate: update}=useUpdate();

        const {mutate: del}=useDelete();
        const {mutate:create}=useCreate();

        if(isLoading) return <p className='text-center'>Loading...</p>;
        

  return (
    <div className='p-4 relative'>
        <h1 className='text-2xl font-bold text-center'>Here is data fatching Demo</h1>
        <button className='text-white bg-indigo-400 border-0 py-2 px-2 mb-2 right-10 top-10 absolute focus:outline-none hover:bg-indigo-500 rounded' onClick={()=>{
            const title=prompt("Enter title:");
            const userId=prompt("Enter user id:");
            if(title && userId){
                create({
                    resource:"posts",
                    values:{title,userId}
                },{
                    onSuccess:()=>{
                        refetch();
                    }
                })
            }
            
        }} >create new</button>
        <table className='w-full border '>
            <thead>
                <tr>
                    <th className='border p-2'>ID</th>
                    <th className='border p-2'>Title</th>
                </tr>
            </thead>
            <tbody>
                {data?.data.map((post:any, i:number) => (
                    <tr key={i}>
                        <td className='border p-2'>{post.id}</td>
                        <td className='border p-2'>{post.title}</td>
                        <td className='flex gap-2 justify-center border p-2'>
                            <button onClick={()=>{
                                const newtitle= prompt("New title:", post.title);
                                const newid= prompt('New ID:', post.id.toString());
                                if(newtitle && newid){
                                    update(
                                        {
                                            resource:"posts",
                                            id:newid,
                                            values:{title:newtitle}
                                        },
                                        {
                                            onSuccess:()=>{
                                                refetch();
                                            }
                                        }
                                    )
                                }
                            }}>edit</button>
                            <button
                            
                            onClick={()=>{
                                if(confirm("Are you sure to delete?")){
                                    del({
                                        resource:"posts",
                                        id:post.id
                                    },{
                                        onSuccess:()=>{
                                            refetch();
                                        }
                                    })
                                }
                            }}
                            
                            >delete</button>
                        </td>
                    </tr>
                ))};
            </tbody>
        </table>

    </div>
  )
}

export default page