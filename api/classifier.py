# Input data
import sys
data = [int(x.strip()) for x in  sys.argv[1].split(',')]

# data analysis and wrangling
import pandas as pd
import numpy as np
import random as rnd

# visualization
import seaborn as sns
import matplotlib.pyplot as plt
# %matplotlib inline

# machine learning
from sklearn.linear_model import LogisticRegression
from sklearn.svm import SVC, LinearSVC
from sklearn.ensemble import RandomForestClassifier
from sklearn.neighbors import KNeighborsClassifier
from sklearn.naive_bayes import GaussianNB
from sklearn.linear_model import Perceptron
from sklearn.linear_model import SGDClassifier
from sklearn.tree import DecisionTreeClassifier

train_df = pd.read_csv('./data/train.csv')
test_df = pd.read_csv('./data/test.csv')
combine = [train_df, test_df]

# preview the data
# print(train_df.head())

X_train = train_df.drop("Choice", axis=1)
Y_train = train_df["Choice"]
X_test  = test_df.copy()
# print(X_train.shape, Y_train.shape, X_test.shape)

X_train = X_train[['A_follower_count','A_following_count','A_listed_count',
'A_posts','B_follower_count','B_following_count','B_listed_count','B_posts']]
Y_train = train_df["Choice"]
X_test  = X_test[['A_follower_count','A_following_count','A_listed_count',
'A_posts','B_follower_count','B_following_count','B_listed_count','B_posts']]

# Logistic Regression
logreg = LogisticRegression()
logreg.fit(X_train, Y_train)
# Y_pred = logreg.predict(X_test)
# acc_log = round(logreg.score(X_train, Y_train) * 100, 2)
# print(acc_log)

# Support Vector Machines
# svc = SVC()
# svc.fit(X_train, Y_train)
# Y_pred = svc.predict(X_test)
# acc_svc = round(svc.score(X_train, Y_train) * 100, 2)
# print(acc_svc)

cols = ['A_follower_count','A_following_count','A_listed_count',
'A_posts','B_follower_count','B_following_count','B_listed_count','B_posts']
inputData = [10000000, 556, 24047, 4800, 11896910, 969, 55504, 9357]
df = pd.DataFrame([data], columns=cols)
Y_pred = logreg.predict(df)
print(Y_pred[0])
