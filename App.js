import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
  StyleSheet,
  SafeAreaView,
} from 'react-native';

export default App = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([])

  const renderItem = ({item}) => <Item item={item}/>
  const getData = async () => {
    try{
      const response = await fetch("https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/menu-items-by-category.json")
      const result  = await response.json()
      if(result){
         setData(result.menu)
      }
    }
    catch(e){
      console.log(e)
    }
    finally{
      setLoading(false)
    }
  }

  const Item = ({item}) => {
    const {title,price} = item
     return (
       <View style={menuStyles.innerContainer}>
           <Text style={menuStyles.menulist}>{title} </Text>
           <Text style={menuStyles.menulist}>{price}</Text>
       </View>
     )
   }

  useEffect(() => {
   getData()
  }, [])
  
  return (
    <SafeAreaView style={menuStyles.container}>
      <Text style={menuStyles.headerText}>Little Lemon</Text>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
          
          <FlatList 
            data={data} 
            renderItem={renderItem} 
            keyExtractor={item => item.id}
            // ItemSeparatorComponent={Separator}
            // ListHeaderComponent={Header}
        /> 
      )}
    </SafeAreaView>
  );
};

const menuStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  menulist:{
    padding:5,
    fontSize:15,
    color:"yellow",
  },
  innerContainer: {
    paddingHorizontal: 40,
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor:"black"
  },
  headerText: {
    color: '#495E57',
    fontSize: 30,
    textAlign: 'center',
  },
});
