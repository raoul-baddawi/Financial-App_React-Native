import { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import axios from "axios";
import Targetgoal from "./Targetgoal";

function HomePage() {
 
  const [reportData, setreportData] = useState([]);
  const [selectValue, setselectValue] = useState("");
  useEffect(() => {
    getReport();
  }, [selectValue]);

  const getReport = async () => {
    let res;
    if (selectValue === "fixed") {
      res = await axios.get("http://192.168.0.115:8000/api/fixed");
    }
    if (selectValue === "recurring") {
      res = await axios.get("http://192.168.0.115:8000/api/recurring");
    }
    const reportData = res.data.message
      .slice(-3)
      .filter((item) => item.isDeleted === 0);
    setreportData(reportData.reverse());
  };

  console.log(reportData);

  return (
    <ScrollView style={styles.appContainer}>
      <Targetgoal />
      <View style={styles.reportsection}>
        <select
          style={styles.reportcategory}
          id="year-input"
          value={selectValue}
          onChange={(e) => setselectValue(e.target.value)}
        >
          <option value="">Select Report Type</option>
          <option value="fixed">Fixed</option>
          <option value="recurring">Recurring</option>
        </select>

        {reportData.map((item, index) => (
          <View style={styles.goalContainer} key={index}>
            <Text
              style={{
                color: item.type === "expense" ? "red" : "blue",
              }}
            >
              {item.title}
            </Text>
            <Text
              style={{
                color: item.type === "expense" ? "red" : "blue",
              }}
            >
              {item.type}
            </Text>
            <Text
              style={{
                color: item.type === "expense" ? "red" : "blue",
              }}
            >
              {item.category}
            </Text>
            <Text
              style={{
                color: item.type === "expense" ? "red" : "blue",
              }}
            >
              {item.amount}$
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

export default HomePage


const styles = StyleSheet.create({
  appContainer: {
    backgroundColor: "lightgray",
  },

  reportcategory: {
    fontSize: 18,
    borderRadius: 40,
    borderColor: "black",
    flex: 1,
    margin: 20,
    padding: 5,
    marginLeft: 120,
    marginBottom: 10,
    marginRight: 120,

    justifyContent: "center",
    alignItems: "center",
  },

  goalContainer: {
    padding: 18,
    margin: 10,
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 1,
    flex: 3,
    flexDirection: "row",
    alignItems: "center",
    gap: 40,
  },

  reportsection: {
    backgroundColor: "white",
    paddingBottom: 50,
    margin: 20,
    paddingHorizontal: 10,
    borderRadius: 25,
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 1,
    borderColor: "white",
  },

  goal: {
    color: "black",
  },
});
