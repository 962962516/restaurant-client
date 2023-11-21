<template>
  <div class="dashboard-container">

    <div class="outer-box">
      <div class="echarts-box">
        <h1 class="title">总盈利情况</h1>
        <hr style="border: 1.4px solid #a49f9f; margin-top: 20px; width: 1300px">
        <div id="myEcharts" class="chart"></div>
      </div>

      <div class="charts-row">
        <div class="pieChats-box">
          <span class="pie-span">类型销量占比/数量</span>
          <hr style="border: 1.4px solid #a49f9f; margin-top: 30px">
          <div id="pieEcharts" class="pieEcharts"></div>
          <span style="color: #545c64; margin-left: 480px;">目前总销量：{{allVolume}}</span>
        </div>
        <div class="price-pie-charts">
          <span class="pie-span">类型销量占比/价格</span>
          <hr style="border: 1.4px solid #a49f9f; margin-top: 30px">
          <div id="PricePieEcharts" class="price"></div>
          <span style="color: #545c64; margin-left: 480px;">目前总价格：{{allPrice}}</span>
        </div>
      </div>

      <div class="chicken-Bugger-div">
        <span class="pie-span">鸡肉汉堡类型所占比/销量/价格</span>
        <hr style="border: 1.4px solid #a49f9f; margin-top: 30px">
        <div id="chickenBuggerChart" class="chickenBugger-chart"></div>
        <span style="color: #545c64; margin-left: 450px;">目前总销量：{{chickenBuggerVolume}}</span>
        <div id="chickenBuggerPriceChart" class="chickenBuggerPrice-chart"></div>
        <span style="color: #545c64; margin-left: 1150px;">目前总价格：{{chickenBuggerPrice}}</span>
      </div>

      <div class="beef-bugger-div">
        <span class="pie-span">牛肉汉堡类型所占比/销量/价格</span>
        <hr style="border: 1.4px solid #a49f9f; margin-top: 30px">
        <div id="chickenBeefVolumeChart" class="chickenBugger-chart"></div>
        <span style="color: #545c64; margin-left: 450px;">目前总销量：{{BeefBuggerVolume}}</span>
        <div id="chickenBeefPriceChart" class="chickenBuggerPrice-chart"></div>
        <span style="color: #545c64; margin-left: 1150px;">目前总销量：{{BeefBuggerPrice}}</span>
      </div>

      <div class="angesi-bugger-div">
        <span class="pie-span">安格斯系列所占比/销量/价格</span>
        <hr style="border: 1.4px solid #a49f9f; margin-top: 30px">
        <div id="AnGeSiVolumeChart" class="angesi-volume-chart"></div>
        <span style="color: #545c64; margin-left: 450px;">目前总销量：{{anGeSiVolume}}</span>
        <div id="AnGeSiPriceChart" class="angesi-price-chart"></div>
        <span style="color: #545c64; margin-left: 1150px;">目前总价格：{{anGeSiPrice}}</span>
      </div>

      <div class="chicken-bugger-div">
        <span class="pie-span">炸鸡系列所占比/销量/价格</span>
        <hr style="border: 1.4px solid #a49f9f; margin-top: 30px">
        <div id="chickenVolumeChart" class="chicken-volume-chart"></div>
        <span style="color: #545c64; margin-left: 450px;">目前总销量：{{chickenVolume}}</span>
        <div id="chickenPriceChart" class="chicken-price-chart"></div>
        <span style="color: #545c64; margin-left: 1150px;">目前总价格：{{chickenPrice}}</span>
      </div>

      <div class="snack-bugger-div">
        <span class="pie-span">小吃/甜品系列所占比/销量/价格</span>
        <hr style="border: 1.4px solid #a49f9f; margin-top: 30px">
        <div id="snackVolumeChart" class="snack-volume-chart"></div>
        <span style="color: #545c64; margin-left: 450px;">目前总销量：{{snackVolume}}</span>
        <div id="snackPriceChart" class="chicken-price-chart"></div>
        <span style="color: #545c64; margin-left: 1150px;">目前总价格：{{snackPrice}}</span>
      </div>

      <div class="coffee-bugger-div">
        <span class="pie-span">小吃/甜品系列所占比/销量/价格</span>
        <hr style="border: 1.4px solid #a49f9f; margin-top: 30px">
        <div id="coffeeVolumeChart" class="snack-volume-chart"></div>
        <span style="color: #545c64; margin-left: 450px;">目前总销量：{{coffeeVolume}}</span>
        <div id="coffeePriceChart" class="chicken-price-chart"></div>
        <span style="color: #545c64; margin-left: 1150px;">目前总价格：{{coffeePrice}}</span>
      </div>

    </div>
  </div>
