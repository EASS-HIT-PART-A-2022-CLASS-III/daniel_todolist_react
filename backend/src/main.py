from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

import uvicorn
from pydantic import BaseModel

app = FastAPI()
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class TodoItem(BaseModel):
    title: str
    description: str | None = None

db = []

@app.get("/")
async def root():
    """ root route """
    return {"message": "Hello World"}

@app.post('/add')
async def add_todo(item: TodoItem):
    """ add todo """
    db.append(item)
    return item

@app.get('/get')
async def get_todos():
    """ get all todos """
    return db

@app.delete('/remove')
async def remove_todo(item: TodoItem):
    # Todo: remove
    del db[item.title]
    return item





if __name__ == '__main__':
    uvicorn.run("main:app", host='localhost', port=8000, reload=True)