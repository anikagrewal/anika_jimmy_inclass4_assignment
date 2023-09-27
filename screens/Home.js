import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Image, ScrollView } from 'react-native';
import axios from 'axios';
import { useState } from 'react';

export default function Home({navigation}) {
    const [data, setData] = useState();

    const [showBtn, setShowbtn] = useState(true);

    var apiKey = "5f2c5114ebe84e65bb03ffe48f425db5";
    var type = "tesla";
    var dateFrom = "2023-09-25";
    var dateTo = "2023-09-25";
    var sortBy = "publishedAt";
    var pageSize = 5;
  
    const url = `https://newsapi.org/v2/everything?q=${type}&from=${dateFrom}&to=${dateTo}&sortBy=${sortBy}&apiKey=${apiKey}&pageSize=${pageSize}`;
  
    const GrabNews = () => {
      axios.get(url)
      .then((response) => {
        console.clear();
        setData(response.data);
        setShowbtn(false)
        console.log(response.data);
      }).catch(err => {
        console.log(err);
      }) 
    }




    return (
        <ScrollView>
        <View style={styles.container}>
            {showBtn && (
                <Button onPress={() => GrabNews()}  title="Grab Info"><Text>GrabNews</Text></Button>
            )}
            
            
            {
                data && data.articles.map((d, index) => {
                    return(
                        <View style={styles.con} key={index}>
                            {d.urlToImage && <Image style={styles.img} source={{ uri: d.urlToImage}} alt="Image" />}
                           <View style={styles.text}>
                            <Text style={styles.aut}>{d.author}</Text>
                            <Text style={styles.title}>{d.title}</Text>
                            </View>
                        </View>
                    )
                })
            }
        </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 30,
       
    },
    img: {
        width: 200,
        height: 200
    },
    con: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        display: 'flex',
        fontSize: 12,
        justifyContent: 'start',
        alignItems: 'left'
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20
    }
});
