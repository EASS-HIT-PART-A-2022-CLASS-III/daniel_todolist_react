import requests

def test_add_todo():
    res = requests.post('http://localhost:8000/add', json={'title': 'walk', 'checked': False})
    assert res.status_code == 200

def test_get_todos():
    res = requests.get('http://localhost:8000/get')
    assert res.status_code == 200
