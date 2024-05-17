// import React, { Component } from 'react'
// import { StyleSheet, ScrollView, Text, View } from 'react-native'
// import PieChart from 'react-native-pie-chart'

// export default class ExperianChart extends Component {
    
//   render() {
//     const widthAndHeight = 100
//     const series = [ 623, 321,]
//     const sliceColor = ['#002A70', '#9C9EA6']

//     return (
//       <ScrollView style={{ flex: 1 }}>
//         <View style={styles.container}>
//           {/* <Text style={styles.title}>Basic</Text>
//           <PieChart widthAndHeight={widthAndHeight} series={series} sliceColor={sliceColor} />
//           <Text style={styles.title}>Doughnut</Text> */}
//           <PieChart
//             widthAndHeight={widthAndHeight}
//             series={series}
//             sliceColor={sliceColor}
//             coverRadius={0.65}
//             coverFill={'#FFF'}
//           />
//         </View>
//       </ScrollView>
//     )
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//   },
//   title: {
//     fontSize: 24,
//     margin: 10,
//   },
// })

import { DataType } from '@/app/(drawer)';
import React from 'react';
import { StyleSheet, ScrollView, Text, View } from 'react-native';
import PieChart from 'react-native-pie-chart';

interface Dat {
    data: {
        widthAndHeight: number,
        series1: number,
        series2: number,
        sliceColor1: string,
        sliceColor2: string
    }
}

const ExperianChart = ({data}: Dat) => {
//   const widthAndHeight = 100;
//   const series = [ 321, 623];
//   const sliceColor = ['#002A70', '#9C9EA6'];

  const widthAndHeight = data.widthAndHeight;
  const series = [ data?.series1, data?.series2];
  const sliceColor = [data?.sliceColor1, data?.sliceColor2];

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.container}>
        <PieChart
          widthAndHeight={widthAndHeight}
          series={series}
          sliceColor={sliceColor}
          coverRadius={0.65}
          coverFill={'#FFF'}
          style={{marginBottom: -55, zIndex: 50}}
        />
        <Text style={{fontWeight: "bold", fontSize: 16, color: data?.sliceColor1, marginBottom: 30, zIndex: 50}}>{data?.series1}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 17,
    marginTop: 20
  },
  title: {
    fontSize: 24,
    margin: 10,
  },
});

export default ExperianChart;
