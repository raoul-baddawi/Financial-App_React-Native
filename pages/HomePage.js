import { StyleSheet, Text, View, Button, ScrollView} from 'react-native';
import ThreeCrds from '../components/ThreeCrds'
import { useContext } from 'react';
import { AuthContext } from '../auth/AuthContext';
import { useNavigation } from '@react-navigation/native';
import Chart from '../components/Chart';
import axios from "axios";
import Targetgoal from "./Targetgoal";
import { useState, useEffect } from "react";

function HomePage() {
  const { token, logout} = useContext(AuthContext);
  const navigation = useNavigation();

  // Check if there is no token, redirect to the login page
  if (!token) {
    navigation.navigate('Login');
    return null;
  }
  const [reportData, setreportData] = useState([]);
  const [selectValue, setselectValue] = useState("");
  useEffect(() => {
    getReport();
  }, [selectValue]);

  const getReport = async () => {
    let res;
    if (selectValue === "fixed") {
      res = await axios.get("http://192.168.0.108:8000/api/fixed");
    }
    if (selectValue === "recurring") {
      res = await axios.get("http://192.168.0.108:8000/api/recurring");
    }
    const reportData = res.data.message
      .slice(-3)
      .filter((item) => item.isDeleted === 0);
    setreportData(reportData.reverse());
  };

  console.log(reportData);

  return (
    <View style={styles.container}>
      <ThreeCrds />
      <Chart />
      <Targetgoal />
      <View style={styles.reportsection}>
        <Text style={styles.rprthear}>Latest Report</Text>
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
            <View style={styles.goalContainer2}>
            <Text
              style={{
                color: item.type === "expense" ? "red" : "rgb(0, 140, 255)",
                textAlign: "center"
              }}
            >
              {item.title}
            </Text>
            <Text
              style={{
                color: item.type === "expense" ? "red" : "rgb(0, 140, 255)",
                textAlign: "center"
              }}
            >
              {item.type}
            </Text>
            <Text
              style={{
                color: item.type === "expense" ? "red" : "rgb(0, 140, 255)",
                textAlign: "center"
              }}
            >
              {item.category}
            </Text>
            <Text
              style={{
                color: item.type === "expense" ? "red" : "rgb(0, 140, 255)",
                textAlign: "center"
              }}
            >
              {item.amount}$
            </Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

export default HomePage


const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    gap: '30px'
  },
  reportsection: {
    width: '97%',
    minHeight: 200,
    alignSelf: 'center',
    backgroundColor: "white",
    borderRadius: 35,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 20
  },
  reportcategory: {
    width: '35%',
    height: 26,
    fontSize: 12,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center"
  },
  goalContainer: {
    width: "97%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 15,
    padding: 10
  },
  goalContainer2: {
    width: "90%",
    display: "flex",
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    fontSize: 18,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "black",
    borderRadius: 5
  },
  rprthear: {
    padding: 10,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: "900"
  }
});
