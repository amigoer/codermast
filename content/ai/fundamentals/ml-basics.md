---
title: "机器学习基础"
description: "机器学习核心概念：监督学习、无监督学习、强化学习"
---

## 什么是机器学习

机器学习（Machine Learning, ML）是人工智能的核心分支，其本质是让计算机从数据中自动学习规律，并利用学到的规律对新数据做出预测或决策，而无需显式编程每一条规则。

<Tip>
对于开发者来说，机器学习可以理解为：**用数据代替硬编码规则**。传统编程是 `输入 + 规则 → 输出`，而机器学习是 `输入 + 输出 → 规则`。
</Tip>

## 机器学习的三大范式

根据训练数据的标注方式和学习目标，机器学习主要分为三大类：

| 范式 | 数据特点 | 目标 | 典型应用 |
|------|---------|------|---------|
| 监督学习 | 有标签数据（X → Y） | 学习输入到输出的映射 | 分类、回归 |
| 无监督学习 | 无标签数据（仅 X） | 发现数据内在结构 | 聚类、降维 |
| 强化学习 | 环境反馈（奖励信号） | 最大化累积奖励 | 游戏AI、机器人控制 |

### 监督学习（Supervised Learning）

监督学习是最常用的机器学习方式。训练数据包含输入特征和对应的标签（正确答案），模型通过学习输入与标签之间的关系来进行预测。

监督学习又分为两类任务：

- **分类（Classification）**：预测离散类别。例如：判断邮件是否为垃圾邮件、图片中是猫还是狗。
- **回归（Regression）**：预测连续数值。例如：预测房价、股票价格。

```python
# 监督学习示例：使用 scikit-learn 训练一个分类模型
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import accuracy_score

# 加载数据（带标签）
data = load_iris()
X, y = data.data, data.target

# 划分训练集和测试集
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 训练模型
model = DecisionTreeClassifier()
model.fit(X_train, y_train)

# 预测并评估
y_pred = model.predict(X_test)
print(f"准确率: {accuracy_score(y_test, y_pred):.2f}")
```

### 无监督学习（Unsupervised Learning）

无监督学习的训练数据没有标签，模型需要自行发现数据中的模式和结构。

常见任务包括：

- **聚类（Clustering）**：将相似的数据分组，如客户分群、文档主题聚类。
- **降维（Dimensionality Reduction）**：在保留关键信息的前提下减少特征维度，如 PCA、t-SNE。
- **异常检测（Anomaly Detection）**：识别与大多数数据显著不同的样本。

```python
# 无监督学习示例：K-Means 聚类
from sklearn.cluster import KMeans
import numpy as np

# 模拟数据（无标签）
X = np.random.randn(300, 2)

# 聚类为 3 组
kmeans = KMeans(n_clusters=3, random_state=42)
labels = kmeans.fit_predict(X)

print(f"聚类中心:\n{kmeans.cluster_centers_}")
print(f"各簇样本数: {np.bincount(labels)}")
```

### 强化学习（Reinforcement Learning）

强化学习中，智能体（Agent）通过与环境交互获取奖励信号，目标是学习一个策略来最大化长期累积奖励。

核心要素：
- **状态（State）**：环境的当前情况
- **动作（Action）**：智能体可以执行的操作
- **奖励（Reward）**：执行动作后获得的反馈
- **策略（Policy）**：从状态到动作的映射

<Note>
强化学习的典型应用包括 AlphaGo、自动驾驶、游戏 AI 等。与监督学习不同，强化学习不需要预先标注的数据，而是通过试错来学习。
</Note>

## 常用机器学习算法

### 线性回归（Linear Regression）

线性回归是最基础的回归算法，假设输出与输入之间存在线性关系：

$$y = w_1 x_1 + w_2 x_2 + ... + w_n x_n + b$$

模型通过最小化均方误差（MSE）来学习参数 `w` 和 `b`。

```python
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error

model = LinearRegression()
model.fit(X_train, y_train)

y_pred = model.predict(X_test)
mse = mean_squared_error(y_test, y_pred)
print(f"均方误差: {mse:.4f}")
print(f"模型系数: {model.coef_}")
print(f"截距: {model.intercept_:.4f}")
```

