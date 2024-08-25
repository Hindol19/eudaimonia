## Deployment

### Install the required modules

Install Modules:

```bash
pip install -r requirements.txt
```

### Train the models

```bash
python clusterQuestions.py
python sentiment_test.py
python diagnos.py
```

### Start Server

Run it

```bash
cd ./backend/server
uvicorn main:app --reload
```

### Start Frontend

Install Dependencies:

``bash
npm i
``

Run it

```bash
cd frontend
npm run dev
```
