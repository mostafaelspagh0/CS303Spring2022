import {
  StyleSheet,
  Pressable,
  View,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import {
  deleteTodo,
  toggleTodoDone,
} from "../../redux/slices/todolists/todoListsSlice";
import { useAppDispatch } from "../../redux/store";

export default function Item({
  iconSrc,
  text,
  id,
  isDone,
}: {
  iconSrc: any;
  text: string;
  listId: TodoListId;
  id: TodoId;
  isDone: boolean;
}) {
  const appDispatch = useAppDispatch();
  return (
    <Pressable
      style={styles.content}
      onLongPress={() =>
        appDispatch(
          deleteTodo({
            todoId: id,
          })
        )
      }
    >
      <TouchableOpacity
        onPress={() => appDispatch(toggleTodoDone({ todoId: id }))}
      >
        {isDone && <Image source={iconSrc} style={styles.image} />}
        {!isDone && <View style={styles.checkbox}></View>}
      </TouchableOpacity>
      <Text style={styles.title}>{text}</Text>
      <Pressable style={styles.gripCircle} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  content: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    height: 53,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#F6F6F6",
    borderRadius: 10,
    shadowRadius: 20,
    shadowOffset: {
      width: 2,
      height: 4,
    },
    shadowColor: "rgba(0, 0, 0, 0.1)",
  },
  image: { width: 24, height: 24, margin: 15 },
  title: {
    flex: 1,
    fontSize: 14,
    fontFamily: "Roboto",
    lineHeight: 16,
    color: "#1A1A1A",
    fontStyle: "normal",
    fontWeight: "400",
  },
  gripCircle: {
    borderWidth: 2,
    borderColor: "#55BCF6",
    height: 12,
    width: 12,
    borderRadius: 5,
    marginRight: 20,
  },
  checkbox: {
    width: 24,
    height: 24,
    margin: 15,
    borderRadius: 5,
    backgroundColor: "rgba(85, 188, 246, 0.4)",
  },
});
