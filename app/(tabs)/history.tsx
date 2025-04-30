import React, { useState } from "react";
import {
  FlatList,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

type WordEntry = {
  word: string;
  meaning: string;
  date: string;
};

export default function HistoryScreen() {
  const [history, setHistory] = useState<WordEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const loadHistory = async () => {
    setLoading(true);
    try {
      const historyString = await AsyncStorage.getItem("wordHistory");
      if (historyString) {
        const parsedHistory = JSON.parse(historyString);
        setHistory(parsedHistory);
      } else {
        setHistory([]);
      }
    } catch (error) {
      console.error("Error loading history:", error);
      setHistory([]);
    } finally {
      setLoading(false);
    }
  };

  // Use useFocusEffect to reload data whenever the screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      console.log("History screen focused, reloading data");
      loadHistory();
      return () => {
        // Optional cleanup function
      };
    }, [])
  );

  const clearHistory = async () => {
    try {
      await AsyncStorage.removeItem("wordHistory");
      setHistory([]);
    } catch (error) {
      console.error("Error clearing history:", error);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View className="flex-1 p-4 mt-6">
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-2xl font-bold text-white">Word History</Text>
          <Text className="text-sm text-yellow-300"> Total Words: {history.length}</Text>
          <TouchableOpacity
            onPress={clearHistory}
            className="bg-red-600 px-3 py-1 rounded"
          >
            <Text className="text-white">Clear All </Text>
          </TouchableOpacity>
        </View>

        {loading ? (
          <Text className="text-yellow-300 text-center mt-4">Loading...</Text>
        ) : history.length === 0 ? (
          <Text className="text-white text-center mt-4">No history found</Text>
        ) : (
          <FlatList
            data={history}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View className="bg-gray-800 p-4 rounded-lg mb-3">
                <Text className="text-xl font-bold text-yellow-300">
                  {item.word}
                </Text>
                <Text className="text-white mt-1">{item.meaning}</Text>
                <Text className="text-gray-400 text-xs mt-2">
                  {formatDate(item.date)}
                </Text>
              </View>
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: "black",
  },
});
