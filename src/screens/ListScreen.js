import axios from 'axios';
import React, {useState, useEffect} from 'react';

//import all the components we are going to use
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { useSelector } from 'react-redux';
import BackButton from '../components/BackButton';
import Background from '../components/Background';
import Button from '../components/Button';
import Header from '../components/Header';
import { API_URL } from '../constants/api';
import {theme} from '../core/theme';

const ListScreen = ({navigation, options}) => {

  const [loading, setLoading] = useState(true);
  const [dataSource, setDataSource] = useState([]);
  const [offset, setOffset] = useState(1);
  const token = useSelector(state => state.userAuth.accessToken);

  useEffect(() => getData(), []);

  const config = {
    headers: {Authorization: `Bearer ${token}`},
  };
  const getData = () => {
    setLoading(true);
    axios.get(API_URL+'/api/passwords', config)
      //Sending the currect offset with get request
      .then(responseJson => {
        //Successful response from the API Call
        setOffset(offset + 1);
        //After the response increasing the offset for the next API call.
        setDataSource(responseJson.data.data);
        // setDataSource([...dataSource, ...responseJson.data]);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const renderFooter = () => {
    return (
      //Footer View with Load More button
      <View style={styles.footer}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={getData}
          //On Click of button calling getData function to load more data
          style={styles.loadMoreBtn}>
          {loading ? (
              <>
                <Text style={styles.btnText}>Load More</Text>
                <ActivityIndicator color="white" />
              </>
          ) : <Text style={styles.btnText}>Load More</Text>}
        </TouchableOpacity>
      </View>
    );
  };

  const ItemView = ({item}) => {
    return (
      // Flat List Item
      <Text style={styles.itemStyle} onPress={() => getItem(item)}>
        {item.id}
        {'.'}
        {item.name.toUpperCase()}
      </Text>
    );
  };

  const getItem = item => {
    //Function for click on an item
    alert(
      'Id : ' +
        item.id +
        ' Title : ' +
        item.name +
        ' Password : ' +
        item.password,
    );
  };

  return (
    <Background>
      <BackButton goBack={() => navigation.navigate('Dashboard')} title={'Testo'}/>
      {/* <Header>Welcome back.</Header> */}
      <SafeAreaView style={{flex: 1, width: '100%'}}>
      {loading ? (
              <>
               <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => {}}
          //On Click of button calling getData function to load more data
          style={styles.loadMoreBtn}>
              <Text style={styles.btnText}>Loading</Text>
              <ActivityIndicator color="white" />
              </TouchableOpacity>
            </>
          ) :
          <FlatList
            data={dataSource}
            keyExtractor={(item, index) => index.toString()}
            //   ItemSeparatorComponent={ItemSeparatorView}
            enableEmptySections={false}
            renderItem={ItemView}
            // ListFooterComponent={renderFooter}
          />
      }</SafeAreaView>

    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
  },
  footer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  loadMoreBtn: {
    padding: 10,
    backgroundColor: '#800000',
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
  },
  itemStyle: {
    backgroundColor: theme.colors.primary,
    padding: 20,
    marginVertical: 6,
    borderRadius: 5,
  },
});

export default ListScreen;
