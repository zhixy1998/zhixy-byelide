// 负责整体数据转换器的适配逻辑

//跟后端定义一个数据的通用格式
//前端根据不同的转换类型，生成不同的转换数据
type ChartResData = {
  type: string;
  dimensions: string[];
  measures: string[] | number[];
  data: {
    value?: string | number;
    label?: string;
  };
};

type TransFormers<T = object> = {
  name: string;
  transform: (data: ChartResData) => T;
};
const getXAxis = (data: ChartResData) => {
  return {
    type: "category",
    data: data.dimensions || ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  };
};
const getYAxis = (data: ChartResData) => {
  return {
    type: "value",
  };
};
const getSeries = (data: ChartResData) => {
  return [
    {
      data:data.measures || [120, 200, 150, 80, 70, 110, 130],
      type:data.type
    }
  ]
}
const barTransformer: TransFormers = {
  name: "bar",
  transform(data: ChartResData) {
    return {
      xAxis: getXAxis(data),
      yAxis: getYAxis(data),
      series: getSeries(data),
    };
  },
};
const lineTransformer: TransFormers = {
  name: "line",
  transform(data: ChartResData) {
    return {
      xAxis: getXAxis(data),
      yAxis: getYAxis(data),
      series: getSeries(data),
    };
  },
};
/**
 * 图表转换器
 */
class ChartTransformer {
  private transformers = [barTransformer, lineTransformer];
  constructor() {
    //初始化适配器
  }
  use(transformer: TransFormers) {
    this.transformers.push(transformer);
  }
  transform(data: ChartResData) {
    //适配逻辑
    const { type } = data;
    const transformer = this.transformers.find((t) => t.name === type);
    if (!transformer) {
      throw new Error("no transformer");
    }
    return transformer.transform(data);
  }
}
//定义转换器
const pieTransformer: TransFormers = {
  name: "pie",
  transform(data: ChartResData) {
    return {
      title: {
        text: "Referer of a Website",
        subtext: "Fake Data",
        left: "center",
      },
      tooltip: {
        trigger: "item",
      },
      legend: {
        orient: "vertical",
        left: "left",
      },
      series: [
        {
          name: "Access From",
          type: "pie",
          radius: "50%",
          data: [
            { value: 1048, name: "Search Engine" },
            { value: 735, name: "Direct" },
            { value: 580, name: "Email" },
            { value: 484, name: "Union Ads" },
            { value: 300, name: "Video Ads" },
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      ],
    };
  },
};
//注册转换器

export const chartTransformer = new ChartTransformer();
chartTransformer.use(pieTransformer);
