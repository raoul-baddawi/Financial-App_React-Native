import { useState, useEffect } from "react";
import axios from "axios";
import { Text, View, StyleSheet } from "react-native";

const Targetgoal = () => {
  const [data, setData] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [Fixeddata, setFixedData] = useState([]);
  const [Recurringdata, setRecurringData] = useState([]);

  const getProfityear = async (year) => {
    const res = await axios.get(
      `http://192.168.0.115:8000/api/profitgoal?year=${year}`
    );
    const filteredData = res.data.message.filter(
      (item) => item.year === year && item.isDeleted === 0
    );
    setData(filteredData);
  };

  const getFixedyear = async (year) => {
    const res = await axios.get(
      `http://192.168.0.115:8000/api/fixedf?year=${year}`
    );
    const filteredFidexData = res.data;
    setFixedData(filteredFidexData);
  };
  const getRecurringyear = async (year) => {
    const res = await axios.get(
      `http://192.168.0.115:8000/api/recurringf?year=${year}`
    );
    const filteredRecurringData = res.data;
    setRecurringData(filteredRecurringData);
  };

  useEffect(() => {
    if (selectedYear) {
      getFixedyear(selectedYear);
      getProfityear(selectedYear);
      getRecurringyear(selectedYear);
    }
  }, [selectedYear]);

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  //Date Selector Function
  const currentYear = new Date().getFullYear();
  const yearOptions = [];
  for (let year = 2018; year <= currentYear; year++) {
    yearOptions.push(
      <option key={year} value={year}>
        {year}
      </option>
    );
  }

  // Date Selector Finish here
  const total_amount = Fixeddata.total_amount + Recurringdata.total_amount;
  console.log(total_amount);
  return (
    <View style={styles.targetsection}>
      <View>
        <Text style={styles.targetgoal}>Target Goal</Text>

        {/* <label htmlFor="year-input"></label> */}
        <select
          style={styles.yearselected}
          id="year-input"
          value={selectedYear}
          onChange={handleYearChange}
        >
          <option value="">Select a year</option>
          {yearOptions}
        </select>
        <View>
          {selectedYear ? (
            data.length ? (
              data.map((item, index) => (
                <View style={styles.maps} key={index}>
                  <Text style={styles.mapstext}>Target Amount</Text>
                  <span style={styles.green}>${item.netProfit}</span>
                  <Text style={styles.mapstext}>Total Profit</Text>
                  <span style={styles.green}>${total_amount}</span>
                  <Text style={styles.mapstext}>Remaining Profit</Text>
                  <span style={styles.blue}>
                    ${item.netProfit - total_amount}
                  </span>
                </View>
              ))
            ) : (
              <Text>No data found for the selected year.</Text>
            )
          ) : (
            <Text>Please select a year to see the data.</Text>
          )}
        </View>
      </View>
    </View>
  );
};

export default Targetgoal;

const styles = StyleSheet.create({
  targetsection: {
    marginTop: 60,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    paddingBottom: 50,
    margin: 20,
    borderColor: "white",
    paddingHorizontal: 10,
    borderRadius: 25,
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 1,
  },

  yearselected: {
    fontSize: 18,
    borderRadius: 40,
    borderColor: "black",
    margin: 20,
    padding: 5,
    marginLeft: 120,
    marginRight: 120,
  },

  targetgoal: {
    fontSize: 30,
    flex: 1,
    marginTop: 30,
    fontWeight: "bold",
  },

  maps: {
    fontSize: 18,
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 1,
    flex: 1,
    gap: 15,
    margin: 22,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  mapstext: {
    fontWeight: "bold",
    fontSize: 20,
  },

  green: {
    color: "green",
  },

  blue: {
    color: "blue",
  },
});
