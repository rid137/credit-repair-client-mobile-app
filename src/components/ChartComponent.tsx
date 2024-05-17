// import * as echarts from 'echarts';
import * as echarts from 'echarts/core';
import { SvgChart, SVGRenderer } from '@wuba/react-native-echarts';
import { useRef, useEffect } from 'react';
import { BarChart, PieChart } from 'echarts/charts';
import { TitleComponent, TooltipComponent, GridComponent, LegendComponent } from 'echarts/components';


echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
//   LegendComponent,
  SVGRenderer,
  // ...
  BarChart,
  PieChart
])

const E_HEIGHT = 150;
const E_WIDTH = 150;


export default function ChartComponent({ option }: any) {
    const chartRef = useRef<any>(null);

    useEffect(() => {
        let chart: any;
        if (chartRef.current) {
        // @ts-ignore
        chart = echarts.init(chartRef.current, 'light', {
            renderer: 'svg',
            width: E_WIDTH,
            height: E_HEIGHT,
        });
        chart.setOption(option);
        }
        return () => chart?.dispose();
    }, [option]);

    return <SvgChart ref={chartRef} />;
}






// var chartDom = document.getElementById('main');
// var myChart = echarts.init(chartDom);
// var option;

// option = {
//   tooltip: {
//     trigger: 'item'
//   },
//   legend: {
//     top: '5%',
//     left: 'center'
//   },
//   series: [
//     {
//       name: 'Access From',
//       type: 'pie',
//       radius: ['40%', '70%'],
//       avoidLabelOverlap: false,
//       label: {
//           // show: false,
//         position: 'center'
//       },
//       emphasis: {
//         label: {
//           show: true,
//           fontSize: 40,
//           fontWeight: 'bold'
//         }
//       },
//       labelLine: {
//         show: false
//       },
//       data: [
//         { value: 1048, name: 'Search Engine' },
//         { value: 735, name: 'Direct' },
//         { value: 580, name: 'Email' },
//         { value: 484, name: 'Union Ads' },
//         { value: 300, name: 'Video Ads' }
//       ]
//     }
//   ]
// };

// option && myChart.setOption(option);



// Choose your preferred renderer
// import { SkiaChart, SVGRenderer } from '@wuba/react-native-echarts';





// Choose your preferred renderer
// import { SkiaChart, SVGRenderer } from '@wuba/react-native-echarts';
// import { SvgChart, SVGRenderer } from '@wuba/react-native-echarts';
// import * as echarts from 'echarts/core';
// import { useRef, useEffect } from 'react';
// import {
//   BarChart,
// } from 'echarts/charts';
// import {
//   TitleComponent,
//   TooltipComponent,
//   GridComponent,
// } from 'echarts/components';

// // Register extensions
// echarts.use([
//   TitleComponent,
//   TooltipComponent,
//   GridComponent,
//   SVGRenderer,
//   // ...
//   BarChart,
// ])

// const E_HEIGHT = 250;
// const E_WIDTH = 300;

// // Initialize
// function ChartComponent({ option }: any) {
//   const chartRef = useRef<any>(null);

//   useEffect(() => {
//     let chart: any;
//     if (chartRef.current) {
//       // @ts-ignore
//       chart = echarts.init(chartRef.current, 'light', {
//         renderer: 'svg',
//         width: E_WIDTH,
//         height: E_HEIGHT,
//       });
//       chart.setOption(option);
//     }
//     return () => chart?.dispose();
//   }, [option]);

//   // Choose your preferred chart component
//   // return <SkiaChart ref={chartRef} />;
//   return <SvgChart ref={chartRef} />;
// }