</template>


<script setup>
import * as echarts from "echarts";
import { onMounted, ref } from "vue";
import axios from "@/axios";

const echart = echarts;
const chartData = ref([]);
const chartDataTwo = ref({}); // 使用对象存储数据
const charChickenBuggerData = ref([])
const chartBeefBuggerData = ref([])
const charAnGeSiData = ref([])
const charChickenData = ref([])
const charSnackData = ref([])
const charCoffeeData = ref([])

const allVolume = ref(0)
const allPrice = ref(0)
const chickenBuggerVolume = ref(0)
const chickenBuggerPrice = ref(0)
const BeefBuggerVolume = ref(0)
const BeefBuggerPrice = ref(0)
const anGeSiVolume = ref(0)
const anGeSiPrice = ref(0)
const chickenVolume =ref(0)
const chickenPrice = ref(0)
const snackVolume = ref(0)
const snackPrice = ref(0)
const coffeeVolume = ref(0)
const coffeePrice = ref(0)

onMounted(() => {
  fetchDataAndInitializeChart();
  fetchDataAndInitializePieChart();
  fetchDataAndInitializeClassChart();
});

// 获取数据并初始化图表
async function fetchDataAndInitializeChart() {
  try {
    const response = await axios.get('/enterprise/monthSales');
    if (response.status === 200) {
      chartData.value = response.data.data;
      initializeChart();
    }
  } catch (error) {
    console.log(error);
  }
}

async function fetchDataAndInitializePieChart() {
  try {
    const response = await axios.get('/enterprise/classSales');
    if (response.status === 200) {
      chartDataTwo.value = response.data.data;
      allVolume.value = chartDataTwo.value.chickenBugger + chartDataTwo.value.beefBugger + chartDataTwo.value.anGeSi +
          chartDataTwo.value.chicken + chartDataTwo.value.snack +  chartDataTwo.value.coffee + chartDataTwo.value.combo
      allPrice.value = chartDataTwo.value.chickenBuggerPrice + chartDataTwo.value.beefBuggerPrice + chartDataTwo.value.anGeSiPrice +
          chartDataTwo.value.chickenPrice + chartDataTwo.value.snackPrice +  chartDataTwo.value.coffeePrice + chartDataTwo.value.comboPrice
      console.log('allVolume',allVolume.value)
      initializePieChart();
      initializeAllPricePieChart();
    }
  } catch (error) {
    console.log(error);
  }
}

