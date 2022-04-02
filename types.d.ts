declare module "*.png";
interface Todo {
  userId : number;
  id: TodoId;
  title: string;
  completed: boolean;
}

type TodoId = number;
type TodoListId = number;

interface TodoList {
  todos: Todo[];
  lastId: TodoId;
  isRefresh: boolean;
  error: string | null;
}

type RootStackParamList = {
  Home: undefined;
  TodoList: { listId: TodoListId };
};

type HomePageProps = import("@react-navigation/stack").StackScreenProps<
  RootStackParamList,
  "Home"
>;

type TodoListPageProps = import("@react-navigation/stack").StackScreenProps<
  RootStackParamList,
  "TodoList"
>;
