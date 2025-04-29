import React, { useEffect, useState } from 'react';

export default function HomeScreen() {
  const [word, setWord] = useState<string | null >(null);
  const [meaning, setMeaning] = useState<string | null >(null);
  const [loading, setLoading] = useState<boolean >(false);

  const fetchWord = async () => {
    setLoading(true);
    setWord(null);
    setMeaning(null);
    
    try {
      // First get a random word
      const res = await fetch('https://random-word-api.herokuapp.com/word');
      const data = await res.json();
      const newWord = data[0];
      setWord(newWord);
      
      // Then fetch the definition using the newly fetched word
      try {
        const res2 = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${newWord}`);
        if (!res2.ok) {
          throw new Error('Definition not found');
        }
        const data2 = await res2.json();
        if (data2 && data2.length > 0 && data2[0].meanings && data2[0].meanings.length > 0) {
          setMeaning(data2[0].meanings[0].definitions[0].definition);
        } else {
          setMeaning('No definition found');
        }
      } catch (definitionError) {
        console.error(definitionError);
        setMeaning('No definition found');
      }
    } catch (error) {
      console.error(error);
      setWord('Error fetching word');
      setMeaning('Error fetching meaning');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWord();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center h-full space-y-4 p-6">
      <h1 className="text-3xl font-bold text-white">Today's Word:</h1>
      
      {loading ? (
        <div className="text-xl text-yellow-300">Loading...</div>
      ) : (
        <>
          <p className="text-2xl font-semibold text-yellow-300">{word}</p>
          <div className="bg-gray-800 p-4 rounded-lg max-w-md">
            <p className="text-lg text-white">{meaning}</p>
          </div>
        </>
      )}
      
      <button
        onClick={fetchWord}
        className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors mt-4 font-medium"
        disabled={loading}
      >
        {loading ? 'Loading...' : 'New Word'}
      </button>
    </div>
  );
}