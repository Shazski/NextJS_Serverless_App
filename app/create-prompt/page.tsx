"use client"
import {FormEvent, useState} from 'react'
import {useSession} from "next-auth/react"
import {useRouter} from "next/navigation"
import Form from '@components/Form'

const CreatePrompt = () => {

  const [submitting, setSubmitting] = useState<boolean>(false)
  const [post, setPost] = useState<{prompt:string, tag:string}>({
    prompt:"",
    tag:""
  })
  const {data: session} = useSession()
  const router = useRouter()
  const createPrompt = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true)
    try {
      const res = await fetch('/api/prompt/new', {
        method:"POST",
        body:JSON.stringify({
          prompt: post.prompt,
          userId: session?.user?.id,
          tag:post?.tag
        })
      })

      if(res.ok) {
        router.push('/')
      }
    } catch (error) {
      console.log(error, "<< === Add Prompt Error === >>");
    }finally{
      setSubmitting(false)
    }
  }
  return (
    <Form type="create" post={post} 
    setPost={setPost} submitting={submitting} 
    handleSubmit={createPrompt}/>
    )
}

export default CreatePrompt