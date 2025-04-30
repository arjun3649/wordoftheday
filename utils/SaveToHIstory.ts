import AsyncStorage from "@react-native-async-storage/async-storage"; 
import { WordEntry } from "@/types/WordEntry";

export const saveToHistory = async (wordToSave: string, meaningToSave: string) => {
    try {
      const historyString = await AsyncStorage.getItem("wordHistory");
      let history: WordEntry[] = historyString ? JSON.parse(historyString) : [];
      // checks for duplicates
      const wordExists = history.some((entry) => entry.word === wordToSave);
      if (wordExists) return;

      const newEntry: WordEntry = {
        word: wordToSave,
        meaning: meaningToSave,
        date: new Date().toISOString(),
      };

      history.unshift(newEntry);
      await AsyncStorage.setItem("wordHistory", JSON.stringify(history));
    } catch (error) {
      console.error("Error saving to history:", error);
    }
  };