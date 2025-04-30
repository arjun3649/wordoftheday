import { saveToHistory } from "@/utils/SaveToHIstory";
import React, { useEffect, useState } from "react";
import {
  Button,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";



export default function HomeScreen() {
  const [word, setWord] = useState<string | null>(null);
  const [meaning, setMeaning] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchWord = async () => {
    setLoading(true);
    setWord(null);
    setMeaning(null);

    try {
      const res = await fetch("https://random-word-api.herokuapp.com/word");
      const data = await res.json();
      const newWord = data[0];
      setWord(newWord);

      try {
        const res2 = await fetch(
          `https://api.dictionaryapi.dev/api/v2/entries/en/${newWord}`
        );

        if (!res2.ok) throw new Error("Definition not found");

        const data2 = await res2.json();
        let definition = "No definition found";

        if (
          data2 &&
          data2.length > 0 &&
          data2[0].meanings &&
          data2[0].meanings.length > 0
        ) {
          definition = data2[0].meanings[0].definitions[0].definition;
        }

        setMeaning(definition);
        await saveToHistory(newWord, definition);
      } catch {
        const noDefinition = "No definition found";
        setMeaning(noDefinition);
        await saveToHistory(newWord, noDefinition);
      }
    } catch {
      setWord("Error fetching word");
      setMeaning("Error fetching meaning");
    } finally {
      setLoading(false);
    }
  };

 

  useEffect(() => {
    fetchWord();
  }, []);

  return (
    <View className="flex-1 bg-zinc-900 px-6 py-12 justify-center items-center space-y-6">
      <Text className="text-4xl font-extrabold text-white mb-4">
        Word of the Day
      </Text>

      {loading ? (
        <ActivityIndicator size="large" color="#facc15" />
      ) : (
        <>
          <Text className="text-3xl font-semibold text-yellow-400 text-center m-2">
            {word}
          </Text>

          <View className="bg-zinc-800 p-5 rounded-xl shadow-lg w-full max-w-md">
            <Text className="text-white text-base text-center">{meaning}</Text>
          </View>
        </>
      )}

      {loading ? (
        ""
      ) : (
        <TouchableOpacity
          onPress={fetchWord}
          disabled={loading}
          className={`mt-6 px-6 py-3 rounded-full ${
            loading ? "bg-blue-400" : "bg-blue-600"
          }`}
        >
          <Text className="text-white text-lg font-medium">
            {loading ? "Loading..." : "New Word"}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