### 决策树（Decision Tree）

决策树通过一系列 if-else 规则对数据进行分割，形成树状结构。每个内部节点代表一个特征判断，叶子节点代表预测结果。

**优点**：可解释性强、无需特征缩放、能处理非线性关系。
**缺点**：容易过拟合、对数据变化敏感。

```python
from sklearn.tree import DecisionTreeClassifier, export_text

model = DecisionTreeClassifier(max_depth=3)
model.fit(X_train, y_train)

# 打印决策树规则，直观查看模型学到了什么
tree_rules = export_text(model, feature_names=data.feature_names)
print(tree_rules)
```

### 支持向量机（SVM）

SVM 的核心思想是找到一个超平面，使得不同类别之间的间隔最大化。通过核函数（Kernel Trick）可以处理非线性可分的数据。

```python
from sklearn.svm import SVC

# 使用 RBF 核函数
model = SVC(kernel='rbf', C=1.0, gamma='scale')
model.fit(X_train, y_train)
print(f"准确率: {model.score(X_test, y_test):.2f}")
```

常用核函数：

| 核函数 | 适用场景 | 参数 |
|--------|---------|------|
| `linear` | 线性可分数据 | C |
| `rbf` | 通用非线性数据（默认） | C, gamma |
| `poly` | 多项式关系数据 | C, degree |

### K 近邻（KNN）

KNN 是一种基于实例的学习方法。对于新样本，找到训练集中距离最近的 K 个样本，通过投票（分类）或平均（回归）来预测。

```python
from sklearn.neighbors import KNeighborsClassifier

model = KNeighborsClassifier(n_neighbors=5, metric='euclidean')
model.fit(X_train, y_train)
print(f"准确率: {model.score(X_test, y_test):.2f}")
```

<Warning>
KNN 在高维数据上性能较差（维度灾难），且预测速度慢，因为每次预测都需要计算与所有训练样本的距离。在生产环境中需谨慎使用。
</Warning>

### 聚类算法（K-Means）

K-Means 是最经典的聚类算法，将数据划分为 K 个簇，使得每个样本到其所属簇中心的距离之和最小。

算法步骤：
1. 随机初始化 K 个聚类中心
2. 将每个样本分配到最近的聚类中心
3. 重新计算每个簇的中心
4. 重复步骤 2-3 直到收敛

## 模型评估指标

选择正确的评估指标对模型开发至关重要。

### 分类指标

| 指标 | 公式 | 适用场景 |
|------|------|---------|
| 准确率（Accuracy） | 正确预测数 / 总样本数 | 类别均衡时 |
| 精确率（Precision） | TP / (TP + FP) | 关注假阳性代价时 |
| 召回率（Recall） | TP / (TP + FN) | 关注假阴性代价时 |
| F1 Score | 2 × P × R / (P + R) | 精确率与召回率的平衡 |
| AUC-ROC | ROC 曲线下面积 | 二分类综合评估 |

```python
from sklearn.metrics import classification_report, confusion_matrix

y_pred = model.predict(X_test)

# 打印详细分类报告
print(classification_report(y_test, y_pred, target_names=data.target_names))

# 混淆矩阵
print("混淆矩阵:")
print(confusion_matrix(y_test, y_pred))
```

<Note>
当数据类别严重不均衡时（如欺诈检测中正常交易远多于欺诈交易），准确率会产生误导。此时应更关注精确率、召回率和 F1 Score。
</Note>

### 回归指标

| 指标 | 说明 |
|------|------|
| MSE（均方误差） | 预测误差的平方均值，对大误差敏感 |
| RMSE（均方根误差） | MSE 的平方根，与目标值同量纲 |
| MAE（平均绝对误差） | 预测误差的绝对值均值，对异常值鲁棒 |
| R²（决定系数） | 模型解释方差的比例，1 为完美，0 为基线 |

## 过拟合与欠拟合

这是机器学习中最核心的概念之一，直接决定模型的泛化能力。

### 欠拟合（Underfitting）

模型过于简单，无法捕捉数据中的规律，在训练集和测试集上表现都差。

**原因**：模型复杂度不够、特征不足、训练不充分。