async function fetchDataAndInitializeClassChart(){
  try{
    const response = await axios.get('/enterprise/classChickenBugger?clazz=2')
    if (response.status === 200) {
      console.log(response.data)
      charChickenBuggerData.value = response.data.data
      chickenBuggerVolume.value = charChickenBuggerData.value.reduce((total,item) => total + item.volume,0)
      initializeChickenVolumeChart();
      chickenBuggerPrice.value = charChickenBuggerData.value.reduce((total,item) => total + item.price,0)
      initializeChickenPriceChart();
    }
  }catch (error){
    console.log(error)
  }
  try{
    const response = await axios.get('/enterprise/classChickenBugger?clazz=3')
    if (response.status === 200) {
      console.log(response.data)
      chartBeefBuggerData.value = response.data.data
      console.log(chartBeefBuggerData.value)
      initializeBeefBuggerVolumeChart();
      BeefBuggerVolume.value = chartBeefBuggerData.value.reduce((total,item) => total + item.volume,0)
      initializeBeefBuggerPriceChart();
      BeefBuggerPrice.value = chartBeefBuggerData.value.reduce((total,item) => total + item.price,0)
    }
  }catch (error){
    console.log(error)
  }

  try{
    const response = await axios.get('/enterprise/classChickenBugger?clazz=4')
    if (response.status === 200) {
      console.log(response.data)
      charAnGeSiData.value = response.data.data
      console.log(charAnGeSiData.value)
      initializeAnGeSiVolumeChart()
      anGeSiVolume.value = charAnGeSiData.value.reduce((total,item) => total + item.volume,0)
      initializeAnGeSiPriceChart()
      anGeSiPrice.value = charAnGeSiData.value.reduce((total,item) => total + item.price,0)

    }
  }catch (error){
    console.log(error)
  }

  try{
    const response = await axios.get('/enterprise/classChickenBugger?clazz=5')
    if (response.status === 200) {
      console.log(response.data)
      charChickenData.value = response.data.data
      console.log(charChickenData.value)
      initializeChickVolumeChart()
      chickenVolume.value = charChickenData.value.reduce((total,item) => total + item.volume,0)
      initializeChickPriceChart()
      chickenPrice.value = charChickenData.value.reduce((total,item) => total + item.price,0)
    }
  }catch (error){
    console.log(error)
  }

  try{
    const response = await axios.get('/enterprise/classChickenBugger?clazz=7')
    if (response.status === 200) {
      console.log(response.data)
      charSnackData.value = response.data.data
      console.log(charChickenData.value)
      initializeSnackVolumeChart()
      snackVolume.value = charSnackData.value.reduce((total,item) => total + item.volume,0)
      initializeSnackPriceChart()
      snackPrice.value = charSnackData.value.reduce((total,item) => total + item.price,0)
    }
  }catch (error){
    console.log(error)
  }
  try{
    const response = await axios.get('/enterprise/classChickenBugger?clazz=8')
    if (response.status === 200) {
      console.log(response.data)
      charCoffeeData.value = response.data.data
      console.log(charSnackData.value)
      initializeCoffeeVolumeChart()
      coffeeVolume.value = charCoffeeData.value.reduce((total,item) => total + item.volume, 0)
      initializeCoffeePriceChart()
      coffeeVolume.value = charCoffeeData.value.reduce((total,item) => total + item.price, 0)
    }
  }catch (error){
    console.log(error)
  }
}

// 初始化图表
function initializeChart() {
  const priceData = chartData.value.map(item => item.price);
  const chart = echart.init(document.getElementById("myEcharts"), "dark");

  chart.setOption({
    xAxis: {
      type: "category",
      data: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
    },
    tooltip: {
      trigger: "axis",
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: priceData,
        type: "line",
        smooth: true,
      },
    ],
  });

  window.onresize = function () {
    chart.resize();
  };
}
function initializePieChart() {
  const chartDom = document.getElementById('pieEcharts');
  const myChart = echarts.init(chartDom);
  myChart.setOption({
    tooltip: {
      trigger: 'item',
    },
    legend: {
      top: '5%',
      left: 'center',
    },
    series: [
      {
        name: '餐品总销量',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2,
        },
        label: {
          show: false,
          position: 'center',
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 30,
            fontWeight: 'bold',
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: chartDataTwo.value.chickenBugger, name: '鸡肉汉堡' },
          { value: chartDataTwo.value.beefBugger, name: '牛肉汉堡' },
          { value: chartDataTwo.value.anGeSi, name: '安格斯' },
          { value: chartDataTwo.value.chicken, name: '炸鸡' },
          { value: chartDataTwo.value.snack, name: '小吃/甜品' },
          { value: chartDataTwo.value.coffee, name: '咖啡/饮品' },
          { value: chartDataTwo.value.combo, name: '甄选套餐' },
        ],
      },
    ],
  });

  window.onresize = function () {
    myChart.resize();
  };
}
 function initializeAllPricePieChart(){
const chartDom = document.getElementById('PricePieEcharts');
const myChart = echarts.init(chartDom);
myChart.setOption({
  tooltip: {
    trigger: 'item',
  },
  legend: {
    top: '5%',
    left: 'center',
  },
  series: [
    {
      name: '餐品总价格',
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 2,
      },
      label: {
        show: false,
        position: 'center',
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 30,
          fontWeight: 'bold',
        },
      },
      labelLine: {
        show: false,
      },
      data: [
        { value: chartDataTwo.value.chickenBuggerPrice, name: '鸡肉汉堡' },
        { value: chartDataTwo.value.beefBuggerPrice, name: '牛肉汉堡' },
        { value: chartDataTwo.value.anGeSiPrice, name: '安格斯' },
        { value: chartDataTwo.value.chickenPrice, name: '炸鸡' },
        { value: chartDataTwo.value.snackPrice, name: '小吃/甜品' },
        { value: chartDataTwo.value.coffeePrice, name: '咖啡/饮品' },
        { value: chartDataTwo.value.comboPrice, name: '甄选套餐' },
      ],
    },
  ],
});

