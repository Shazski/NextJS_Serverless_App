"use client"
import React, { ChangeEvent, useEffect, useState } from 'react'
import PromptCard from './PromptCard';

const Feed = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [posts, setPosts] = useState<any[]>([]);
  const PromptCardList = ({ data, handleTagClick }: { data: any, handleTagClick: any }) => {
    return (
      <div className='mt-16 prompt_layout'>
        {data.map((post: any) => (
          <PromptCard key={post.id} post={post} handleTagClick={handleTagClick}/>
        ))}
      </div>
    )
  }
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {

  }

  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch('/api/prompt');
      const data = await response.json()

      setPosts(data)
    }

    fetchPost()
  }, [])

  return (
    <section className="feed">
      <form className="raltive w-full flex-center">
        <input type="text" placeholder='Search for a tag or username' value={searchText} onChange={handleSearchChange} required className='search_input peer' />
      </form>

      <PromptCardList data={posts} handleTagClick={() => console.log("sad")} />
    </section>
  )
}

export default Feed