import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import axios from 'axios';

function CardsComp() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get('http://192.168.0.108:8000/api/profitgoalf')
      .then((response) => setData(response.data))
      .catch((error) => console.log(error));
  }, []);

  if (data === null) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  const fixedIncome = parseInt(data[1].FIncome);
  const fixedExpenses = parseInt(data[1].FExpenses);
  const fixedtotal = fixedIncome - fixedExpenses;
  const recurringIncome = parseInt(data[0].RIncome);
  const recurringExpenses = parseInt(data[0].RExpenses);
  const recurringtotal = recurringIncome - recurringExpenses;
  const totalProfit = fixedtotal + recurringtotal;
  const Incometotal = fixedIncome + recurringIncome;
  const expensestotal = fixedExpenses + recurringExpenses;

  const animatedValue1 = new Animated.Value(0);
  const animatedValue2 = new Animated.Value(0);
  const animatedValue3 = new Animated.Value(0);
  const animatedValue4 = new Animated.Value(0);
  const animatedValue5 = new Animated.Value(0);
  const animatedValue6 = new Animated.Value(0);

  const animationConfig = {
    toValue: 1,
    duration: 300,
    useNativeDriver: false,
  };


  const scaleAnimationConfig = {
    toValue: 1,
    duration: 1000,
    useNativeDriver: true,
  };

  const scaleAnimationSequence = [
    Animated.timing(animatedValue1, {
      ...scaleAnimationConfig,
      toValue: 1,
    }),
    Animated.timing(animatedValue2, scaleAnimationConfig),
    Animated.timing(animatedValue3, scaleAnimationConfig),
  ];

  Animated.loop(
    Animated.sequence([
      Animated.timing(animatedValue1, {
        ...animationConfig,
        toValue: 1,
      }),
      Animated.timing(animatedValue2, {
        ...animationConfig,
        delay: 1000,
        toValue: 1,
      }),
      Animated.timing(animatedValue3, {
        ...animationConfig,
        delay: 1500,
        toValue: 1,
      }),
      ...scaleAnimationSequence,
    ])
  ).start();

  const opacity1 = animatedValue1.interpolate({
    inputRange: [0, 1],
    outputRange: [0.5, 1],
  });

  const opacity2 = animatedValue2.interpolate({
    inputRange: [0, 1],
    outputRange: [0.5, 1],
  });

  const opacity3 = animatedValue3.interpolate({
    inputRange: [0, 1],
    outputRange: [0.5, 1],
  });

  const scale1 = animatedValue1.interpolate({
    inputRange: [0, 1],
    outputRange: [0.7, 1],
  });

  const scale2 = animatedValue2.interpolate({
    inputRange: [0, 1],
    outputRange: [0.7, 1],
  });

  const scale3 = animatedValue3.interpolate({
    inputRange: [0, 1],
    outputRange: [0.7, 1],
  });


  const colors = ['rgb(132, 196, 247)', 'rgb(132, 196, 247)', 'rgb(132, 196,247)'];

const color1 = animatedValue4.interpolate({
  inputRange: [0, 1],
  outputRange: [colors[0], colors[1]],
});

const color2 = animatedValue5.interpolate({
  inputRange: [0, 1],
  outputRange: [colors[1], colors[2]],
});

const color3 = animatedValue6.interpolate({
  inputRange: [0, 1],
  outputRange: [colors[2], colors[0]],
});

  return (
    <View style={styles.main}>
      <Text style={styles.header}>Financo App</Text>
        <View style={styles.contain}>
        <Text style={styles.head}>Financial Status</Text>
          <View style={styles.container}>
          <Animated.View style={[styles.maincrds, { opacity: opacity1, transform: [{ scale: scale1 }], backgroundColor: color1}]}>
            <Text style={styles.total}>Total Expenses</Text>
            <Text style={styles.cardchild}>-${expensestotal}</Text>
          </Animated.View>
          <Animated.View style={[styles.maincrds, { opacity: opacity2, transform: [{ scale: scale2 }], backgroundColor: color2 }]}>
            <Text style={styles.total}>Total Income</Text> 
            <Text style={styles.cardchild}>${Incometotal}</Text>
          </Animated.View>
          <Animated.View style={[styles.maincrds, { opacity: opacity3, transform: [{ scale: scale3 }], backgroundColor: color3 }]}>
            <Text style={styles.total}>Total Savings</Text> 
            <Text style={styles.cardchild}>${totalProfit}</Text>
          </Animated.View>
          </View>
        </View>
    </View>
  );
  }
