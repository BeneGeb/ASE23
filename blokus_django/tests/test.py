from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
import time

class AuthTestCase(TestCase):

    def setUp(self):
        self.client = APIClient()

    def test_register_success(self):
        user_data = {
            'name': 'TestUser',
            'email': 'test@example.com',
            'password': 'password123'
        }
    
        response = self.client.post('/api/register/', user_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, {'id': 1, 'name': 'TestUser', 'email': 'test@example.com'})

    # def test_register_with_incomplete_data(self):
    #     incomplete_data = {
    #         'name': 'TestUser',
    #         'email': 'test@example.com'
    #     }
    #     for _ in range(10):
    #         response = self.client.post('/register/', incomplete_data, format='json')
    #         self.assertNotEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    # def test_register_with_existing_email(self):
    #     self.client.post('/register', {'name': 'User1', 'email': 'user@example.com', 'password': 'password123'}, format='json')
    #     duplicate_email_data = {
    #         'name': 'User2',
    #         'email': 'user@example.com',
    #         'password': 'newpassword123'
    #     }
    #     for i in range(3):
    #         response = self.client.post('/register', duplicate_email_data, format='json')
    #         self.assertNotEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    # def test_register_with_invalid_email(self):
    #     invalid_email_data = {
    #         'name': 'TestUser',
    #         'email': 'notanemail',
    #         'password': 'password123'
    #     }
    #     for i in range(2):
    #         response = self.client.post('/register', invalid_email_data, format='json')
    #         self.assertNotEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    # def test_login_success(self):
    #     user_data = {
    #         'name': 'TestUser',
    #         'email': 'test@example.com',
    #         'password': 'password123'
    #     }
    #     response = self.client.post('/register/', user_data, format='json')
    #     login_data = {
    #         'email': 'test@example.com',
    #         'password': 'password123'
    #     }
    #     response = self.client.post('/login/', login_data, format='json')
    #     self.assertEqual(response.status_code, status.HTTP_200_OK)

    # def test_login_with_invalid_data(self):
    #     user_data = {
    #         'name': 'TestUser',
    #         'email': 'test@example.com',
    #         'password': 'password123'
    #     }
    #     response = self.client.post('/register/', user_data, format='json')
    #     login_data = {
    #         'email': 'test@example.com',
    #         'password': 'wrongpassword'
    #     }
    #     response = self.client.post('/login/', login_data, format='json')
    #     self.assertNotEqual(response.status_code, status.HTTP_400_BAD_REQUEST)