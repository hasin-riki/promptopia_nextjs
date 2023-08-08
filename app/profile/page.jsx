'use client';

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";

const MyProfile = () => {

    const { data: session } = useSession();
    const router = useRouter();
    const [prompts, setPrompts] = useState([])

    const handleEdit = (post) => {
        router.push(`/update-prompt?id=${post._id}`);
    }   

    const handleDelete = async (post) => {
        const hasConfirmed = confirm("Are you sure you want to delete this prompt?");

        if(hasConfirmed) {
            try {
                await fetch(`/api/prompt/${post._id.toString()}`, { method: 'DELETE' });

                const filteredPrompts = prompts.filter((p) => p._id!==post._id);
                setPrompts(filteredPrompts);
            } catch (error) {
                console.log(error);
            }
        }
    }    


    useEffect(() => {
        const fetchPrompts = async () => {
          const response = await fetch(`/api/users/${session?.user.id}/prompts`);
          const data = await response.json();
    
          setPrompts(data);
        }
    
        if(session?.user.id) {
            fetchPrompts();
        }
      }, [])

  return (
    <Profile name='My' desc='Welcome to your personalized profile page' data={prompts} handleEdit={handleEdit} handleDelete={handleDelete} />
  )
}

export default MyProfile