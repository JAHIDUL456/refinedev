'use client';

import React from 'react';
import { useTable, useDelete, useUpdate } from '@refinedev/core';

const Page = () => {
  const {
    tableQuery: { data, isLoading, refetch },
  } = useTable({ resource: 'posts' });

  const { mutate: deletePost } = useDelete();
  const { mutate: updatePost } = useUpdate();

  if (isLoading) return <p className="text-center">Loading...</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-center mb-4">
        Posts Table (Edit/Delete)
      </h1>

      <table className="w-full border">
        <thead>
          <tr>
            <th className="border p-2">ID</th>
            <th className="border p-2">Title</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.data.map((post: any) => (
            <tr key={post.id}>
              <td className="border p-2 text-center">{post.id}</td>
              <td className="border p-2">{post.title}</td>
              <td className="border p-2 flex gap-2 justify-center">
                <button
                  onClick={() => {
                    const newTitle = prompt('New title:', post.title);
                    const newid= prompt('New ID:', post.id.toString());
                    if (newTitle && newid) {
                      updatePost(
                        {
                          resource: 'posts',
                          id: post.id,
                          values: { title: newTitle, id: newid },
                        },
                        {
                          onSuccess: () => {
                            refetch();
                          },
                        }
                      );
                    }
                  }}
                  className="bg-yellow-400 text-black px-2 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    if (confirm('Are you sure to delete?')) {
                      deletePost(
                        { resource: 'posts', id: post.id },
                        { onSuccess: () => refetch() }
                      );
                    }
                  }}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Page;
