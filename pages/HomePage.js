import { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import axios from "axios";

function HomePage() {

   const [fixedData, setfixedData] = useState([]);
  

  useEffect(() => {
    getfixed();
  }, []);

  const getfixed = async () => {
    const res = await axios.get("http://192.168.23.94:8000/api/report");
    setfixedData(res.data.message);
  };
  // console.log("Test", fixedData);



  return (
       <ScrollView>
      <Targetgoal/>
      <View style={styles.appContainer}>
        <Text style={styles.text}>Report</Text>
        {fixedData.map((item, index) => (
          <View style={styles.goalContainer} key={index}>
            <Text
              style={{
                color: item.type === "expense" ? "red" : "rgb(0 189 211)",
              }}
            >
              {item.type}
            </Text>
            <Text style={styles.goal}>{item.title}</Text>
            <Text style={styles.goal}>${item.amount}</Text>
            <Text style={styles.goal}>{item.category}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   backgroundColor: "black",
  //   alignItems: "center",
  //   justifyContent: "center",
  // },

  appContainer: {
    marginTop: 60,
    paddingHorizontal: 10,
  },

  text: {
    fontSize: 18,
    borderRadius: 20,
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 1,
    borderColor: "black",
    flex: 1,
    margin: 20,
    marginLeft: 120,
    marginRight: 120,
    paddingLeft: 25,
    justifyContent: "center",
    alignItems: "center",
  },

  goalContainer: {
    padding: 18,
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 1,
    flex: 3,
    flexDirection: "row",
    alignItems: "center",
    gap: 40,
  },

  goal: {
    color: "black",
 
  },
});
export default HomePage;