**解决方法**：
- 使用更复杂的模型
- 增加特征或进行特征工程
- 减少正则化强度
- 增加训练轮次

### 过拟合（Overfitting）

模型过于复杂，在训练集上表现优秀但在测试集上表现差——模型记住了训练数据中的噪声而非真正的规律。

**原因**：模型过于复杂、训练数据不足、训练时间过长。

**解决方法**：
- 增加训练数据
- 使用正则化（L1/L2）
- 降低模型复杂度（如限制决策树深度）
- 使用 Dropout（深度学习）
- 早停（Early Stopping）

```
训练误差  ↓ ████████████████████████████████░░░░░░  低
测试误差  ↓ ████████████░░░░░░░░░████████████████  先降后升
                   ↑                ↑
               最佳复杂度        过拟合开始
          欠拟合区域    |    过拟合区域
```

## 训练集/测试集划分

为了评估模型在未见数据上的表现，必须将数据划分为训练集和测试集。

```python
from sklearn.model_selection import train_test_split

# 常见的划分比例：80/20 或 70/30
X_train, X_test, y_train, y_test = train_test_split(
    X, y,
    test_size=0.2,       # 20% 作为测试集
    random_state=42,     # 固定随机种子，保证可复现
    stratify=y           # 分层抽样，保持类别比例一致
)

print(f"训练集大小: {len(X_train)}")
print(f"测试集大小: {len(X_test)}")
```

<Warning>
**绝对不要**用测试集来调参或选择模型。如果需要调参，应额外划分出一个验证集（Validation Set），或使用交叉验证。测试集应该只在最终评估时使用一次。
</Warning>

## 交叉验证（Cross-Validation）

交叉验证通过多次划分数据来更可靠地评估模型性能，避免因单次随机划分导致的评估偏差。

### K 折交叉验证（K-Fold CV）

将数据分为 K 份，每次用其中 1 份作为验证集，其余 K-1 份作为训练集，重复 K 次取平均。

```python
from sklearn.model_selection import cross_val_score

model = DecisionTreeClassifier(max_depth=5)

# 5 折交叉验证
scores = cross_val_score(model, X, y, cv=5, scoring='accuracy')

print(f"每折准确率: {scores}")
print(f"平均准确率: {scores.mean():.4f} ± {scores.std():.4f}")
```

### 实际开发中的数据划分策略

```
原始数据集
├── 训练集（70%）──── 用于 K 折交叉验证 ──── 调参 & 选模型
├── 验证集（15%）──── 监控训练过程（可选）
└── 测试集（15%）──── 最终一次性评估
```

## 特征工程基础

特征工程是提升模型性能最有效的手段之一，往往比更换算法更有效。

### 常见操作

| 操作 | 说明 | 示例 |
|------|------|------|
| 特征缩放 | 将特征统一到相同尺度 | StandardScaler, MinMaxScaler |
| 独热编码 | 将类别特征转为数值 | OneHotEncoder |
| 缺失值处理 | 填充或删除缺失数据 | SimpleImputer |
| 特征选择 | 选择最重要的特征 | SelectKBest |

```python
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline

# 使用 Pipeline 组织预处理和模型训练
pipeline = Pipeline([
    ('scaler', StandardScaler()),          # 标准化
    ('classifier', SVC(kernel='rbf'))      # SVM 分类器
])

pipeline.fit(X_train, y_train)
print(f"准确率: {pipeline.score(X_test, y_test):.2f}")
```

<Tip>
使用 `Pipeline` 可以将预处理步骤和模型训练封装在一起，避免数据泄露（Data Leakage），同时让代码更清晰、更易于维护。这是 scikit-learn 中推荐的最佳实践。
</Tip>

## 小结

机器学习的核心工作流程：

1. **定义问题**：明确是分类还是回归、监督还是无监督
2. **准备数据**：收集、清洗、特征工程
3. **选择模型**：根据问题类型和数据特点选择算法
4. **训练模型**：用训练集拟合模型
5. **评估模型**：用交叉验证和测试集评估性能
6. **调优迭代**：调整超参数、改进特征、尝试不同算法
7. **部署上线**：将模型集成到应用中

掌握这些基础概念后，你可以继续学习深度学习和神经网络，进入更高级的 AI 领域。
