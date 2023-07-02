# trying to do word detection based on predict word boundaries
# based on the user's typing patterns

# HTML side: call ML word_detected function on *every keyup*

# The below code is from https://towardsdatascience.com/tensorflow-and-transformers-df6fceaf57cc
# to be edited and turned into word detection

import tensorflow as tf
from transformers import TFAutoModel, AutoTokenizer
import pandas as pd
import numpy as np

SEQ_LEN = 50

# initialize model and tokenizer
bert = TFAutoModel.from_pretrained("bert-base-cased")
tokenizer = AutoTokenizer.from_pretrained("bert-base-cased")

# read data and drop dupes
df = pd.read_csv('train.tsv', sep='\t')
df.drop_duplicates(subset="SentenceId", keep="first", inplace=True)

arr = df['Sentiment'].values  # take sentiment column in df as array
labels = np.zeros((arr.size, arr.max()+1))  # initialize empty (all zero) label array
labels[np.arange(arr.size), arr] = 1  # add ones in indices where we have a value

# define function to handle tokenization
def tokenize(sentence):
    tokens = tokenizer.encode_plus(sentence, max_length=SEQ_LEN,
                                   truncation=True, padding='max_length',
                                   add_special_tokens=True, return_attention_mask=True,
                                   return_token_type_ids=False, return_tensors='tf')
    return tokens['input_ids'], tokens['attention_mask']

# initialize two arrays for input tensors
Xids = np.zeros((len(df), SEQ_LEN))
Xmask = np.zeros((len(df), SEQ_LEN))

# loop through data and tokenize everything
for i, sentence in enumerate(df['text']):
    Xids[i, :], Xmask[i, :] = tokenize(sentence)

# create tensorflow dataset object
dataset = tf.data.Dataset.from_tensor_slices((Xids, Xmask, labels))

# restructure dataset format for BERT
def map_func(input_ids, masks, labels):
    return {'input_ids': input_ids, 'attention_mask': masks}, labels
  
dataset = dataset.map(map_func)  # apply the mapping function

# shuffle and batch the dataset
dataset = dataset.shuffle(10000).batch(32)

DS_LEN = len(list(dataset))  # get dataset length

SPLIT = 0.9  # we will create a 90-10 split

# create training-validation sets
train = dataset.take(round(DS_LEN*SPLIT))
val = dataset.skip(round(DS_LEN*SPLIT))

# free up space
del dataset

# build the model
input_ids = tf.keras.layers.Input(shape=(50,), name='input_ids', dtype='int32')
mask = tf.keras.layers.Input(shape=(50,), name='attention_mask', dtype='int32')

input_ids = tf.keras.layers.Input(shape=(50,), name='input_ids', dtype='int32')
mask = tf.keras.layers.Input(shape=(50,), name='attention_mask', dtype='int32')

embeddings = bert(input_ids, attention_mask=mask)[0]  # we only keep tensor 0 (last_hidden_state)

X = tf.keras.layers.GlobalMaxPool1D()(embeddings)  # reduce tensor dimensionality
X = tf.keras.layers.BatchNormalization()(X)
X = tf.keras.layers.Dense(128, activation='relu')(X)
X = tf.keras.layers.Dropout(0.1)(X)
y = tf.keras.layers.Dense(5, activation='softmax', name='outputs')(X)  # adjust based on number of sentiment classes

model = tf.keras.Model(inputs=[input_ids, mask], outputs=y)

# freeze the BERT layer
model.layers[2].trainable = False

# compile the model
optimizer = tf.keras.optimizers.Adam(0.01)
loss = tf.keras.losses.CategoricalCrossentropy()
acc = tf.keras.metrics.CategoricalAccuracy('accuracy')

model.compile(optimizer=optimizer, loss=loss, metrics=[acc])

# and train it
history = model.fit(dataset, epochs=20)