export default CardsComp;


  const styles = StyleSheet.create({
    main: {
      width: "97%",
      alignSelf: 'center'
    },
    contain:{
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      height: '35vh',
      display: 'flex',
      gap: '5px',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
      borderRadius: '35px'
    },
    container: {
      width: '100%',
      height: '20vh',
      display: 'flex',
      gap: '5px',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: '35px'
    },
    maincrds: {
      width: '30%',
      height: '80%',
      backgroundColor: 'lightgray',
      borderRadius: '35px',
      display: 'flex',
      opacity: '0.5',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      transform: 'scale(0.7)'
    },
    header: {
      fontSize: '30px',
      fontWeight: 'bold',
      padding: '20px',
      textAlign: 'center'
    },
    head: {
      fontSize: '20px',
      fontWeight: 'bold',
      textAlign: 'center'
    },
    total: {
      textAlign: 'center',
      fontWeight: '600'
    },
    cardchild:{
      fontWeight: 'bold',
      color: 'white'
    }
  });


  /*

  i have my react native project, i have three view elements that i want to animate them in a infinite loop, the animation i want will be as the following 
the three view elements will have by default the opacity of 0.5
the animation starts in the first view element by scaling it to 1.1 with the opacity of 1, when i finishes, the second element start and so on


Define the scaleAnimationConfig object with the required animation values, including toValue and duration.
Define the scaleAnimationSequence array to include Animated.timing() methods for each of the three views that you want to animate, specifying the animatedValue variable and scaleAnimationConfig object for each of them. In this array, you should update the toValue property for the first view to 1.1 and keep it 1 for the remaining two views.
Add the scale1, scale2, and scale3 variables, and initialize them to the animatedValue1, animatedValue2, and animatedValue3 variables, respectively.*/



// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, Animated } from 'react-native';

// function CardsComp() {
//   const [data, setData] = useState(null);
//   const animatedValue1 = new Animated.Value(0);
//   const animatedValue2 = new Animated.Value(0);
//   const animatedValue3 = new Animated.Value(0);

//   const animationConfig = {
//     toValue: 1,
//     duration: 1000,
//     useNativeDriver: true,
//   };

//   const animationSequence = Animated.sequence([
//     Animated.timing(animatedValue1, {
//       ...animationConfig,
//       toValue: 1,
//     }),
//     Animated.timing(animatedValue2, animationConfig),
//     Animated.timing(animatedValue3, animationConfig),
//   ]);

//   const scaleAnimationConfig = {
//     toValue: 1.1,
//     duration: 500,
//     useNativeDriver: true,
//   };

//   const scaleAnimationSequence = [
//     Animated.timing(animatedValue1, {
//       ...scaleAnimationConfig,
//       toValue: 1,
//     }),
//     Animated.timing(animatedValue2, scaleAnimationConfig),
//     Animated.timing(animatedValue3, scaleAnimationConfig),
//   ];

//   Animated.loop(
//     Animated.sequence([
//       Animated.timing(animatedValue1, {
//         ...animationConfig,
//         toValue: 1,
//       }),
//       Animated.timing(animatedValue2, {
//         ...animationConfig,
//         delay: 300,
//         toValue: 0.8,
//       }),
//       Animated.timing(animatedValue3, {
//         ...animationConfig,
//         delay: 600,
//         toValue: 0.8,
//       }),
//       ...scaleAnimationSequence,
//     ])
//   ).start();

