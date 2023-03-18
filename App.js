import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
  const [title, setTitle] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [content, setContent] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [seoDescription, setSeoDescription] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Load data from local storage if available
    async function loadData() {
      try {
        const blogData = await AsyncStorage.getItem('blogData');
        if (blogData !== null) {
          const { title, coverImage, content, authorName, seoDescription } = JSON.parse(blogData);
          setTitle(title);
          setCoverImage(coverImage);
          setContent(content);
          setAuthorName(authorName);
          setSeoDescription(seoDescription);
        }
      } catch (error) {
        console.log(error);
      }
    }
    loadData();
  }, []);

  const handleSave = async () => {
    // Validate required fields
    if (!title || !content || !authorName) {
      setErrorMessage('Please fill in all required fields');
      return;
    }

    // Save data to local storage
    const blogData = {
      title,
      coverImage,
      content,
      authorName,
      seoDescription,
    };
    try {
      await AsyncStorage.setItem('blogData', JSON.stringify(blogData));
      setErrorMessage('');
      console.log('Blog data saved successfully');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Title *</Text>
      <TextInput
        value={title}
        onChangeText={setTitle}
        style={styles.input}
        placeholder="Enter blog title"
      />
      <Text style={styles.label}>Cover Image</Text>
      <TextInput
        value={coverImage}
        onChangeText={setCoverImage}
        style={styles.input}
        placeholder="Enter cover image URL"
      />
      <Text style={styles.label}>Content *</Text>
      <TextInput
        value={content}
        onChangeText={setContent}
        style={[styles.input, { height: 200 }]}
        placeholder="Enter blog content"
        multiline
      />
      <Text style={styles.label}>Author Name *</Text>
      <TextInput
        value={authorName}
        onChangeText={setAuthorName}
        style={styles.input}
        placeholder="Enter author name"
      />
      <Text style={styles.label}>SEO Description {errorMessage}</Text>
      <TextInput
        value={seoDescription}
        onChangeText={setSeoDescription}
        style={styles.input}
        placeholder="Enter SEO description"
      />
      <Button title="Save" onPress={handleSave} style={styles.butmargin} />
      <Text style={styles.error}>{errorMessage}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 25,
    marginTop:50
    
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
    marginBottom: 10,
    backgroundColor:'#f5f5f5'
  },
  error: {
    color: 'red',
  },
  butmargin:{
    marginTop:60,
    backgroundColor:'red'
  
  }
});

export default App;
