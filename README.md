# Ecologi 'Treegression'

This is a single page React app built for the Ecologi full stack developer challenge.

## Getting started

1. Clone the repository
2. Install node modules: `npm i`
3. To run a live-reloading server locally run `npm start` from the project root directory. This will run the app in development mode at [http://localhost:3000](http://localhost:3000).

### Building

To create a production build run `npm build` from the project root directory.

### Linting & Prettier

This project includes Prettier to consistently format the code.

# API

The data was requested from [https://public.ecologi.com/trees](https://public.ecologi.com/trees) as per the instructions, however the endpoint was a little slow to respond. I was also getting a lot of HTTP 504 errors from the endpoint.

In the interests of saving time, I saved a success response and used a short Python script to transform the data into a workable structure. In doing so I made the following assumptions:

- Each sub-array represented a single 'tree transaction' - i.e. a number of trees planted at a given UTC timestamp: `[treesPlanted, timeStamp]`.
- I calculated the sum of all trees planted for that UTC day.

I would probably aim to make an API response that looks more similar to the output I generated from the Python script (see `./src/api-request/transformedResponse.json`). This was the Python script I used:

```python:
import json
import matplotlib.pyplot as plt
import pandas as pd
from datetime import date

f = open('./ecologiResponse.json')
data = json.load(f)

tree_counts = {}

# Calculate tree count per unique timestamp
for i, line in enumerate(data['data']):
    if line[1] in tree_counts:
        tree_counts[line[1]] += line[0]
    else:
        tree_counts[line[1]] = line[0]

df = pd.DataFrame({'timestamp': [date.fromtimestamp(int(t)) for t in tree_counts.keys()], 'count': tree_counts.values()})

df.timestamp = pd.to_datetime(df.timestamp)

df = df.reset_index().set_index('timestamp').resample('1D').sum()

df['timestamp'] = df.index
df[['count', 'timestamp']].rename(columns={'count': 'treeCount'}).to_json('./transformedResponse.json', orient="records")
```

# Improvements!

- Lots of improvements could be made to refine the UI - e.g. better axis labelling, improved tooltip etc
- Could use query params in the URL to reflect current graph state.
- Make live calls to the API!