//   const opacity1 = animatedValue1.interpolate({
//     inputRange: [0, 1],
//     outputRange: [0.5, 1],
//   });

//   const opacity2 = animatedValue2.interpolate({
//     inputRange: [0, 1],
//     outputRange: [0.5, 1],
//   });

//   const opacity3 = animatedValue3.interpolate({
//     inputRange: [0, 1],
//     outputRange: [0.5, 1],
//   });

//   const scale1 = animatedValue1.interpolate({
//     inputRange: [0, 1],
//     outputRange: [1, 1.1],
//   });

//   const scale2 = animatedValue2.interpolate({
//     inputRange: [0, 1],
//     outputRange: [1, 1.1],
//   });

//   const scale3 = animatedValue3.interpolate({
//     inputRange: [0, 1],
//     outputRange: [1, 1.1],
//   });

//   return (
//           <View style={styles.container}>
//             <Animated.View style={[styles.maincrds, { opacity: opacity1, transform: [{ scale: scale1 }] }]}>
//               <Text style={styles.total}>Total Expenses</Text>
//               <Text style={styles.cardchild}>${expensestotal}</Text>
//             </Animated.View>
//             <Animated.View style={[styles.maincrds, { opacity: opacity2, transform: [{ scale: scale2 }] }]}>
//               <Text style={styles.total}>Total Income</Text> 
//               <Text style={styles.cardchild}>${Incometotal}</Text>
//             </Animated.View>
//             <Animated.View style={[styles.maincrds, { opacity: opacity3, transform: [{ scale: scale3 }] }]}>
//               <Text style={styles.total}>Total Savings</Text> 
//               <Text style={styles.cardchild}>${totalProfit}</Text>
//             </Animated.View>
//           </View>
//   );
//   }
// export default CardsComp;


//   const styles = StyleSheet.create({
//     maincrds: {
//       width: '30%',
//       height: '80%',
//       backgroundColor: 'rgb(92, 181 ,255)',
//       borderRadius: '35px',
//       display: 'flex',
//       opacity: '0.5',
//       justifyContent: 'space-evenly',
//       alignItems: 'center'
//     }
//   });










  /*
  import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

function CardsComp() {
  const [data, setData] = useState(null);
  const animatedValue1 = new Animated.Value(0);
  const animatedValue2 = new Animated.Value(0);
  const animatedValue3 = new Animated.Value(0);
  
  const animationConfig = {
    toValue: 1,
    duration: 1000,
    useNativeDriver: true,
  };

  const animationSequence = Animated.sequence([
    Animated.timing(animatedValue1, {
      ...animationConfig,
      toValue: 1,
    }),
    Animated.timing(animatedValue2, animationConfig),
    Animated.timing(animatedValue3, animationConfig),
  ]);

  const scaleAnimationConfig = {
    toValue: 1.1,
    duration: 500,
    useNativeDriver: true,
  };

  const scaleAnimationSequence = [
    Animated.timing(animatedValue1, scaleAnimationConfig),
    Animated.timing(animatedValue2, {
      ...scaleAnimationConfig,
      toValue: 1,
    }),
    Animated.timing(animatedValue3, {
      ...scaleAnimationConfig,
      toValue: 1,
    }),
  ];

  Animated.loop(
    Animated.sequence([
      Animated.timing(animatedValue1, {
        ...animationConfig,
        toValue: 1,
      }),
      Animated.timing(animatedValue2, {
        ...animationConfig,
        delay: 300,
        toValue: 0.8,
      }),
      Animated.timing(animatedValue3, {
        ...animationConfig,
        delay: 600,
        toValue: 0.8,
      }),
      Animated.sequence(scaleAnimationSequence),
    ]),
  ).start();

  const scale1 = animatedValue1.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.1],
  });
  
  
  */