window.onresize = function () {
  myChart.resize();
};
 }

 function initializeChickenVolumeChart(){
   const chartDom = document.getElementById('chickenBuggerChart');
   const myChart = echarts.init(chartDom);
   // 将数据转换为ECharts所需的格式
   const chartData = charChickenBuggerData.value.map(item => ({
     value: item.volume, // 您的数据中的销量
     name: item.productName // 产品名称或标签
   }));

   myChart.setOption( {
     title: {
       text: '鸡肉汉堡/卷 类型',
       subtext: '销量比',
       left: 'center'
     },
     tooltip: {
       trigger: 'item'
     },
     legend: {
       orient: 'vertical',
       left: 'left'
     },
     series: [
       {
         name: '单品总销量',
         type: 'pie',
         radius: '50%',
         data: chartData,
         emphasis: {
           itemStyle: {
             shadowBlur: 10,
             shadowOffsetX: 0,
             shadowColor: 'rgba(0, 0, 0, 0.5)'
           }
         }
       }
     ]
   });
 }
function initializeChickenPriceChart(){
  const chartDom = document.getElementById('chickenBuggerPriceChart');
  const myChart = echarts.init(chartDom);
  // 将数据转换为ECharts所需的格式
  const chartData = charChickenBuggerData.value.map(item => ({
    value: item.price, // 您的数据中的销量
    name: item.productName // 产品名称或标签
  }));

  myChart.setOption( {
    title: {
      text: '鸡肉汉堡/卷 类型',
      subtext: '价格比',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        name: '单品总价格',
        type: 'pie',
        radius: '50%',
        data: chartData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  });
}

function initializeBeefBuggerVolumeChart(){
  const chartDom = document.getElementById('chickenBeefVolumeChart');
  const myChart = echarts.init(chartDom);
  // 将数据转换为ECharts所需的格式
  const chartData = chartBeefBuggerData.value.map(item => ({
    value: item.volume, // 您的数据中的销量
    name: item.productName // 产品名称或标签
  }));

  myChart.setOption( {
    title: {
      text: '牛肉汉堡 类型',
      subtext: '销量比',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        name: '单品总销量',
        type: 'pie',
        radius: '50%',
        data: chartData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  });

}
function initializeBeefBuggerPriceChart(){
  const chartDom = document.getElementById('chickenBeefPriceChart');
  const myChart = echarts.init(chartDom);
  // 将数据转换为ECharts所需的格式
  const chartData = chartBeefBuggerData.value.map(item => ({
    value: item.price, // 您的数据中的销量
    name: item.productName // 产品名称或标签
  }));

  myChart.setOption( {
    title: {
      text: '牛肉汉堡 类型',
      subtext: '销量比',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        name: '单品总销量',
        type: 'pie',
        radius: '50%',
        data: chartData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  });
}

function initializeAnGeSiVolumeChart(){
  const chartDom = document.getElementById('AnGeSiVolumeChart');
  const myChart = echarts.init(chartDom);
  // 将数据转换为ECharts所需的格式
  const chartData = charAnGeSiData.value.map(item => ({
    value: item.volume, // 您的数据中的销量
    name: item.productName // 产品名称或标签
  }));

  myChart.setOption( {
    title: {
      text: '安格斯系列 类型',
      subtext: '销量比',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        name: '单品总销量',
        type: 'pie',
        radius: '50%',
        data: chartData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  });
}
function initializeAnGeSiPriceChart(){
  const chartDom = document.getElementById('AnGeSiPriceChart');
  const myChart = echarts.init(chartDom);
  // 将数据转换为ECharts所需的格式
  const chartData = charAnGeSiData.value.map(item => ({
    value: item.price, // 您的数据中的销量
    name: item.productName // 产品名称或标签
  }));

  myChart.setOption( {
    title: {
      text: '安格斯系列 类型',
      subtext: '销量比',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        name: '单品总销量',
        type: 'pie',
        radius: '50%',
        data: chartData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  });
}

function initializeChickVolumeChart(){
  const chartDom = document.getElementById('chickenVolumeChart');
  const myChart = echarts.init(chartDom);
  // 将数据转换为ECharts所需的格式
  const chartData = charChickenData.value.map(item => ({
    value: item.volume, // 您的数据中的销量
    name: item.productName // 产品名称或标签
  }));

  myChart.setOption( {
    title: {
      text: '炸鸡系列 类型',
      subtext: '销量比',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        name: '单品总销量',
        type: 'pie',
        radius: '50%',
        data: chartData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  });
}
function initializeChickPriceChart(){
  const chartDom = document.getElementById('chickenPriceChart');
  const myChart = echarts.init(chartDom);
  // 将数据转换为ECharts所需的格式
  const chartData = charChickenData.value.map(item => ({
    value: item.price, // 您的数据中的销量
    name: item.productName // 产品名称或标签
  }));

  myChart.setOption( {
    title: {
      text: '炸鸡系列 类型',
      subtext: '销量比',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        name: '单品总销量',
        type: 'pie',
        radius: '50%',
        data: chartData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  });
}

function initializeSnackVolumeChart(){
  const chartDom = document.getElementById('snackVolumeChart');
  const myChart = echarts.init(chartDom);
  // 将数据转换为ECharts所需的格式
  const chartData = charSnackData.value.map(item => ({
    value: item.volume, // 您的数据中的销量
    name: item.productName // 产品名称或标签
  }));

  myChart.setOption( {
    title: {
      text: '小吃/甜品系列 类型',
      subtext: '销量比',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        name: '单品总销量',
        type: 'pie',
        radius: '50%',
        data: chartData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  });
}
function initializeSnackPriceChart(){
  const chartDom = document.getElementById('snackPriceChart');
  const myChart = echarts.init(chartDom);
  // 将数据转换为ECharts所需的格式
  const chartData = charSnackData.value.map(item => ({
    value: item.price, // 您的数据中的销量
    name: item.productName // 产品名称或标签
  }));

  myChart.setOption( {
    title: {
      text: '小吃/甜品系列 类型',
      subtext: '销量比',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        name: '单品总销量',
        type: 'pie',
        radius: '50%',
        data: chartData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  });
}

function initializeCoffeeVolumeChart(){
  const chartDom = document.getElementById('coffeeVolumeChart');
  const myChart = echarts.init(chartDom);
  // 将数据转换为ECharts所需的格式
  const chartData = charCoffeeData.value.map(item => ({
    value: item.volume, // 您的数据中的销量
    name: item.productName // 产品名称或标签
  }));

  myChart.setOption( {
    title: {
      text: '咖啡/饮品系列 类型',
      subtext: '销量比',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        name: '单品总销量',
        type: 'pie',
        radius: '50%',
        data: chartData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  });
}
function initializeCoffeePriceChart(){
  const chartDom = document.getElementById('coffeePriceChart');
  const myChart = echarts.init(chartDom);
  // 将数据转换为ECharts所需的格式
  const chartData = charCoffeeData.value.map(item => ({
    value: item.price, // 您的数据中的销量
    name: item.productName // 产品名称或标签
  }));

  myChart.setOption( {
    title: {
      text: '咖啡/饮品系列 类型',
      subtext: '销量比',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        name: '单品总销量',
        type: 'pie',
        radius: '50%',
        data: chartData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  });
}

</script>

<style lang="scss" scoped>
.chicken-price-chart{
  display: flex;
  width: 600px;
  height: 800px;
  margin-top: -400px;
  margin-left: 700px;
}
.angesi-price-chart{
  display: flex;
  width: 600px;
  height: 800px;
  margin-top: -400px;
  margin-left: 700px;
}
.snack-volume-chart{
  display: flex;
  width: 600px;
  height: 800px;
  margin-top: 50px;
  margin-left: 40px;
}
.chicken-volume-chart{
  display: flex;
  width: 600px;
  height: 800px;
  margin-top: 50px;
  margin-left: 40px;
}
.angesi-volume-chart{
  display: flex;
  width: 600px;
  height: 800px;
  margin-top: 50px;
  margin-left: 40px;
}
.chickenBuggerPrice-chart{
  display: flex;
  width: 600px;
  height: 800px;
  margin-top: -400px;
  margin-left: 700px;
}
.beef-bugger-div{
  width: 1350px;
  height: 550px;
  margin-top: 50px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 25px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  border: 1px solid #ddd;
  background-color: #dddddd;
}
.coffee-bugger-div{
  width: 1350px;
  height: 550px;
  margin-top: 50px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 25px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  border: 1px solid #ddd;
  background-color: #dddddd;
}
.snack-bugger-div{
  width: 1350px;
  height: 550px;
  margin-top: 50px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 25px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  border: 1px solid #ddd;
  background-color: #dddddd;
}
.chicken-bugger-div{
  width: 1350px;
  height: 550px;
  margin-top: 50px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 25px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  border: 1px solid #ddd;
  background-color: #dddddd;
}
.angesi-bugger-div{
  width: 1350px;
  height: 550px;
  margin-top: 50px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 25px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  border: 1px solid #ddd;
  background-color: #dddddd;
}
.chicken-Bugger-div{
  width: 1350px;
  height: 550px;
  margin-top: -400px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 25px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  border: 1px solid #ddd;
  background-color: #dddddd;
}
.chickenBugger-chart{
  display: flex;
  width: 600px;
  height: 800px;
  margin-top: 50px;
  margin-left: 40px;
}
.charts-row{
  display: flex;
  height: 1000px;
  flex-direction: column;
  align-items: center;

}
.price{
  width: 550px;
  height: 600px;
  margin-top: 40px;
  margin-left: 20px;
}
.price-pie-charts{
  height: 500px;
  width: 650px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 25px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  margin-top: -500px;
  margin-left: 700px;
  border: 1px solid #ddd;
  background-color: #dddddd;
}
.all-price-charts{
  width: 600px;
  height: 600px;
}
.pie-span{
  display: flex;
  color: #545c64;
  flex-direction: column;
  align-items: center;
  font-size: 20px;

}
.pieChats-box{
  height: 500px;
  width: 650px;
  margin-left: -700px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 25px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  margin-top: 40px;
  border: 1px solid #ddd;
  background-color: #dddddd;
}
.outer-box {
  height: 500vh;
  width: 1500px;
  background-color: #8c939d; /* 更深的背景颜色 */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 30px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  border: 1px solid #ddd;
}

.dashboard-container {
  height: 88vh;
  display: flex;
  justify-content: center;
}

.echarts-box {
  height: 500px;
  width: 1350px;
  background-color: #dddddd; /* 更明亮的背景颜色 */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 25px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  border: 1px solid #ddd;
}

.title {
  display: flex;
  color: #545c64;
  flex-direction: column;
  align-items: center;
  font-size: 24px;
  margin-top: 20px;
  justify-content: center;
}

.chart {
  width: 100%;
  height: 300px;
  margin-top: 30px;
  border-radius: 20px;
}
.pieEcharts{
  width: 550px;
  height: 600px;
  margin-top: 40px;
  margin-left: 20px;
}
</style>
