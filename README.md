
## 1. 项目简介
```
HINcompare has been accepted for presentation at ChinaVis 2021,
Systerm access link: https://mgaia.top/HINcompare/
设计并实现了一个可视分析方法——HINCompare，通过自下而上的方式，让用户从结果出发，系统性地探索和比较三个
具有代表性的异构网络嵌入模型对于下游推荐任务表现的差异，以及探索模型在网络嵌入过程中所存在的共同模式。
```

## 2. 效果展示

### 总览
<img src="https://raw.githubusercontent.com/Wyy-96/GATRecVis/master/IMG/%E7%B3%BB%E7%BB%9F%E6%80%BB%E4%BD%93%E8%A7%86%E5%9B%BE.png" style="width:600px" />

```
HINcompare包含5个视图，视图(a) 模型选择入口以及数据信息展示，可通过开关选择任意模型。
评估指标概览图（视图(b)），提供了评估指标分布情况；
细节信息展示图（视图(c)）显示推荐结果的上下文信息;
推荐结果溯源图（视图(d)）通过可伸缩的力导引图展示推荐结果的生成路径及详细实体信息;
上下文信息关联图（视图(e)）显示了推荐结果的文本信息以及与目标用户的相关度分布
```

### 视图b
<img src="https://raw.githubusercontent.com/Wyy-96/GATRecVis/master/IMG/%E6%95%B0%E6%8D%AE%E9%80%89%E6%8B%A9%E7%AA%97%E5%8F%A3.png" style="width:200px" />

```
该视图显示多个模型评估指标结果。
每个堆叠柱状图代表三个异构网络嵌入模型对同一用户的评估指标结果，每种颜色分别代表一种模型。
> 由于环形区域面积有限，我们为系统增加了多角度的数据筛选功能，用户可以选择感兴趣的指标
拉动滑动条查看指标差值在相应区间范围内的数据，环形刷选择感兴趣区域，系统将在环形区域下方展示指标细节
```

### 视图c
<img src="https://raw.githubusercontent.com/Wyy-96/GATRecVis/master/IMG/%E5%9B%BEc.png" style="width:600px" />

```
该视图由平行坐标图、韦恩图和热力图三部分构成。
> 平行坐标图是对评估指标概览图进行补充。
> 韦恩图中的散点代表推荐结果，散点的白色边框表示其属于预测正确的电影，
  展示了不同嵌入模型的推荐结果之间的相互关系。
> 热力图统计了选定目标的历史观影记录对于不同年代和不同类型的分布情况，
  展示了目标观影偏好，辅助用户理解推荐结果及评价推荐结果。
```

### 视图d
<img src="https://raw.githubusercontent.com/Wyy-96/GATRecVis/master/IMG/%E5%9B%BE6.png" style="width:600px" />

```
根据视图可伸缩性的要求，实现了可展开和收缩的力导引图
展示了选定目标及其推荐结果间的元路径
例如，U1-M-U2-M：表示U1与U2可能有相同喜好
所以将U2看过的电影推荐给U1，该视图可显式地查看不同模型在异构网络学习过程中所挖掘到的特征信息
```

### 视图e
<img src="https://raw.githubusercontent.com/Wyy-96/GATRecVis/master/IMG/%E5%9B%BED.png" style="width:600px" />

```
为了进一步加强对模型聚合邻居信息机制的对比，增加了快照功能，能够在推荐结果溯源图中对比两个推荐结果的路径
重要性，或是同一推荐结果在不同模型中的聚合信息。
```

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
