import pytest
import requests

BASE_URL = 'http://localhost:8000'

@pytest.fixture
def session():
    return requests.Session()

def get_csrf_token(session):
    response = session.get(BASE_URL)
    return response.cookies['csrf_token']

def test_login(session):
    csrf_token = get_csrf_token(session)
    response = session.post(f"{BASE_URL}/api/auth/login", json={
        'email': 'andres@aa.io',
        'password': 'password',
        'csrf_token': csrf_token
    })
    assert response.ok

def test_signup(session):
    csrf_token = get_csrf_token(session)
    response = session.post(f"{BASE_URL}/api/auth/signup", json={
        'email': 'newuser@example.com',
        'username': 'newuser',
        'firstname': 'New',
        'lastname': 'User',
        'password': 'password',
        'csrf_token': csrf_token
    })
    assert response.ok