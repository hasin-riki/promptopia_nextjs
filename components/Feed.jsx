'use client';

import { useState, useEffect } from "react";

import PromptCard from "./PromptCard";
import { useDebounce } from "use-debounce";
import { useRouter } from "next/navigation";

const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [query] = useDebounce(searchText, 500);
  const [prompts, setPrompts] = useState([]);

  const router = useRouter();

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  }

  const PromptCardList = ({ data, handleTagClick }) => {
    return (
      <div className="mt-16 prompt_layout "> 
        {
          data.map((prompt) => (
            <PromptCard key={prompt._id} prompt={prompt} handleTagClick={handleTagClick} />
          ))
        }
      </div>
    )
  }

  useEffect(() => {
    const fetchPrompts = async () => {
      const response = await fetch(`/api/prompt`);
      const data = await response.json();

      setPrompts(data);
    }

    fetchPrompts();
  }, [])

  useEffect(() => {
    const fetchPrompts = async () => {
      const response = await fetch(`/api/prompt/?search=${query}`);
      const data = await response.json();

      setPrompts(data);
    }

    fetchPrompts();
  }, [query])

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input type='text' placeholder="Search for a tag" value={searchText} onChange={handleSearchChange} required className="search_input peer"/>
      </form>

      <PromptCardList data={prompts} handleTagClick={() => {}}/>
    </section>
  )
}

export default Feed