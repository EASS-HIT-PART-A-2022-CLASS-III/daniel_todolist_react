from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from uuid import UUID, uuid4


import uvicorn
from pydantic import BaseModel, Field
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
    id: UUID = Field(default_factory=uuid4)
    title: str
    checked: bool

# fake database
db = []

@app.post('/add')
async def add_todo(item: TodoItem):
    """ add todo """
    db.append(item)
    return item

@app.get('/get')
async def get_todos():
    """ get all todos """
    return db

@app.post('/update')
async def update_todo(new: TodoItem):
    # Find the old item in the database and remove it
    old_item = next((item for item in db if item.id == new.id), None)
    if old_item:
        db.remove(old_item)

    # Append the new item to the database
    db.append(new)

    
@app.post('/remove')
async def remove_todo(item: TodoItem):
    db.remove(item)
    return {"message": "Item removed successfully"}






if __name__ == '__main__':
    uvicorn.run("main:app", host='0.0.0.0', port=8000, reload=True)