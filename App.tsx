import { StatusBar } from 'expo-status-bar';
import { Alert, FlatList, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Task } from './src/components/Task';
import { TaskDTO } from './src/dto/Task';
import { useState } from 'react';
import { Feather } from "@expo/vector-icons";

export default function App() {
  const [task, setTask] = useState("");  
  const [tasks, setTasks] = useState<TaskDTO[]>([]);  

  
  function handleInsert() {
    if (task) {
      setTasks([
        ...tasks,
        {
          id: Math.random(), 
          task,
          done: false,
        },
      ]);
      setTask(""); 
    } else {
      Alert.alert("Atenção", "Campo obrigatório!");
    }
  }

  function handleDone(item: TaskDTO){
    const taskCopy = tasks
    const index = taskCopy.indexOf(item)
    taskCopy[index].done = !tasks[index]
    setTasks(taskCopy)
    
  }
  function handleDelete(item: TaskDTO){
    const tasksfilter = tasks.filter(task => task.id!==item.id)
    setTasks(tasksfilter)
    Alert.alert("Atenção", "Excluido com sucesso!");
  }

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.inputContainer}>
          <TextInput 
            value={task}
            onChangeText={setTask}
            placeholder="Digite a task..."
            style={styles.input}
          />
          <TouchableOpacity onPress={handleInsert} style={styles.button}>
            <Feather name="plus" size={28} color="white" />
          </TouchableOpacity>
        </View>

        <View style={styles.text}>
          <FlatList
            data={tasks}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) => (
              <Task 
                task={item.task}
                done={item.done} 
                handleDone={() => handleDone(item)}
                handleDelete={() => handleDelete(item)}
              />
            )}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 40,
    paddingHorizontal: 20
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 5,
    flex: 1
  },
  button: {
    backgroundColor: 'pink',
    padding: 5,
    borderRadius: 6,
    marginBottom: 20,
    marginTop: 10
  },
  text: {
    flexDirection: "row",
    gap: 2
  }
});
