import { LineChart, BarChart, PieChart } from 'react-native-chart-kit';
import { VictoryChart, VictoryAxis, VictoryBar, VictoryLegend, VictoryGroup } from 'victory';
import { View, TextInput, Button, StyleSheet, Text, Picker} from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';


const Chart = () => {
  const [dataf, setDataf] = useState([]);
  const [datar, setDatar] = useState([]);
  const [selectedYear, setSelectedYear] = useState('');
  
  useEffect(() => {
    const fetchData = async () => {
      const [fixedData, recurringData] = await Promise.all([
        axios.get(`http://192.168.0.108:8000/api/fixed${selectedYear ? `?year=${selectedYear}` : ''}`),
        axios.get(`http://192.168.0.108:8000/api/recurring${selectedYear ? `?year=${selectedYear}` : ''}`)
      ]);
      setDataf(fixedData.data.message.filter((item) => item.isDeleted === 0));
      setDatar(recurringData.data.message.filter((item) => item.isDeleted === 0));
    };

    fetchData();
  }, [selectedYear]);

  //to show all the months
  // Format data function
  const formatData = () => {
    const data = [...dataf, ...datar].sort((a, b) => new Date(a.endDate) - new Date(b.endDate));

    const monthlyData = new Array(12).fill().map((_, i) => ({
      month: new Date(selectedYear, i).toLocaleString('default', { month: 'long' }),
      income: 0,
      expense: 0,
      result: 0,
    }));

    let totalPrevious = 0;
    ////////////////
    for (let i = 0; i < 12; i++) {
      const monthData = monthlyData[i];

      const dataExistsForMonth = data.some(
        (item) =>
          (item.type === 'income' || item.type === 'expense') &&
          new Date(item.endDate).getFullYear() === parseInt(selectedYear) &&
          new Date(item.endDate).getMonth() === i
      );

      if (dataExistsForMonth) {
        //  for income bar
        const monthlyIncome = data
          .filter(
            (item) =>
              item.type === 'income' &&
              new Date(item.endDate).getFullYear() === parseInt(selectedYear) &&
              new Date(item.endDate).getMonth() === i
          )
          .reduce((acc, item) => acc + parseFloat(item.amount), 0);

        //  for expense bar
        const monthlyExpense = 1 * data
          .filter(
            (item) =>
              item.type === 'expense' &&
              new Date(item.endDate).getFullYear() === parseInt(selectedYear) &&
              new Date(item.endDate).getMonth() === i
          )
          .reduce((acc, item) => acc + parseFloat(item.amount), 0);

        totalPrevious = totalPrevious + monthlyIncome + monthlyExpense;
        //  for result bar
        monthData.income = monthlyIncome;
        monthData.expense = monthlyExpense;
        monthData.result = totalPrevious;
      }
    }

    return monthlyData;
  };

  const chartData = formatData();
  //Date Selector Function 
  const currentYear = new Date().getFullYear();
  const yearOptions = [];
  for (let year = 2018; year <= currentYear; year++) {
    yearOptions.push(
      <Picker.Item key={year} value={year} label={year.toString()} />
    );
  }
  // Date Selector Finish here

  const handleYearChange = (value) => {
    setSelectedYear(value);
  }

  return (
    <View style={styles.chartwrapper}>
      <Text style={styles.checker}>Profit Checker</Text>
      <View style={styles.picker}>
        <Picker
          selectedValue={selectedYear}
          onValueChange={handleYearChange}
        >
          <Picker.Item label="Select a year" value="" />
          {yearOptions}
        </Picker>
      </View>
      {/* Conditional rendering block */}
      {selectedYear ? (
        <View>
        <VictoryChart  padding={{ top: 45, left: 50, right: 50, bottom: 50 }}>
          <VictoryAxis
            dependentAxis
            style={{ axisLabel: { fontSize: 12 } }}
          />
          <VictoryAxis
            standalone={false}
            style={{
              axisLabel: { fontSize: 12 },
              tickLabels: { fontSize: 10, padding: 20, angle: -45 },
            }}
            labelPlacement="vertical"
          />
          <VictoryGroup offset={5} style={{ data: { width: 5 } }}>
            <VictoryBar data={chartData} x="month" y="income" style={{ data: { fill: "#3C763D" } }} />
            <VictoryBar data={chartData} x="month" y="expense" style={{ data: { fill: "#A94442" } }} />
            <VictoryBar data={chartData} x="month" y="result" style={{ data: { fill: "#31708F" } }} />
          </VictoryGroup>
          <VictoryLegend x={20} y={300}
            orientation="horizontal"
            gutter={20}
            style={{ labels: { fontSize: 12 } }}
            data={[
              { name: 'Income', symbol: { fill: "#3C763D" } },
              { name: 'Expense', symbol: { fill: "#A94442" } },
              { name: 'Result', symbol: { fill: "#31708F" } }
            ]}
          />
        </VictoryChart>
        </View>
      ) : (
        <Text>Please select a year to view data</Text>
      )}
    </View>
  );

}
const styles = StyleSheet.create({
  chartwrapper: {
    width: '97%',
    minHeight: '30vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent:'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: '35px',
    backgroundColor: 'white'
  },
  victory: {
    display: 'flex',
    flexDirection: 'row'
  },
  picker: {
    width: '30%',
    height: '30px'
  },
  checker: {
    fontSize: '20px',
    fontWeight: 'bold',
    padding: '10px'
  }
});


export default Chart;