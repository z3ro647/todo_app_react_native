import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet, Switch } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function App() {

  const [taskTitle, setTaskTitle] = useState('');
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    if (taskTitle.trim()) {
      setTasks([...tasks, { id: Date.now().toString(), title: taskTitle, status: false }]);
      setTaskTitle('');
    }
  };

  const toggleTaskStatus = (taskId) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, status: !task.status } : task
    ));
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const renderTask = ({ item }) => (
    <View style={styles.taskCard}>
      <Text style={[styles.taskTitle, item.status && styles.taskDone]}>{item.title}</Text>
      <View style={styles.taskActions}>
        <Switch
          value={item.status}
          onValueChange={() => toggleTaskStatus(item.id)}
        />
        <TouchableOpacity onPress={() => deleteTask(item.id)}>
          <Icon name="delete" size={24} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter task title"
          value={taskTitle}
          onChangeText={setTaskTitle}
        />
        <Button title="Add Task" onPress={addTask} disabled={!taskTitle.trim()} />
      </View>
      <FlatList
        data={tasks}
        keyExtractor={item => item.id}
        renderItem={renderTask}
        contentContainerStyle={styles.taskList}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    padding: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    marginRight: 10,
  },
  taskList: {
    marginTop: 20,
  },
  taskCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    borderRadius: 4,
    marginBottom: 10,
  },
  taskTitle: {
    fontSize: 16,
  },
  taskDone: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  taskActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
