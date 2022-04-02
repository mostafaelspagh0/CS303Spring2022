import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TextInput,
  Pressable,
  Keyboard,
  RefreshControl,
  FlatList,
} from "react-native";
import Item from "../../Components/Item/Item";
import mango from "../../assets/mango.png";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import {
  addTodo,
  loadTasksFromServer,
  selectTodoList,
} from "../../redux/slices/todolists/todoListsSlice";
import NetworkIndicator from "../../Components/network-indicator/network-indicator";

const Home = () => {
  const [text, setText] = useState("");
  const AppDispatch = useAppDispatch();
  const todos = useAppSelector(selectTodoList);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    AppDispatch(loadTasksFromServer());
  }, []);

  useEffect(() => {
    AppDispatch(loadTasksFromServer());
  }, []);

  return (
    <View style={styles.container}>
      <View style={[{ flexDirection: "row" }]}>
        <Text style={[styles.title]}>Today’s tasks</Text>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            paddingTop: 80,
            justifyContent: "flex-end",
            // alignItems: "flex-end",
          }}
        >
          {todos.error && (
            <View
              style={{
                height: 15,
                width: 15,
                marginHorizontal: 5,
                marginTop: 2,
                borderRadius: 15,
                backgroundColor: "yellow",
              }}
            ></View>
          )}
          <NetworkIndicator />
        </View>
      </View>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={todos.isRefresh} onRefresh={onRefresh} />
        }
        data={todos.todos.slice().reverse()}
        renderItem={({ item }) => (
          <Item
            text={item.title}
            iconSrc={mango}
            key={item.id}
            id={item.id}
            listId={0}
            isDone={item.completed}
          />
        )}
      >
        <StatusBar style="auto" />
      </FlatList>
      <View style={styles.footer}>
        <TextInput
          style={styles.input}
          placeholder="Add a task"
          textAlign="center"
          onChangeText={(text) => setText(text)}
          value={text}
          onSubmitEditing={() => {
            if (text.length === 0) return;
            AppDispatch(addTodo({ title: text }));
            setText("");
            Keyboard.dismiss();
          }}
        />
        <Pressable
          style={styles.button}
          onPress={() => {
            if (text.length === 0) return;

            AppDispatch(addTodo({ title: text }));
            setText("");
            Keyboard.dismiss();
          }}
        >
          <MaterialCommunityIcons
            name="plus"
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              height: 48,
              width: 48,
            }}
            size={48}
            color="#C0C0C0"
          />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8EAED",
    alignItems: "stretch",
    justifyContent: "flex-start",
    padding: 20,
  },
  title: {
    paddingTop: 74,
    paddingBottom: 20,
    fontSize: 24,
    lineHeight: 28.13,
    fontFamily: "Roboto",
    fontWeight: "700",
    color: "#1A1A1A",
  },
  items: {
    flex: 1,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    height: 45,
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    backgroundColor: "#FFFFFF",
    shadowRadius: 30,
    shadowColor: "rgba(0, 0, 0, 0.15)",
    shadowOffset: {
      height: 4,
      width: 0,
    },
  },
  button: {
    height: 60,
    width: 60,
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
});

export default Home;
