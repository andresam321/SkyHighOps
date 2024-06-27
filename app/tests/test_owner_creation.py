import pytest
import requests

BASE_URL = 'http://localhost:8000'

@pytest.fixture
def session():
    return requests.Session()

def get_csrf_token(session):
    response = session.get(BASE_URL)
    return response.cookies['csrf_token']

def login(session):
    csrf_token = get_csrf_token(session)
    response = session.post(f"{BASE_URL}/api/auth/login", json={
        'email': 'andres@aa.io',
        'password': 'password',
        'csrf_token': csrf_token
    })
    return response.ok

def create_owner(session, aircraft_id):
    csrf_token = get_csrf_token(session)
    response = session.post(f"{BASE_URL}/api/owners/{aircraft_id}/new/owner/to_aircraft", json={
        'firstname': 'John',
        'lastname': 'Doe',
        'username': f'johndoe_{aircraft_id}',
        'email': f'johndoe_{aircraft_id}@example.com',
        'address': '123 Main St',
        'phone_number': '555-555-5555',
        'payment_type': 'credit_card',
        'notes': 'Test note',
        'csrf_token': csrf_token
    })
    return response.ok

def test_create_owner(session):
    assert login(session)
    for i in range(1, 21):  # Adjust the range for more or fewer owners
        assert create_owner(session, i)